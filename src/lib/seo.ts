import { IDENTITY } from '@/data/identity';

export function getPersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: IDENTITY.name,
    jobTitle: IDENTITY.role,
    description: IDENTITY.bio,
    url: 'https://zarak.dev',
    sameAs: [IDENTITY.contacts.github, IDENTITY.contacts.linkedin],
    knowsAbout: [
      'Frontend Engineering',
      'Next.js',
      'React.js',
      'TypeScript',
      'Redux Toolkit',
      'Tailwind CSS',
      'shadcn/ui',
      'REST APIs',
      'Web Performance',
      'User Interface Architecture',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Smart Forum',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Sarhad University of Science & Information Technology',
    },
  };
}

export function getWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${IDENTITY.name} — Developer Portfolio`,
    url: 'https://zarak.dev',
    description: IDENTITY.tagline,
    author: {
      '@type': 'Person',
      name: IDENTITY.name,
    },
  };
}
