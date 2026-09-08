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
  name: 'Zarak K.',
  role: 'Software Engineer',
  tagline: 'Building interfaces that feel as good as they function.',
  bio: 'Software engineer focused on modern frontend architecture, state-heavy React applications, and AI-assisted interfaces. Currently engineering production Next.js and TypeScript systems at Smart Forum with an emphasis on performance, accessibility, and visual excellence.',
  location: 'Pakistan',
  status: {
    availability: 'Available for AI Associated Frontend as well as Fullstack',
    focus: 'Frontend Architecture · UI Engineering · Interactive Systems',
    currentBuilding: 'Dentally (AI-Powered Receptionist Platform)',
    coreStack: ['Next.js', 'React.js', 'TypeScript', 'Redux Toolkit', 'Tailwind CSS', 'shadcn/ui'],
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
      detail: 'Next.js App Router, React 19, TypeScript',
    },
    {
      label: 'Current Production Role',
      value: 'Junior Software Engineer',
      detail: 'Smart Forum (Building Dentally)',
    },
    {
      label: 'Academic Foundation',
      value: 'BS Software Engineering',
      detail: 'Sarhad University (2021 – 2025)',
    },
    {
      label: 'Selected Capstone',
      value: 'Grade A+ (Team of 3)',
      detail: 'FYP Connect Smart Sugar Management',
    },
  ],
};
