export interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars?: number;
  forks?: number;
  url: string;
  isFeatured?: boolean;
  tags: string[];
}

export interface GitHubProfile {
  username: string;
  displayName: string;
  bio: string;
  profileUrl: string;
  publicRepoCount: number;
  repositories: GitHubRepo[];
}

export const GITHUB_DATA: GitHubProfile = {
  username: 'zarak-dev',
  displayName: 'Zarak K.',
  bio: 'Software Engineer & Lifelong Student',
  profileUrl: 'https://github.com/zarak-dev',
  publicRepoCount: 4,
  repositories: [
    {
      name: 'portfolio',
      description:
        'Next-generation Personal Developer Operating System engineered with Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, and Framer Motion.',
      language: 'TypeScript',
      languageColor: '#3178C6',
      url: 'https://github.com/zarak-dev/portfolio',
      isFeatured: true,
      tags: ['Next.js', 'React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    },
    {
      name: 'Exynos-Cooky',
      description:
        'Production e-commerce bakery management dashboard built with React, TypeScript, Redux Toolkit, Ant Design, and Styled Components, deployed on Vercel.',
      language: 'TypeScript',
      languageColor: '#3178C6',
      url: 'https://github.com/zarak-dev/Exynos-Cooky',
      isFeatured: true,
      tags: ['React', 'Redux Toolkit', 'Ant Design', 'Styled Components', 'Vercel'],
    },
    {
      name: 'Grab-Cooky',
      description:
        'Interactive client-facing web application for online bakery ordering, instant cart calculations, and responsive checkout flows.',
      language: 'JavaScript',
      languageColor: '#F7DF1E',
      url: 'https://github.com/zarak-dev/Grab-Cooky',
      isFeatured: false,
      tags: ['JavaScript', 'Frontend UI', 'State Management', 'CSS3'],
    },
    {
      name: 'JavaScript',
      description:
        'Curated implementation of core computer science algorithms, data structures, asynchronous promises, and advanced DOM manipulation patterns.',
      language: 'JavaScript',
      languageColor: '#F7DF1E',
      url: 'https://github.com/zarak-dev/JavaScript',
      isFeatured: false,
      tags: ['Algorithms', 'ES6+', 'Data Structures', 'Web APIs'],
    },
  ],
};
