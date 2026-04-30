import { services } from '@/lib/services-data'
import SectionLabel from '@/components/cosmos/section-label'
import ServiceCards from '@/components/home/service-cards'

export default function OfertaPage() {
  return (
    <div className='cs-page cs-fade-in'>
      <section>
        <SectionLabel code='// 03' title='Oferta' kicker='Cztery moduły gotowe do uruchomienia' />
        <ServiceCards services={services} showFullDescription />
      </section>
    </div>
  )
}
