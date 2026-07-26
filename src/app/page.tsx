import PrebuildImage from '@public/prebuild-1.webp';
import { services } from '@/lib/services/data';
import { homeContent } from '@/lib/content/home';
import { SectionLabel } from '@/components/ui/section-label';
import { ImageFrame } from '@/components/ui/image-frame';
import { ServiceGrid } from '@/components/sections/service-grid';
import { ServiceCards } from '@/components/sections/service-cards';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { HeroSection } from '@/components/sections/hero-section';
import { CosmicButton } from '@/components/ui/cosmic-button';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <div className='cs-page cs-fade-in'>
      <HeroSection />

      <section>
        <ScrollReveal>
          <SectionLabel
            code={homeContent.uslugi.code}
            title={homeContent.uslugi.title}
            kicker={homeContent.uslugi.kicker}
          />
        </ScrollReveal>
        <ScrollReveal>
          <ServiceGrid />
        </ScrollReveal>
      </section>

      <section>
        <ScrollReveal>
          <SectionLabel
            code={homeContent.oferta.code}
            title={homeContent.oferta.title}
            kicker={homeContent.oferta.kicker}
          />
        </ScrollReveal>
        <ServiceCards services={services} />
      </section>

      <section className={styles.callout}>
        <ScrollReveal>
          <ImageFrame
            src={PrebuildImage}
            alt={homeContent.callout.imageAlt}
            ratio='var(--frame-ratio)'
          />
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <div className={styles.calloutBody}>
            {/* These two labels used to sit on the image frame's overlay; the
                flat design has no such overlay, so they move into the warning
                pill rather than being dropped. */}
            <div className={styles.calloutBadge}>
              <span>WARNING-001</span>
              <span className={styles.calloutBadgeLabel}>Pre-built risk</span>
            </div>
            <h2>
              {homeContent.callout.heading.before}{' '}
              <em>{homeContent.callout.heading.em}</em>.
            </h2>
            <p>{homeContent.callout.body1}</p>
            <p>{homeContent.callout.body2}</p>
            <div className={styles.calloutCta}>
              <CosmicButton href='/kontakt' variant='primary'>
                {homeContent.callout.cta}
              </CosmicButton>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
