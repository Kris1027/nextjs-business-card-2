import Image from 'next/image';
import ProfileImage from '@/public/profile-1.webp';
import { SectionLabel } from '@/components/cosmos/section-label';
import { githubUrl, linkedinUrl } from '@/lib/config';
import { aboutContent } from '@/lib/content/about';
import { sharedContent } from '@/lib/content/shared';
import { GithubIcon, LinkedinIcon } from '@/components/cosmos/icons';
import { CosmicButton } from '@/components/cosmos/cosmic-button';
import { SocialLink } from '@/components/cosmos/social-link';
import { ScrollReveal } from '@/components/cosmos/scroll-reveal';
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
        <div className={styles.aboutGrid}>
          <ScrollReveal>
            <div className={styles.portrait}>
              <div className={styles.ring} />
              <div className={styles.ring} />
              <div className={styles.photo}>
                <Image
                  src={ProfileImage}
                  alt={aboutContent.profile.imageAlt}
                  fill
                  sizes='240px'
                />
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className={styles.body}>
              <div className={styles.role}>{aboutContent.profile.role}</div>
              <div className={styles.name}>{aboutContent.profile.name}</div>
              <div className={styles.socialLinks}>
                <SocialLink
                  href={githubUrl}
                  icon={<GithubIcon />}
                  label='GitHub'
                  showLabel
                  className={styles.socialBtn}
                />
                <SocialLink
                  href={linkedinUrl}
                  icon={<LinkedinIcon />}
                  label='LinkedIn'
                  showLabel
                  className={styles.socialBtn}
                />
              </div>
              <p className={styles.bio}>{aboutContent.profile.bio}</p>
              <div className={styles.bodyBtns}>
                <CosmicButton href='/oferta'>
                  {sharedContent.cta.seeOffer}
                </CosmicButton>
                <CosmicButton href='/kontakt' arrow='↗'>
                  {aboutContent.profile.btnKontakt}
                </CosmicButton>
              </div>
            </div>
          </ScrollReveal>
        </div>
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
