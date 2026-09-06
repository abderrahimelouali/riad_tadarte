'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { galleryImages } from '@/config/site'

type Locale = 'fr' | 'en' | 'es' | 'ar'

const BATCH = 24

const pageCopy: Record<
  Locale,
  { dir: 'ltr' | 'rtl'; title: string; subtitle: string; back: string; language: string; loadMore: string }
> = {
  en: {
    dir: 'ltr',
    title: 'Gallery',
    subtitle: 'Every light, every texture, every moment at Riad Tadarte.',
    back: 'Back to home',
    language: 'Language',
    loadMore: 'Load more photos',
  },
  fr: {
    dir: 'ltr',
    title: 'Galerie',
    subtitle: 'Chaque lumière, chaque texture, chaque instant à Riad Tadarte.',
    back: 'Retour à l’accueil',
    language: 'Langue',
    loadMore: 'Voir plus de photos',
  },
  es: {
    dir: 'ltr',
    title: 'Galería',
    subtitle: 'Cada luz, cada textura, cada momento en Riad Tadarte.',
    back: 'Volver al inicio',
    language: 'Idioma',
    loadMore: 'Ver más fotos',
  },
  ar: {
    dir: 'rtl',
    title: 'المعرض',
    subtitle: 'كل ضوء وكل تفاصيل ولحظة في رياض تادارت.',
    back: 'العودة إلى الصفحة الرئيسية',
    language: 'اللغة',
    loadMore: 'تحميل المزيد من الصور',
  },
}

const languages: { code: Locale; label: string; name: string }[] = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'ar', label: 'ع', name: 'العربية' },
]

export default function GalleryPage() {
  const [locale, setLocale] = useState<Locale>('en')
  const [visibleCount, setVisibleCount] = useState(BATCH)
  const t = pageCopy[locale]
  const visible = galleryImages.slice(0, visibleCount)
  const hasMore = visibleCount < galleryImages.length

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const lang = params.get('lang') as Locale | null
    if (lang && pageCopy[lang]) {
      setLocale(lang)
      return
    }
    const saved = window.localStorage.getItem('riad-locale') as Locale | null
    if (saved && pageCopy[saved]) setLocale(saved)
  }, [])

  useEffect(() => {
    window.localStorage.setItem('riad-locale', locale)
    document.documentElement.lang = locale === 'ar' ? 'ar' : locale
    const url = new URL(window.location.href)
    url.searchParams.set('lang', locale)
    window.history.replaceState({}, '', url.toString())
  }, [locale])

  return (
    <div dir={t.dir} className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <Link
            href={`/?lang=${locale}`}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            {t.back}
          </Link>
          <Link href={`/?lang=${locale}`} aria-label="Riad Tadarte" className="relative flex h-12 shrink-0 items-center sm:h-14">
            <Image
              src="/images/logo-nav.png"
              alt="Riad Tadarte Familier"
              width={200}
              height={146}
              className="h-full w-auto object-contain"
              priority
            />
          </Link>
          <div
            className="flex items-center rounded-full border border-border bg-secondary/80 p-0.5"
            role="group"
            aria-label={t.language}
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => setLocale(lang.code)}
                aria-label={lang.name}
                aria-pressed={locale === lang.code}
                className={`min-w-8 rounded-full px-2 py-1.5 text-[10px] font-medium tracking-[0.1em] transition-all ${
                  locale === lang.code
                    ? 'bg-accent text-accent-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-24">
        <p className="eyebrow">Tadarte</p>
        <h1 className="mt-4 font-serif text-4xl tracking-tight md:text-6xl">{t.title}</h1>
        <p className="mt-4 max-w-lg text-muted-foreground">{t.subtitle}</p>

        <div className="mt-14 grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {visible.map((image, i) => (
            <div
              key={image.src}
              className="group relative aspect-square overflow-hidden rounded-xl md:rounded-2xl"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                loading={i < 8 ? 'eager' : 'lazy'}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((n) => Math.min(n + BATCH, galleryImages.length))}
              className="btn-outline"
            >
              {t.loadMore} ({Math.min(BATCH, galleryImages.length - visibleCount)})
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
