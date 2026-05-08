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
} from '@/lib/config';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Składanie komputerów Kraków | Strony internetowe | zaruszaj.pl',
    template: '%s | zaruszaj.pl',
  },
  description:
    'Składanie komputerów na zamówienie Kraków - doradztwo sprzętowe, upgrade i pomoc techniczna. Tworzenie nowoczesnych stron internetowych dla firm i klientów indywidualnych.',
  keywords: [
    'składanie komputerów Kraków',
    'komputer na zamówienie Kraków',
    'upgrade komputera Kraków',
    'serwis komputerowy Kraków',
    'tworzenie stron internetowych Kraków',
  ],
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
    type: 'website',
    locale: 'pl_PL',
    url: siteUrl,
    siteName: 'zaruszaj.pl',
    title: {
      default: 'Składanie komputerów Kraków | Strony internetowe | zaruszaj.pl',
      template: '%s | zaruszaj.pl',
    },
    description:
      'Składanie komputerów na zamówienie Kraków - doradztwo sprzętowe, upgrade i pomoc techniczna. Tworzenie nowoczesnych stron internetowych dla firm i klientów indywidualnych.',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      default: 'Składanie komputerów Kraków | Strony internetowe | zaruszaj.pl',
      template: '%s | zaruszaj.pl',
    },
    description:
      'Składanie komputerów na zamówienie Kraków - doradztwo sprzętowe, upgrade i pomoc techniczna. Tworzenie nowoczesnych stron internetowych.',
    images: ['/opengraph-image'],
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
          <main className='cs-main'>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
