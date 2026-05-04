import Link from 'next/link';
import PrebuildImage from '@/public/prebuild-1.webp';
import { services } from '@/lib/services/data';
import { SectionLabel } from '@/components/cosmos/section-label';
import { GlowFrame } from '@/components/cosmos/glow-frame';
import { HomeCarousel } from '@/components/sections/carousel';
import { ServiceCards } from '@/components/sections/service-cards';
import { ScrollReveal } from '@/components/cosmos/scroll-reveal';
import { HeroSection } from '@/components/sections/hero-section';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <div className='cs-page cs-fade-in'>
      <HeroSection />

      <section>
        <ScrollReveal>
          <SectionLabel
            code='// 01'
            title='Co buduję'
            kicker='Wybrane usługi w transmisji na żywo'
          />
        </ScrollReveal>
        <HomeCarousel />
      </section>

      <section>
        <ScrollReveal>
          <SectionLabel
            code='// 02'
            title='Pełna oferta'
            kicker='Cztery moduły, jeden inżynier'
          />
        </ScrollReveal>
        <ServiceCards services={services} />
      </section>

      <section className={styles.callout}>
        <ScrollReveal>
          <GlowFrame
            src={PrebuildImage}
            alt='PC z RGB'
            ratio='4/3'
            designation='WARNING-001'
            label='Pre-built risk'
          />
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <div className={styles.calloutBody}>
            <h3>
              Nie kupuj gotowców <em>PC</em>.
            </h3>
            <p>
              Gotowe zestawy komputerowe to często strata pieniędzy. Sklepy
              montują w nich źle dobrane komponenty, a bardzo często
              wykorzystują części, które zalegają na magazynie. Efekt? Słabsza
              wydajność i brak sensownej rozbudowy.
            </p>
            <p>
              Za cenę gotowca złożę komputer znacznie wydajniejszy, idealnie
              dopasowany do Twoich potrzeb i budżetu. Napisz — doradzę i złożę
              lepszy zestaw.
            </p>
            <div className={styles.calloutCta}>
              <Link href='/kontakt' className='btn-cosmic primary'>
                Napisz do mnie <span className='arrow'>→</span>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
