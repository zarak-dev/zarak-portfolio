export interface PersonalIdentity {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  location: string;
  status: {
    availability: string;
    focus: string;
    currentBuilding: string;
    coreStack: string[];
  };
  contacts: {
    email: string;
    workEmail: string;
    github: string;
    githubUsername: string;
    linkedin: string;
  };
  stats: {
    label: string;
    value: string;
    detail: string;
  }[];
}

export const IDENTITY: PersonalIdentity = {
  name: 'Zarak Qaisar',
  role: 'Software Engineer',
  tagline: 'Building interfaces that feel as good as they function.',
  bio: 'Software engineer focused on modern frontend architecture, state-heavy React applications, and AI-assisted interfaces. Currently engineering production React and TypeScript systems at Smart Forum—including Dentally Assist and Appointlo (live at apointlo.com)—with an emphasis on performance, predictable state architectures, and visual excellence.',
  location: 'Pakistan',
  status: {
    availability: 'Available for AI Associated Frontend as well as Fullstack',
    focus: 'Frontend Architecture · UI Engineering · Interactive Systems',
    currentBuilding: 'Dentally Assist & Appointlo (Smart Forum)',
    coreStack: ['React 18', 'TypeScript', 'Redux-Saga', 'Redux Toolkit', 'Ant Design', 'Styled Components', 'Next.js'],
  },
  contacts: {
    email: 'zarak.dev@gmail.com',
    workEmail: 'zarak@smartforum.org',
    github: 'https://github.com/zarak-dev',
    githubUsername: 'zarak-dev',
    linkedin: 'https://www.linkedin.com/in/zarak-k-757937385',
  },
  stats: [
    {
      label: 'Core Focus',
      value: 'Frontend Architecture',
      detail: 'React 18, TypeScript, Redux-Saga & RTK',
    },
    {
      label: 'Current Production Role',
      value: 'Junior Software Engineer',
      detail: 'Smart Forum (Enterprise AI & SaaS)',
    },
    {
      label: 'Company Products',
      value: 'Dentally Assist & Appointlo',
      detail: 'AI Call Operations & SaaS Onboarding',
    },
    {
      label: 'Live Platform',
      value: 'apointlo.com',
      detail: 'Production AI Appointment Scheduling',
    },
  ],
};
