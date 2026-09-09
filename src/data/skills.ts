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
        project: 'Dentally Assist & Appointlo',
        role: 'Frontend Engineer · Smart Forum',
        application: 'Engineered multi-container production apps, inline audio recording players, and decoupled data-driven landing pages.',
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
        project: 'Dentally Assist & Appointlo',
        role: 'Frontend Engineer · Smart Forum',
        application: 'Modeled asynchronous saga effects, typed slice states, JWT auth payloads, and marketing data schemas.',
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
    name: 'Redux Toolkit & Redux-Saga',
    category: 'Architecture & State',
    importance: 'Primary Specialization',
    summary: 'Predictable state management, slice architecture, and asynchronous saga side-effect coordination.',
    usedIn: [
      {
        project: 'Dentally Assist & Appointlo',
        role: 'Production Platforms · Smart Forum',
        application: 'Handled async side-effects via takeEvery (parallel calls) and takeLatest (analytics debounce) with redux-injectors.',
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
        project: 'Dentally Assist',
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
        project: 'Personal Developer OS',
        role: 'Component System',
        application: 'Built command palette, drawer dialogs, and interactive badges.',
      },
    ],
  },
  {
    name: 'Ant Design',
    category: 'Styling & UI Systems',
    importance: 'Primary Specialization',
    summary: 'Enterprise component framework for rapid dashboard design, data tables, and form validations.',
    usedIn: [
      {
        project: 'Dentally Assist & Appointlo',
        role: 'Enterprise Design System · Smart Forum',
        application: 'Implemented operational call log tables, appointment modals, and admin dashboard panels.',
      },
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
        project: 'Dentally Assist & Appointlo',
        role: 'Scoped Component Styling · Smart Forum',
        application: 'Scoped container styling, themeable Ant Design overrides, and custom inline audio playback components.',
      },
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
