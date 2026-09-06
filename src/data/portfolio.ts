// =============================================================
// SINGLE SOURCE OF TRUTH — edit this file to update content.
// Content is sourced from Mostak Shahariyar's CV.
// =============================================================

export const profile = {
  name: 'Mostak Shahariyar',
  firstName: 'Mostak',
  title: 'Full Stack Developer',
  github: {
    username: 'shahariyar23',
    url: 'https://github.com/shahariyar23',
  },
  email: 'mostakshahariyar18@gmail.com',
  linkedin: 'https://linkedin.com/in/mostakshahariyar',
  location: 'Dhaka, Bangladesh',
  phone: '+880 1761208866',
  bio: `I'm a Full Stack Developer specializing in the MERN stack. I build scalable web applications with React, Node.js, Express.js, and MongoDB — and I've worked on real project-based frontend tasks in professional, remote team environments. I'm currently seeking Junior Software Engineer or Full Stack Developer opportunities where I can contribute to production-grade applications while continuing to grow.`,
  shortBio: `Full Stack Developer specializing in the MERN stack — React, Node.js, Express.js, and MongoDB.`,
  available: true,
}

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'GitHub', href: '#github' },
  { label: 'Contact', href: '#contact' },
]

// Technologies shown in the marquee ticker — real stack only.
// `icon` keys map to components in src/components/TechIcons.tsx.
export type Technology = {
  name: string
  icon: string
  brandColor: string
}

export const technologies: Technology[] = [
  { name: 'JavaScript', icon: 'SiJavascript', brandColor: '#f7df1e' },
  { name: 'TypeScript', icon: 'SiTypescript', brandColor: '#3178c6' },
  { name: 'React', icon: 'SiReact', brandColor: '#61dafb' },
  { name: 'Node.js', icon: 'SiNodedotjs', brandColor: '#539e43' },
  { name: 'Express', icon: 'SiExpress', brandColor: '#b0b8b0' },
  { name: 'MongoDB', icon: 'SiMongodb', brandColor: '#47a248' },
  { name: 'Tailwind CSS', icon: 'SiTailwindcss', brandColor: '#06b6d4' },
  { name: 'Git', icon: 'SiGit', brandColor: '#f05032' },
  { name: 'GitHub', icon: 'SiGithub', brandColor: '#e8ece9' },
  { name: 'VS Code', icon: 'SiVisualstudiocode', brandColor: '#007acc' },
  { name: 'Vercel', icon: 'SiVercel', brandColor: '#e8ece9' },
]

export type Project = {
  number: string
  name: string
  tagline: string
  description: string
  date?: string
  features: string[]
  stack: string[]
  repos: { label: string; url: string }[]
  liveUrl?: string
  accent: 'green' | 'blue' | 'purple' | 'yellow'
}

export const projects: Project[] = [
  {
    number: '01',
    name: 'BloodConnect – Blood Donation Platform',
    tagline: 'Connecting donors, hospitals, and blood banks',
    date: 'Feb 2026 – Jun 2026',
    description:
      'Built a full-stack platform connecting blood donors, hospitals, and blood banks across Bangladesh with real-time donor availability tracking.',
    features: [
      'Smart donor availability calculation',
      '90-day donation rule eligibility',
      'Third-party blood bank API integration (100+ banks)',
      'Admin-controlled API source settings',
      'Blood request tracking',
      'OTP and password reset via email',
    ],
    stack: ['MERN', 'JWT', 'Nodemailer', 'Tailwind CSS', 'MongoDB'],
    repos: [{ label: 'GitHub', url: 'https://github.com/shahariyar23/blood-donation-system-ui' }],
    liveUrl: 'https://blood-donation-system-ui.vercel.app/',
    accent: 'purple',
  },
  {
    number: '02',
    name: 'Mini ATS System – Applicant Tracking',
    tagline: 'Streamlining recruitment management',
    date: 'Jan 2026 – Feb 2026',
    description:
      'Built a responsive ATS frontend using TypeScript and Tailwind CSS to streamline recruitment and job application management.',
    features: [
      'Intelligent candidate search and filtering',
      'Real-time candidate identification',
      'JWT authentication',
      'Role-based access control',
      'Recruiter, HR, and candidate portals',
    ],
    stack: ['TypeScript', 'React', 'Tailwind CSS', 'Node.js', 'MongoDB'],
    repos: [{ label: 'GitHub', url: 'https://github.com/shahariyar23/Mini_ats_system_frontend' }],
    liveUrl: 'https://mini-ats-system-frontend.vercel.app/dashboard',
    accent: 'blue',
  },
  {
    number: '03',
    name: 'Mess Finder – Student Housing Platform',
    tagline: 'Search, compare, and book student housing',
    date: 'Nov 2025 – Jan 2026',
    description:
      'Developed a full-stack marketplace for students to search, compare, and book university-area mess facilities.',
    features: [
      'Search and filtering',
      'JWT authentication',
      'Role-based access control',
      'Mess listing and booking management',
      '20+ RESTful APIs',
    ],
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    repos: [{ label: 'GitHub', url: 'https://github.com/shahariyar23/MessFinder-backend' }],
    liveUrl: 'https://mess-finder-frontend.vercel.app',
    accent: 'green',
  },
  {
    number: '04',
    name: 'Gym Management System',
    tagline: 'Full-stack gym management and sales',
    date: 'Jun 2025 – Aug 2025',
    description:
      'Built a full-stack MERN application for gym member registration, payment gateway integration, and online sales of gym equipment.',
    features: [
      'Gym member registration',
      'Payment gateway integration',
      'Equipment sales',
      'JWT authentication',
      'Member and product management',
    ],
    stack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS'],
    repos: [{ label: 'GitHub', url: 'https://github.com/shahariyar23/gym-backend' }],
    liveUrl: 'https://gym-frontend-zeta.vercel.app/gym/dashboard',
    accent: 'yellow',
  },
]

