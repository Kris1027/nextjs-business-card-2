import { services } from '@/lib/services'
import SectionLabel from '@/components/cosmos/section-label'
import ServiceCards from '@/components/sections/service-cards'

export default function OfertaPage() {
  return (
    <div className='cs-page cs-fade-in'>
      <section>
        <SectionLabel code='// 03' title='Oferta' kicker='Cztery moduły gotowe do uruchomienia' />
        <ServiceCards services={services} variant='detail' />
      </section>
    </div>
  )
}
