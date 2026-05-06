import { SectionLabel } from '@/components/cosmos/section-label';
import { InquiryForm } from '@/components/sections/inquiry-form/inquiry-form';
import { ContactChannels } from '@/components/sections/contact-channels';
import { services } from '@/lib/services/data';
import { contactContent } from '@/lib/content/contact';
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
            code={contactContent.page.inquiry.code}
            title={contactContent.page.inquiry.title}
            kicker={contactContent.page.inquiry.kicker}
          />
        </ScrollReveal>
        <div className={styles.inquiryWrap}>
          <InquiryForm defaultService={defaultService} />
        </div>
      </section>

      <section>
        <ScrollReveal>
          <SectionLabel
            code={contactContent.page.contact.code}
            title={contactContent.page.contact.title}
            kicker={contactContent.page.contact.kicker}
          />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <ContactChannels />
        </ScrollReveal>
      </section>
    </div>
  );
}
