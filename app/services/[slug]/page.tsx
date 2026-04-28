import { services } from '@/lib/services-data'
import PageWrapper from '@/components/layout/page-wrapper'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

type ServiceDetailPageProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ from?: string }>
}

export const generateStaticParams = () => services.map(service => ({ slug: service.slug }))

export const generateMetadata = async ({ params }: ServiceDetailPageProps): Promise<Metadata> => {
  const { slug } = await params
  const service = services.find(s => s.slug === slug)
  if (!service) return {}
  return { title: service.title }
}

const backDestinations = {
  home: { href: '/', label: '← Strona Główna' },
  services: { href: '/services', label: '← Usługi' },
} as const

const ServiceDetailPage = async ({ params, searchParams }: ServiceDetailPageProps) => {
  const [{ slug }, { from }] = await Promise.all([params, searchParams])
  const service = services.find(s => s.slug === slug)

  if (!service) notFound()

  const { title, description, features, Icon } = service
  const back = backDestinations[from as keyof typeof backDestinations] ?? backDestinations.services

  return (
    <PageWrapper>
      <Link href={back.href} className='block text-sm text-blue-400 hover:text-blue-300 mb-4'>
        {back.label}
      </Link>

      <div className='flex items-center gap-3'>
        <Icon size={32} className='text-blue-400 shrink-0' />
        <h1 className='text-2xl font-bold text-gray-300'>{title}</h1>
      </div>

      <p className='text-gray-400'>{description}</p>

      <ul className='space-y-2'>
        {features.map(feature => (
          <li key={feature} className='text-gray-400'>
            — {feature}
          </li>
        ))}
      </ul>

      {/* Add more content here */}
    </PageWrapper>
  )
}

export default ServiceDetailPage
