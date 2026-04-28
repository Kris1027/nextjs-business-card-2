import { services } from '@/lib/services-data'
import PageWrapper from '@/components/layout/page-wrapper'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

type ServiceDetailPageProps = {
  params: Promise<{ slug: string }>
}

export const generateStaticParams = () => services.map(service => ({ slug: service.slug }))

export const generateMetadata = async ({ params }: ServiceDetailPageProps): Promise<Metadata> => {
  const { slug } = await params
  const service = services.find(s => s.slug === slug)
  if (!service) return {}
  return { title: service.title }
}

const ServiceDetailPage = async ({ params }: ServiceDetailPageProps) => {
  const { slug } = await params
  const service = services.find(s => s.slug === slug)

  if (!service) notFound()

  const { title, description, features, Icon, image, imageAlt } = service

  return (
    <PageWrapper>
      <Link href='/oferta' className='block text-sm text-blue-400 hover:text-blue-300 mb-4'>
        ← Oferta
      </Link>

      <div className='relative aspect-video'>
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes='(max-width: 1280px) 100vw, 1280px'
          className='object-cover rounded-lg'
          priority
        />
      </div>

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
