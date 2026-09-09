export interface TechnologyEvidence {
  name: string;
  category: 'Core Frontend' | 'Architecture & State' | 'Styling & UI Systems' | 'Integration & Cloud' | 'Engineering Tools';
  importance: 'Primary Specialization' | 'Professional Stack' | 'Academic / Extended';
  summary: string;
  usedIn: {
    project: string;
    role: string;
    application: string;
  }[];
}

export const TECHNOLOGIES: TechnologyEvidence[] = [
  {
    name: 'Next.js',
    category: 'Core Frontend',
    importance: 'Primary Specialization',
    summary: 'App Router, Server/Client components, dynamic metadata, and performance optimization.',
    usedIn: [
      {
        project: 'Dentally',
        role: 'Production Application',
        application: 'Built low-latency AI receptionist dashboard with Next.js App Router streaming and route caching.',
      },
      {
        project: 'FYP Connect',
        role: 'Capstone (Grade A+)',
        application: 'Engineered health portal with authenticated routes, Supabase server queries, and fast page loads.',
      },
      {
        project: 'Personal Developer OS',
        role: 'Portfolio Architecture',
        application: 'Powering this interactive developer experience with optimized client/server split and SEO.',
      },
    ],
  },
  {
    name: 'React.js',
    category: 'Core Frontend',
    importance: 'Primary Specialization',
    summary: 'Component lifecycles, custom hooks, virtual DOM reconciliation, and accessible interface design.',
    usedIn: [
      {
        project: 'Dentally',
        role: 'Professional Engineer',
        application: 'Engineered reactive audio visualizers and real-time transcript streaming interfaces.',
      },
      {
        project: 'Exynos Cooky',
        role: 'Production Dashboard',
        application: 'Created modular order status pipelines and live bakery inventory dashboards.',
      },
      {
        project: 'Smart Forum Corporate UIs',
        role: 'Apprenticeship & Junior Engineer',
        application: 'Built responsive client portals and interactive data tables with clean component contracts.',
      },
    ],
  },
  {
    name: 'TypeScript',
    category: 'Core Frontend',
    importance: 'Primary Specialization',
    summary: 'Strict typing, generic abstractions, discriminated unions, and safe API boundary contracts.',
    usedIn: [
      {
        project: 'Dentally',
        role: 'Professional Lead',
        application: 'Modeled asynchronous telephony events, operator state schemas, and calendar payload contracts.',
      },
      {
        project: 'Exynos Cooky',
        role: 'Production App',
        application: 'Defined strict interfaces for complex shopping cart items, order states, and inventory tiers.',
      },
      {
        project: 'FYP Connect',
        role: 'Full-Stack Developer',
        application: 'Enforced type safety across Gemini AI responses, database tables, and patient records.',
      },
    ],
  },
  {
    name: 'Redux Toolkit',
    category: 'Architecture & State',
    importance: 'Professional Stack',
    summary: 'Predictable state management, slice architecture, and asynchronous action handling.',
    usedIn: [
      {
        project: 'Dentally',
        role: 'Production Telephony Platform',
        application: 'Managed complex multi-call queues, live operator status, and real-time audio playback buffers.',
      },
      {
        project: 'Exynos Cooky',
        role: 'E-commerce Operations',
        application: 'Built cart state machine with persistent storage and dynamic order fulfillment stages.',
      },
    ],
  },
  {
    name: 'Tailwind CSS',
    category: 'Styling & UI Systems',
    importance: 'Primary Specialization',
    summary: 'Utility-first styling, design token systems, responsive breakpoints, and dark mode theming.',
    usedIn: [
      {
        project: 'Dentally',
        role: 'UI System',
        application: 'Crafted high-density clinic interfaces with custom theme variables and accessible contrast ratios.',
      },
      {
        project: 'FYP Connect',
        role: 'Healthcare Portal',
        application: 'Styled medical telemetry graphs, diet plan cards, and mobile-friendly patient forms.',
      },
      {
        project: 'Personal Developer OS',
        role: 'Design Architecture',
        application: 'Configured custom OS palette, glass surfaces, and responsive layouts.',
      },
    ],
  },
  {
    name: 'shadcn/ui',
    category: 'Styling & UI Systems',
    importance: 'Professional Stack',
    summary: 'Accessible, unstyled Radix UI primitives composed into tailored, maintainable component libraries.',
    usedIn: [
      {
        project: 'Dentally',
        role: 'Production Application',
        application: 'Integrated accessible dialogs, tooltips, calendar pickers, and popovers for clinic operators.',
      },
      {
        project: 'Personal Developer OS',
        role: 'Component System',
        application: 'Built command palette, drawer dialogs, and interactive badges.',
      },
    ],
  },
  {
    name: 'Ant Design',
    category: 'Styling & UI Systems',
    importance: 'Professional Stack',
    summary: 'Enterprise component framework for rapid dashboard design, data tables, and form validations.',
    usedIn: [
      {
        project: 'Exynos Cooky',
        role: 'Dashboard Development',
        application: 'Implemented operational data tables, filterable order status bars, and inventory meters.',
      },
    ],
  },
  {
    name: 'Styled Components',
    category: 'Styling & UI Systems',
    importance: 'Professional Stack',
    summary: 'Scoped CSS-in-JS component architecture and dynamic style prop binding.',
    usedIn: [
      {
        project: 'Exynos Cooky',
        role: 'UI Customization',
        application: 'Customized Ant Design components with bespoke bakery brand themes and responsive styling.',
      },
    ],
  },
  {
    name: 'REST APIs',
    category: 'Integration & Cloud',
    importance: 'Primary Specialization',
    summary: 'Asynchronous HTTP communications, payload validation, caching, and error resilience.',
    usedIn: [
      {
        project: 'Dentally',
        role: 'Telephony & Booking APIs',
        application: 'Connected frontend with live voice services, automated booking endpoints, and patient databases.',
      },
      {
        project: 'MoneyFlow',
        role: 'Transactional Services',
        application: 'Integrated REST endpoints for high-throughput daily expense logging and metric aggregation.',
      },
      {
        project: 'Trustech Solutions & Smart Forum',
        role: 'Industry Experience',
        application: 'Integrated backend APIs across numerous corporate client applications.',
      },
    ],
  },
  {
    name: 'Google Gemini API',
    category: 'Integration & Cloud',
    importance: 'Professional Stack',
    summary: 'Multimodal generative AI prompting, structured JSON schema outputs, and domain reasoning.',
    usedIn: [
      {
        project: 'FYP Connect',
        role: 'AI Health Intelligence',
        application: 'Engineered prompts to generate clinically sensible South Asian meal plans based on blood sugar data.',
      },
    ],
  },
  {
    name: 'Supabase',
    category: 'Integration & Cloud',
    importance: 'Professional Stack',
    summary: 'PostgreSQL database, Row-Level Security, authentication, and real-time subscription channels.',
    usedIn: [
      {
        project: 'FYP Connect',
        role: 'Backend & Data Store',
        application: 'Secured patient biometric logs, user auth, and real-time reading synchronization.',
      },
    ],
  },
  {
    name: 'Git & GitHub',
    category: 'Engineering Tools',
    importance: 'Primary Specialization',
    summary: 'Branching strategies, semantic commits, code reviews, and automated CI/CD deployment pipelines.',
    usedIn: [
      {
        project: 'All Professional Work',
        role: 'Continuous Engineering',
        application: 'Collaborated in production repos at Smart Forum, managed open-source repos at github.com/zarak-dev.',
      },
    ],
  },
  {
    name: 'Node.js & Extended Stack',
    category: 'Integration & Cloud',
    importance: 'Academic / Extended',
    summary: 'Node runtime, HTML5/CSS3 foundations, MySQL, MongoDB, and Laravel/PHP from CV coursework and projects.',
    usedIn: [
      {
        project: 'MoneyFlow & Capstone',
        role: 'Full-Stack Exposure',
        application: 'Supported backend relational database schemas, migrations, and server-side script integrations.',
      },
    ],
  },
];
