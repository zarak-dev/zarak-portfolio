/**
 * Single source of truth for Zarak Qaisar's profile data,
 * matching the structured schema of the clean portfolio UI.
 */

export const SITE_URL = 'https://zarak.dev';

export const PROFILE = {
  name: 'Zarak Qaisar',
  alias: 'Zarak',
  role: 'Software Engineer',
  company: 'Smart Forum',
  headline: 'Software Engineer @ Smart Forum · Modern Frontend Architecture & UI Systems',
  subheadline:
    'React 18 · TypeScript · Redux Toolkit · Redux-Saga · Ant Design · Styled Components · Next.js',
  location: 'Islamabad, Pakistan',
  locationShort: 'Islamabad, Pakistan',
  email: 'zarak.dev@gmail.com',
  workEmail: 'zarak@smartforum.org',
  phone: '+92 340 4646122',
  phoneHref: 'tel:+923404646122',
  linkedin: 'https://www.linkedin.com/in/zarak-k-757937385',
  github: 'https://github.com/zarak-dev',
  portrait: '/images/zarak-portrait.jpg',
  metaTitle: 'Zarak Qaisar — Software Engineer | React 18, TypeScript, Redux-Saga',
  metaDescription:
    'Zarak Qaisar is a Software Engineer at Smart Forum in Islamabad, Pakistan. Specializing in modern frontend architecture, state-heavy React applications, Redux-Saga, and AI-assisted interfaces.',
  about: [
    'Working as a Software Engineer at Smart Forum, I specialize in building state-heavy, high-performance web applications using React 18, TypeScript, Redux-Saga, and Redux Toolkit. I focus on creating predictable, accessible, and responsive user interfaces that deliver seamless operator experiences under heavy multitasking.',
    'At Smart Forum, I engineered the production frontend for enterprise AI products including Dentally Assist (an AI-powered call management dashboard for dental practices) and Appointlo (a production appointment scheduling SaaS platform live at apointlo.com). I own state side-effect coordination, scoped design systems, and role-based access control.',
    'I graduated with a BS in Software Engineering from Sarhad University, where my capstone Smart Sugar Management platform was awarded Grade A+. I am passionate about crafting resilient frontend architectures, eliminating state synchronization leaks, and building interactive software that feels as good as it functions.',
  ],
} as const;

export const STATS = [
  { value: 2, suffix: '+', label: 'Years production engineering' },
  { value: 7, suffix: '', label: 'Shipped production platforms' },
  { value: 15, suffix: '+', label: 'Core frontend technologies' },
  { value: 1, suffix: ' A+', label: 'Capstone evaluation grade' },
] as const;

export const TOP_SKILLS = [
  'React 19',
  'React 18',
  'TypeScript',
  'Redux Toolkit',
  'Redux-Saga',
  'Supabase',
  'Next.js',
  'Ant Design 6',
  'Styled Components',
  'Tailwind CSS',
] as const;

export const MARQUEE = [
  'React 19',
  'React 18',
  'TypeScript',
  'Redux-Saga',
  'Redux Toolkit',
  'Supabase',
  'Next.js',
  'Ant Design 6',
  'Styled Components',
  'REST APIs',
  'Google Gemini API',
  'Tailwind CSS',
  'shadcn/ui',
  'Framer Motion',
  'Git',
  'Docker',
];

export interface Role {
  title: string;
  period: string;
  duration: string;
  location: string;
  points: string[];
  skills: string[];
}

export interface Job {
  company: string;
  employment: string;
  span: string;
  roles: Role[];
}

