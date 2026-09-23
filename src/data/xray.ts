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
    projectId: 'gluvia',
    layers: [
      { id: 'user', label: 'PATIENT / USER CLIENT', tech: 'Next.js 14 App Router', description: 'Accessible medical UI at gluvia.world, 1-click glycemic tagging & Ctrl+K command bar', color: 'bg-white' },
      { id: 'analytics', label: 'CLINICAL ANALYTICS', tech: 'Recharts + Zod Schemas', description: '7/30/90-day glycemic trajectories, standard deviation & strict biometric validation', color: 'bg-teal-400' },
      { id: 'auth', label: 'SCANNER-PROOF AUTH', tech: 'Supabase Auth + Middleware', description: 'Defends magic recovery tokens against Defender/Safelinks pre-fetch scanners', color: 'bg-blue-500' },
      { id: 'db', label: 'SUPABASE POSTGRESQL', tech: 'PostgreSQL + RLS', description: 'Row-Level Security, audit triggers & transactional state locking for background jobs', color: 'bg-emerald-400' },
      { id: 'edge', label: 'DENO EDGE FUNCTIONS', tech: 'Supabase Serverless Edge', description: 'Idempotent 7-day cron workers coordinating health digests & telemetry', color: 'bg-amber-400' },
      { id: 'ai', label: 'GOOGLE GEMINI AI', tech: 'Contextual Health Assistant', description: 'Analyzes readings to generate cultural recipe tweaks & low-GI South Asian diets', color: 'bg-indigo-400' },
      { id: 'email', label: 'RESEND API', tech: 'Retina MIME Delivery', description: 'Multipart/Related email engine with inline Base64 CID attachments (cid:gluvia-logo)', color: 'bg-rose-400' },
    ],
    experiments: [
      {
        id: 'gluvia-scanner-guard',
        type: 'api',
        title: 'Scanner-Proof Password Recovery Pipeline',
        description: 'Defends single-use auth recovery tokens against enterprise email virus scanners.',
        steps: [
          { label: 'Reset Request', detail: 'Patient requests recovery link; Supabase issues cryptographically signed OTP token' },
          { label: 'Enterprise Scanner Defense', detail: 'Microsoft Defender / Safelinks bot pre-fetches URL; custom auth middleware detects bot headers' },
          { label: 'Token Preservation', detail: 'Middleware defers single-use token consumption until verified browser interaction' },
          { label: 'Client Routing', detail: 'Human user accesses link; client routes to /update-password with PKCE code verification' },
          { label: 'Secure Session', detail: 'Password updated under authenticated session guard without token consumption failure' }
        ]
      },
      {
        id: 'gluvia-idempotent-digest',
        type: 'state',
        title: 'Idempotent Weekly Digest & Retina Email Engine',
        description: 'Edge-scheduled health reports with PostgreSQL transactional locks & CID branding.',
        steps: [
          { label: 'Cron Scheduler', detail: 'Supabase Deno Edge Function triggers every 7 days across user cohort' },
          { label: 'Transactional Lock', detail: 'PostgreSQL row-level advisory lock prevents duplicate sends during edge retries' },
          { label: 'Gemini Biometrics Synthesis', detail: 'Gemini summarizes weekly mean, standard deviation, and time-in-range metrics' },
          { label: 'Inline CID MIME', detail: 'Encodes brand logo into Base64 MIME attachments (cid:gluvia-logo) to eliminate image 404s' },
          { label: 'Resend Dispatch', detail: 'Doctor-ready digest dispatched; delivery timestamp committed atomically to PostgreSQL' }
        ]
      },
      {
        id: 'gluvia-ai-diet',
        type: 'ai',
        title: 'AI Glycemic Companion (Google Gemini)',
        description: 'Culturally attuned metabolic intelligence for South Asian culinary staples.',
        steps: [
          { label: 'Biometric Input', detail: 'Post-prandial reading of 165 mg/dL logged after traditional dinner' },
          { label: 'Culinary Context', detail: 'Gemini maps meal components: white basmati rice, oily chicken karahi, sweet chai' },
          { label: 'Glycemic Optimization', detail: 'Recommends barley/ragi roti, increased fiber daal pairing, and unsweetened cinnamon chai' },
          { label: 'Clinical Output', detail: 'Returns actionable structured dietary tweaks rendered directly in Gluvia dashboard' }
        ]
      }
    ]
  },
  {
    projectId: 'exynos-cooky',
    layers: [
      { id: 'user', label: 'CUSTOMER & KITCHEN STAFF', tech: 'Storefront & Kitchen ERP', description: 'Custom box customizer (/buy) & live kitchen Kanban queue (/admin)', color: 'bg-white' },
      { id: 'app', label: 'REACT 19 + VITE SPA', tech: 'React 19 + React Router v7', description: 'Strict TypeScript SPA with client & admin role route guards', color: 'bg-zinc-400' },
      { id: 'ui', label: 'ANT DESIGN 6 + STYLED', tech: 'AntD 6 + Styled Components', description: 'Tokenized luxury theme, AntV charts & fixed responsive data grids', color: 'bg-sky-400' },
      { id: 'state', label: 'REDUX-SAGA + RTK', tech: 'Generator Side-Effects', description: 'takeLatest/call/put sagas preventing race conditions & OAuth spinner hangs', color: 'bg-purple-500' },
      { id: 'auth', label: 'SUPABASE AUTH + RLS', tech: 'OAuth 2.0 + Role Claims', description: 'Row-Level Security distinguishing regular customers from kitchen staff', color: 'bg-amber-400' },
      { id: 'backend', label: 'POSTGRESQL 15 RPC', tech: 'create_order_with_items', description: 'Zero-trust server-side pricing, atomic coupon validation & inventory sync', color: 'bg-emerald-400' },
    ],
    experiments: [
      {
        id: 'exynos-checkout',
        type: 'api',
        title: 'Zero-Trust Atomic Checkout RPC',
        description: 'How server-side stored procedures calculate prices and prevent tampering.',
        steps: [
          { label: 'Cart Payload', detail: 'Client passes product IDs and quantities only (no prices/discounts)' },
          { label: 'Saga Worker', detail: 'takeLatest saga intercepts checkout and dispatches RPC call' },
          { label: 'PostgreSQL RPC', detail: 'create_order_with_items verifies prices, applies coupons, inserts order atomically' },
          { label: 'Realtime Broadcast', detail: 'Order enters kitchen queue instantly via Supabase Realtime channel' },
          { label: 'Live Tracking', detail: 'Customer timeline updates: Pending ➔ Confirmed ➔ Baking ➔ Dispatched' }
        ]
      },
      {
        id: 'exynos-state',
        type: 'state',
        title: 'Box Customizer & Slot Validator',
        description: 'Dynamic slot allocation and real-time stock guards.',
        steps: [
          { label: 'Package Size', detail: 'Customer selects 4, 6, or 12-pack box configuration' },
          { label: 'Flavor Selection', detail: 'Customer allocates slots from 100+ cookie varieties' },
          { label: 'Live Stock Guard', detail: 'Validator checks threshold (<5 alert) and prevents over-allocation' },
          { label: 'Redux Store', detail: 'Cart slice updates dynamically with atomic slot validation' }
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
