import { services } from '@/lib/services';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import SectionLabel from '@/components/cosmos/section-label';
import GlowFrame from '@/components/cosmos/glow-frame';

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
        <Link href='/oferta' className='cs-breadcrumb'>
          ← <span>Oferta</span> /{' '}
          <span style={{ color: 'var(--ink-1)' }}>{s.designation}</span>
        </Link>

        <div className='cs-detail-hero'>
          <div className='cs-detail-hero-body'>
            <div className='cs-detail-glyph-row'>
              <span className='cs-service-glyph' style={{ fontSize: 44 }}>
                {s.glyph}
              </span>
              <span className='cs-service-desig'>{s.designation}</span>
            </div>
            <h1 className='cs-detail-title'>{s.title}</h1>
            <p className='cs-detail-lead'>{s.shortDescription}</p>
            <div className='cs-detail-meta'>
              <div>
                <div className='cs-detail-meta-k'>{'// czas realizacji'}</div>
                <div className='cs-detail-meta-v'>{s.timeNote}</div>
              </div>
              <div>
                <div className='cs-detail-meta-k'>{'// rozliczenie'}</div>
                <div className='cs-detail-meta-v'>{s.pricingNote}</div>
              </div>
            </div>
            <div
              style={{
                marginTop: 24,
                display: 'flex',
                gap: 12,
                flexWrap: 'wrap',
              }}
            >
              <Link
                href={`/kontakt?service=${s.slug}`}
                className='btn-cosmic primary'
              >
                Zapytaj o tę usługę <span className='arrow'>→</span>
              </Link>
              <Link href='/oferta' className='btn-cosmic'>
                Wszystkie usługi <span className='arrow'>↗</span>
              </Link>
            </div>
          </div>
          <div className='cs-detail-hero-img'>
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
        <p className='cs-detail-long'>{s.longDescription}</p>
        <ul className='cs-detail-features'>
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
        <ol className='cs-process'>
          {s.process.map(([n, t, d]) => (
            <li key={n} className='cs-process-step'>
              <div className='cs-process-num'>{n}</div>
              <div>
                <div className='cs-process-title'>{t}</div>
                <div className='cs-process-desc'>{d}</div>
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
        <div className='cs-deliverables'>
          {s.deliverables.map((d, i) => (
            <div key={i} className='cs-deliv-item'>
              <span className='cs-deliv-mark'>◇</span>
              <span>{d}</span>
            </div>
          ))}
        </div>
      </section>

      <section className='cs-detail-cta'>
        <div>
          <div
            style={{
              fontSize: 11,
              color: 'var(--acc)',
              letterSpacing: '0.16em',
              marginBottom: 10,
            }}
          >
            {'// gotowy?'}
          </div>
          <h3
            style={{
              fontSize: 'clamp(22px, 3vw, 32px)',
              color: 'var(--ink-0)',
              marginBottom: 12,
            }}
          >
            Otwórz kanał komunikacji.
          </h3>
          <p style={{ color: 'var(--ink-2)', maxWidth: 520, lineHeight: 1.6 }}>
            Napisz krótko czego potrzebujesz — odpiszę najczęściej tego samego
            dnia z konkretną wyceną i terminem.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link
            href={`/kontakt?service=${s.slug}`}
            className='btn-cosmic primary'
          >
            Skontaktuj się <span className='arrow'>→</span>
          </Link>
          <Link href={`/oferta/${next.slug}`} className='btn-cosmic'>
            Następna: {next.designation} <span className='arrow'>↗</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
