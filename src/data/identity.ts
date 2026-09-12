import { PROFILE } from './profile';

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
  name: PROFILE.name,
  role: PROFILE.role,
  tagline: 'Building interfaces that feel as good as they function.',
  bio: 'Software engineer focused on modern frontend architecture, state-heavy React applications, and AI-assisted interfaces. Currently engineering production React and TypeScript systems at Smart Forum—including Appointlo (live at apointlo.com) and its specialized clinical AI project Dentally Assist—with an emphasis on performance, predictable state architectures, and visual excellence.',
  location: PROFILE.location,
  status: {
    availability: 'Available for AI Associated Frontend as well as Fullstack',
    focus: 'Frontend Architecture · UI Engineering · Interactive Systems',
    currentBuilding: 'Appointlo SaaS & Dentally Assist (Smart Forum)',
    coreStack: ['React 18', 'TypeScript', 'Redux-Saga', 'Redux Toolkit', 'Ant Design', 'Styled Components', 'Next.js'],
  },
  contacts: {
    email: PROFILE.email,
    workEmail: PROFILE.workEmail,
    github: PROFILE.github,
    githubUsername: 'zarak-dev',
    linkedin: PROFILE.linkedin,
  },
  stats: [
    {
      label: 'Core Focus',
      value: 'Frontend Architecture',
      detail: 'React 18, TypeScript, Redux-Saga & RTK',
    },
    {
      label: 'Current Production Role',
      value: PROFILE.role,
      detail: `${PROFILE.company} (Enterprise AI & SaaS)`,
    },
    {
      label: 'Company Products',
      value: 'Appointlo SaaS & Dentally Assist',
      detail: 'AI Scheduling SaaS & Dental Call Dashboard',
    },
    {
      label: 'Live Platform',
      value: 'apointlo.com',
      detail: 'Production AI Appointment Scheduling',
    },
  ],
};
