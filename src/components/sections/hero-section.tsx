'use client';

import HeroImage from '@public/pc-1.webp';
import { siteVersion } from '@/lib/config';
import { heroContent } from '@/lib/content/hero';
import { sharedContent } from '@/lib/content/shared';
import { useInView } from '@/hooks/use-in-view';
import { CosmicButton } from '@/components/ui/cosmic-button';
import { ImageFrame } from '@/components/ui/image-frame';
import styles from './hero-section.module.css';

export function HeroSection() {
  const { ref, inView } = useInView();
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`${styles.hero}${inView ? ` ${styles.heroInView}` : ''}`}
    >
      <div className={styles.copy}>
        <div className={styles.meta}>
          <span className={styles.metaDot} />
          <span>{heroContent.meta}</span>
          <span className={styles.metaLine} />
          <span>{siteVersion}</span>
        </div>
        <h1>
          <span className='reveal'>{heroContent.headline.line1.plain}</span>{' '}
          <span className='reveal accent'>
            {heroContent.headline.line1.accent}
          </span>
          <br />
          <span className='reveal'>
            {heroContent.headline.line2.plain}
          </span>{' '}
          <span className='reveal accent'>
            {heroContent.headline.line2.accent}
          </span>
        </h1>
        <p className={styles.tag}>{heroContent.tagline}</p>
        <div className={styles.cta}>
          <CosmicButton href='/oferta' variant='primary'>
            {sharedContent.cta.seeOffer}
          </CosmicButton>
          <CosmicButton href='/kontakt' arrow='↗'>
            {sharedContent.cta.contact}
          </CosmicButton>
        </div>
      </div>

      {/* Reuses the existing alt copy for pc-1.webp from services/data.ts so
          the redesign introduces no new user-facing strings. */}
      <ImageFrame
        src={HeroImage}
        alt='Zestaw komputerowy'
        ratio='4/3'
        priority
        sizes='(max-width: 900px) 100vw, 45vw'
        className={styles.heroImg}
      />
    </section>
  );
}
