import { useState } from 'react';
import BackgroundFX from './components/BackgroundFX';
import CursorGlow from './components/CursorGlow';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Certifications from './components/Certifications';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/ui/BackToTop';

export default function App() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <BackgroundFX />
      <CursorGlow />
      <Navbar />

      <main id="main" className={`relative transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Certifications />
        <Education />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
