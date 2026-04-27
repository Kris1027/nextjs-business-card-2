import Link from 'next/link'

type ServiceInfoProps = {
  title: string
  description: string
  link: string
}

const ServiceInfoItem = ({ title, description, link }: ServiceInfoProps) => {
  return (
    <div className='flex flex-col justify-between gap-2 h-full bg-gray-700 p-4 rounded-lg'>
      <h2 className='font-bold text-lg text-gray-300'>{title}</h2>
      <p className='text-sm text-gray-400'>{description}</p>
      <Link className='text-blue-400' href={link}>
        Czytaj więcej...
      </Link>
    </div>
  )
}

const ServiceInfo = () => {
  return (
    <div className='space-y-4'>
      <ServiceInfoItem
        title='Doradztwo w doborze sprzętu'
        description='Skład komponentów dopasowany do Ciebie'
        link='/'
      />
      <ServiceInfoItem
        title='Składanie komputerów'
        description='Składam komputery na gotowo i ogarniam całą konfigurację'
        link='/'
      />
      <ServiceInfoItem
        title='Tworzenie stron internetowych'
        description='Strony, które są szybkie, czytelne i skuteczne'
        link='/'
      />
      <ServiceInfoItem
        title='Pomoc techniczna i konfiguracja systemu'
        description='Gdy komputer sprawia problemy, zajmuję się tym za Ciebie'
        link='/'
      />
    </div>
  )
}

export default ServiceInfo
