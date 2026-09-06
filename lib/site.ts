export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://riadtadarte.com'

export const LOCALES = ['en', 'fr', 'es', 'ar'] as const
export type SiteLocale = (typeof LOCALES)[number]
