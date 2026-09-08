export interface WorkflowStage {
  step: string;
  title: string;
  tagline: string;
  description: string;
  points: string[];
}

export const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    step: '01',
    title: 'Understand',
    tagline: 'Deconstruct before constructing',
    description:
      'Analyze the end-user workflow, operational pain points, and product constraints. Map out data requirements, latency tolerances, and accessibility criteria before touching a line of code.',
    points: [
      'Trace patient/operator journeys and business edge cases',
      'Define clear TypeScript domain models and state boundaries',
      'Identify critical performance bottlenecks in advance',
    ],
  },
  {
    step: '02',
    title: 'Design',
    tagline: 'Establish visual hierarchy & ergonomics',
    description:
      'Formulate a consistent design token system with Tailwind CSS and accessible component primitives. Ensure purposeful whitespace, intuitive contrast, and responsive layout foundations.',
    points: [
      'Build responsive grids and flexible viewports',
      'Select typography with clear semantic hierarchy',
      'Design accessible keyboard navigation paths',
    ],
  },
  {
    step: '03',
    title: 'Build',
    tagline: 'Craft modular, type-safe components',
    description:
      'Implement reusable Next.js and React components with strict TypeScript interfaces. Separate visual presentation from business logic using custom hooks and pure render functions.',
    points: [
      'Leverage Next.js Server & Client Component separation',
      'Compose unstyled primitives with shadcn/ui and Radix',
      'Keep component APIs predictable and self-documenting',
    ],
  },
  {
    step: '04',
    title: 'Integrate',
    tagline: 'Bind state, APIs & asynchronous events',
    description:
      'Connect frontend surfaces to RESTful APIs, telephony streams, and global Redux Toolkit stores. Implement optimistic UI updates, resilient caching, and comprehensive error boundaries.',
    points: [
      'Handle async states: loading, empty, error, retry',
      'Ensure predictable state transitions with Redux Toolkit slices',
      'Validate API payload shapes at boundaries',
    ],
  },
  {
    step: '05',
    title: 'Refine',
    tagline: 'Tune performance & micro-interactions',
    description:
      'Polish micro-interactions with Framer Motion, calibrate spring physics, and eliminate layout thrashing. Verify keyboard operability, screen reader semantics, and mobile touch ergonomics.',
    points: [
      'Respect prefers-reduced-motion across all animations',
      'Verify touch targets and zero horizontal scroll on mobile',
      'Audit rendering performance and DOM node counts',
    ],
  },
  {
    step: '06',
    title: 'Ship',
    tagline: 'Automate deployment & verify in production',
    description:
      'Deploy via clean Git workflows and CI/CD pipelines (Vercel, GitHub Actions). Verify production bundle sizes, asset caching headers, and real-world network responsiveness.',
    points: [
      'Automate linting, type-checking, and build validation',
      'Monitor production Core Web Vitals and load times',
      'Maintain disciplined commit history and documentation',
    ],
  },
];
