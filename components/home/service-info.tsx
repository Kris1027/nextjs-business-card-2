import { services } from '@/lib/services-data'
import type { Service } from '@/lib/services-data'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type ServiceInfoProps = {
  variant?: 'compact' | 'enhanced'
}

const CompactCard = ({
  title,
  shortDescription,
  slug,
}: Pick<Service, 'title' | 'shortDescription' | 'slug'>) => (
  <div className='flex flex-col justify-between gap-2 h-full bg-gray-700 p-4 rounded-lg'>
    <h2 className='font-bold text-lg text-gray-300'>{title}</h2>
    <p className='text-sm text-gray-400'>{shortDescription}</p>
    <Link className='text-blue-400' href={`/services/${slug}?from=home`}>
      Czytaj więcej...
    </Link>
  </div>
)

const EnhancedCard = ({
  title,
  description,
  features,
  slug,
  Icon,
}: Omit<Service, 'shortDescription'>) => (
  <div className='flex flex-col gap-4 bg-gray-700 p-6 rounded-lg'>
    <div className='flex items-center gap-3'>
      <Icon size={28} className='text-blue-400 shrink-0' />
      <h2 className='font-bold text-lg text-gray-300'>{title}</h2>
    </div>
    <p className='text-sm text-gray-400'>{description}</p>
    <ul className='space-y-1.5'>
      {features.map(feature => (
        <li
          key={feature}
          className='text-sm text-gray-400 before:content-["–"] before:mr-2 before:text-blue-400'
        >
          {feature}
        </li>
      ))}
    </ul>
    <Link
      href={`/services/${slug}?from=services`}
      className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'mt-auto self-start')}
    >
      Czytaj więcej
    </Link>
  </div>
)

const ServiceInfo = ({ variant = 'compact' }: ServiceInfoProps) => {
  if (variant === 'enhanced') {
    return (
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {services.map(service => (
          <EnhancedCard key={service.slug} {...service} />
        ))}
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      {services.map(({ title, shortDescription, slug }) => (
        <CompactCard key={slug} title={title} shortDescription={shortDescription} slug={slug} />
      ))}
    </div>
  )
}

export default ServiceInfo
