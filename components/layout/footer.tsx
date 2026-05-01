import Link from 'next/link';
import { services } from '@/lib/services';
import { siteEmail, sitePhone, siteVersion } from '@/lib/config';
import { navLinks } from '@/lib/nav';
import BrandMark from '@/components/cosmos/brand-mark';

export default function Footer() {
  return (
    <footer className='cs-footer'>
      <div className='cs-footer-grid'>
        <div>
          <div className='cs-foot-h'>{'// nawigacja'}</div>
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className='cs-foot-link'>
              <span className='cs-foot-arrow'>↗</span> {l.label}
            </Link>
          ))}
        </div>
        <div>
          <div className='cs-foot-h'>{'// oferta'}</div>
          {services.map((s) => (
            <Link key={s.slug} href='/oferta' className='cs-foot-link'>
              <span className='cs-foot-arrow'>↗</span> {s.title}
            </Link>
          ))}
        </div>
        <div>
          <div className='cs-foot-h'>{'// kontakt'}</div>
          <a className='cs-foot-link' href={`mailto:${siteEmail}`}>
            <span className='cs-foot-arrow'>↗</span> {siteEmail}
          </a>
          <a
            className='cs-foot-link'
            href={`tel:${sitePhone.replace(/\s/g, '')}`}
          >
            <span className='cs-foot-arrow'>↗</span> {sitePhone}
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
        <span>{siteVersion}</span>
      </div>
    </footer>
  );
}
