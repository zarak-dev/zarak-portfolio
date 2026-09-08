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
    query.includes('gf') ||
    query.includes('married') ||
    query.includes('wife') ||
    query.includes('relationship') ||
    query.includes('how old') ||
    query.includes('age') ||
    query.includes('birthday')
  ) {
    return `Haha, nice try! 😉 I'm **Aimmyyy AI**, Zarak's AI engineering assistant, so I keep my focus strictly on his code, frontend architectures, and technical systems!\n\nZarak is completely focused on engineering high-performance software. For anything personal or to say hello to him directly, you're welcome to reach out via the contact form below or connect on [LinkedIn](${IDENTITY.contacts.linkedin})! ✨`;
  }

  // 2. Greetings
  if (
    /^(hi|hello|hey|greetings|sup|yo|salam|assalam)(\b|\s|[!?.])/i.test(query) ||
    query === 'hi' ||
    query === 'hello' ||
    query === 'hey'
  ) {
    return `Hey there! 👋 I am **Aimmyyy AI**, Zarak's dedicated female engineering assistant and portfolio representative.\n\nI'd love to show you around his work! I can tell you all about:\n- **His Specialization**: Modern Frontend Architecture, React 19, Next.js, Redux Toolkit\n- **Flagship Projects**: Dentally (AI Receptionist Platform), Exynos Cooky, MoneyFlow\n- **Interactive Architecture**: Inspect live data flows with **Project X-Ray**\n- **Engineering Experience**: Production work at Smart Forum\n\nWhat would you like to explore first? ✨`;
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
    return `**${IDENTITY.name}** specializes in **Modern Frontend Architecture**, **UI Engineering**, and **Interactive Systems**! As his AI assistant, I can tell you he obsesses over high-performance interfaces, predictable state architectures, and polished user experiences.\n\nHere is what he excels at:\n\n- **Core Frameworks**: React 19 & Next.js App Router with server/client boundaries, route caching, and streaming hydration.\n- **State Architecture**: Centralized, predictable state machines using **Redux Toolkit** for multi-stage asynchronous workflows.\n- **Type Safety**: End-to-end strict **TypeScript** contracts across components and REST APIs.\n- **Design Systems**: Tailored, accessible interfaces crafted with **Tailwind CSS**, **shadcn/ui**, and **Framer Motion**.\n- **AI-Assisted Interfaces**: Real-time telephony dashboards, live audio visualizers, and speech-to-text streams (like **Dentally** at Smart Forum).\n\nWould you like to inspect the architecture of his flagship platform **Dentally**?\n\n[XRAY:dentally]`;
  }

  // 4. Dentally Project
  if (
    query.includes('dentally') ||
    query.includes('receptionist') ||
    query.includes('telephony') ||
    query.includes('dental')
  ) {
    const p = CASE_STUDIES.find((c) => c.id === 'dentally')!;
    return `### **Dentally — AI Receptionist Platform** ✨\n\n**Role:** ${p.role} (${p.period})\n**Stack:** ${p.technologies.join(', ')}\n\n**The Problem:**\n${p.problem}\n\n**Engineering Approach:**\n${p.approach}\n\n**Frontend Architecture:**\n${p.frontendArchitecture}\n\n**Key Metrics:**\n${p.metrics?.map((m) => `- **${m.label}:** ${m.value}`).join('\n')}\n\nYou can click below to inspect the full interactive system architecture:\n\n[XRAY:dentally]`;
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
    return `Zarak loves building intelligent, AI-assisted interfaces! Here are his two key AI implementations:\n\n1. **Dentally (Production at Smart Forum)**: An AI-driven telephony receptionist platform. He engineered the frontend that handles live audio streams, real-time speech-to-text transcript feeds, and sentiment markers.\n\n[XRAY:dentally]\n\n2. **FYP Connect (Capstone Grade A+)**: Integrated the **Google Gemini API** to analyze patient blood sugar logs and dynamically generate South Asian dietary recommendations with structured schema outputs.\n\n[XRAY:fyp-connect]`;
  }

  // 9. Redux / State Management
  if (
    query.includes('redux') ||
    query.includes('state') ||
    query.includes('store') ||
    query.includes('slice')
  ) {
    return `Zarak uses **Redux Toolkit** as his primary state layer for complex, asynchronous applications:\n\n- **Dentally**: Built a robust state machine managing concurrent incoming calls, audio streaming buffers, real-time transcript streams, and operator override actions.\n- **Exynos Cooky**: Implemented a slice-based cart state machine with persistent storage, dynamic checkout stages, and live inventory state.\n\nInspect how Redux coordinates the Dentally audio pipeline:\n\n[XRAY:dentally]`;
  }

  // 10. General Projects query
  if (
    query.includes('project') ||
    query.includes('portfolio') ||
    query.includes('work') ||
    query.includes('built')
  ) {
    return `Here are the major engineering projects Zarak has architected:\n\n1. **Dentally**: AI Receptionist Platform with live telephony, audio waveforms, and automated booking.\n[XRAY:dentally]\n\n2. **Exynos Cooky**: Artisanal bakery e-commerce dashboard with Redux state and Ant Design.\n[XRAY:exynos-cooky]\n\n3. **MoneyFlow**: Modern personal finance tracker with high-throughput expense metrics.\n[XRAY:moneyflow]\n\n4. **FYP Connect**: Capstone Smart Sugar Management platform (Grade A+) with Gemini AI.\n[XRAY:fyp-connect]`;
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
    return `### **Project X-Ray / Architecture Telemetry** ✨\n\n**Project X-Ray** is an interactive architectural telemetry inspector built directly into this portfolio! It allows you to examine live data flow diagrams, state lifecycles, and failure modes for:\n\n- **Dentally**: Live telephony stream, WebSockets, and calendar sync.\n[XRAY:dentally]\n\n- **Exynos Cooky**: E-commerce cart machine & inventory status.\n[XRAY:exynos-cooky]\n\n- **MoneyFlow**: Transaction processing & ledger analytics.\n[XRAY:moneyflow]\n\n- **FYP Connect**: Biometric data ingestion & Gemini AI meal synthesis.\n[XRAY:fyp-connect]`;
  }

  // 17. Default Fallback
  return `Hi! I'm **Aimmyyy AI**, representing **${IDENTITY.name}** (Software Engineer specializing in Modern Frontend Architecture & UI Systems) ✨.\n\nHere are some things you can ask me about:\n- **"What does Zarak specialize in?"**\n- **"Tell me about Dentally"** (AI Receptionist platform)\n- **"Which projects use Redux Toolkit?"**\n- **"Show me his AI-related work"**\n- **"What is his experience at Smart Forum?"**\n- **"How can I contact or hire Zarak?"**\n\nWhat would you like to explore?`;
}
