import { services } from '@/lib/services/data';
import { ofertaContent } from '@/lib/content/oferta';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionLabel } from '@/components/cosmos/section-label';
import { GlowFrame } from '@/components/cosmos/glow-frame';
import { CosmicButton } from '@/components/cosmos/cosmic-button';
import styles from './page.module.css';

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () =>
  services.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};
  return { title: s.title };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();

  const idx = services.findIndex((x) => x.slug === slug);
  const next = services[(idx + 1) % services.length];

  return (
    <div className='cs-page cs-fade-in'>
      <section>
        <Link href='/oferta' className={styles.breadcrumb}>
          ← <span>{ofertaContent.detail.breadcrumb}</span> /{' '}
          <span className={styles.breadcrumbCurrent}>{s.designation}</span>
        </Link>

        <div className={styles.hero}>
          <div>
            <div className={styles.glyphRow}>
              <span className={styles.glyphIcon}>{s.glyph}</span>
              <span className={styles.glyphLabel}>{s.designation}</span>
            </div>
            <h1 className={styles.title}>{s.title}</h1>
            <p className={styles.lead}>{s.shortDescription}</p>
            <div className={styles.meta}>
              <div>
                <div className={styles.metaKey}>
                  {ofertaContent.detail.meta.timeKey}
                </div>
                <div className={styles.metaVal}>{s.timeNote}</div>
              </div>
              <div>
                <div className={styles.metaKey}>
                  {ofertaContent.detail.meta.pricingKey}
                </div>
                <div className={styles.metaVal}>{s.pricingNote}</div>
              </div>
            </div>
            <div className={styles.heroBtns}>
              <CosmicButton
                href={`/kontakt?service=${s.slug}`}
                variant='primary'
              >
                {ofertaContent.detail.btns.inquire}
              </CosmicButton>
              <CosmicButton href='/oferta' arrow='↗'>
                {ofertaContent.detail.btns.allServices}
              </CosmicButton>
            </div>
          </div>
          <div className={styles.heroImg}>
            <GlowFrame
              src={s.image}
              alt={s.imageAlt}
              ratio='4/5'
              designation={s.designation}
              label={s.title}
              priority
            />
          </div>
        </div>
      </section>

      <section>
        <SectionLabel
          code={ofertaContent.detail.sections.opis.code}
          title={ofertaContent.detail.sections.opis.title}
          kicker={ofertaContent.detail.sections.opis.kicker}
        />
        <p className={styles.longDescription}>{s.longDescription}</p>
        <ul className={styles.features}>
          {s.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </section>

      <section>
        <SectionLabel
          code={ofertaContent.detail.sections.proces.code}
          title={ofertaContent.detail.sections.proces.title}
          kicker={ofertaContent.detail.sections.proces.kicker}
        />
        <ol className={styles.process}>
          {s.process.map(([n, t, d]) => (
            <li key={n} className={styles.processStep}>
              <div className={styles.processNum}>{n}</div>
              <div>
                <div className={styles.processTitle}>{t}</div>
                <div className={styles.processDesc}>{d}</div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <SectionLabel
          code={ofertaContent.detail.sections.efekt.code}
          title={ofertaContent.detail.sections.efekt.title}
          kicker={ofertaContent.detail.sections.efekt.kicker}
        />
        <div className={styles.deliverables}>
          {s.deliverables.map((d, i) => (
            <div key={i} className={styles.delivItem}>
              <span className={styles.delivMark}>◇</span>
              <span>{d}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <div>
          <div className={styles.ctaKicker}>
            {ofertaContent.detail.cta.kicker}
          </div>
          <h3>{ofertaContent.detail.cta.heading}</h3>
          <p>{ofertaContent.detail.cta.body}</p>
        </div>
        <div className={styles.ctaBtns}>
          <CosmicButton href={`/kontakt?service=${s.slug}`} variant='primary'>
            {ofertaContent.detail.cta.primary}
          </CosmicButton>
          <CosmicButton href={`/oferta/${next.slug}`} arrow='↗'>
            {ofertaContent.detail.cta.next} {next.designation}
          </CosmicButton>
        </div>
      </section>
    </div>
  );
}