// Project Journey Timeline data
export type TimelineProject = {
  number: string
  title: string
  shortDescription: string
  overview: string
  technologies: string[]
  liveUrl?: string
  githubUrl: string
  accent: string
}

export const projectTimeline: TimelineProject[] = [
  {
    number: '01',
    title: 'BloodConnect',
    shortDescription: 'A full-stack blood donation platform connecting donors, hospitals and blood banks.',
    overview:
      'Built a full-stack platform connecting blood donors, hospitals, and blood banks across Bangladesh with real-time donor availability tracking, smart eligibility calculation, and third-party API integration.',
    technologies: ['React', 'Node.js', 'MongoDB', 'JWT', 'Tailwind CSS'],
    liveUrl: 'https://blood-donation-system-ui.vercel.app/',
    githubUrl: 'https://github.com/shahariyar23/blood-donation-system-ui',
    accent: '#a78bfa',
  },
  {
    number: '02',
    title: 'Mini ATS System',
    shortDescription: 'Applicant tracking platform with authentication, role-based access and intelligent filtering.',
    overview:
      'Built a responsive ATS frontend using TypeScript and Tailwind CSS to streamline recruitment and job application management with intelligent candidate search and role-based access control.',
    technologies: ['TypeScript', 'React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    liveUrl: 'https://mini-ats-system-frontend.vercel.app/dashboard',
    githubUrl: 'https://github.com/shahariyar23/Mini_ats_system_frontend',
    accent: '#60a5fa',
  },
  {
    number: '03',
    title: 'Mess Finder',
    shortDescription: 'Student housing marketplace with listings, search, booking and role-based access.',
    overview:
      'Developed a full-stack marketplace for students to search, compare, and book university-area mess facilities with 20+ RESTful APIs and role-based access control.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    liveUrl: 'https://mess-finder-frontend.vercel.app',
    githubUrl: 'https://github.com/shahariyar23/MessFinder-backend',
    accent: '#4ade80',
  },
  {
    number: '04',
    title: 'Gym Management System',
    shortDescription: 'Full-stack gym management platform with member management and online payments.',
    overview:
      'Built a full-stack MERN application for gym member registration, payment gateway integration, and online sales of gym equipment with JWT authentication and RESTful API architecture.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
    liveUrl: 'https://gym-frontend-zeta.vercel.app/gym/dashboard',
    githubUrl: 'https://github.com/shahariyar23/gym-backend',
    accent: '#facc15',
  },
]

export type StackCategory = {
  key: string
  label: string
  accent: string
  techs: string[]
}

export const techStack: StackCategory[] = [
  {
    key: 'core',
    label: 'Core Stack',
    accent: '#4ade80',
    techs: ['JavaScript (ES6+)', 'TypeScript', 'React.js', 'Node.js', 'Express.js', 'MongoDB'],
  },
  {
    key: 'frontend',
    label: 'Frontend',
    accent: '#06b6d4',
    techs: ['HTML5', 'CSS3', 'Tailwind CSS', 'Shadcn UI', 'Material UI', 'Bootstrap'],
  },
  {
    key: 'backend',
    label: 'Backend & Database',
    accent: '#60a5fa',
    techs: ['REST API Design', 'JWT Authentication', 'Mongoose ODM', 'MongoDB', 'MySQL'],
  },
  {
    key: 'tools',
    label: 'Tools & Deployment',
    accent: '#a78bfa',
    techs: ['Git', 'GitHub', 'VS Code', 'Postman', 'Vercel', 'Render', 'Netlify'],
  },
]

export const focusCards: { title: string; description: string; icon: string }[] = [
  {
    title: 'Clean Code',
    description: 'Writing maintainable, readable code that my future self — and my team — can work with.',
    icon: 'code',
  },
  {
    title: 'Performance',
    description: 'Building fast, optimized applications that feel snappy for every user.',
    icon: 'gauge',
  },
  {
    title: 'Scalable Architecture',
    description: 'Designing systems that grow gracefully as requirements evolve.',
    icon: 'layers',
  },
  {
    title: 'Responsive Design',
    description: 'Interfaces that look and work great on any screen size.',
    icon: 'monitor',
  },
  {
    title: 'API Development',
    description: 'Secure, well-documented RESTful APIs that power web and mobile apps.',
    icon: 'plug',
  },
  {
    title: 'Problem Solving',
    description: 'Breaking complex problems down into simple, working solutions.',
    icon: 'puzzle',
  },
]

export const about = {
  paragraphs: [
    `I'm a Full Stack Developer specializing in the MERN stack with experience building scalable web applications using React, Node.js, Express.js, and MongoDB. On the frontend, I work with TypeScript and Tailwind CSS to build responsive, production-grade user interfaces.`,
    `I've worked on real project-based frontend tasks under professional supervision, collaborating remotely with development teams. My experience includes following coding standards, participating in code reviews, and contributing to iterative development cycles — giving me hands-on exposure to professional frontend workflows and version control practices.`,
    `I'm seeking Junior Software Engineer or Full Stack Developer opportunities where I can contribute to production-grade applications while continuing to grow as a software engineer.`,
  ],
  educationNote: `B.Sc. in Computer Science & Engineering (CSE) from the International University of Business Agriculture and Technology (IUBAT), Dhaka — graduated 2026 with a CGPA of 3.60 / 4.00.`,
}

export type TimelineEntry = {
  date: string
  org: string
  role: string
  description: string
  tags: string[]
}

export const timeline: TimelineEntry[] = [
  {
    date: 'Aug 2025 – Aug 2026',
    org: 'Weero Digital · Web Development Department',
    role: 'Frontend Developer',
    description:
      'Worked on real project-based frontend tasks under professional supervision. Built and maintained responsive UI components using React.js, TypeScript, and Tailwind CSS. Collaborated with the development team in a remote environment, followed company coding standards, and participated in code reviews and iterative development cycles. Contributed to real-world client project delivery.',
    tags: ['React.js', 'TypeScript', 'Tailwind CSS', 'Remote', 'Code Reviews'],
  },
  {
    date: '2026',
    org: 'International University of Business Agriculture and Technology (IUBAT), Dhaka',
    role: 'B.Sc. in Computer Science & Engineering (CSE)',
    description:
      'Graduated with a CGPA of 3.60 / 4.00. Relevant coursework included Data Structures & Algorithms, Database Management, Object-Oriented Programming, Software Engineering, and Computer Networks.',
    tags: ['CSE', 'IUBAT', 'CGPA 3.56'],
  },
  {
    date: '2025',
    org: 'Digital Leadership Academy',
    role: 'SQL Database Fundamentals',
    description: 'Training and certification in SQL Database Fundamentals.',
    tags: ['SQL', 'Database'],
  },
  {
    date: '2022',
    org: 'Programming Hero',
    role: 'MERN Stack Development',
    description: 'Training in full-stack MERN development.',
    tags: ['MERN', 'MongoDB', 'Express', 'React', 'Node.js'],
  },
]

export const curatedRepos = [
  { name: 'MessFinder-frontend', lang: 'JavaScript', desc: 'Web frontend for the mess/hostel finder platform' },
  { name: 'MessFinder-backend', lang: 'JavaScript', desc: 'Node.js API for the mess/hostel finder platform' },
  { name: 'blood-donation-system-ui', lang: 'TypeScript', desc: 'Frontend for the blood donation platform' },
  { name: 'blood-donation-system-backend', lang: 'TypeScript', desc: 'Node.js API for the blood donation platform' },
  { name: 'Mosque_project', lang: 'TypeScript', desc: 'Full-stack app on Cloudflare Workers' },
  { name: 'Mini_ats_system_frontend', lang: 'TypeScript', desc: 'Frontend for the ATS platform' },
  { name: 'Mini_ats_system_backend', lang: 'JavaScript', desc: 'Backend for the ATS platform' },
  { name: 'gym-frontend', lang: 'JavaScript', desc: 'Frontend for the gym management platform' },
  { name: 'gym-backend', lang: 'JavaScript', desc: 'Backend for the gym management platform' },
  { name: 'mobile_app_smart_cost', lang: 'TypeScript', desc: 'React Native cost-tracking mobile app' },
]

export const terminalInfo = {
  user: 'shahariyar',
  host: 'dev-workspace',
  rows: [
    'OS:       Web / Cloud',
    'Editor:   VS Code',
    'Stack:    React · TypeScript · Node.js · Express · MongoDB',
    'Focus:    Full Stack Web Development',
    'Location: Dhaka, Bangladesh',
  ],
  command: 'npm run dev',
}
