import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Riad Tadarte',
    short_name: 'Tadarte',
    description: 'Authentic guest house in Merzouga at the gates of the Sahara.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fafaf9',
    theme_color: '#fafaf9',
    lang: 'en',
    icons: [
      { src: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png' },
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    id: SITE_URL,
  }
}
