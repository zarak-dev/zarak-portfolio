export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  year: string;
  type: string;
  location: string;
  current: boolean;
  highlight?: string;
  summary: string;
  keyProject?: string;
  technologies: string[];
  responsibilities: string[];
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'smart-forum-jse',
    role: 'Junior Software Engineer',
    company: 'Smart Forum',
    period: 'June 2026 – Present',
    year: '2026',
    type: 'Full-time · On-site',
    location: 'Pakistan',
    current: true,
    highlight: 'Key Company Products: Dentally Assist & Appointlo (Live SaaS)',
    summary:
      'Engineers production React architectures for Smart Forum\'s AI-driven telephony and scheduling platforms: Dentally Assist (enterprise dental clinic call management) and Appointlo (live SaaS client onboarding portal at apointlo.com). Specializes in building predictable Redux-Saga state machines, Ant Design/Styled Components design systems, and secure JWT authentication.',
    keyProject: 'Dentally Assist & Appointlo (Smart Forum Products)',
    technologies: ['React 18', 'TypeScript', 'Redux Toolkit', 'Redux-Saga', 'Ant Design', 'Styled Components', 'REST APIs', 'Git'],
    responsibilities: [
      'Architected and maintains the frontend for Dentally Assist, an internal dashboard giving dental practices real-time visibility into AI phone calls, inline audio playback, dual-mode analytics, and PDF reporting.',
      'Developed Appointlo (live at apointlo.com) as a high-converting 10+ section SaaS marketing site and authenticated client portal using a decoupled typed data architecture (zero hardcoded strings in JSX).',
      'Engineered predictable async state architectures using Redux Toolkit and Redux-Saga (takeEvery/takeLatest) with redux-injectors for lazy-loaded reducer/saga slices.',
      'Implemented secure cookie-based JWT sessions (SameSite=Lax) with instant client-side role decoding for <RequireAuth> and <RequireAdmin> route guards.',
    ],
  },
  {
    id: 'smart-forum-pseb',
    role: 'Frontend Web Developer',
    company: 'Smart Forum (PSEB Apprenticeship)',
    period: 'November 2025 – June 2026',
    year: '2025',
    type: 'Apprenticeship · On-site',
    location: 'Pakistan',
    current: false,
    highlight: 'Selected for Pakistan Software Export Board (PSEB) Program',
    summary:
      'Developed high-performance client web applications, internal dashboards, and interactive user interfaces under the competitive PSEB Apprenticeship scheme.',
    technologies: ['React.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'REST APIs', 'Git'],
    responsibilities: [
      'Translated design wireframes and technical product requirements into clean, reusable React components backed by strict TypeScript typings.',
      'Engineered state-driven interactive features including dynamic filtering tables, real-time form validation systems, and data analytics dashboards.',
      'Collaborated within an Agile engineering team participating in sprint planning, code reviews, and cross-browser testing suites.',
      'Streamlined frontend asset pipelines and optimized bundle sizes to ensure rapid page load speeds across desktop and mobile browsers.',
    ],
  },
  {
    id: 'trustech-solutions',
    role: 'Jr. Web Developer',
    company: 'Trustech Solutions',
    period: 'November 2024 – April 2025',
    year: '2024',
    type: 'Junior · On-site',
    location: 'Pakistan',
    current: false,
    summary:
      'Kickstarted professional web development career implementing responsive interfaces, dynamic client-side interactions, and REST API integrations.',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'React.js', 'REST APIs', 'Git'],
    responsibilities: [
      'Built responsive, cross-browser web interfaces adhering to semantic HTML5 standards and modern CSS responsive layout techniques.',
      'Implemented dynamic client-side logic and interactive DOM components using modern JavaScript and React.',
      'Connected frontend views with RESTful backend endpoints to fetch, process, and display live database records.',
      'Used Git for version control, collaborative feature branching, and pull request hygiene.',
    ],
  },
];
