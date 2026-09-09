export const profile = {
  name: 'Garv Makhija',
  monogram: 'GM',
  role: 'Computer Science Engineer | Full-Stack Developer | AI/ML Engineer',
  roleParts: ['Computer Science Engineer', 'Full-Stack Developer', 'AI/ML Engineer'],
  tagline: 'Building intelligent systems that solve real-world problems.',
  summary:
    'Builder-focused Computer Science student with experience in developing end-to-end software systems using Full-Stack technologies and Machine Learning. Designed and implemented real-world projects including AI-based traffic optimization and disaster response systems. Passionate about solving practical problems, optimizing system performance, and continuously learning to build scalable and impactful solutions.',
  heroSubheading:
    'Computer Science Engineering student focused on building scalable software and intelligent systems that solve practical problems.',
  availability: 'Available for Opportunities',
  location: 'Greater Noida, India',
  phone: '8920659388',
  phoneHref: 'tel:+918920659388',
  email: 'garvmakhija2006@gmail.com',
  emailHref: 'mailto:garvmakhija2006@gmail.com',
  linkedinLabel: 'linkedin.com/in/garv-makhija-6577791b7',
  linkedinHref: 'https://www.linkedin.com/in/garv-makhija-6577791b7',
  resumeUrl: '/Garv-Makhija-Resume.pdf',
  footerMotto: 'Building. Learning. Optimizing.',
};

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];

export const heroBadges = [
  { label: 'Python', top: '6%', left: '-6%', delay: 0 },
  { label: 'React', top: '24%', left: '86%', delay: 0.6 },
  { label: 'Node.js', top: '58%', left: '-17%', delay: 1.2 },
  { label: 'YOLO', top: '78%', left: '80%', delay: 0.3 },
  { label: 'OpenCV', top: '95%', left: '-8%', delay: 0.9 },
  { label: 'SQL', top: '40%', left: '96%', delay: 1.5 },
];

export const aboutParagraphs = [
  'I am a builder first. What I enjoy most is taking an idea from a rough concept, shaping it into an architecture, writing the code, and pushing it all the way through to a working, deployed system.',
  'That has meant writing backend modules and optimizing database queries in a production environment, and it has also meant training detection models and running them on edge hardware. Full-stack development and machine learning are two halves of the same craft for me: understand the real problem, then engineer something dependable that actually solves it.',
];

export const aboutFocus = [
  'Full-stack development',
  'Machine Learning',
  'Computer Vision',
  'Real-world problem solving',
  'System optimization',
  'Scalable applications',
];

export const highlights = [
  {
    no: '01',
    title: 'Build',
    body: 'End-to-end applications from idea to deployment.',
    icon: 'Blocks',
  },
  {
    no: '02',
    title: 'Intelligence',
    body: 'AI/ML and computer vision for practical problems.',
    icon: 'BrainCircuit',
  },
  {
    no: '03',
    title: 'Optimize',
    body: 'Performance, reliability and efficient data handling.',
    icon: 'Gauge',
  },
];

/** Counts are derived only from what the resume lists. */
export const stats = [
  { value: 2, suffix: '', label: 'AI systems built', hint: 'Traffic · Drones' },
  { value: 2, suffix: '', label: 'Competition wins', hint: 'Techinfra · Technovation' },
  { value: 4, suffix: '', label: 'Certifications', hint: 'Cloud · DSA · Java · Ethics' },
  { value: 1, suffix: '', label: 'Industry internship', hint: 'Full-stack, Gurugram' },
];

export const skillGroups = [
  {
    title: 'Languages',
    icon: 'Code2',
    accent: 'cyan',
    items: ['Python', 'Java', 'JavaScript'],
  },
  {
    title: 'Frontend',
    icon: 'Layout',
    accent: 'blue',
    items: ['React.js', 'HTML', 'CSS'],
  },
  {
    title: 'Backend',
    icon: 'Server',
    accent: 'violet',
    items: ['Node.js', 'Express.js'],
  },
  {
    title: 'Databases',
    icon: 'Database',
    accent: 'cyan',
    items: ['MongoDB', 'SQL'],
  },
  {
    title: 'AI / ML',
    icon: 'BrainCircuit',
    accent: 'violet',
    items: ['Machine Learning', 'Deep Learning', 'Neural Networks', 'Computer Vision', 'NLP'],
    wide: true,
  },
  {
    title: 'Tools',
    icon: 'Wrench',
    accent: 'blue',
    items: ['Git', 'VS Code', 'Jupyter', 'Google Colab'],
  },
];

