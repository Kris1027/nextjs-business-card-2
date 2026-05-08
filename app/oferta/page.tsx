import type { Metadata } from 'next';
import { services } from '@/lib/services/data';
import { servicesContent } from '@/lib/content/services';
import { SectionLabel } from '@/components/cosmos/section-label';
import { ServiceCards } from '@/components/sections/service-cards';
import { ScrollReveal } from '@/components/cosmos/scroll-reveal';
import { ogDefaults, twitterDefaults } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Oferta',
  description:
    'Składanie komputerów na zamówienie, upgrade podzespołów, pomoc techniczna i tworzenie stron internetowych w Krakowie. Zobacz pełną ofertę usług.',
  alternates: { canonical: '/oferta' },
  openGraph: {
    ...ogDefaults,
    title: 'Oferta | zaruszaj.pl',
    description:
      'Składanie komputerów na zamówienie, upgrade podzespołów, pomoc techniczna i tworzenie stron internetowych w Krakowie.',
    url: '/oferta',
  },
  twitter: {
    ...twitterDefaults,
    title: 'Oferta | zaruszaj.pl',
    description:
      'Składanie komputerów na zamówienie, upgrade podzespołów, pomoc techniczna i tworzenie stron internetowych w Krakowie.',
  },
};

export default function OfertaPage() {
  return (
    <div className='cs-page cs-fade-in'>
      <section>
        <ScrollReveal>
          <SectionLabel
            code={servicesContent.page.code}
            title={servicesContent.page.title}
            kicker={servicesContent.page.kicker}
          />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <ServiceCards services={services} variant='detail' />
        </ScrollReveal>
      </section>
    </div>
  );
}
