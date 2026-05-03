import Link from 'next/link';
import { services } from '@/lib/services/data';
import { siteEmail, sitePhone, siteVersion } from '@/lib/config';
import { navLinks } from '@/lib/nav';
import BrandMark from '@/components/cosmos/brand-mark';
import styles from './footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div>
          <div className={styles.heading}>{'// nawigacja'}</div>
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className={styles.link}>
              <span className={styles.arrow}>↗</span> {l.label}
            </Link>
          ))}
        </div>
        <div>
          <div className={styles.heading}>{'// oferta'}</div>
          {services.map((s) => (
            <Link key={s.slug} href='/oferta' className={styles.link}>
              <span className={styles.arrow}>↗</span> {s.title}
            </Link>
          ))}
        </div>
        <div>
          <div className={styles.heading}>{'// kontakt'}</div>
          <a className={styles.link} href={`mailto:${siteEmail}`}>
            <span className={styles.arrow}>↗</span> {siteEmail}
          </a>
          <a
            className={styles.link}
            href={`tel:${sitePhone.replace(/\s/g, '')}`}
          >
            <span className={styles.arrow}>↗</span> {sitePhone}
          </a>
          <div className={styles.coord}>
            <div>50.0647° N</div>
            <div>19.9450° E</div>
            <div className={styles.coordSub}>{'// Kraków, sektor 7'}</div>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <BrandMark size={20} animated={false} />
        <span>© {new Date().getFullYear()} zaruszaj.pl</span>
        <span className={styles.blink}>●</span>
        <span>SYS_LINK STABLE</span>
        <span className={styles.spacer} />
        <span>{siteVersion}</span>
      </div>
    </footer>
  );
}