export const EXPERIENCE: Job[] = [
  {
    company: 'Smart Forum',
    employment: 'Full-time',
    span: 'June 2026 — Present',
    roles: [
      {
        title: 'Junior Software Engineer',
        period: 'June 2026 — Present',
        duration: 'Current',
        location: 'Pakistan · On-site',
        points: [
          'Architected and maintains the production frontend for Dentally Assist, an AI call management dashboard for dental practices with inline audio playback, dual-mode analytics, and PDF blob exports.',
          'Engineered Appointlo (live at apointlo.com) as a conversion-focused 10+ section SaaS marketing site and authenticated onboarding portal with a decoupled typed data architecture.',
          'Built predictable asynchronous state architectures using Redux Toolkit and Redux-Saga (takeEvery/takeLatest) with redux-injectors for lazy-loaded reducer/saga slices.',
          'Implemented cookie-based JWT session restoration (SameSite=Lax) with direct client-side role decoding for <RequireAuth> and <RequireAdmin> route guards.',
        ],
        skills: ['React 18', 'TypeScript', 'Redux-Saga', 'Redux Toolkit', 'Ant Design 6', 'Styled Components', 'REST APIs'],
      },
      {
        title: 'Frontend Web Developer (PSEB Apprenticeship @ Smart Forum)',
        period: 'Nov 2025 — June 2026',
        duration: '8 mos',
        location: 'Pakistan · On-site',
        points: [
          'Selected for the competitive Pakistan Software Export Board (PSEB) Apprenticeship program at Smart Forum.',
          'Translated complex product requirements into clean, reusable React components backed by strict TypeScript contracts.',
          'Engineered state-driven interactive features including dynamic filtering tables, real-time form validation systems, and data analytics dashboards.',
        ],
        skills: ['React.js', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'Git'],
      },
    ],
  },
  {
    company: 'Trustech Solutions',
    employment: 'Junior Developer',
    span: 'Nov 2024 — Apr 2025',
    roles: [
      {
        title: 'Jr. Web Developer',
        period: 'Nov 2024 — Apr 2025',
        duration: '6 mos',
        location: 'Pakistan · On-site',
        points: [
          'Built responsive cross-browser web interfaces adhering to semantic HTML5 standards and responsive layout techniques.',
          'Integrated frontend views with RESTful backend endpoints to fetch, process, and display live database records.',
          'Collaborated in feature branching, pull request hygiene, and cross-browser testing.',
        ],
        skills: ['JavaScript', 'HTML5', 'CSS3', 'React.js', 'REST APIs', 'Git'],
      },
    ],
  },
];

export interface Project {
  title: string;
  category: string;
  year: string;
  description: string;
  tech: string[];
  codeUrl?: string;
  demoUrl?: string;
  image?: string;
  xrayId?: string;
}

export const PROJECTS: Project[] = [
  {
    title: 'Dentally Assist',
    category: 'AI Call Operations · Smart Forum',
    year: '2026',
    description:
      'Multi-role internal dashboard giving dental practices complete visibility into their AI phone assistant. Clinic staff review call logs with inline audio playback, track appointment outcomes, inspect dual-mode analytics, and export PDF reports.',
    tech: ['React 18', 'TypeScript', 'Redux-Saga', 'Redux Toolkit', 'Ant Design 6', 'Styled Components'],
    codeUrl: 'https://github.com/zarak-dev',
    image: '/images/dentally-real.png',
    xrayId: 'dentally',
  },
  {
    title: 'Appointlo',
    category: 'SaaS Platform · Smart Forum',
    year: '2026',
    description:
      'Production AI appointment-scheduling SaaS platform live at apointlo.com. Includes a 10+ section conversion landing page with decoupled data architecture, dynamic pricing builder, and client onboarding portal with PDF report export.',
    tech: ['React 18', 'TypeScript', 'Redux-Saga', 'Redux Toolkit', 'Ant Design 6', 'Styled Components'],
    demoUrl: 'https://apointlo.com/',
    codeUrl: 'https://github.com/zarak-dev',
    image: '/images/apointlo-real.png',
    xrayId: 'appointlo',
  },
  {
    title: 'Exynos Cooky',
    category: 'E-Commerce Storefront',
    year: '2025',
    description:
      'Artisanal bakery e-commerce web application and order management dashboard. Custom cookie box builder, atomic Redux store, and tailored Ant Design component hierarchy deployed live on Vercel.',
    tech: ['React', 'TypeScript', 'Redux Toolkit', 'Ant Design', 'Styled Components', 'Vercel'],
    demoUrl: 'https://exynos-cooky.vercel.app/',
    codeUrl: 'https://github.com/zarak-dev/Exynos-Cooky',
    image: '/images/exynos-cooky-real.png',
    xrayId: 'exynos-cooky',
  },
  {
    title: 'MoneyFlow',
    category: 'Fintech & Transaction Engine',
    year: '2025',
    description:
      'Personal finance tracker and analytics engine sustaining 300+ daily transactions. Optimized DOM updates and API payload parsing achieve a 30% reduction in client page load times.',
    tech: ['JavaScript', 'HTML5', 'CSS3', 'REST APIs', 'MySQL'],
    demoUrl: 'https://ghanii.live/login',
    codeUrl: 'https://github.com/zarak-dev',
    image: '/images/moneyflow.jpg',
    xrayId: 'moneyflow',
  },
  {
    title: 'FYP Connect',
    category: 'Healthcare & Gemini AI',
    year: '2025',
    description:
      'Smart Sugar Management platform with Gemini AI Diet Intelligence. Awarded Grade A+ by faculty for analyzing patient blood sugar logs and generating culturally tailored South Asian meal plans.',
    tech: ['Next.js', 'TypeScript', 'Google Gemini API', 'Supabase', 'Tailwind CSS'],
    codeUrl: 'https://github.com/zarak-dev',
    image: '/images/fyp-connect.jpg',
    xrayId: 'fyp-connect',
  },
];

