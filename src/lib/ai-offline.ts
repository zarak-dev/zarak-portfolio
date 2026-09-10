import { IDENTITY } from '@/data/identity';
import { EXPERIENCES } from '@/data/experience';
import { CASE_STUDIES } from '@/data/projects';
import { TECHNOLOGIES } from '@/data/skills';
import { EDUCATION_DATA } from '@/data/education';
import { GITHUB_DATA } from '@/data/github';

export function generateOfflineResponse(userMessage: string): string {
  const query = userMessage.toLowerCase().trim();

  // 1. Personal / Relationship queries (e.g., "is he single?", "singal", "age", etc.)
  if (
    query.includes('single') ||
    query.includes('singal') ||
    query.includes('dating') ||
    query.includes('girlfriend') ||
    query.includes('fiancée') ||
    query.includes('fiancee') ||
    query.includes('gf') ||
    query.includes('married') ||
    query.includes('wife') ||
    query.includes('relationship') ||
    query.includes('how old') ||
    query.includes('age') ||
    query.includes('birthday')
  ) {
    return `He's taken, sorry. 😌 Behave yourself! That part of his life is private, but I can definitely brag about his work if you'd like. What would you like to know about his projects or frontend architecture?`;
  }

  // 1.1 Flirting with Aimmyy
  if (
    query.includes('cute') ||
    query.includes('pretty') ||
    query.includes('beautiful') ||
    query.includes('marry me') ||
    query.includes('love you')
  ) {
    return `Nice try. 😌 I'm here to show off Zarak's work, remember? You're supposed to be exploring the portfolio, not trying to charm the AI. 😂 Now, want me to show you one of his production platforms?`;
  }

  // 2. Greetings
  if (
    /^(hi|hello|hey|greetings|sup|yo|salam|assalam)(\b|\s|[!?.])/i.test(query) ||
    query === 'hi' ||
    query === 'hello' ||
    query === 'hey'
  ) {
    return `Hey there! 👋 I'm **Aimmyy**, Zarak's AI assistant — basically the slightly more talkative part of his portfolio. 😌\n\nI can walk you through his production platforms at Smart Forum (like **Dentally Assist** and **Appointlo**), his async state architectures, or open **Project X-Ray** to see how things work under the hood.\n\nWhat would you like to explore first?`;
  }

  // 3. Specialization / What does Zarak do / Core focus
  if (
    query.includes('specialize') ||
    query.includes('specialise') ||
    query.includes('specialty') ||
    query.includes('specialisation') ||
    query.includes('what does zarak do') ||
    query.includes('what does he do') ||
    query.includes('what do you do') ||
    query.includes('who is zarak') ||
    query.includes('about zarak') ||
    query.includes('tell me about zarak') ||
    query.includes('focus') ||
    query.includes('background')
  ) {
    return `**${IDENTITY.name}** specializes in **Modern Frontend Architecture**, **UI Engineering**, and **Interactive Systems**! As his AI assistant, I can tell you he obsesses over high-performance interfaces, predictable state architectures, and polished user experiences.\n\nHere is what he excels at:\n\n- **Core Frameworks**: React 18 & Next.js with strict TypeScript typings, component boundaries, and streaming hydration.\n- **State Architecture**: Centralized, predictable async state machines using **Redux Toolkit + Redux-Saga** (takeEvery/takeLatest with redux-injectors).\n- **Design Systems**: Production enterprise interfaces crafted with **Ant Design 6**, **Styled Components**, and **Tailwind CSS**.\n- **Authentication & Security**: Cookie-based JWT sessions (SameSite=Lax) with direct client-side role decoding for RBAC route guards.\n- **AI-Assisted Interfaces**: Real-time telephony dashboards, inline audio playback, and appointment funnels (**Dentally Assist** and **Appointlo** at Smart Forum).\n\nWould you like to inspect the architecture of his flagship platform **Dentally Assist**?\n\n[XRAY:dentally]`;
  }

  // 4. Dentally Assist Project
  if (
    query.includes('dentally') ||
    query.includes('receptionist') ||
    query.includes('telephony') ||
    query.includes('dental')
  ) {
    const p = CASE_STUDIES.find((c) => c.id === 'dentally')!;
    return `### **Dentally Assist — AI Call Management Dashboard** ✨\n\n**Company:** Smart Forum (Proprietary Enterprise Platform)\n**Role:** ${p.role} (${p.period})\n**Stack:** ${p.technologies.join(', ')}\n\n**The Problem:**\n${p.problem}\n\n**Engineering Approach:**\n${p.approach}\n\n**Frontend Architecture:**\n${p.frontendArchitecture}\n\n**Key Interface Details:**\n${p.interfaceDetails}\n\n**Key Metrics:**\n${p.metrics?.map((m) => `- **${m.label}:** ${m.value}`).join('\n')}\n\nYou can click below to inspect the full interactive system architecture:\n\n[XRAY:dentally]`;
  }

  // 4.1 Appointlo Project
  if (
    query.includes('appointlo') ||
    query.includes('apointlo') ||
    query.includes('appointment') ||
    query.includes('scheduling')
  ) {
    const p = CASE_STUDIES.find((c) => c.id === 'appointlo')!;
    return `### **Appointlo — AI Appointment Scheduling SaaS** ✨\n\n**Company:** Smart Forum\n**Role:** ${p.role}\n**Live Site:** [apointlo.com](https://apointlo.com/)\n**Stack:** ${p.technologies.join(', ')}\n\n**What it does:**\n${p.approach}\n\n**Frontend Architecture:**\n${p.frontendArchitecture}\n\n**Interface Details:**\n${p.interfaceDetails}\n\nYou can inspect its decoupled data architecture below:\n\n[XRAY:appointlo]`;
  }

  // 5. Exynos Cooky Project
  if (
    query.includes('exynos') ||
    query.includes('cooky') ||
    query.includes('cookie') ||
    query.includes('bakery')
  ) {
    const p = CASE_STUDIES.find((c) => c.id === 'exynos-cooky')!;
    return `### **Exynos Cooky — E-Commerce & Order Management**\n\n**Role:** ${p.role} (${p.period})\n**Stack:** ${p.technologies.join(', ')}\n**Live Deployment:** [exynos-cooky.vercel.app](${p.liveUrl})\n\n**Overview:**\n${p.problem}\n\n**Frontend Architecture:**\n${p.frontendArchitecture}\n\n**Interface Details:**\n${p.interfaceDetails}\n\nYou can inspect the architecture and state management model below:\n\n[XRAY:exynos-cooky]`;
  }

  // 6. MoneyFlow Project
  if (
    query.includes('moneyflow') ||
    query.includes('money flow') ||
    query.includes('expense') ||
    query.includes('budget') ||
    query.includes('finance')
  ) {
    const p = CASE_STUDIES.find((c) => c.id === 'moneyflow')!;
    return `### **MoneyFlow — Personal Finance & Expense Tracker**\n\n**Role:** ${p.role} (${p.period})\n**Stack:** ${p.technologies.join(', ')}\n\n**Overview:**\n${p.problem}\n\n**Engineering Architecture:**\n${p.frontendArchitecture}\n\n**Impact:**\n${p.impact}\n\nYou can inspect its transactional data flow architecture below:\n\n[XRAY:moneyflow]`;
  }

  // 7. FYP Connect Project (Smart Sugar Management)
  if (
    query.includes('fyp') ||
    query.includes('sugar') ||
    query.includes('diabetes') ||
    query.includes('capstone')
  ) {
    const p = CASE_STUDIES.find((c) => c.id === 'fyp-connect')!;
    return `### **FYP Connect — Smart Sugar Management (Grade A+)**\n\n**Role:** ${p.role} (Team of 3 · Grade A+)\n**Stack:** ${p.technologies.join(', ')}\n\n**Overview:**\n${p.problem}\n\n**Architecture & AI Integration:**\n${p.approach}\n\nIntegrated **Google Gemini API** with structured JSON output prompts to generate culturally tailored South Asian meal plans grounded in patient blood sugar logs.\n\nYou can inspect its clinical AI architecture below:\n\n[XRAY:fyp-connect]`;
  }

  // 8. AI-related work / Generative AI
  if (
    query.includes('ai') ||
    query.includes('artificial intelligence') ||
    query.includes('llm') ||
    query.includes('gemini') ||
    query.includes('machine learning')
  ) {
    return `Zarak loves building intelligent, AI-assisted interfaces! Here are his key AI implementations:\n\n1. **Dentally Assist (Production at Smart Forum)**: An enterprise AI-driven telephony call management platform. He engineered the frontend with inline audio playback, dual-mode analytics, and structured call outcome records.\n\n[XRAY:dentally]\n\n2. **Appointlo (Live SaaS at apointlo.com)**: AI appointment scheduling platform with high-converting marketing flows and client portal.\n\n[XRAY:appointlo]\n\n3. **FYP Connect (Capstone Grade A+)**: Integrated the **Google Gemini API** to analyze patient blood sugar logs and dynamically generate South Asian dietary recommendations with structured schema outputs.\n\n[XRAY:fyp-connect]`;
  }

  // 9. Redux / State Management
  if (
    query.includes('redux') ||
    query.includes('state') ||
    query.includes('store') ||
    query.includes('slice') ||
    query.includes('saga')
  ) {
    return `Zarak uses **Redux Toolkit + Redux-Saga** as his primary state layer for complex, asynchronous applications:\n\n- **Dentally Assist & Appointlo (Smart Forum)**: Built robust saga side-effects handling takeEvery for parallel calls and takeLatest for analytics debouncing, with lazy reducer injection via redux-injectors.\n- **Exynos Cooky**: Implemented a slice-based cart state machine with persistent storage, dynamic checkout stages, and live inventory state.\n\nInspect how Redux-Saga coordinates the Dentally Assist telemetry pipeline:\n\n[XRAY:dentally]`;
  }

  // 10. General Projects query
  if (
    query.includes('project') ||
    query.includes('portfolio') ||
    query.includes('work') ||
    query.includes('built')
  ) {
    return `Here are the major engineering projects Zarak has architected:\n\n1. **Dentally Assist**: AI Call Management Dashboard for dental practices (Smart Forum).\n[XRAY:dentally]\n\n2. **Appointlo**: AI Appointment Scheduling SaaS, live at [apointlo.com](https://apointlo.com/) (Smart Forum).\n[XRAY:appointlo]\n\n3. **Exynos Cooky**: Artisanal bakery e-commerce dashboard with Redux state and Ant Design.\n[XRAY:exynos-cooky]\n\n4. **MoneyFlow**: Modern personal finance tracker with high-throughput expense metrics.\n[XRAY:moneyflow]\n\n5. **FYP Connect**: Capstone Smart Sugar Management platform (Grade A+) with Gemini AI.\n[XRAY:fyp-connect]`;
  }

  // 11. Skills / Tech Stack
  if (
    query.includes('skill') ||
    query.includes('stack') ||
    query.includes('tech') ||
    query.includes('technolog') ||
    query.includes('tool') ||
    query.includes('language')
  ) {
    return `### **Technical Stack & Specializations** ✨\n\n- **Core Frontend**: Next.js (App Router), React 19, TypeScript, JavaScript (ES6+)\n- **Architecture & State**: Redux Toolkit, Context API, Modular Custom Hooks\n- **Styling & UI Systems**: Tailwind CSS, shadcn/ui, Radix UI, Framer Motion, Ant Design, Styled Components\n- **Integration & Cloud**: REST APIs, Google Gemini API, Supabase (PostgreSQL), Vercel, Git & GitHub\n- **Engineering Foundations**: Semantic HTML5, CSS3, Responsive Design, Web Performance Optimization\n\nWhich technology or project would you like to dive deeper into?`;
  }

  // 12. Experience / Career
  if (
    query.includes('experience') ||
    query.includes('career') ||
    query.includes('job') ||
    query.includes('company') ||
    query.includes('smart forum') ||
    query.includes('pseb') ||
    query.includes('trustech')
  ) {
    const list = EXPERIENCES.map(
      (e) =>
        `### **${e.role}** — ${e.company}\n*${e.period} · ${e.type}*\n${e.summary}\n- **Key Stack:** ${e.technologies.join(', ')}`
    ).join('\n\n');
    return `${list}\n\nWould you like to inspect his flagship work on **Dentally** at Smart Forum?\n\n[XRAY:dentally]`;
  }

  // 13. Education
  if (
    query.includes('education') ||
    query.includes('degree') ||
    query.includes('university') ||
    query.includes('sarhad') ||
    query.includes('college') ||
    query.includes('gpa') ||
    query.includes('study')
  ) {
    return `### **Academic Foundation**\n\n- **Degree:** ${EDUCATION_DATA.degree} in ${EDUCATION_DATA.field}\n- **Institution:** ${EDUCATION_DATA.institution}\n- **Period:** ${EDUCATION_DATA.period}\n- **Capstone:** ${EDUCATION_DATA.capstoneHighlight}\n\n**Relevant Coursework:**\n${EDUCATION_DATA.coursework.map((c) => `- ${c}`).join('\n')}`;
  }

  // 14. Contact / Hire / Availability
  if (
    query.includes('contact') ||
    query.includes('hire') ||
    query.includes('email') ||
    query.includes('reach') ||
    query.includes('available') ||
    query.includes('linkedin') ||
    query.includes('resume')
  ) {
    return `### **Get in Touch with ${IDENTITY.name}**\n\n- **Availability:** ${IDENTITY.status.availability}\n- **Primary Email:** [${IDENTITY.contacts.email}](mailto:${IDENTITY.contacts.email})\n- **Work Email:** [${IDENTITY.contacts.workEmail}](mailto:${IDENTITY.contacts.workEmail})\n- **LinkedIn:** [${IDENTITY.contacts.linkedin}](${IDENTITY.contacts.linkedin})\n- **GitHub:** [${IDENTITY.contacts.github}](${IDENTITY.contacts.github})\n\nYou can also use the contact form at the bottom of the page to send him a direct message!`;
  }

  // 15. GitHub / Repos
  if (
    query.includes('github') ||
    query.includes('repo') ||
    query.includes('open source') ||
    query.includes('source code')
  ) {
    const repos = GITHUB_DATA.repositories
      .map((r) => `- [${r.name}](${r.url}): ${r.description} *(${r.language})*`)
      .join('\n');
    return `### **GitHub Repositories**\n\nZarak actively maintains public repositories at [${GITHUB_DATA.profileUrl}](${GITHUB_DATA.profileUrl}):\n\n${repos}`;
  }

  // 16. Project X-Ray System
  if (
    query.includes('xray') ||
    query.includes('x-ray') ||
    query.includes('architecture')
  ) {
    return `### **Project X-Ray / Architecture Telemetry** ✨\n\n**Project X-Ray** is an interactive architectural telemetry inspector built directly into this portfolio! It allows you to examine live data flow diagrams, state lifecycles, and failure modes for:\n\n- **Dentally Assist**: Redux-Saga async telemetry pipeline & dual-mode analytics (Smart Forum).\n[XRAY:dentally]\n\n- **Appointlo**: Decoupled static data separation architecture (Live at apointlo.com · Smart Forum).\n[XRAY:appointlo]\n\n- **Exynos Cooky**: E-commerce cart machine & inventory status.\n[XRAY:exynos-cooky]\n\n- **MoneyFlow**: Transaction processing & ledger analytics.\n[XRAY:moneyflow]\n\n- **FYP Connect**: Biometric data ingestion & Gemini AI meal synthesis.\n[XRAY:fyp-connect]`;
  }

  // 17. Default Fallback
  return `Hi! I'm **Aimmyy AI**, representing **${IDENTITY.name}** (Software Engineer specializing in Modern Frontend Architecture & UI Systems) ✨.\n\nHere are some things you can ask me about:\n- **"What does Zarak specialize in?"**\n- **"Tell me about Dentally Assist or Appointlo"** (Smart Forum production platforms)\n- **"Which projects use Redux-Saga?"**\n- **"Show me his AI-related work"**\n- **"What is his experience at Smart Forum?"**\n- **"How can I contact or hire Zarak?"**\n\nWhat would you like to explore?`;
}
