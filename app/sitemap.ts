import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/config';

const lastModified = new Date('2026-05-08');

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/oferta`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/o-mnie`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/kontakt`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