export interface SkillGroup {
  title: string;
  blurb: string;
  items: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Core Frontend',
    blurb: 'Modern component architectures, typed interfaces, and reactive UI runtimes.',
    items: ['React 19', 'React 18', 'React.js', 'TypeScript', 'JavaScript (ESNext)', 'Next.js (App Router)', 'HTML5', 'CSS3'],
  },
  {
    title: 'State Architecture & Side-Effects',
    blurb: 'Predictable async state machines, atomic stores, and saga pipelines.',
    items: ['Redux Toolkit', 'Redux-Saga', 'redux-injectors', 'takeEvery / takeLatest', 'Custom Hooks', 'Context API'],
  },
  {
    title: 'UI Kits & Scoped Styling',
    blurb: 'Design token systems, accessible primitives, and themeable component libraries.',
    items: ['Ant Design 6', 'Styled Components', 'Tailwind CSS', 'shadcn/ui', 'Framer Motion', 'Responsive Design', 'Dark Mode Theming'],
  },
  {
    title: 'APIs, Telephony & Cloud',
    blurb: 'Asynchronous communications, authentication, and generative AI integrations.',
    items: ['RESTful APIs', 'Google OAuth 2.0', 'Cookie JWT Auth (SameSite=Lax)', 'Google Gemini API', 'Blob PDF Export', 'Supabase', 'Vercel'],
  },
  {
    title: 'Engineering Tooling',
    blurb: 'Version control, build performance, and development environments.',
    items: ['Git & GitHub', 'npm / yarn', 'Vite', 'Create React App', 'Postman', 'VS Code', 'Chrome DevTools'],
  },
];

export interface School {
  institution: string;
  degree: string;
  field: string;
  period: string;
  summary: string;
  skills: string[];
}

export const EDUCATION: School[] = [
  {
    institution: 'Sarhad University',
    degree: "Bachelor's Degree",
    field: 'Software Engineering',
    period: '2021 — 2025',
    summary:
      'Rigorous software engineering curriculum covering algorithms, data structures, database design, software architecture, and web engineering. Capstone project (FYP Connect) awarded Grade A+ for excellence in frontend design and Gemini AI integration.',
    skills: ['Software Engineering', 'Algorithms', 'Data Structures', 'Database Systems', 'Frontend Architecture', 'AI Integration'],
  },
];

export const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'recommendations', label: 'Recommendations' },
  { id: 'contact', label: 'Contact' },
];
