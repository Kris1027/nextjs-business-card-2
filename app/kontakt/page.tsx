import SectionLabel from '@/components/cosmos/section-label';
import InquiryForm from '@/components/sections/inquiry-form/inquiry-form';
import ContactChannels from '@/components/sections/contact-channels';
import { services } from '@/lib/services/data';
import styles from './page.module.css';

type Props = { searchParams: Promise<{ service?: string }> };

export default async function KontaktPage({ searchParams }: Props) {
  const { service } = await searchParams;
  const knownSlugs = services.map((s) => s.slug);
  const defaultService = service && knownSlugs.includes(service) ? service : '';

  return (
    <div className='cs-page cs-fade-in'>
      <section>
        <SectionLabel
          code='// 04'
          title='Kontakt'
          kicker='Otwórz kanał komunikacji — odpowiem szybko'
        />
        <ContactChannels />
      </section>

      <section className={styles.inquirySection}>
        <SectionLabel
          code='// MSG'
          title='Wyślij zapytanie'
          kicker='Opisz swój projekt — odpowiem w ciągu 24 godzin'
        />
        <div className={styles.inquiryWrap}>
          <InquiryForm defaultService={defaultService} />
        </div>
      </section>
    </div>
  );
}
