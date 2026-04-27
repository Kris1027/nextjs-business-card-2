import PrebuildImage from '@/public/prebuild-1.webp'
import Image from 'next/image'

const Hero = () => {
  return (
    <div className='bg-gray-700 rounded-lg'>
      <Image
        src={PrebuildImage}
        className='object-cover rounded-t-lg'
        alt='Środek komputera z podświetleniem RGB'
      />
      <div className='p-4 space-y-4'>
        <h2 className='text-gray-300 font-bold'>Nie kupuj gotowców PC!</h2>
        <p className='text-gray-400'>
          Gotowe zestawy komputerowe to często strata pieniędzy. Sklepy montują w nich źle dobrane
          komponenty, a bardzo często wykorzystują części, które zalegają na magazynie. Efekt?
          Słabsza wydajność i brak sensownej rozbudowy.
        </p>
        <p className='text-gray-400'>
          Za cenę gotowca złożę komputer znacznie wydajniejszy, idealnie dopasowany do Twoich
          potrzeb i budżetu. Napisz - doradzę i złożę lepszy zestaw.
        </p>
      </div>
    </div>
  )
}

export default Hero
