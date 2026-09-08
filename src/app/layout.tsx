import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import AmbientCanvas from '@/components/background/AmbientCanvas';
import CursorSpotlight from '@/components/background/CursorSpotlight';
import { getPersonJsonLd, getWebSiteJsonLd } from '@/lib/seo';
import { IDENTITY } from '@/data/identity';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1020' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://zarak.dev'),
  title: `${IDENTITY.name} — ${IDENTITY.role}`,
  description: `${IDENTITY.name} is a software engineer specializing in modern frontend engineering, Next.js App Router, React, TypeScript, and AI telephony interfaces.`,
  keywords: [
    IDENTITY.name,
    'Frontend Developer',
    'Software Engineer',
    'Next.js',
    'React',
    'TypeScript',
    'Redux Toolkit',
    'Tailwind CSS',
    'shadcn/ui',
    'Smart Forum',
    'Dentally',
  ],
  authors: [{ name: IDENTITY.name, url: 'https://zarak.dev' }],
  creator: IDENTITY.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zarak.dev',
    title: `${IDENTITY.name} — ${IDENTITY.role}`,
    description: IDENTITY.tagline,
    siteName: `${IDENTITY.name} — Personal Developer OS`,
    images: [
      {
        url: '/images/dentally-preview.jpg',
        width: 1200,
        height: 675,
        alt: `${IDENTITY.name} Developer Portfolio & Case Studies`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${IDENTITY.name} — ${IDENTITY.role}`,
    description: IDENTITY.tagline,
    images: ['/images/dentally-preview.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personJsonLd = getPersonJsonLd();
  const websiteJsonLd = getWebSiteJsonLd();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="bg-background text-foreground antialiased selection:bg-accent selection:text-accent-foreground min-h-screen relative overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <AmbientCanvas />
          <CursorSpotlight />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
