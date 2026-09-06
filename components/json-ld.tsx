import { siteConfig } from '@/config/site'
import { SITE_URL } from '@/lib/site'

export function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: siteConfig.siteName,
    description:
      'Authentic guest house in Merzouga, Morocco. Moroccan hospitality, comfortable rooms, and Sahara experiences.',
    url: SITE_URL,
    image: `${SITE_URL}/images/hero-camel.jpg`,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Hassi Labied',
      addressLocality: 'Merzouga',
      postalCode: '52202',
      addressRegion: 'Draa-Tafilalet',
      addressCountry: 'MA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 31.1418733,
      longitude: -4.0275585,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: siteConfig.googleMapsRating,
      bestRating: '5',
      ratingCount: '50',
    },
    sameAs: [
      siteConfig.facebookUrl,
      siteConfig.instagramUrl,
      siteConfig.tripadvisorUrl,
      siteConfig.googleMapsUrl,
      siteConfig.bookingUrl,
    ],
    priceRange: '$$',
    currenciesAccepted: 'MAD, EUR, USD',
    availableLanguage: ['en', 'fr', 'es', 'ar'],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
