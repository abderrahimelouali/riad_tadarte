import { Analytics } from '@vercel/analytics/next'
import { Cormorant_Garamond, DM_Mono, Inter, Noto_Naskh_Arabic } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import { JsonLd } from '@/components/json-ld'
import { SITE_URL } from '@/lib/site'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-dm-mono',
  display: 'swap',
})

const arabic = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  weight: ['400', '600'],
  variable: '--font-arabic',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Riad Tadarte — Guest House in Merzouga, Morocco',
    template: '%s | Riad Tadarte',
  },
  description:
    'Stay at Riad Tadarte in Hassi Labied, Merzouga. Authentic Moroccan hospitality, comfortable rooms, Sahara desert experiences. Book direct via WhatsApp.',
  applicationName: 'Riad Tadarte',
  authors: [{ name: 'Riad Tadarte' }],
  creator: 'Riad Tadarte',
  publisher: 'Riad Tadarte',
  category: 'travel',
  alternates: {
    canonical: '/',
    languages: {
      en: '/?lang=en',
      fr: '/?lang=fr',
      es: '/?lang=es',
      ar: '/?lang=ar',
      'x-default': '/?lang=en',
    },
  },
  keywords: [
    'Riad Tadarte',
    'Merzouga',
    'Hassi Labied',
    'Sahara',
    'Morocco guest house',
    'desert hotel',
    'camel trek Merzouga',
    'riad Morocco',
  ],
  openGraph: {
    title: 'Riad Tadarte — Guest House in Merzouga, Morocco',
    description:
      'Authentic guest house at the gates of the Sahara. Rooms, desert experiences, and warm Moroccan hospitality.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['fr_FR', 'es_ES', 'ar_MA'],
    url: SITE_URL,
    siteName: 'Riad Tadarte',
    images: [{ url: '/images/hero-camel.jpg', width: 869, height: 1024, alt: 'Riad Tadarte Merzouga' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Riad Tadarte — Guest House in Merzouga',
    description: 'Authentic Moroccan guest house at the gates of the Sahara.',
    images: ['/images/hero-camel.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/icon-light-32x32.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#fafaf9',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${cormorant.variable} ${dmMono.variable} ${arabic.variable} antialiased`}
        suppressHydrationWarning
      >
        <JsonLd />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
