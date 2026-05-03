import SectionLabel from '@/components/cosmos/section-label';
import InquiryForm from '@/components/sections/inquiry-form';
import ContactChannels from '@/components/sections/contact-channels';
import { services } from '@/lib/services/data';

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

      <section className='cs-inquiry-section'>
        <SectionLabel
          code='// MSG'
          title='Wyślij zapytanie'
          kicker='Opisz swój projekt — odpowiem w ciągu 24 godzin'
        />
        <div className='cs-inquiry-wrap'>
          <InquiryForm defaultService={defaultService} />
        </div>
      </section>
    </div>
  );
}
