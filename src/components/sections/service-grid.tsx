import Image from 'next/image';
import Link from 'next/link';
import { services } from '@/lib/services/data';
import styles from './service-grid.module.css';

/**
 * The home page's "what I build" strip: one tile per service, image over a
 * bordered caption bar. Static by design - it replaced an auto-rotating
 * carousel, so there is no client JS here.
 */
export function ServiceGrid() {
  return (
    <ul className={styles.grid}>
      {services.map((s) => (
        <li key={s.slug}>
          <Link href={`/oferta/${s.slug}`} className={styles.tile}>
            <div className={styles.media}>
              <Image
                src={s.image}
                alt={s.imageAlt}
                fill
                sizes='(max-width: 700px) 100vw, (max-width: 1024px) 50vw, 25vw'
              />
            </div>
            <div className={styles.caption}>
              <span>{s.title}</span>
              <span className={styles.code}>{s.designation}</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
