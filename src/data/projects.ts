export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  role: string;
  team?: string;
  grade?: string;
  period: string;
  featured: boolean;
  isHero?: boolean;
  image: string;
  technologies: string[];
  metrics?: { label: string; value: string }[];
  problem: string;
  approach: string;
  frontendArchitecture: string;
  interfaceDetails: string;
  impact: string;
  githubUrl?: string;
  liveUrl?: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'dentally',
    title: 'Dentally Assist',
    subtitle: 'AI Call Management Dashboard for Dental Clinics',
    category: 'AI Telephony & Clinical Operations',
    role: 'Frontend Software Engineer · Smart Forum',
    period: 'June 2026 – Present',
    featured: true,
    isHero: true,
    image: '/images/dentally-real.png',
    technologies: ['React 18', 'TypeScript', 'Redux-Saga', 'Redux Toolkit', 'Ant Design 6', 'Styled Components'],
    metrics: [
      { label: 'Company', value: 'Smart Forum' },
      { label: 'State Layer', value: 'Redux-Saga + RTK' },
      { label: 'Access Control', value: 'JWT Cookie + RBAC' },
      { label: 'Architecture', value: '11 Modular Slices' },
    ],
    problem:
      'Dental practices regularly miss urgent patient inquiries and high-value appointment bookings during peak clinic check-in periods and outside office operating hours when human staff are unavailable.',
    approach:
      'Engineered an enterprise-grade operator dashboard at Smart Forum providing dental practice managers complete visibility into their AI phone assistant. Clinic staff can review AI-handled call logs with inline audio playback, track appointment outcomes, inspect dual-mode analytics, export PDF reports, and manage clinic settings, with dedicated role-gated admin controls.',
    frontendArchitecture:
      'Built on React 18 and strict TypeScript. State side-effects are coordinated via Redux-Saga (takeEvery for parallel call list/detail queries; takeLatest for analytics debouncing), with reducers lazily injected using redux-injectors. Cookie-based JWT auth (SameSite=Lax) decodes user roles directly on session restore to power <RequireAuth> and <RequireAdmin> route guards without extra network hops. API 404s are treated gracefully as empty states.',
    interfaceDetails:
      'Features 11 modular containers: KPI summary cards (total calls, success rate, follow-up flags), paginated call logs with custom inline <AudioPlayer> recording playback, dual-mode area chart analytics (calls vs appointment funnels with UK locale formatting), one-click PDF blob export (/dashboard/export/pdf), and user profile management with cookie synchronization.',
    impact:
      'Successfully deployed across client dental practices at Smart Forum, transforming unattended patient calls into structured, actionable appointment records and eliminating dropped patient inquiries.',
  },
  {
    id: 'appointlo',
    title: 'Appointlo',
    subtitle: 'SaaS Landing + Client Onboarding Portal for AI Appointment Scheduling',
    category: 'SaaS Platform & Client Portal',
    role: 'Frontend Software Engineer · Smart Forum',
    period: 'Production Deployment',
    featured: true,
    image: '/images/apointlo-real.png',
    liveUrl: 'https://apointlo.com/',
    technologies: ['React 18', 'TypeScript', 'Redux-Saga', 'Redux Toolkit', 'Ant Design 6', 'Styled Components'],
    metrics: [
      { label: 'Live Platform', value: 'apointlo.com' },
      { label: 'Company', value: 'Smart Forum' },
      { label: 'Architecture', value: 'Redux-Saga + CRA' },
      { label: 'Landing UI', value: '10+ Data-Driven Sections' },
    ],
    problem:
      'Service businesses lose substantial booking revenue and customer retention due to manual scheduling friction, unattended phone calls, and the absence of automated re-engagement workflows.',
    approach:
      'Developed at Smart Forum as the public-facing product for an AI appointment-scheduling SaaS. Built the complete client experience spanning a conversion-focused marketing landing page, interactive pricing builder, and an authenticated onboarding portal for active business clients.',
    frontendArchitecture:
      'Engineered using React 18, TypeScript, Redux-Saga, and Styled Components on the same reliable core architecture as Dentally Assist. Implemented strict static data separation in a typed data.ts file (zero hardcoded strings in JSX), enabling marketing copy, journey stages, and pricing tiers to be updated instantly without touching UI logic.',
    interfaceDetails:
      'Includes a 10+ section landing page (Hero proposition, Value Grid, 7-stage Journey Flow automation map, dynamic Pricing Builder, and Talk to Sales CTA), paired with an authenticated client portal featuring a WelcomeBar, StatsRow, RecentCalls telemetry, assistant selector, OTP verification, and blob PDF report export via ngrok-aware headers.',
    impact:
      'Live in production at apointlo.com, providing service businesses with an automated, end-to-end appointment scheduling and client retention system.',
  },
  {
    id: 'exynos-cooky',
    title: 'Exynos Cooky',
    subtitle: 'Artisanal Bakery E-Commerce & Order Management Dashboard',
    category: 'E-Commerce & Storefront App',
    role: 'Frontend Developer',
    period: 'Production Deployment',
    featured: true,
    image: '/images/exynos-cooky-real.png',
    liveUrl: 'https://exynos-cooky.vercel.app/',
    githubUrl: 'https://github.com/zarak-dev/Exynos-Cooky',
    technologies: ['React', 'TypeScript', 'Redux Toolkit', 'Ant Design', 'Styled Components', 'Vercel'],
    metrics: [
      { label: 'Live Store', value: 'exynos-cooky.vercel.app' },
      { label: 'State Layer', value: 'Redux Toolkit' },
      { label: 'UI Toolkit', value: 'Ant Design' },
      { label: 'Styling', value: 'Styled Components' },
    ],
    problem:
      'Artisanal bakeries face operational bottlenecks when balancing perishable inventory turnover, fluctuating order volumes, and customer ordering workflows.',
    approach:
      'Constructed a specialized e-commerce web application and dashboard that pairs customer cookie ordering, box configuration, and checkout flows with real-time bakery kitchen product management.',
    frontendArchitecture:
      'Built with React and TypeScript, leveraging Redux Toolkit for atomic store slices managing order lifecycles and product boxes. Deployed continuously on Vercel.',
    interfaceDetails:
      'Custom cookie selection showcase, real-time box price calculations (e.g. Chilled Sugar, Chocolate Chip, Pink Velvet, Lotus Biscoff), and responsive cart checkout drawer.',
    impact:
      'Provides a polished, production-deployed demonstration of React state management, component customization with Ant Design and Styled Components, deployed live on Vercel.',
  },
  {
    id: 'moneyflow',
    title: 'MoneyFlow',
    subtitle: 'Personal Finance Tracker & Transactional Analytics Engine',
    category: 'Fintech & Transaction Engine',
    role: 'Frontend Developer',
    period: 'Production Project',
    featured: true,
    image: '/images/moneyflow.jpg',
    liveUrl: 'https://ghanii.live/login',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Laravel/PHP', 'MySQL', 'REST APIs'],
    metrics: [
      { label: 'Daily Volume', value: '300+ Transactions' },
      { label: 'Performance', value: '30% Load Time Cut' },
      { label: 'Live Link', value: 'ghanii.live/login' },
      { label: 'Interface', value: 'Responsive REST UI' },
    ],
    problem:
      'Individuals need rapid, zero-lag transaction logging and instant visual feedback on categorical expense trends without getting bogged down by slow, bloated banking spreadsheets.',
    approach:
      'Developed a responsive, lightweight personal finance dashboard enabling business clients and individuals to efficiently log, categorize, and monitor daily transactions in real time with high rendering performance.',
    frontendArchitecture:
      'Engineered an ultra-efficient client-side architecture using modern vanilla JavaScript and modular CSS3. Optimized DOM updates and API payload parsing to handle high-frequency transaction rows without layout thrashing.',
    interfaceDetails:
      'Real-time cash flow overview cards, categorized expense breakdown donut charts, interactive monthly savings trajectory curves, and transaction ledger filtering.',
    impact:
      'Successfully sustained 300+ daily transactions while achieving a verified 30% reduction in client page load times through streamlined asset delivery and optimized REST interactions.',
  },
  {
    id: 'fyp-connect',
    title: 'FYP Connect',
    subtitle: 'Smart Sugar Management System with Gemini AI Diet Intelligence',
    category: 'Healthcare & AI Intelligence',
    role: 'Frontend / Full-Stack Developer',
    team: '3 Members',
    grade: 'Grade A+',
    period: 'Capstone Project · Sarhad University',
    featured: true,
    image: '/images/fyp-connect.jpg',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'Google Gemini API', 'Tailwind CSS'],
    metrics: [
      { label: 'Evaluation', value: 'Grade A+' },
      { label: 'Team Size', value: '3 Engineers' },
      { label: 'AI Engine', value: 'Google Gemini' },
      { label: 'Database', value: 'Supabase' },
    ],
    problem:
      'Diabetic patients in South Asia struggle to maintain glycemic balance because mainstream health applications do not account for regional dietary habits, carbohydrate-dense South Asian cuisine, or intuitive trend visualization.',
    approach:
      'Built a comprehensive glycemic monitoring platform that logs glucometer readings, automatically detects abnormal blood sugar trends over customizable timeframes, generates personalized meal plans tailored to South Asian cuisine via Google Gemini AI, and generates monthly health reports for clinical reviews.',
    frontendArchitecture:
      'Architected using Next.js and TypeScript, integrating Supabase for row-level secured database queries and user auth. Connected Google Gemini API with structured prompt schemas to produce culturally relevant, nutrient-accurate meal recommendations.',
    interfaceDetails:
      'Interactive glycemic curve graph with target zone overlays (70–130 mg/dL), intelligent spike alerts, South Asian recipe nutrition breakdown cards (e.g. Ragi Dosa, Lentils, Whole grains), and a one-click PDF export engine for clinical consultations.',
    impact:
      'Awarded Grade A+ by academic faculty for its cultural localization of health technology, robust end-to-end frontend execution, and practical clinical utility.',
  },
];