/** Only technologies that already appear in the resume. */
export const exploring = ['Deep Learning', 'Neural Networks', 'NLP', 'Edge inference on NVIDIA Jetson Nano'];

export const experience = [
  {
    role: 'Software Engineer Intern — Full Stack Developer',
    company: 'Witzeal Technologies Pvt. Ltd.',
    location: 'Gurugram, India',
    period: 'May 2025 – July 2025',
    type: 'Internship',
    stack: ['Node.js', 'SQL', 'JavaScript', 'React.js'],
    points: [
      'Built and debugged backend modules using Node.js and SQL, improving system stability and performance.',
      'Optimized database queries and reduced response time for key application features.',
      'Contributed to end-to-end full-stack development, including backend logic and frontend integration.',
      'Assisted in deployment and testing of web applications in a production environment.',
      'Collaborated with developers to identify and fix critical bugs, improving overall application reliability.',
      'Worked with real-world datasets and implemented efficient data handling using SQL.',
      'Gained hands-on experience in building scalable web applications and understanding production workflows.',
    ],
  },
];

export const projects = [
  {
    no: '01',
    id: 'traffic',
    title: 'AI-Powered Traffic Management System',
    year: '2024 – 2025',
    visual: 'traffic',
    featured: false,
    description:
      'An intelligent traffic management system designed for real-time vehicle detection, congestion analysis and automated traffic control.',
    tech: ['Python', 'YOLO', 'OpenCV'],
    features: [
      'Real-time vehicle detection',
      'Congestion analysis',
      'Dynamic signal prioritization',
      'Emergency vehicle preemption',
      'End-to-end system development',
    ],
  },
  {
    no: '02',
    id: 'drones',
    title: 'Disaster Response Drones for Remote Areas',
    year: '2025 – 2026',
    visual: 'drone',
    featured: true,
    award: '1st Prize — Techinfra 2.0 (2025)',
    description:
      'An AI-assisted disaster response system designed to detect survivors from aerial imagery and transmit their location data in real time.',
    tech: ['Python', 'YOLO', 'NVIDIA Jetson Nano', 'GPS'],
    features: [
      'AI-based survivor detection',
      'Geotagging',
      'GPS data processing',
      'Real-time data transmission',
      'Edge inference',
      'Optimized aerial-image detection pipeline',
    ],
  },
];

export const achievements = [
  {
    rank: '1st Prize',
    emoji: '🏆',
    title: 'Techinfra 2.0',
    date: '2025',
    detail: 'Disaster Response Drone Project',
    tone: 'gold',
  },
  {
    rank: '1st Runner-up',
    emoji: '🥈',
    title: '6th Technovation Hackathon',
    date: 'January 2025',
    detail: 'Team hackathon — runner-up finish',
    tone: 'silver',
  },
];

export const certifications = [
  {
    issuer: 'UI Educon',
    title: 'Cloud Computing and Database Management Using SQL and Python',
    icon: 'Cloud',
  },
  { issuer: 'Apna College', title: 'Data Structures and Algorithms (Java)', icon: 'Binary' },
  { issuer: 'NPTEL — IIT Madras', title: 'Ethics in Engineering Practice', icon: 'Scale' },
  { issuer: 'Oracle Academy', title: 'Java Foundations', icon: 'Coffee' },
];

export const education = {
  institution: 'Sharda University',
  location: 'Greater Noida',
  degree: 'B.Tech — Computer Science Engineering',
  specialization: 'Artificial Intelligence for IoT',
  period: 'Aug 2023 – Present',
  status: 'In progress',
};
