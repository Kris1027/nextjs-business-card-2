import { SectionLabel } from '@/components/cosmos/section-label';
import { InquiryForm } from '@/components/sections/inquiry-form/inquiry-form';
import { ContactChannels } from '@/components/sections/contact-channels';
import { services } from '@/lib/services/data';
import { kontaktContent } from '@/lib/content/kontakt';
import { ScrollReveal } from '@/components/cosmos/scroll-reveal';
import styles from './page.module.css';

type Props = { searchParams: Promise<{ service?: string }> };

export default async function KontaktPage({ searchParams }: Props) {
  const { service } = await searchParams;
  const knownSlugs = services.map((s) => s.slug);
  const defaultService = service && knownSlugs.includes(service) ? service : '';

  return (
    <div className='cs-page cs-fade-in'>
      <section className={styles.inquirySection}>
        <ScrollReveal>
          <SectionLabel
            code={kontaktContent.page.inquiry.code}
            title={kontaktContent.page.inquiry.title}
            kicker={kontaktContent.page.inquiry.kicker}
          />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className={styles.inquiryWrap}>
            <InquiryForm defaultService={defaultService} />
          </div>
        </ScrollReveal>
      </section>

      <section>
        <ScrollReveal>
          <SectionLabel
            code={kontaktContent.page.contact.code}
            title={kontaktContent.page.contact.title}
            kicker={kontaktContent.page.contact.kicker}
          />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <ContactChannels />
        </ScrollReveal>
      </section>
    </div>
  );
}
