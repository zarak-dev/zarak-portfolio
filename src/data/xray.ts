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
      { id: 'user', label: 'OPERATOR / CLINIC STAFF', tech: 'Browser Client', description: 'Practice staff review calls & appointments', color: 'bg-white' },
      { id: 'app', label: 'REACT 18 SPA', tech: 'React + TypeScript', description: 'Containerized architecture with 11 modular slices', color: 'bg-zinc-400' },
      { id: 'ui', label: 'ANT DESIGN + STYLED', tech: 'AntD 6 + Scoped CSS', description: 'KPI cards, call tables & inline AudioPlayer', color: 'bg-sky-400' },
      { id: 'state', label: 'REDUX TOOLKIT + SAGA', tech: 'Redux-Saga Effects', description: 'takeEvery for calls & takeLatest for analytics', color: 'bg-purple-500' },
      { id: 'auth', label: 'JWT COOKIE SESSION', tech: 'SameSite=Lax + RBAC', description: 'Decodes role at restore; RequireAdmin guard', color: 'bg-amber-400' },
      { id: 'api', label: 'REST API + AUDIO BLOB', tech: 'Bearer Auth Wrapper', description: 'Dispatches calls, recordings & PDF exports (404 empty state)', color: 'bg-emerald-400' },
    ],
    experiments: [
      {
        id: 'dentally-state',
        type: 'state',
        title: 'Redux-Saga Async Telemetry Pipeline',
        description: 'How Redux-Saga coordinates call records and audio playback.',
        steps: [
          { label: 'UI Action', detail: 'Operator opens call log; dispatches loadCalls()' },
          { label: 'Saga Worker', detail: 'takeEvery intercepts action, invokes request() with Bearer JWT' },
          { label: 'API Response', detail: 'API returns call logs with audio recording URLs (404 handled as empty data)' },
          { label: 'Redux Store', detail: 'put(loadCallsSuccess(calls)) updates slice state' },
          { label: 'Inline Audio', detail: 'Ant Design table mounts <AudioPlayer> with zero latency' }
        ]
      },
      {
        id: 'dentally-analytics',
        type: 'api',
        title: 'Dual-Mode Analytics Pipeline',
        description: 'Debounced date-filtered analytics data shaping.',
        steps: [
          { label: 'Filter Change', detail: 'User toggles Calls vs Appointments or changes date range' },
          { label: 'Debounce Saga', detail: 'takeLatest cancels previous pending request to prevent race conditions' },
          { label: 'Data Shaping', detail: 'mapResponse() normalizes data into Recharts gradient area model' },
          { label: 'Chart Render', detail: 'Visualizes success rates and scheduled appointment outcomes' }
        ]
      }
    ]
  },
  {
    projectId: 'appointlo',
    layers: [
      { id: 'user', label: 'PROSPECT / CLIENT', tech: 'apointlo.com', description: 'Visits marketing landing page or logs into portal', color: 'bg-white' },
      { id: 'app', label: 'REACT 18 + TS', tech: 'Create React App', description: 'Componentized SPA with static data separation', color: 'bg-zinc-400' },
      { id: 'data', label: 'TYPED DATA LAYER', tech: 'data.ts Architecture', description: 'Zero hardcoded JSX; centralized benefits & pricing', color: 'bg-indigo-400' },
      { id: 'state', label: 'REDUX TOOLKIT + SAGA', tech: 'Async Slices', description: 'Coordinates portal stats, auth & OTP verification', color: 'bg-purple-500' },
      { id: 'auth', label: 'COOKIE JWT + GOOGLE', tech: 'OAuth 2.0 Flow', description: '7-day session cookie, WelcomeBar personalization', color: 'bg-amber-400' },
      { id: 'export', label: 'PDF EXPORT ENGINE', tech: 'Blob + URL.createObjectURL', description: 'Downloads client appointment reports seamlessly', color: 'bg-emerald-400' },
    ],
    experiments: [
      {
        id: 'appointlo-data',
        type: 'state',
        title: 'Static Data Separation Architecture',
        description: 'Decoupling marketing copy & pricing from component logic.',
        steps: [
          { label: 'Type Schema', detail: 'Defines Benefit, JourneyStage, and PricingTier interfaces' },
          { label: 'data.ts Registry', detail: 'Centralizes 10+ sections of copy, icons, and pricing models' },
          { label: 'Pure UI Render', detail: 'Components map typed data; zero hard-coded strings in JSX' },
          { label: 'Pricing Builder', detail: 'Interactive tier calculator computes dynamic rates instantly' }
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
