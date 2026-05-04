import { services } from '@/lib/services/data';
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
          ← <span>Oferta</span> /{' '}
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
                <div className={styles.metaKey}>{'// czas realizacji'}</div>
                <div className={styles.metaVal}>{s.timeNote}</div>
              </div>
              <div>
                <div className={styles.metaKey}>{'// rozliczenie'}</div>
                <div className={styles.metaVal}>{s.pricingNote}</div>
              </div>
            </div>
            <div className={styles.heroBtns}>
              <CosmicButton
                href={`/kontakt?service=${s.slug}`}
                variant='primary'
              >
                Zapytaj o tę usługę
              </CosmicButton>
              <CosmicButton href='/oferta' arrow='↗'>
                Wszystkie usługi
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
          code='// opis'
          title='Co dostajesz'
          kicker='Pełny zakres tej usługi'
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
          code='// proces'
          title='Jak pracuję'
          kicker='Krok po kroku, bez niespodzianek'
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
          code='// efekt'
          title='Co dostajesz na koniec'
          kicker='Konkretne deliverables'
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
          <div className={styles.ctaKicker}>{'// gotowy?'}</div>
          <h3>Otwórz kanał komunikacji.</h3>
          <p>
            Napisz krótko czego potrzebujesz — odpiszę najczęściej tego samego
            dnia z konkretną wyceną i terminem.
          </p>
        </div>
        <div className={styles.ctaBtns}>
          <CosmicButton href={`/kontakt?service=${s.slug}`} variant='primary'>
            Skontaktuj się
          </CosmicButton>
          <CosmicButton href={`/oferta/${next.slug}`} arrow='↗'>
            Następna: {next.designation}
          </CosmicButton>
        </div>
      </section>
    </div>
  );
}
