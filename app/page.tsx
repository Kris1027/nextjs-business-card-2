import Link from 'next/link'
import PrebuildImage from '@/public/prebuild-1.webp'
import { services } from '@/lib/services-data'
import SectionLabel from '@/components/cosmos/section-label'
import GlowFrame from '@/components/cosmos/glow-frame'
import HomeCarousel from '@/components/home/home-carousel'
import ServiceCards from '@/components/home/service-cards'

export default function HomePage() {
  return (
    <div className='cs-page cs-fade-in'>
      {/* HERO */}
      <section className='cs-hero'>
        <div className='cs-hero-meta'>
          <span className='cs-hero-meta-dot' />
          <span>SYSTEM ONLINE — KRK / 50.06°N 19.94°E</span>
          <span className='cs-hero-meta-line' />
          <span>v.4.26</span>
        </div>
        <h1>
          <span className='reveal'>Składam</span> <span className='reveal accent'>komputery</span>
          <br />
          <span className='reveal'>i&nbsp;tworzę</span>{' '}
          <span className='reveal accent'>strony</span>
          <span className='reveal'>.</span>
        </h1>
        <p className='cs-hero-tag'>
          Z Krakowa, dla Ciebie. Dobieram komponenty, składam zestawy, konfiguruję systemy i piszę
          nowoczesne strony — od pierwszego pomysłu po działający produkt.
        </p>
        <div className='cs-hero-cta'>
          <Link href='/oferta' className='btn-cosmic primary'>
            Zobacz ofertę <span className='arrow'>→</span>
          </Link>
          <Link href='/kontakt' className='btn-cosmic'>
            Skontaktuj się <span className='arrow'>↗</span>
          </Link>
        </div>
      </section>

      {/* CAROUSEL */}
      <section>
        <SectionLabel code='// 01' title='Co buduję' kicker='Wybrane usługi w transmisji na żywo' />
        <HomeCarousel />
      </section>

      {/* SERVICES */}
      <section>
        <SectionLabel code='// 02' title='Pełna oferta' kicker='Cztery moduły, jeden inżynier' />
        <ServiceCards services={services} />
      </section>

      {/* CALLOUT */}
      <section className='cs-callout'>
        <GlowFrame
          src={PrebuildImage}
          alt='PC z RGB'
          ratio='4/3'
          designation='WARNING-001'
          label='Pre-built risk'
        />
        <div className='cs-callout-body'>
          <h3>
            Nie kupuj gotowców <em>PC</em>.
          </h3>
          <p>
            Gotowe zestawy komputerowe to często strata pieniędzy. Sklepy montują w nich źle dobrane
            komponenty, a bardzo często wykorzystują części, które zalegają na magazynie. Efekt?
            Słabsza wydajność i brak sensownej rozbudowy.
          </p>
          <p>
            Za cenę gotowca złożę komputer znacznie wydajniejszy, idealnie dopasowany do Twoich
            potrzeb i budżetu. Napisz — doradzę i złożę lepszy zestaw.
          </p>
          <div style={{ marginTop: 22 }}>
            <Link href='/kontakt' className='btn-cosmic primary'>
              Napisz do mnie <span className='arrow'>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
