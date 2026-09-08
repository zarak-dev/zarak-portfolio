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
    title: 'Dentally',
    subtitle: 'AI-Powered Receptionist Platform for Automated Calls & Booking',
    category: 'AI Telephony & Clinical Operations',
    role: 'Frontend Software Engineer · Smart Forum',
    period: 'June 2026 – Present',
    featured: true,
    isHero: true,
    image: '/images/dentally-real.png',
    technologies: ['Next.js', 'TypeScript', 'Redux Toolkit', 'Tailwind CSS', 'shadcn/ui', 'REST APIs'],
    metrics: [
      { label: 'Role', value: 'Frontend Lead' },
      { label: 'Architecture', value: 'Next.js App Router' },
      { label: 'State Model', value: 'Redux Toolkit' },
      { label: 'UI System', value: 'shadcn/ui + Tailwind' },
    ],
    problem:
      'Dental practices regularly miss urgent patient inquiries and high-value appointment bookings during peak patient check-in periods and outside clinic operating hours when human staff are unavailable.',
    approach:
      'Engineered an intelligent, operator-facing receptionist command interface that manages active AI telephony agents, displays live audio waveform telemetries, visualizes instant speech-to-text transcripts with sentiment indicators, and automates real-time patient calendar bookings.',
    frontendArchitecture:
      'Leveraged Next.js App Router for optimal layout caching and streaming. Designed a centralized Redux Toolkit state machine to handle complex asynchronous call lifecycles (ringing, connected, live transcription streaming, calendar reconciliation, and wrap-up). Maintained strict TypeScript contracts across all REST payload schemas.',
    interfaceDetails:
      'Created a high-density, low-cognitive-load dashboard featuring live active call cards with one-click operator takeover, dynamic audio waveform visualizer, timestamped conversation transcript drawer, and an integrated clinic calendar view showing appointment conflicts.',
    impact:
      'Provides dental clinic operators with reliable visibility into concurrent automated phone interactions, reducing manual booking friction and eliminating dropped patient inquiries.',
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
