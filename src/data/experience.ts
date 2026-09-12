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
    highlight: 'Key SaaS Platform: Appointlo & Dentally Assist (Clinical Project)',
    summary:
      'Engineers production React architectures for Smart Forum\'s Appointlo AI appointment scheduling SaaS platform and its specialized clinical telephony project, Dentally Assist. Specializes in building predictable Redux-Saga state machines, Ant Design/Styled Components design systems, and secure JWT authentication.',
    keyProject: 'Appointlo SaaS & Dentally Assist (Smart Forum)',
    technologies: ['React 18', 'TypeScript', 'Redux Toolkit', 'Redux-Saga', 'Ant Design', 'Styled Components', 'REST APIs', 'Git'],
    responsibilities: [
      'Architected and maintains the frontend for Dentally Assist, an enterprise AI call management dashboard developed under the Appointlo SaaS platform, giving dental practices real-time visibility into AI phone calls, inline audio playback, dual-mode analytics, and PDF reporting.',
      'Developed Appointlo (live at apointlo.com) as a high-converting 10+ section SaaS marketing site and authenticated client portal using a decoupled typed data architecture (zero hardcoded strings in JSX).',
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
      'Selected for the competitive Pakistan Software Export Board (PSEB) Apprenticeship program at Smart Forum.',
      'Engineered modular React components backed by strict TypeScript contracts, delivering dynamic filtering tables, real-time form validation, and analytics dashboards.',
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
      'Kickstarted professional web development career implementing responsive interfaces with HTML5/CSS3/Bootstrap, JavaScript interactivity, and version control with Git and GitHub.',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Bootstrap', 'React.js', 'Git', 'GitHub'],
    responsibilities: [
      'Built responsive cross-browser web interfaces using HTML5, CSS3, and Bootstrap layout techniques.',
      'Implemented interactive web features using core JavaScript and managed code repositories with Git and GitHub.',
    ],
  },
];
