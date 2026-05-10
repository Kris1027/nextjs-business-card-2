import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CosmosBackground } from '@/components/cosmos/background/background';
import { CosmosCursor } from '@/components/cosmos/cursor';
import {
  siteUrl,
  siteEmail,
  sitePhone,
  githubUrl,
  linkedinUrl,
  ogDefaults,
  twitterDefaults,
} from '@/lib/config';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const homeTitle =
  'Składanie komputerów Kraków | Strony internetowe | zaruszaj.pl';
const homeDescription =
  'Składanie komputerów na zamówienie w Krakowie — doradztwo, upgrade, pomoc techniczna. Tworzenie nowoczesnych, szybkich stron internetowych. Sprawdź ofertę.';

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
      className={jetbrainsMono.variable}
      data-scroll-behavior='smooth'
    >
      <body>
        <a className='cs-skip' href='#cs-main'>
          Przejdź do treści
        </a>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
        <Analytics />
        <SpeedInsights />
        <CosmosBackground />
        <CosmosCursor />
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
