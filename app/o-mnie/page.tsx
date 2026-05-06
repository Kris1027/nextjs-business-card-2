import { SectionLabel } from '@/components/cosmos/section-label';
import { aboutContent } from '@/lib/content/about';
import { ScrollReveal } from '@/components/cosmos/scroll-reveal';
import { AboutProfile } from '@/components/about/about-profile';
import styles from './page.module.css';

export default function AboutPage() {
  return (
    <div className='cs-page cs-fade-in'>
      <section>
        <ScrollReveal>
          <SectionLabel
            code={aboutContent.section.code}
            title={aboutContent.section.title}
            kicker={aboutContent.section.kicker}
          />
        </ScrollReveal>
        <AboutProfile />
      </section>

      <section>
        <ScrollReveal>
          <SectionLabel
            code={aboutContent.tech.code}
            title={aboutContent.tech.title}
            kicker={aboutContent.tech.kicker}
          />
        </ScrollReveal>
        <div className={styles.techGrid}>
          {aboutContent.technologies.map(([cat, items], i) => (
            <ScrollReveal key={cat} delay={i * 0.07}>
              <div className={styles.techCat}>
                <div className={styles.techCatName}>{cat}</div>
                <ul>
                  {items.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
