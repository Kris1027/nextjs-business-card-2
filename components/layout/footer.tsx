import Link from 'next/link'
import { services } from '@/lib/services-data'
import BrandMark from '@/components/cosmos/brand-mark'

const NAV_LINKS = [
  { href: '/', label: 'Strona Główna' },
  { href: '/o-mnie', label: 'O mnie' },
  { href: '/oferta', label: 'Oferta' },
  { href: '/kontakt', label: 'Kontakt' },
]

export default function Footer() {
  return (
    <footer className='cs-footer'>
      <div className='cs-footer-grid'>
        <div>
          <div className='cs-foot-h'>{'// nawigacja'}</div>
          {NAV_LINKS.map(l => (
            <Link key={l.href} href={l.href} className='cs-foot-link'>
              <span className='cs-foot-arrow'>↗</span> {l.label}
            </Link>
          ))}
        </div>
        <div>
          <div className='cs-foot-h'>{'// oferta'}</div>
          {services.map(s => (
            <Link key={s.slug} href='/oferta' className='cs-foot-link'>
              <span className='cs-foot-arrow'>↗</span> {s.title}
            </Link>
          ))}
        </div>
        <div>
          <div className='cs-foot-h'>{'// kontakt'}</div>
          <a className='cs-foot-link' href='mailto:kris1027.dev@gmail.com'>
            <span className='cs-foot-arrow'>↗</span> kris1027.dev@gmail.com
          </a>
          <a className='cs-foot-link' href='tel:+48792542841'>
            <span className='cs-foot-arrow'>↗</span> +48 792 542 841
          </a>
          <div className='cs-foot-coord'>
            <div>50.0647° N</div>
            <div>19.9450° E</div>
            <div className='cs-foot-coord-sub'>{'// Kraków, sektor 7'}</div>
          </div>
        </div>
      </div>
      <div className='cs-foot-bottom'>
        <BrandMark size={20} animated={false} />
        <span>© {new Date().getFullYear()} zaruszaj.pl</span>
        <span className='cs-foot-blink'>●</span>
        <span>SYS_LINK STABLE</span>
        <span className='cs-foot-spacer' />
        <span>v.4.26.04</span>
      </div>
    </footer>
  )
}
