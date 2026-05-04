import { services } from '@/lib/services/data';
import { ofertaContent } from '@/lib/content/oferta';
import { SectionLabel } from '@/components/cosmos/section-label';
import { ServiceCards } from '@/components/sections/service-cards';

export default function OfertaPage() {
  return (
    <div className='cs-page cs-fade-in'>
      <section>
        <SectionLabel
          code={ofertaContent.page.code}
          title={ofertaContent.page.title}
          kicker={ofertaContent.page.kicker}
        />
        <ServiceCards services={services} variant='detail' />
      </section>
    </div>
  );
}
