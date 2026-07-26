import type { Metadata, Viewport } from 'next';
import { Space_Mono, IBM_Plex_Sans } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import {
  siteUrl,
  siteEmail,
  sitePhone,
  githubUrl,
  linkedinUrl,
  ogDefaults,
  twitterDefaults,
} from '@/lib/config';
import { layoutContent } from '@/lib/content/layout';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
});

// latin-ext carries the Polish diacritics the prose needs (ł ą ę ś ż ź ć ó ń).
const plexSans = IBM_Plex_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

const homeTitle =
  'Składanie komputerów Kraków | Strony internetowe | zaruszaj.pl';
const homeDescription =
  'Składanie komputerów na zamówienie w Krakowie - doradztwo, upgrade, pomoc techniczna. Tworzenie nowoczesnych, szybkich stron internetowych. Sprawdź ofertę.';

export const viewport: Viewport = {
  themeColor: '#15111e',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: homeTitle,
    template: '%s | zaruszaj.pl',
  },
  description: homeDescription,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    ...ogDefaults,
    url: siteUrl,
    title: homeTitle,
    description: homeDescription,
  },
  twitter: {
    ...twitterDefaults,
    title: homeTitle,
    description: homeDescription,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'zaruszaj.pl',
  url: siteUrl,
  image: `${siteUrl}/opengraph-image`,
  telephone: sitePhone.replace(/\s+/g, ''),
  email: siteEmail,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kraków',
    addressCountry: 'PL',
  },
  sameAs: [githubUrl, linkedinUrl],
  areaServed: 'Kraków',
  description:
    'Składanie komputerów na zamówienie, upgrade podzespołów i tworzenie stron internetowych w Krakowie.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='pl'
      className={`${spaceMono.variable} ${plexSans.variable}`}
      data-scroll-behavior='smooth'
    >
      <body>
        <a className='cs-skip' href='#cs-main'>
          {layoutContent.header.skipLink}
        </a>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
        <Analytics />
        <SpeedInsights />
        <div className='cs-app'>
          <Header />
          <main id='cs-main' tabIndex={-1} className='cs-main'>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
