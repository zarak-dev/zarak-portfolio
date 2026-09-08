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
    highlight: 'Key Engineering Project: Dentally (AI Receptionist Platform)',
    summary:
      'Engineers modern frontend architectures for AI-powered telephony and clinic management applications. Specializes in building low-latency, state-heavy React and Next.js interfaces with seamless REST API integrations.',
    keyProject: 'Dentally — AI-Powered Receptionist Platform',
    technologies: ['Next.js', 'TypeScript', 'Redux Toolkit', 'Tailwind CSS', 'shadcn/ui', 'REST APIs', 'Git'],
    responsibilities: [
      'Architects and maintains the core frontend for Dentally, an AI receptionist system handling live call streams, real-time audio transcripts, and automated patient appointment booking.',
      'Implements centralized global state management using Redux Toolkit to reliably coordinate multi-stage call flows, audio playback buffers, and clinic schedules.',
      'Designs modular, accessible component hierarchies using shadcn/ui and Tailwind CSS to guarantee fast, responsive clinic workflows under heavy multitasking.',
      'Integrates RESTful backend services and websocket endpoints for asynchronous telephony events with comprehensive error boundaries and optimistic UI updates.',
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
