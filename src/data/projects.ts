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
    subtitle: 'AI Call Management Dashboard for Dental Clinics · Appointlo SaaS',
    category: 'AI Telephony & Clinical Operations',
    role: 'Frontend Software Engineer · Smart Forum',
    period: 'June 2026 – Present',
    featured: true,
    isHero: true,
    image: '/images/dentally-real.png',
    technologies: ['React 18', 'TypeScript', 'Redux-Saga', 'Redux Toolkit', 'Ant Design 6', 'Styled Components'],
    metrics: [
      { label: 'Platform', value: 'Appointlo SaaS' },
      { label: 'State Layer', value: 'Redux-Saga + RTK' },
      { label: 'Access Control', value: 'JWT Cookie + RBAC' },
      { label: 'Architecture', value: '11 Modular Slices' },
    ],
    problem:
      'Dental practices regularly miss urgent patient inquiries and high-value appointment bookings during peak clinic check-in periods and outside office operating hours when human staff are unavailable.',
    approach:
      'Engineered as a specialized clinical telephony project under the Appointlo AI appointment scheduling SaaS platform at Smart Forum. Created an enterprise-grade operator dashboard providing dental practice managers complete visibility into their AI phone assistant. Clinic staff can review AI-handled call logs with inline audio playback, track appointment outcomes, inspect dual-mode analytics, export PDF reports, and manage clinic settings, with dedicated role-gated admin controls.',
    frontendArchitecture:
      'Built on React 18 and strict TypeScript. State side-effects are coordinated via Redux-Saga (takeEvery for parallel call list/detail queries; takeLatest for analytics debouncing), with reducers lazily injected using redux-injectors. Cookie-based JWT auth (SameSite=Lax) decodes user roles directly on session restore to power <RequireAuth> and <RequireAdmin> route guards without extra network hops. API 404s are treated gracefully as empty states.',
    interfaceDetails:
      'Features 11 modular containers: KPI summary cards (total calls, success rate, follow-up flags), paginated call logs with custom inline <AudioPlayer> recording playback, dual-mode area chart analytics (calls vs appointment funnels with UK locale formatting), one-click PDF blob export (/dashboard/export/pdf), and user profile management with cookie synchronization.',
    impact:
      'Successfully deployed across client dental practices as part of the Appointlo SaaS ecosystem at Smart Forum, transforming unattended patient calls into structured, actionable appointment records and eliminating dropped patient inquiries.',
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
    subtitle: 'Artisanal Bakery E-Commerce & Real-Time Kitchen Operations ERP',
    category: 'Bakery E-Commerce & Kitchen ERP',
    role: 'Full-Stack / Frontend Developer',
    period: 'Production Deployment',
    featured: true,
    image: '/images/exynos-cooky-real.png',
    liveUrl: 'https://exynos-cooky.vercel.app/',
    githubUrl: 'https://github.com/zarak-dev/Exynos-Cooky',
    technologies: ['React 19', 'TypeScript', 'Redux-Saga', 'Redux Toolkit', 'Ant Design 6', 'Styled Components', 'Supabase', 'PostgreSQL 15', 'AntV Charts'],
    metrics: [
      { label: 'Live Platform', value: 'exynos-cooky.vercel.app' },
      { label: 'State & Async', value: 'Redux-Saga + RTK' },
      { label: 'Backend / BaaS', value: 'Supabase + Postgres RPC' },
      { label: 'Design & Charts', value: 'Ant Design 6 + AntV' },
    ],
    problem:
      'Artisanal bakeries face severe operational bottlenecks when balancing luxury customer storefronts with real-time kitchen operations. Unsynchronized perishable inventory, vulnerability to client-side price and coupon tampering, lack of live order tracking, and unresponsive data tables on kitchen screens create friction for customers and back-office staff.',
    approach:
      'Architected a full-stack, enterprise-grade gourmet bakery storefront and kitchen operations ERP. Customers enjoy an interactive custom box-builder (4, 6, or 12-pack) with client-side slot validators and live stock guards, atomic server-validated checkout, 5-stage real-time order tracking (Pending ➔ Delivered), and verified reviews. Kitchen staff and administrators operate via live Kanban queues, automated ingredient threshold alerts (<5 units), and AntV financial performance trajectory charts with AI-assisted executive insights.',
    frontendArchitecture:
      'Built with React 19, strict TypeScript, and Vite. Asynchronous side effects are orchestrated through generator-based Redux-Saga pipelines (takeLatest, call, put) for atomic transaction handling and decoupled OAuth redirect loading states to eliminate UI race conditions. Implements zero-trust data integrity using Supabase PostgreSQL RPC functions (create_order_with_items) that accept only product IDs and quantities, computing subtotals and coupon deductions strictly server-side. Styled with a tokenized system in Styled-Components and Ant Design v6, utilizing fixed table layouts (tableLayout="fixed") and responsive dual-view rendering (compact mobile cards on <768px, fixed high-density tables on desktop) to eliminate table overflow.',
    interfaceDetails:
      'Includes an interactive box customizer (/buy) dynamically populating from 100+ cookie varieties with slot validation; atomic checkout drawer with server-validated promotional coupons; 5-stage order tracking timeline (/track-order); verified 5-star customer review system with trust badges; live kitchen Kanban queue (/admin/orders) with single-click prep-to-dispatch pipeline; inventory control (/admin/inventory) with auto-depletion alerts; and admin financial intelligence (/admin) featuring AntV G2 column charts for monthly gross revenue trends and MoM growth, donut sales distribution charts, and AI executive summaries.',
    impact:
      'Engineered a resilient production platform that guarantees zero-trust checkout integrity through PostgreSQL RPC procedures, prevents kitchen bottlenecks through real-time order queue advancement, eliminates inventory over-allocation with automated depletion alerts, and provides bakery operators with executive-level financial clarity and responsive data grids across mobile and desktop viewports.',
  },
  {
    id: 'moneyflow',
    title: 'MoneyFlow',
    subtitle: 'Personal Finance Tracker & Transactional Analytics Engine',
    category: 'Fintech & Transaction Engine',
    role: 'Frontend Developer',
    period: 'Production Project',
    featured: true,
    image: '/images/moneyflow-real.png',
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
    id: 'gluvia',
    title: 'Gluvia',
    subtitle: 'South Asian Diabetes & Glycemic Management Platform · Redesigned FYP',
    category: 'Healthcare & Metabolic AI',
    role: 'Full-Stack / Frontend Developer · A Project of Zarak K.',
    team: 'Lead Architect',
    grade: 'Redesigned FYP (Grade A+)',
    period: 'Live Production Deployment · 2026',
    featured: true,
    image: '/images/gluvia.png',
    liveUrl: 'https://www.gluvia.world',
    githubUrl: 'https://github.com/zarak-dev',
    technologies: [
      'Next.js 14 (App Router)',
      'TypeScript',
      'Tailwind CSS',
      'Supabase',
      'PostgreSQL',
      'Google Gemini AI',
      'Resend API',
      'Deno Edge Functions',
      'Recharts',
      'React Hook Form',
      'Zod',
    ],
    metrics: [
      { label: 'Live Platform', value: 'gluvia.world' },
      { label: 'AI Glycemic Model', value: 'Google Gemini' },
      { label: 'Backend / BaaS', value: 'Supabase + Postgres' },
      { label: 'Edge Worker', value: 'Deno Cron Digests' },
    ],
    problem:
      'South Asian populations possess a 4–6x higher genetic predisposition to Type 2 diabetes and frequently develop it at lower BMIs. Standard tracking tools fail to account for high-glycemic cultural staples (roti, paratha, daal, biryani, chai) or deliver culturally attuned nutritional guidance.',
    approach:
      'Built as the redesigned and elevated production evolution of Zarak’s Grade A+ final year project. Gluvia is a digital metabolic companion tailored to address the unique genetic, dietary, and lifestyle risk factors of Type 2 diabetes in South Asian populations. Rather than applying generic Western guidelines, Gluvia contextualizes blood glucose monitoring around traditional culinary staples, providing clinical trend analytics, automated weekly digests, and an interactive AI glycemic assistant.',
    frontendArchitecture:
      'Engineered with Next.js 14 (App Router), TypeScript, and Tailwind CSS. Features an accessible medical-grade UI defaulting to Light Mode with zero-flicker Dark Mode toggle and keyboard navigation (Ctrl + K). Form schemas are strictly validated using React Hook Form and Zod. Defended one-time recovery tokens against automated corporate email virus scanners (Microsoft Defender, Safelinks) by routing directly to an authenticated client-side /update-password flow with middleware guards.',
    interfaceDetails:
      'Includes smart glycemic logging with 1-click meal tagging (Fasting, Pre-Meal, Post-Meal, Bedtime) and automatic clinical zone classification (Low, Normal, Elevated, High); clinical analytics with interactive Recharts visualizations displaying 7-day, 30-day, and 90-day glycemic trajectories, standard deviation, and in-range percentages; a Gemini-powered AI glycemic companion offering real-time recipe tweaks and portion guidance for traditional South Asian dishes; doctor-ready summaries formatted specifically for physician consultations; and an automated weekly email engine powered by Supabase Deno Edge Functions scheduled via cron to deliver idempotent 7-day health digests with inline retina Base64 MIME CID attachments via Resend.',
    impact:
      'Live in production at gluvia.world, successfully redesigning the academic capstone into a hardened, high-impact clinical platform tailored to the metabolic realities of South Asian communities.',
  },
];
