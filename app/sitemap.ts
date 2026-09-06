import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          en: `${SITE_URL}/?lang=en`,
          fr: `${SITE_URL}/?lang=fr`,
          es: `${SITE_URL}/?lang=es`,
          ar: `${SITE_URL}/?lang=ar`,
          'x-default': `${SITE_URL}/?lang=en`,
        },
      },
    },
    {
      url: `${SITE_URL}/gallery`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${SITE_URL}/gallery?lang=en`,
          fr: `${SITE_URL}/gallery?lang=fr`,
          es: `${SITE_URL}/gallery?lang=es`,
          ar: `${SITE_URL}/gallery?lang=ar`,
          'x-default': `${SITE_URL}/gallery?lang=en`,
        },
      },
    },
  ]
}
