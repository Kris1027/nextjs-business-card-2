import { services } from '@/lib/services/data';
import { ofertaContent } from '@/lib/content/oferta';
import { SectionLabel } from '@/components/cosmos/section-label';
import { ServiceCards } from '@/components/sections/service-cards';
import { ScrollReveal } from '@/components/cosmos/scroll-reveal';

export default function OfertaPage() {
  return (
    <div className='cs-page cs-fade-in'>
      <section>
        <ScrollReveal>
          <SectionLabel
            code={ofertaContent.page.code}
            title={ofertaContent.page.title}
            kicker={ofertaContent.page.kicker}
          />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <ServiceCards services={services} variant='detail' />
        </ScrollReveal>
      </section>
    </div>
  );
}
