// RGA (Replicated Growable Array) CRDT for text
// Each atom is a character with a unique ID and a left-neighbor pointer

// HEAD represents the start of the document (virtual atom)
const HEAD = { site: -1, seq: -1 };

// Helper: compare two IDs for deterministic ordering of siblings
function compareId(id1, id2) {
  if (id1.seq !== id2.seq) return id1.seq - id2.seq;
  return id1.site - id2.site; // site is int
}

// Atom represents a character (or tombstone)
class Atom {
  constructor(site, seq, left, value, visible = true) {
    this.id = { site, seq };    // unique identifier
    this.left = left || HEAD;   // pointer to left neighbor (atom ID or HEAD)
    this.value = value;         // character (for tombstone, could be undefined but keep)
    this.visible = visible;     // false for deleted
    // Note: we don't store an explicit list of right successors;
    // linearization computes children maps on the fly.
  }

  // For debugging
  toString() {
    return `[Atom ${this.id.site}:${this.id.seq} left=${this.left?.site || 'HEAD'}:${this.left?.seq || -1} "${this.value}" vis=${this.visible}]`;
  }
}

// CRDT state: set of atoms
class RGACRDT {
  constructor() {
    this.atoms = new Map(); // key: `${site}:${seq}` -> Atom
  }

  // Generate a unique atom ID for this site
  makeId(site, nextSeq) {
    return { site, seq: nextSeq };
  }

  // Insert `value` after the atom with ID `leftId` (or at HEAD if leftId is null)
  insertAfter(site, nextSeq, leftId, value) {
    const atom = new Atom(site, nextSeq, leftId, value);
    this.atoms.set(`${atom.id.site}:${atom.id.seq}`, atom);
    return atom;
  }

  // Delete (tombstone) the atom with given ID
  delete(id) {
    const key = `${id.site}:${id.seq}`;
    const atom = this.atoms.get(key);
    if (atom) {
      atom.visible = false;
    }
    // Note: we keep tombstones for convergence
  }

  // Get atom by ID (returns undefined if not present/tombstone)
  getAtom(id) {
    return this.atoms.get(`${id.site}:${id.seq}`);
  }

  // Linearize the document: return string of visible characters in order
  // Algorithm: build children map from left pointer, then DFS from HEAD
  // Children of each node are visited in order of increasing (seq, site)
  toString() {
    // Build children map: leftId -> list of atoms that have this left
    const children = new Map(); // key: leftId string -> Atom[]
    for (const atom of this.atoms.values()) {
      const leftKey = `${atom.left.site}:${atom.left.seq}`;
      if (!children.has(leftKey)) children.set(leftKey, []);
      children.get(leftKey).push(atom);
    }

    // Sort each children list by (seq, site)
    for (const list of children.values()) {
      list.sort((a, b) => compareId(a.id, b.id));
    }

    // Depth-first traversal from HEAD
    const result = [];
    function visit(leftId) {
      const childList = children.get(`${leftId.site}:${leftId.seq}`) || [];
      for (const atom of childList) {
        if (atom.visible) {
          result.push(atom.value);
        }
        visit(atom.id);
      }
    }
    visit(HEAD);
    return result.join('');
  }

  // For debugging: return debug representation
  debugString() {
    const chars = [];
    // Build children map
    const children = new Map();
    for (const atom of this.atoms.values()) {
      const leftKey = `${atom.left.site}:${atom.left.seq}`;
      if (!children.has(leftKey)) children.set(leftKey, []);
      children.get(leftKey).push(atom);
    }
    for (const list of children.values()) {
      list.sort((a, b) => compareId(a.id, b.id));
    }
    function visit(leftId, depth = 0) {
      const indent = '  '.repeat(depth);
      const childList = children.get(`${leftId.site}:${leftId.seq}`) || [];
      for (const atom of childList) {
        chars.push(`${indent}${atom}`);
        visit(atom.id, depth + 1);
      }
    }
    visit(HEAD);
    return chars.join('\n');
  }

  // Export state for synchronization: return array of atoms (for delta sync or full state)
  // We'll use full-state exchange for simplicity in this demo.
  exportState() {
    return Array.from(this.atoms.values());
  }

  // Import state (merge): replace local state with union (last-write-wins per ID, but since IDs are unique, it's just union)
  importState(atomsArray) {
    for (const atom of atomsArray) {
      this.atoms.set(`${atom.id.site}:${atom.id.seq}`, atom);
    }
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { RGACRDT, HEAD, Atom };
}