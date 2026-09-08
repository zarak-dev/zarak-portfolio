export interface XRayLayer {
  id: string;
  label: string;
  tech: string;
  description: string;
  color: string; // Tailwind color class for the glowing dot, e.g. "bg-accent", "bg-emerald-400"
}

export type ExperimentType = 'state' | 'api' | 'ai';

export interface XRayExperimentData {
  id: string;
  type: ExperimentType;
  title: string;
  description: string;
  steps: {
    label: string;
    detail: string;
  }[];
}

export interface ProjectXRay {
  projectId: string;
  layers: XRayLayer[];
  experiments?: XRayExperimentData[];
}

export const PROJECT_XRAYS: ProjectXRay[] = [
  {
    projectId: 'dentally',
    layers: [
      { id: 'user', label: 'USER', tech: 'Client Browser', description: 'Operator interacts with dashboard', color: 'bg-white' },
      { id: 'app', label: 'NEXT.JS APPLICATION', tech: 'App Router', description: 'Handles routing and streaming SSR', color: 'bg-zinc-400' },
      { id: 'ui', label: 'REACT UI', tech: 'shadcn/ui + Tailwind', description: 'Accessible, responsive clinical dashboard components', color: 'bg-sky-400' },
      { id: 'state', label: 'REDUX TOOLKIT', tech: 'Global State', description: 'Coordinates active calls, transcripts, and schedule', color: 'bg-purple-500' },
      { id: 'api', label: 'REST API', tech: 'Asynchronous Endpoints', description: 'Handles booking requests and telephony events', color: 'bg-emerald-400' },
      { id: 'backend', label: 'BACKEND SERVICES', tech: 'Telephony & DB', description: 'Processes live audio streams and schedules', color: 'bg-orange-500' },
    ],
    experiments: [
      {
        id: 'dentally-state',
        type: 'state',
        title: 'Call Flow State Machine',
        description: 'How Redux manages a live incoming call.',
        steps: [
          { label: 'Initial State', detail: '{ callActive: false, transcript: [] }' },
          { label: 'Websocket Event', detail: '"INCOMING_CALL"' },
          { label: 'State Update', detail: 'callActive = true' },
          { label: 'UI Update', detail: 'Operator screen flashes with takeover prompt' }
        ]
      }
    ]
  },
  {
    projectId: 'fyp-connect',
    layers: [
      { id: 'user', label: 'PATIENT', tech: 'Mobile/Web Client', description: 'Logs glucometer readings', color: 'bg-white' },
      { id: 'app', label: 'NEXT.JS', tech: 'Frontend Framework', description: 'Renders the health dashboard', color: 'bg-zinc-400' },
      { id: 'auth', label: 'TYPESCRIPT', tech: 'Strict Contracts', description: 'Ensures data shape for medical records', color: 'bg-blue-500' },
      { id: 'db', label: 'SUPABASE', tech: 'PostgreSQL & Auth', description: 'Securely stores patient biometrics', color: 'bg-emerald-400' },
      { id: 'ai', label: 'GOOGLE GEMINI API', tech: 'Generative AI', description: 'Analyzes readings to generate cultural diet plans', color: 'bg-indigo-400' },
    ],
    experiments: [
      {
        id: 'fyp-ai',
        type: 'ai',
        title: 'Diet Plan Generation',
        description: 'How Gemini API is used to generate personalized plans.',
        steps: [
          { label: 'User Data', detail: 'Fasting sugar: 145 mg/dL' },
          { label: 'Structured Prompt', detail: 'System instructs to generate low-GI South Asian diet' },
          { label: 'Gemini Analysis', detail: 'Processing constraints and cultural recipes' },
          { label: 'JSON Result', detail: 'Returns structured meal plan (e.g. Ragi Dosa)' }
        ]
      }
    ]
  },
  {
    projectId: 'exynos-cooky',
    layers: [
      { id: 'user', label: 'CUSTOMER', tech: 'Web Client', description: 'Browses cookies and configures boxes', color: 'bg-white' },
      { id: 'ui', label: 'REACT + TYPESCRIPT', tech: 'SPA Frontend', description: 'Client-side navigation and rendering', color: 'bg-blue-400' },
      { id: 'components', label: 'ANT DESIGN', tech: 'Component Library', description: 'Provides tables and structural UI elements', color: 'bg-sky-500' },
      { id: 'state', label: 'REDUX TOOLKIT', tech: 'State Management', description: 'Manages shopping cart and box configurations', color: 'bg-purple-500' },
      { id: 'deploy', label: 'VERCEL', tech: 'Global CDN', description: 'Hosts and serves the production application', color: 'bg-zinc-900' },
    ],
    experiments: [
      {
        id: 'exynos-state',
        type: 'state',
        title: 'Box Configuration State',
        description: 'Managing a custom cookie box.',
        steps: [
          { label: 'Initial State', detail: '{ cart: [], boxCapacity: 6 }' },
          { label: 'User Action', detail: 'Adds "Pink Velvet"' },
          { label: 'State Reducer', detail: 'Checks capacity, adds to cart' },
          { label: 'UI Update', detail: 'Progress bar fills, price recalculates' }
        ]
      }
    ]
  },
  {
    projectId: 'moneyflow',
    layers: [
      { id: 'user', label: 'USER', tech: 'Web Dashboard', description: 'Logs daily financial transactions', color: 'bg-white' },
      { id: 'ui', label: 'JAVASCRIPT UI', tech: 'Vanilla JS / HTML5', description: 'Highly optimized DOM rendering for fast tables', color: 'bg-yellow-400' },
      { id: 'api', label: 'REST API', tech: 'JSON Endpoints', description: 'Transmits transaction payloads', color: 'bg-emerald-400' },
      { id: 'backend', label: 'LARAVEL / PHP', tech: 'Server Logic', description: 'Validates and processes business rules', color: 'bg-red-500' },
      { id: 'db', label: 'MYSQL', tech: 'Relational DB', description: 'Persists ledger records', color: 'bg-orange-400' },
    ],
    experiments: [
      {
        id: 'moneyflow-api',
        type: 'api',
        title: 'Transaction Logging',
        description: 'End-to-end flow of saving an expense.',
        steps: [
          { label: 'Request', detail: 'POST /api/transactions { amount: 50, category: "Food" }' },
          { label: 'Loading State', detail: 'Button spinner active, input disabled' },
          { label: 'Response', detail: '201 Created { id: 894 }' },
          { label: 'UI Update', detail: 'Toast success, chart re-renders dynamically' }
        ]
      }
    ]
  }
];
