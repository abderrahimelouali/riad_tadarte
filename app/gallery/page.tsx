import type { Metadata } from 'next'
import GalleryPage from './gallery-client'

export const metadata: Metadata = {
  title: 'Photo Gallery',
  description:
    'Browse photos of Riad Tadarte in Merzouga — rooms, patio, desert experiences, and Moroccan hospitality.',
  alternates: {
    canonical: '/gallery',
    languages: {
      en: '/gallery?lang=en',
      fr: '/gallery?lang=fr',
      es: '/gallery?lang=es',
      ar: '/gallery?lang=ar',
      'x-default': '/gallery?lang=en',
    },
  },
  openGraph: {
    title: 'Riad Tadarte Gallery',
    description: 'Photos from our guest house and the Sahara desert around Merzouga.',
    url: '/gallery',
    images: [{ url: '/images/gallery/photo_001.jpg', alt: 'Riad Tadarte gallery' }],
  },
}

export default function Page() {
  return <GalleryPage />
}
