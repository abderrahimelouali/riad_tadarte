'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Heart,
  MapPin,
  Menu,
  MessageCircle,
  Shield,
  X,
} from 'lucide-react'
import { experiences, galleryImages, rooms, siteConfig } from '@/config/site'

type Locale = 'fr' | 'en' | 'es' | 'ar'

const copy = {
  fr: {
    dir: 'ltr',
    nav: ['Le Riad', 'Chambres', 'Expériences', 'Galerie', 'Localisation'],
    heroEyebrow: 'Maison d’hôtes · Merzouga · Maroc',
    heroTitle: 'Le désert commence ici.',
    heroText: 'Bienvenue à Riad Tadarte, une adresse authentique où l’hospitalité marocaine rencontre les paysages grandioses du Sahara.',
    reserve: 'Réserver sur WhatsApp',
    discover: 'Découvrir le Riad',
    spirit: 'L’esprit Tadarte',
    introTitle: 'Une maison pensée pour ralentir.',
    intro: 'À Riad Tadarte, nous croyons que les plus beaux voyages sont ceux qui laissent le temps de respirer. Loin du rythme des grandes villes, la maison offre une parenthèse simple et chaleureuse au cœur du sud marocain.',
    intro2: 'Entre lumière dorée, architecture traditionnelle, thé à la menthe et hospitalité marocaine, chaque détail invite à profiter pleinement du moment.',
    facts: ['Hospitalité marocaine', 'Atmosphère authentique', 'Proche du désert', 'Accueil personnalisé'],
    riad: 'Le Riad',
    riadTitle: 'Une maison, une histoire, une hospitalité.',
    architecture: 'Architecture',
    architectureText: 'Une architecture inspirée des traditions du sud marocain, pensée autour de matières naturelles, de lumière et d’espaces qui invitent à la détente.',
    hospitality: 'Hospitalité',
    hospitalityText: 'Notre priorité est de vous accueillir comme des invités, avec simplicité, attention et cette chaleur qui fait partie de l’hospitalité marocaine.',
    atmosphere: 'Atmosphère',
    atmosphereText: 'Le matin commence doucement. Le soir, la lumière transforme les murs et le ciel devient un spectacle à lui seul.',
    rooms: 'Chambres',
    roomsTitle: 'Des chambres pour se retrouver.',
    roomsText: 'Après une journée passée à découvrir le désert, retrouvez le calme d’une chambre pensée pour le repos.',
    capacity: 'Capacité',
    bed: 'Literie',
    amenities: 'Équipements',
    ask: 'Demander les disponibilités',
    rates: 'Voir les tarifs',
    dining: 'Le goût du Maroc',
    diningText: 'Le thé est plus qu’une boisson. C’est un moment de partage, de conversation et d’accueil. Les repas et services de restauration sont à confirmer directement avec la maison.',
    breakfast: 'Petit-déjeuner marocain',
    tea: 'Thé à la menthe',
    local: 'Cuisine locale',
    experiences: 'Expériences',
    experiencesTitle: 'Vivre le Sahara.',
    experiencesText: 'Le désert ne se visite pas seulement. Il se découvre lentement, au rythme de la lumière, du vent et des rencontres.',
    askWhatsapp: 'Demander sur WhatsApp',
    why: 'Pourquoi choisir Riad Tadarte ?',
    reasons: ['Une adresse authentique', 'L’hospitalité marocaine', 'Une immersion dans le désert', 'Une atmosphère paisible', 'Un accueil personnalisé', 'Réservation directe'],
    gallery: 'Fragments de Tadarte.',
    galleryText: 'Quelques instants, quelques lumières, quelques souvenirs.',
    exploreGallery: 'Voir toutes les photos',
    bookNow: 'Réserver maintenant',
    all: 'Tout',
    catRiad: 'Le Riad',
    catRooms: 'Chambres',
    catDesert: 'Désert',
    location: 'Localisation',
    locationTitle: 'Entre oasis et désert.',
    locationText: 'Riad Tadarte se trouve à Merzouga, au Maroc. L’adresse exacte et les informations d’accès sont à confirmer avec la maison.',
    maps: 'Ouvrir dans Google Maps',
    booking: 'Voir la disponibilité sur Booking.com',
    contact: 'Votre séjour commence par un message.',
    contactText: 'Une question sur les chambres, les dates ou votre séjour ? Écrivez-nous directement sur WhatsApp.',
    name: 'Nom',
    arrival: 'Date d’arrivée',
    departure: 'Date de départ',
    adults: 'Adultes',
    children: 'Enfants',
    room: 'Type de chambre',
    message: 'Message',
    continue: 'Continuer sur WhatsApp',
    address: 'Adresse',
    direct: 'Réservation directe',
    footer: 'Maison d’hôtes aux portes du Sahara.',
    confirm: 'Hassi Labied · Merzouga · 52202',
    placeholder: 'Votre message…',
    menu: 'Menu',
    close: 'Fermer',
    language: 'Langue',
    trustFamily: 'Accueil chaleureux',
    trustDirect: 'Réservation directe',
    trustLocation: 'Merzouga, Maroc',
    trustResponse: 'Réponse rapide',
  },
  en: {
    dir: 'ltr',
    nav: ['The Riad', 'Rooms', 'Experiences', 'Gallery', 'Location'],
    heroEyebrow: 'Guest house · Merzouga · Morocco',
    heroTitle: 'The desert begins here.',
    heroText: 'Welcome to Riad Tadarte, an authentic address where Moroccan hospitality meets the grand landscapes of the Sahara.',
    reserve: 'Reserve on WhatsApp',
    discover: 'Discover the Riad',
    spirit: 'The Tadarte spirit',
    introTitle: 'A home designed to slow down.',
    intro: 'At Riad Tadarte, we believe the finest journeys leave room to breathe. Away from the pace of cities, the house offers a simple, warm pause in southern Morocco.',
    intro2: 'Golden light, traditional architecture, mint tea and Moroccan hospitality invite you to be fully present.',
    facts: ['Moroccan hospitality', 'Authentic atmosphere', 'Close to the desert', 'Personal welcome'],
    riad: 'The Riad',
    riadTitle: 'A home, a story, a welcome.',
    architecture: 'Architecture',
    architectureText: 'Architecture inspired by southern Moroccan traditions, shaped by natural materials, light and spaces made for rest.',
    hospitality: 'Hospitality',
    hospitalityText: 'Our priority is to welcome you as a guest, with simplicity, care and the warmth at the heart of Moroccan hospitality.',
    atmosphere: 'Atmosphere',
    atmosphereText: 'Mornings begin slowly. In the evening, light transforms the walls and the sky becomes a spectacle of its own.',
    rooms: 'Rooms',
    roomsTitle: 'Rooms to come back to.',
    roomsText: 'After a day discovering the desert, return to the calm of a room designed for rest.',
    capacity: 'Capacity',
    bed: 'Bedding',
    amenities: 'Amenities',
    ask: 'Ask for availability',
    rates: 'See rates',
    dining: 'The taste of Morocco',
    diningText: 'Tea is more than a drink. It is a moment of sharing, conversation and welcome. Meals and dining services should be confirmed directly with the house.',
    breakfast: 'Moroccan breakfast',
    tea: 'Mint tea',
    local: 'Local cuisine',
    experiences: 'Experiences',
    experiencesTitle: 'Live the Sahara.',
    experiencesText: 'The desert is not simply visited. It is discovered slowly, in the rhythm of light, wind and encounters.',
    askWhatsapp: 'Ask on WhatsApp',
    why: 'Why choose Riad Tadarte?',
    reasons: ['An authentic address', 'Moroccan hospitality', 'Immersion in the desert', 'A peaceful atmosphere', 'A personal welcome', 'Direct booking'],
    gallery: 'Fragments of Tadarte.',
    galleryText: 'A few moments, a few lights, a few memories.',
    exploreGallery: 'View all photos',
    bookNow: 'Book now',
    all: 'All',
    catRiad: 'The Riad',
    catRooms: 'Rooms',
    catDesert: 'Desert',
    location: 'Location',
    locationTitle: 'Between oasis and desert.',
    locationText: 'Riad Tadarte is in Merzouga, Morocco. The exact address and arrival details should be confirmed with the house.',
    maps: 'Open in Google Maps',
    booking: 'Check availability on Booking.com',
    contact: 'Your stay starts with a message.',
    contactText: 'A question about rooms, dates or your stay? Write to us directly on WhatsApp.',
    name: 'Name',
    arrival: 'Arrival date',
    departure: 'Departure date',
    adults: 'Adults',
    children: 'Children',
    room: 'Room type',
    message: 'Message',
    continue: 'Continue on WhatsApp',
    address: 'Address',
    direct: 'Direct booking',
    footer: 'Guest house at the gates of the Sahara.',
    confirm: 'To confirm',
    placeholder: 'Your message…',
    menu: 'Menu',
    close: 'Close',
    language: 'Language',
    trustFamily: 'Warm welcome',
    trustDirect: 'Direct booking',
    trustLocation: 'Merzouga, Morocco',
    trustResponse: 'Fast response',
  },
  ar: {
    dir: 'rtl',
    nav: ['الرياض', 'الغرف', 'التجارب', 'المعرض', 'الموقع'],
    heroEyebrow: 'دار ضيافة · مرزوكة · المغرب',
    heroTitle: 'تبدأ الصحراء من هنا.',
    heroText: 'مرحباً بكم في رياض تادارت، عنوان أصيل تلتقي فيه الضيافة المغربية مع مشاهد الصحراء الكبرى.',
    reserve: 'احجز عبر واتساب',
    discover: 'اكتشف الرياض',
    spirit: 'روح تادارت',
    introTitle: 'بيت صُمم لإبطاء الوقت.',
    intro: 'في رياض تادارت، نؤمن بأن أجمل الرحلات هي التي تترك وقتاً للتنفس. بعيداً عن إيقاع المدن، يمنح البيت استراحة بسيطة ودافئة في جنوب المغرب.',
    intro2: 'بين الضوء الذهبي والعمارة التقليدية وشاي النعناع وكرم الضيافة المغربية، تدعوكم كل التفاصيل للاستمتاع باللحظة.',
    facts: ['ضيافة مغربية', 'أجواء أصيلة', 'قريب من الصحراء', 'استقبال شخصي'],
    riad: 'الرياض',
    riadTitle: 'بيت وحكاية وضيافة.',
    architecture: 'العمارة',
    architectureText: 'عمارة مستوحاة من تقاليد جنوب المغرب، تقوم على المواد الطبيعية والضوء والمساحات المريحة.',
    hospitality: 'الضيافة',
    hospitalityText: 'أولويتنا أن نستقبلكم كضيوف، ببساطة واهتمام ودفء الضيافة المغربية.',
    atmosphere: 'الأجواء',
    atmosphereText: 'تبدأ الصباحات بهدوء. وفي المساء يحول الضوء الجدران إلى لوحة ويصبح السماء عرضاً بحد ذاته.',
    rooms: 'الغرف',
    roomsTitle: 'غرف للراحة واللقاء.',
    roomsText: 'بعد يوم من اكتشاف الصحراء، عودوا إلى هدوء غرفة صممت للراحة.',
    capacity: 'السعة',
    bed: 'الفراش',
    amenities: 'المرافق',
    ask: 'اسأل عن التوفر',
    rates: 'رؤية الأسعار',
    dining: 'نكهة المغرب',
    diningText: 'الشاي أكثر من مشروب؛ إنه لحظة مشاركة وحديث وترحيب. يرجى تأكيد الوجبات وخدمات الطعام مباشرة مع البيت.',
    breakfast: 'فطور مغربي',
    tea: 'شاي بالنعناع',
    local: 'مطبخ محلي',
    experiences: 'التجارب',
    experiencesTitle: 'عِش الصحراء.',
    experiencesText: 'لا تُزار الصحراء فقط، بل تُكتشف ببطء على إيقاع الضوء والريح واللقاءات.',
    askWhatsapp: 'اسأل عبر واتساب',
    why: 'لماذا تختار رياض تادارت؟',
    reasons: ['عنوان أصيل', 'الضيافة المغربية', 'انغماس في الصحراء', 'أجواء هادئة', 'استقبال شخصي', 'حجز مباشر'],
    gallery: 'من تادارت.',
    galleryText: 'لحظات وأضواء وذكريات.',
    exploreGallery: 'عرض كل الصور',
    bookNow: 'احجز الآن',
    all: 'الكل',
    catRiad: 'الرياض',
    catRooms: 'الغرف',
    catDesert: 'الصحراء',
    location: 'الموقع',
    locationTitle: 'بين الواحة والصحراء.',
    locationText: 'يقع رياض تادارت في مرزوكة بالمغرب. يرجى تأكيد العنوان الدقيق ومعلومات الوصول مع البيت.',
    maps: 'افتح في خرائط جوجل',
    booking: 'تحقق من التوفر على Booking.com',
    contact: 'تبدأ إقامتكم برسالة.',
    contactText: 'لديكم سؤال عن الغرف أو التواريخ؟ اكتبوا لنا مباشرة عبر واتساب.',
    name: 'الاسم',
    arrival: 'تاريخ الوصول',
    departure: 'تاريخ المغادرة',
    adults: 'البالغون',
    children: 'الأطفال',
    room: 'نوع الغرفة',
    message: 'رسالة',
    continue: 'تابع عبر واتساب',
    address: 'العنوان',
    direct: 'حجز مباشر',
    footer: 'دار ضيافة على أبواب الصحراء.',
    confirm: 'يُؤكد لاحقاً',
    placeholder: 'رسالتكم…',
    menu: 'القائمة',
    close: 'إغلاق',
    language: 'اللغة',
    trustFamily: 'ترحيب دافئ',
    trustDirect: 'حجز مباشر',
    trustLocation: 'مرزوكة، المغرب',
    trustResponse: 'رد سريع',
  },
}

const translations = {
  ...copy,
  es: {
    ...copy.en,
    dir: 'ltr',
    nav: ['El Riad', 'Habitaciones', 'Experiencias', 'Galería', 'Ubicación'],
    heroEyebrow: 'Casa de huéspedes · Merzouga · Marruecos',
    heroTitle: 'El desierto empieza aquí.',
    heroText: 'Bienvenido a Riad Tadarte, un alojamiento auténtico donde la hospitalidad marroquí se encuentra con los paisajes del Sahara.',
    reserve: 'Reservar por WhatsApp',
    discover: 'Descubrir el Riad',
    spirit: 'El espíritu Tadarte',
    introTitle: 'Una casa pensada para ir más despacio.',
    intro: 'En Riad Tadarte creemos que los mejores viajes dejan tiempo para respirar. Lejos del ritmo de las ciudades, la casa ofrece una pausa sencilla y cálida en el sur de Marruecos.',
    intro2: 'Entre la luz dorada, la arquitectura tradicional, el té de menta y la hospitalidad marroquí, cada detalle invita a vivir plenamente el momento.',
    facts: ['Hospitalidad marroquí', 'Atmósfera auténtica', 'Cerca del desierto', 'Acogida personalizada'],
    riad: 'El Riad',
    riadTitle: 'Una casa, una historia y una cálida bienvenida.',
    architecture: 'Arquitectura',
    architectureText: 'Una arquitectura inspirada en las tradiciones del sur de Marruecos, con materiales naturales, luz y espacios pensados para descansar.',
    hospitality: 'Hospitalidad',
    hospitalityText: 'Nuestra prioridad es recibirle como invitado, con sencillez, atención y la calidez de la hospitalidad marroquí.',
    atmosphere: 'Atmósfera',
    atmosphereText: 'Las mañanas comienzan despacio. Por la tarde, la luz transforma las paredes y el cielo se convierte en un espectáculo.',
    rooms: 'Habitaciones',
    roomsTitle: 'Habitaciones para descansar.',
    roomsText: 'Después de descubrir el desierto, vuelva a la calma de una habitación pensada para el descanso.',
    room: 'Habitación',
    capacity: 'Capacidad',
    bed: 'Camas',
    amenities: 'Servicios',
    ask: 'Consultar disponibilidad',
    rates: 'Ver tarifas',
    dining: 'El sabor de Marruecos',
    diningText: 'El té es más que una bebida: es un momento para compartir, conversar y dar la bienvenida. Confirme las comidas y servicios directamente con el alojamiento.',
    breakfast: 'Desayuno marroquí',
    tea: 'Té de menta',
    local: 'Cocina local',
    experiences: 'Experiencias',
    experiencesTitle: 'Vive el Sahara.',
    experiencesText: 'El desierto no solo se visita: se descubre lentamente, al ritmo de la luz, el viento y los encuentros.',
    askWhatsapp: 'Consultar por WhatsApp',
    why: '¿Por qué elegir Riad Tadarte?',
    reasons: ['Un lugar auténtico', 'Hospitalidad marroquí', 'Inmersión en el desierto', 'Ambiente tranquilo', 'Acogida personalizada', 'Reserva directa'],
    gallery: 'Desde Tadarte.',
    galleryText: 'Momentos, luces y recuerdos.',
    exploreGallery: 'Ver todas las fotos',
    bookNow: 'Reservar ahora',
    all: 'Todo',
    catRiad: 'El Riad',
    catRooms: 'Habitaciones',
    catDesert: 'Desierto',
    location: 'Ubicación',
    locationTitle: 'Entre el oasis y el desierto.',
    locationText: 'Riad Tadarte se encuentra en Hassi Labied, cerca de Merzouga y de las dunas del Sahara.',
    maps: 'Abrir en Google Maps',
    direct: 'Contacto directo',
    contact: 'Hablemos de su estancia',
    contactText: 'Para conocer disponibilidad y organizar su llegada, escríbanos directamente por WhatsApp.',
    address: 'Dirección',
    name: 'Nombre',
    arrival: 'Llegada',
    departure: 'Salida',
    adults: 'Adultos',
    children: 'Niños',
    message: 'Mensaje',
    continue: 'Enviar por WhatsApp',
    menu: 'Abrir menú',
    close: 'Cerrar menú',
    language: 'Idioma',
    footer: 'Una casa auténtica a las puertas del Sahara.',
    trustFamily: 'Bienvenida cálida',
    trustDirect: 'Reserva directa',
    trustLocation: 'Merzouga, Marruecos',
    trustResponse: 'Respuesta rápida',
  },
}

const localizedRooms: Record<Locale, { name: string; description: string; capacity: string; bed: string; amenities: string[] }[]> = {
  fr: rooms,
  en: [
    { name: 'Double Room', description: 'A warm room for a comfortable stay for two.', capacity: '2 guests', bed: '1 double bed', amenities: ['Air conditioning', 'Private bathroom'] },
    { name: 'Double or Twin Room', description: 'A flexible room with two sleeping configurations.', capacity: '2 guests', bed: '1 single bed and 1 double bed', amenities: ['Air conditioning', 'Private bathroom'] },
    { name: 'Triple Room', description: 'A comfortable space for small families or friends.', capacity: '3 guests', bed: '1 single bed and 1 double bed', amenities: ['Air conditioning', 'Private bathroom'] },
    { name: 'Quadruple Room', description: 'A spacious room designed for groups.', capacity: '4 guests', bed: '4 single beds', amenities: ['Air conditioning', 'Private bathroom'] },
    { name: 'Family Room with Bathroom', description: 'A family space with the comfort of a private bathroom.', capacity: '4 guests', bed: '2 single beds and 1 double bed', amenities: ['Air conditioning', 'Private bathroom'] },
  ],
  es: [
    { name: 'Habitación doble', description: 'Una habitación cálida para una estancia de dos personas.', capacity: '2 huéspedes', bed: '1 cama doble', amenities: ['Aire acondicionado', 'Baño privado'] },
    { name: 'Habitación doble o twin', description: 'Una habitación flexible con dos configuraciones de camas.', capacity: '2 huéspedes', bed: '1 cama individual y 1 cama doble', amenities: ['Aire acondicionado', 'Baño privado'] },
    { name: 'Habitación triple', description: 'Un espacio cómodo para familias pequeñas o amigos.', capacity: '3 huéspedes', bed: '1 cama individual y 1 cama doble', amenities: ['Aire acondicionado', 'Baño privado'] },
    { name: 'Habitación cuádruple', description: 'Una habitación espaciosa pensada para grupos.', capacity: '4 huéspedes', bed: '4 camas individuales', amenities: ['Aire acondicionado', 'Baño privado'] },
    { name: 'Habitación familiar con baño', description: 'Un espacio familiar con baño privado.', capacity: '4 huéspedes', bed: '2 camas individuales y 1 cama doble', amenities: ['Aire acondicionado', 'Baño privado'] },
  ],
  ar: [
    { name: 'غرفة مزدوجة', description: 'غرفة دافئة لإقامة مريحة لشخصين.', capacity: 'شخصان', bed: 'سرير مزدوج واحد', amenities: ['تكييف الهواء', 'حمام خاص'] },
    { name: 'غرفة مزدوجة أو بسريرين', description: 'غرفة مرنة بخيارين لترتيب الأسرة.', capacity: 'شخصان', bed: 'سرير مفرد وسرير مزدوج', amenities: ['تكييف الهواء', 'حمام خاص'] },
    { name: 'غرفة ثلاثية', description: 'مساحة مريحة للعائلات الصغيرة أو الأصدقاء.', capacity: '3 أشخاص', bed: 'سرير مفرد وسرير مزدوج', amenities: ['تكييف الهواء', 'حمام خاص'] },
    { name: 'غرفة رباعية', description: 'غرفة واسعة مناسبة للمجموعات.', capacity: '4 أشخاص', bed: '4 أسرّة مفردة', amenities: ['تكييف الهواء', 'حمام خاص'] },
    { name: 'غرفة عائلية مع حمام', description: 'مساحة عائلية مريحة مع حمام خاص.', capacity: '4 أشخاص', bed: 'سريران مفردان وسرير مزدوج', amenities: ['تكييف الهواء', 'حمام خاص'] },
  ],
}

const localizedExperiences: Record<Locale, { title: string; description: string }[]> = {
  fr: experiences.map(({ title, description }) => ({ title, description })),
  en: [
    { title: '4×4 tours in the region', description: 'Explore villages, oases and remarkable landscapes around Merzouga by 4×4.' },
    { title: 'Quad excursions', description: 'Set off across the sandy tracks and dunes around Merzouga.' },
    { title: 'Camel trekking', description: 'Discover the desert at the peaceful pace of camels, with an unforgettable sunset.' },
    { title: 'Night in the desert', description: 'Spend an authentic night beneath the stars in the heart of the dunes.' },
    { title: 'Multi-day desert trekking', description: 'Walk for several days and immerse yourself in the landscapes of the Sahara.' },
  ],
  es: [
    { title: 'Tours en 4×4 por la región', description: 'Descubre pueblos, oasis y paisajes de Merzouga en un vehículo todoterreno.' },
    { title: 'Excursiones en quad', description: 'Aventúrate por las pistas de arena y las dunas de Merzouga.' },
    { title: 'Ruta en dromedario', description: 'Descubre el desierto al ritmo tranquilo de los dromedarios al atardecer.' },
    { title: 'Noche en el desierto', description: 'Pasa una noche auténtica bajo las estrellas en el corazón de las dunas.' },
    { title: 'Trekking de varios días', description: 'Camina durante varios días y vive una inmersión profunda en el Sahara.' },
  ],
  ar: [
    { title: 'جولات بسيارات الدفع الرباعي', description: 'اكتشفوا القرى والواحات والمناظر الرائعة حول مرزوكة بسيارة الدفع الرباعي.' },
    { title: 'رحلات بالدراجات الرباعية', description: 'انطلقوا في مغامرة عبر مسارات الرمال وكثبان مرزوكة.' },
    { title: 'رحلة على ظهر الجمل', description: 'اكتشفوا الصحراء على إيقاع الجمال الهادئ مع غروب شمس لا يُنسى.' },
    { title: 'ليلة في الصحراء', description: 'اقضوا ليلة أصيلة تحت النجوم في قلب الكثبان الرملية.' },
    { title: 'رحلة مشي لعدة أيام', description: 'عيشوا تجربة عميقة في الصحراء من خلال رحلة مشي تمتد لعدة أيام.' },
  ],
}

const wa = (message: string) =>
  siteConfig.whatsappNumber.startsWith('[') ? '#' : `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}

function Reveal({
  children,
  className = '',
  delay = 0,
  scale = false,
}: {
  children: ReactNode
  className?: string
  delay?: number
  scale?: boolean
}) {
  const { ref, visible } = useReveal()
  const delayClass = delay > 0 ? `reveal-delay-${delay}` : ''

  return (
    <div
      ref={ref}
      className={`${scale ? 'reveal-scale' : 'reveal'} ${delayClass} ${visible ? 'visible' : ''} ${className}`}
    >
      {children}
    </div>
  )
}

function BrandLogo({
  type,
  className = 'size-5',
}: {
  type: 'facebook' | 'instagram' | 'tripadvisor' | 'google' | 'booking'
  className?: string
}) {
  if (type === 'facebook') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <circle cx="12" cy="12" r="12" fill="#1877F2" />
        <path
          fill="#fff"
          d="M13.32 19.2v-6.48h2.17l.33-2.52h-2.5V8.58c0-.73.2-1.23 1.25-1.23h1.34V5.1A17.9 17.9 0 0 0 13.6 5c-2.08 0-3.5 1.27-3.5 3.6v2.01H7.8v2.52h2.3V19.2h3.22Z"
        />
      </svg>
    )
  }

  if (type === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <defs>
          <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
            <stop offset="0%" stopColor="#fdf497" />
            <stop offset="5%" stopColor="#fdf497" />
            <stop offset="45%" stopColor="#fd5949" />
            <stop offset="60%" stopColor="#d6249f" />
            <stop offset="90%" stopColor="#285AEB" />
          </radialGradient>
        </defs>
        <rect width="24" height="24" rx="6" fill="url(#ig-grad)" />
        <rect x="5.5" y="5.5" width="13" height="13" rx="4" fill="none" stroke="#fff" strokeWidth="1.7" />
        <circle cx="12" cy="12" r="3.2" fill="none" stroke="#fff" strokeWidth="1.7" />
        <circle cx="16.4" cy="7.6" r="1" fill="#fff" />
      </svg>
    )
  }

  if (type === 'tripadvisor') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <circle cx="12" cy="12" r="12" fill="#34E0A1" />
        <g fill="#000">
          <path d="M4.8 7.2 6.4 8.8A7.2 7.2 0 0 0 4.8 12a7.2 7.2 0 0 0 14.4 0 7.2 7.2 0 0 0-1.55-4.45l1.55-1.55-1.15-1.15-1.75 1.75A7.15 7.15 0 0 0 12 4.8c-1.7 0-3.28.6-4.55 1.6L5.95 5.05 4.8 7.2Z" />
          <circle cx="12" cy="12" r="5.4" fill="#34E0A1" />
          <circle cx="12" cy="12" r="4.6" fill="none" stroke="#000" strokeWidth="1.2" />
          <circle cx="9.3" cy="12" r="1.55" />
          <circle cx="14.7" cy="12" r="1.55" />
          <circle cx="9.3" cy="12" r="0.55" fill="#34E0A1" />
          <circle cx="14.7" cy="12" r="0.55" fill="#34E0A1" />
          <path d="m12 9.85.55 1.05h1.15l-.9.66.35 1.1L12 12.05l-1.15.71.35-1.1-.9-.66h1.15L12 9.85Z" />
        </g>
      </svg>
    )
  }

  if (type === 'google') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path fill="#EA4335" d="M12 2c-3.87 0-7 3.13-7 7 0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="3.25" fill="#fff" />
        <circle cx="12" cy="9" r="2.1" fill="#4285F4" />
        <path fill="#34A853" d="M12 22s-2.6-2.95-4.55-6.15C8.7 16.7 10.25 17.2 12 17.2c1.75 0 3.3-.5 4.55-1.35C14.6 19.05 12 22 12 22z" opacity="0.9" />
        <path fill="#FBBC04" d="M5.35 10.2C5.12 9.5 5 8.76 5 8c0-.55.07-1.08.2-1.58L8.8 9.15A2.1 2.1 0 0 0 9.9 11c-.55.35-1.2.55-1.9.55-.95 0-1.8-.45-2.35-1.15L5.35 10.2z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <rect width="24" height="24" rx="5" fill="#003B95" />
      <path
        fill="#fff"
        d="M6.2 6.4h5.4c2.15 0 3.5 1.15 3.5 2.95 0 1.25-.7 2.2-1.85 2.6v.08c1.45.4 2.3 1.5 2.3 3.05 0 2.05-1.6 3.35-4.05 3.35H6.2V6.4Zm2.55 4.55h2.25c1.05 0 1.6-.45 1.6-1.25s-.55-1.2-1.6-1.2H8.75v2.45Zm0 5h2.55c1.15 0 1.8-.55 1.8-1.4s-.65-1.35-1.9-1.35H8.75v2.75Z"
      />
    </svg>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M20.52 3.48A11.82 11.82 0 0 0 12.08 0C5.53 0 .2 5.33.2 11.88c0 2.09.55 4.13 1.59 5.93L.1 24l6.34-1.66a11.87 11.87 0 0 0 5.64 1.43h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.18-1.24-6.16-3.45-8.41Zm-8.44 18.25h-.01a9.84 9.84 0 0 1-5.02-1.37l-.36-.21-3.76.98 1-3.66-.23-.38a9.84 9.84 0 0 1-1.51-5.21C2.19 6.44 6.62 2 12.08 2c2.65 0 5.14 1.03 7.02 2.92a9.85 9.85 0 0 1 2.9 7.01c0 5.46-4.44 9.9-9.92 9.9Zm5.43-7.42c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.67-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.5 1.69.64.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.41.25-.69.25-1.28.17-1.4-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  )
}

export function RiadSite() {
  const [locale, setLocale] = useState<Locale>('en')
  const [menu, setMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [arrivalDate, setArrivalDate] = useState('')
  const t = translations[locale]
  const now = new Date()
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const lang = params.get('lang') as Locale | null
    if (lang && ['en', 'fr', 'es', 'ar'].includes(lang)) {
      setLocale(lang)
      return
    }
    const saved = window.localStorage.getItem('riad-locale') as Locale | null
    if (saved && ['en', 'fr', 'es', 'ar'].includes(saved)) setLocale(saved)
  }, [])

  useEffect(() => {
    window.localStorage.setItem('riad-locale', locale)
    document.documentElement.lang = locale === 'ar' ? 'ar' : locale
    const url = new URL(window.location.href)
    url.searchParams.set('lang', locale)
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`)
  }, [locale])

  const message =
    locale === 'ar'
      ? 'مرحباً، أود الحصول على معلومات حول الإقامة في رياض تادارت.'
      : locale === 'en'
        ? 'Hello, I would like information about staying at Riad Tadarte.'
        : locale === 'es'
          ? 'Hola, me gustaría recibir información sobre mi estancia en Riad Tadarte.'
          : 'Bonjour, je souhaite obtenir des informations pour un séjour à Riad Tadarte.'

  const contactLabels =
    locale === 'ar'
      ? { whatsapp: 'واتساب', email: 'البريد الإلكتروني', maps: 'افتح في خرائط Google', heroAlt: 'واجهة رياض تادارت التقليدية في حاسي لبيض' }
      : locale === 'en'
        ? { whatsapp: 'WhatsApp', email: 'Email', maps: 'Open in Google Maps', heroAlt: 'Traditional Riad Tadarte façade in Hassi Labied' }
        : locale === 'es'
          ? { whatsapp: 'WhatsApp', email: 'Correo electrónico', maps: 'Abrir en Google Maps', heroAlt: 'Fachada tradicional de Riad Tadarte en Hassi Labied' }
          : { whatsapp: 'WhatsApp', email: 'Email', maps: 'Ouvrir dans Google Maps', heroAlt: 'Façade traditionnelle de Riad Tadarte à Hassi Labied' }

  const navIds = ['riad', 'rooms', 'experiences', 'gallery', 'location']
  const languages: { code: Locale; label: string; name: string }[] = [
    { code: 'en', label: 'EN', name: 'English' },
    { code: 'fr', label: 'FR', name: 'Français' },
    { code: 'es', label: 'ES', name: 'Español' },
    { code: 'ar', label: 'ع', name: 'العربية' },
  ]

  const trustItems = [
    { icon: Heart, label: t.trustFamily },
    { icon: Shield, label: t.trustDirect },
    { icon: MapPin, label: t.trustLocation },
    { icon: MessageCircle, label: t.trustResponse },
  ]

  const previewGallery = galleryImages.slice(0, 10)

  const riadCards = [
    { title: t.architecture, text: t.architectureText },
    { title: t.hospitality, text: t.hospitalityText },
    { title: t.atmosphere, text: t.atmosphereText },
  ]

  return (
    <div dir={t.dir} className="min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Header */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass border-b border-border/60 shadow-sm' : 'border-b border-transparent'
        }`}
        id="site-header"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-4 lg:px-8">
          <a href="#top" aria-label="Riad Tadarte" className="relative flex h-12 shrink-0 items-center sm:h-14 lg:h-16">
            <Image
              src="/images/logo-nav.png"
              alt="Riad Tadarte Familier"
              width={200}
              height={146}
              priority
              className="h-full w-auto object-contain"
            />
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {t.nav.map((n, i) => (
              <a
                href={`#${navIds[i]}`}
                key={n}
                className={`text-[11px] uppercase tracking-[0.16em] transition-opacity hover:opacity-50 ${scrolled ? 'text-foreground' : 'text-primary-foreground/90'}`}
              >
                {n}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <div
              className={`flex items-center rounded-full border p-0.5 ${scrolled ? 'border-border bg-secondary/80' : 'border-primary-foreground/25 bg-primary-foreground/10'}`}
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
                      : scrolled
                        ? 'text-muted-foreground hover:text-foreground'
                        : 'text-primary-foreground/70 hover:text-primary-foreground'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            <button
              className={`rounded-full p-2.5 transition-colors lg:hidden ${scrolled ? 'text-foreground hover:bg-secondary' : 'text-primary-foreground hover:bg-primary-foreground/10'}`}
              aria-label={menu ? t.close : t.menu}
              aria-expanded={menu}
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {menu && (
          <nav className="flex flex-col gap-1 border-t border-border bg-background/98 p-5 backdrop-blur-xl lg:hidden">
            {t.nav.map((n, i) => (
              <a
                onClick={() => setMenu(false)}
                href={`#${navIds[i]}`}
                key={n}
                className="rounded-xl px-4 py-3.5 text-sm uppercase tracking-[0.14em] transition-colors hover:bg-secondary"
              >
                {n}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative flex min-h-screen items-end overflow-hidden bg-primary text-primary-foreground">
          <div className="absolute inset-0 animate-hero-zoom">
            <Image
              src="/images/hero-camel.jpg"
              alt={contactLabels.heroAlt}
              fill
              priority
              className="object-cover object-[center_42%] sm:object-[center_38%] lg:object-center"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-primary/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-transparent to-transparent" />

          <div className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-36 lg:px-8 lg:pb-28 lg:pt-44">
            <p className="eyebrow animate-hero-fade-up mb-6 text-primary-foreground/80 hero-delay-1">{t.heroEyebrow}</p>
            <h1 className="animate-hero-fade-up max-w-3xl font-serif text-5xl leading-[1.02] tracking-tight text-balance md:text-7xl lg:text-8xl hero-delay-2">
              {t.heroTitle}
            </h1>
            <p className="animate-hero-fade-up mt-7 max-w-md text-base leading-relaxed text-primary-foreground/75 md:text-lg hero-delay-3">
              {t.heroText}
            </p>
            <div className="animate-hero-fade-up mt-10 flex flex-wrap items-center gap-4 hero-delay-4">
              <a href={wa(message)} target="_blank" rel="noreferrer" className="btn-whatsapp shadow-xl shadow-black/25">
                <WhatsAppIcon className="size-4" />
                {t.reserve}
              </a>
              <a href="#riad" className="btn-ghost text-primary-foreground">
                {t.discover}
                <ChevronDown className="size-4" />
              </a>
            </div>
          </div>

          <a
            href="#riad"
            aria-label={t.discover}
            className="animate-float absolute bottom-8 end-6 flex size-11 items-center justify-center rounded-full border border-primary-foreground/30 text-primary-foreground/70 transition-colors hover:border-accent hover:text-accent lg:end-8"
          >
            <ChevronDown className="size-5" />
          </a>
        </section>

        {/* Trust strip */}
        <section className="relative z-10 -mt-8 mx-5 lg:mx-auto lg:max-w-5xl">
          <div className="premium-card grid grid-cols-2 gap-px overflow-hidden bg-border md:grid-cols-4">
            {trustItems.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 bg-card px-5 py-5 md:justify-center md:px-6">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Icon className="size-4" strokeWidth={1.5} />
                </div>
                <span className="text-xs font-medium tracking-wide text-foreground">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Intro */}
        <section id="riad" className="mx-auto max-w-6xl px-5 py-28 lg:px-8 lg:py-36">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 lg:items-center">
            <Reveal>
              <div className="line-accent mb-6" />
              <p className="eyebrow">{t.spirit}</p>
              <h2 className="section-title">{t.introTitle}</h2>
            </Reveal>
            <Reveal delay={1}>
              <p className="text-lg leading-relaxed text-muted-foreground">{t.intro}</p>
              <p className="mt-5 leading-relaxed text-muted-foreground">{t.intro2}</p>
              <div className="mt-10 grid grid-cols-2 gap-4">
                {t.facts.map((f) => (
                  <div key={f} className="flex items-center gap-2.5 text-sm">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <Check className="size-3" strokeWidth={2.5} />
                    </span>
                    {f}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Riad banner */}
        <section className="bg-secondary/30">
          <div className="mx-auto max-w-6xl px-5 py-24 lg:px-8 lg:py-32">
            <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-end">
              <Reveal scale>
                <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-[16/10]">
                  <Image
                    src="/images/riad-hero-user.png"
                    alt="Riad Tadarte — traditional façade in Hassi Labied"
                    fill
                    className="img-zoom object-cover object-[72%_center] md:object-[68%_center] lg:object-center"
                    sizes="(min-width: 1024px) 60vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              </Reveal>
              <Reveal delay={2}>
                <p className="eyebrow">{t.riad}</p>
                <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight md:text-5xl">{t.riadTitle}</h2>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Riad cards */}
        <section className="mx-auto max-w-6xl px-5 py-24 lg:px-8 lg:py-32">
          <div className="grid gap-6 md:grid-cols-3">
            {riadCards.map(({ title, text }, i) => (
              <Reveal key={title} delay={i + 1}>
                <article className="premium-card group h-full p-8 lg:p-10">
                  <span className="font-mono text-[10px] text-accent">0{i + 1}</span>
                  <h3 className="mt-8 font-serif text-2xl tracking-tight transition-colors group-hover:text-accent">{title}</h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Rooms */}
        <section id="rooms" className="border-y border-border bg-secondary/40">
          <div className="mx-auto max-w-6xl px-5 py-24 lg:px-8 lg:py-32">
            <Reveal>
              <p className="eyebrow">{t.rooms}</p>
              <h2 className="section-title">{t.roomsTitle}</h2>
              <p className="section-subtitle">{t.roomsText}</p>
            </Reveal>

            <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:gap-5">
              {rooms.map((room, index) => {
                const localized = localizedRooms[locale][index]
                return (
                  <Reveal key={room.name} delay={(index % 3) + 1}>
                    <article className="premium-card group flex h-full flex-col p-7 lg:p-8">
                      <span className="font-mono text-[10px] text-accent">0{index + 1}</span>
                      <h3 className="mt-6 font-serif text-2xl tracking-tight transition-colors group-hover:text-accent">
                        {localized.name}
                      </h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {localized.description}
                      </p>
                      <div className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
                        <div className="flex justify-between gap-3">
                          <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{t.capacity}</span>
                          <span className="text-end">{localized.capacity}</span>
                        </div>
                        <div className="flex justify-between gap-3">
                          <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{t.bed}</span>
                          <span className="text-end">{localized.bed}</span>
                        </div>
                        <div className="flex justify-between gap-3">
                          <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{t.amenities}</span>
                          <span className="text-end">{localized.amenities.join(' · ')}</span>
                        </div>
                      </div>
                      <a href={wa(message)} className="btn-outline mt-7 w-full px-4 py-3 text-[10px]">
                        {t.rates}
                        <ArrowUpRight className="size-3.5" />
                      </a>
                    </article>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* Dining */}
        <section className="mx-auto max-w-6xl px-5 py-24 lg:px-8 lg:py-32">
          <Reveal>
            <p className="eyebrow">{t.dining}</p>
            <h2 className="section-title">{t.dining}</h2>
            <p className="section-subtitle">{t.diningText}</p>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:gap-5">
            {[
              { label: t.breakfast, src: '/images/breakfast.jpg', alt: t.breakfast },
              { label: t.tea, src: '/images/tea.jpg', alt: t.tea },
              { label: t.local, src: '/images/moroccanfood.jpeg', alt: t.local },
            ].map((item, i) => (
              <Reveal key={item.src} delay={i + 1}>
                <article className="premium-card group overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="img-zoom object-cover"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                  <div className="flex items-center gap-4 p-5">
                    <span className="font-mono text-xs text-accent">0{i + 1}</span>
                    <p className="font-serif text-xl tracking-tight">{item.label}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Experiences */}
        <section id="experiences" className="bg-secondary/40">
          <div className="mx-auto max-w-6xl px-5 py-24 lg:px-8 lg:py-32">
            <Reveal>
              <p className="eyebrow">{t.experiences}</p>
              <h2 className="section-title">{t.experiencesTitle}</h2>
              <p className="section-subtitle">{t.experiencesText}</p>
            </Reveal>

            <div className="mt-16 space-y-6">
              {experiences.map((exp, index) => {
                const localized = localizedExperiences[locale][index]
                const isEven = index % 2 === 0
                return (
                  <Reveal key={exp.number} delay={1}>
                    <article
                      className={`group premium-card grid overflow-hidden md:grid-cols-2 ${!isEven ? 'md:[direction:rtl]' : ''}`}
                    >
                      <div className={`relative min-h-64 overflow-hidden ${!isEven ? 'md:[direction:ltr]' : ''}`}>
                        <Image
                          src={exp.image}
                          alt={localized.title}
                          fill
                          className="img-zoom object-cover"
                          sizes="(min-width: 768px) 50vw, 100vw"
                        />
                        <span className="absolute start-6 top-6 font-mono text-sm text-primary-foreground drop-shadow-md">
                          {exp.number}
                        </span>
                      </div>
                      <div className={`flex flex-col justify-center p-8 lg:p-12 ${!isEven ? 'md:[direction:ltr]' : ''}`}>
                        <h3 className="font-serif text-3xl tracking-tight">{localized.title}</h3>
                        <p className="mt-4 leading-relaxed text-muted-foreground">{localized.description}</p>
                        {exp.bookable && (
                          <a
                            href={wa(`${message} ${localized.title}`)}
                            className="mt-8 inline-flex w-fit items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-accent transition-opacity hover:opacity-70"
                          >
                            {t.askWhatsapp}
                            <ArrowUpRight className="size-4" />
                          </a>
                        )}
                      </div>
                    </article>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* Why choose */}
        <section className="mx-auto max-w-6xl px-5 py-24 lg:px-8 lg:py-32">
          <Reveal>
            <p className="eyebrow">{t.why}</p>
            <h2 className="section-title">{t.why}</h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:gap-5">
            {[
              { label: t.reasons[0], src: '/images/sky-night.jpg' },
              { label: t.reasons[1], src: '/images/moroccan-hospitality.jpg' },
              { label: t.reasons[2], src: '/images/immersion-desert.jpeg' },
              { label: t.reasons[3], src: '/images/peaceful.jpeg' },
              { label: t.reasons[4], src: '/images/riad-hero-user.png' },
            ].map((item, i) => (
              <Reveal key={item.src} delay={(i % 3) + 1}>
                <article className="premium-card group overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.label}
                      fill
                      className="img-zoom object-cover"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
                    <span className="absolute start-4 top-4 rounded-full bg-card/90 px-2.5 py-1 font-mono text-[10px] text-accent backdrop-blur-sm">
                      0{i + 1}
                    </span>
                    <h3 className="absolute inset-x-0 bottom-0 p-5 font-serif text-xl tracking-tight text-primary-foreground">
                      {item.label}
                    </h3>
                  </div>
                </article>
              </Reveal>
            ))}
            <Reveal delay={3} className="h-full">
              <article className="premium-card relative flex h-full flex-col border-accent/25 bg-gradient-to-br from-primary via-primary to-[oklch(0.32_0.03_70)] text-primary-foreground">
                <div
                  className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-[0.07]"
                  style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, white 1px, transparent 1px)', backgroundSize: '18px 18px' }}
                />
                <div className="pointer-events-none absolute -end-8 -top-8 size-28 rounded-full bg-accent/20 blur-2xl sm:size-40 sm:blur-3xl" />
                <div className="relative z-10 flex flex-1 flex-col gap-3 p-4 sm:gap-4 sm:p-6">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full border border-accent/40 bg-accent/15 px-2 py-0.5 font-mono text-[9px] text-accent sm:px-2.5 sm:py-1 sm:text-[10px]">
                      06
                    </span>
                    <WhatsAppIcon className="size-4 shrink-0 text-whatsapp sm:size-5" />
                  </div>

                  <div className="flex flex-1 flex-col justify-center">
                    <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-accent sm:text-[10px] sm:tracking-[0.28em]">
                      {t.direct}
                    </p>
                    <h3 className="mt-1.5 font-serif text-lg leading-tight tracking-tight sm:text-2xl lg:text-3xl">
                      {t.reasons[5]}
                    </h3>
                  </div>

                  <a
                    href={wa(message)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-whatsapp px-3 py-2.5 text-center text-[9px] font-medium uppercase tracking-[0.12em] text-whatsapp-foreground shadow-md transition-transform hover:-translate-y-0.5 sm:gap-2.5 sm:px-5 sm:py-3.5 sm:text-[11px] sm:tracking-[0.18em]"
                  >
                    <WhatsAppIcon className="size-3.5 shrink-0 sm:size-4" />
                    <span className="truncate">{t.bookNow}</span>
                  </a>
                </div>
              </article>
            </Reveal>
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="bg-secondary/50">
          <div className="mx-auto max-w-6xl px-5 py-24 lg:px-8 lg:py-32">
            <Reveal>
              <h2 className="font-serif text-4xl tracking-tight md:text-5xl">{t.gallery}</h2>
              <p className="mt-4 max-w-md text-muted-foreground">{t.galleryText}</p>
            </Reveal>

            <div className="mt-12 grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 lg:gap-4">
              {previewGallery.map((image, i) => (
                <Reveal key={image.src} delay={(i % 3) + 1}>
                  <div className="group relative aspect-square overflow-hidden rounded-xl md:rounded-2xl">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      loading="lazy"
                      className="img-zoom object-cover"
                      sizes="(min-width: 768px) 33vw, 50vw"
                    />
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={2}>
              <div className="mt-12 flex justify-center">
                <Link href={`/gallery?lang=${locale}`} className="btn-primary">
                  {t.exploreGallery}
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Location */}
        <section id="location" className="mx-auto max-w-6xl px-5 py-24 lg:px-8 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <p className="eyebrow">{t.location}</p>
              <h2 className="section-title">{t.locationTitle}</h2>
              <p className="section-subtitle">{t.locationText}</p>
              <a href={siteConfig.googleMapsUrl} target="_blank" rel="noreferrer" className="btn-primary mt-10">
                <MapPin className="size-4 text-accent" />
                {contactLabels.maps}
              </a>
            </Reveal>
            <Reveal delay={2} scale>
              <div className="premium-card overflow-hidden">
                <iframe
                  title={contactLabels.maps}
                  src="https://www.google.com/maps?q=31.1418733,-4.0275585&z=15&output=embed"
                  className="h-80 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <p className="border-t border-border px-5 py-4 text-center text-xs text-muted-foreground">{siteConfig.location}</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="border-t border-border bg-secondary/40">
          <div className="mx-auto grid max-w-6xl gap-16 px-5 py-24 lg:grid-cols-[1fr_1.2fr] lg:px-8 lg:py-32">
            <Reveal>
              <p className="eyebrow">{t.direct}</p>
              <h2 className="section-title">{t.contact}</h2>
              <p className="section-subtitle">{t.contactText}</p>
              <div className="mt-10 space-y-5 text-sm">
                <div>
                  <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-accent">{t.address}</span>
                  <p className="leading-relaxed text-muted-foreground">{siteConfig.address}</p>
                </div>
                <div>
                  <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-accent">{contactLabels.whatsapp}</span>
                  <a href={wa(message)} className="transition-colors hover:text-accent">
                    {siteConfig.phone}
                  </a>
                </div>
                <div>
                  <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-accent">{contactLabels.email}</span>
                  <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-accent">
                    {siteConfig.email}
                  </a>
                </div>
                <div className="flex flex-wrap items-center gap-2.5 pt-2">
                  <a
                    aria-label="Facebook"
                    href={siteConfig.facebookUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <BrandLogo type="facebook" className="size-5 shrink-0" />
                    <span className="text-xs font-medium tracking-wide text-foreground">Facebook</span>
                  </a>
                  <a
                    aria-label="Instagram"
                    href={siteConfig.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <BrandLogo type="instagram" className="size-5 shrink-0" />
                    <span className="text-xs font-medium tracking-wide text-foreground">Instagram</span>
                  </a>
                  <a
                    aria-label={`Tripadvisor ${siteConfig.tripadvisorRating}`}
                    href={siteConfig.tripadvisorUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <BrandLogo type="tripadvisor" className="size-5 shrink-0" />
                    <span className="text-xs font-medium tracking-wide text-foreground">Tripadvisor</span>
                    <span className="text-xs font-semibold text-accent">{siteConfig.tripadvisorRating}</span>
                  </a>
                  <a
                    aria-label={`Google Maps ${siteConfig.googleMapsRating}`}
                    href={siteConfig.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <BrandLogo type="google" className="size-5 shrink-0" />
                    <span className="text-xs font-medium tracking-wide text-foreground">Maps</span>
                    <span className="text-xs font-semibold text-accent">{siteConfig.googleMapsRating}</span>
                  </a>
                  <a
                    aria-label={`Booking.com ${siteConfig.bookingRating}`}
                    href={siteConfig.bookingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <BrandLogo type="booking" className="size-5 shrink-0" />
                    <span className="text-xs font-medium tracking-wide text-foreground">Booking</span>
                    <span className="text-xs font-semibold text-accent">{siteConfig.bookingRating}</span>
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={2}>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const data = new FormData(e.currentTarget)
                  window.open(
                    wa(
                      `${message}\n\n${t.name}: ${data.get('name')}\n${t.arrival}: ${data.get('arrival')}\n${t.departure}: ${data.get('departure')}\n${t.adults}: ${data.get('adults')}\n${t.children}: ${data.get('children')}\n\n${t.message}: ${data.get('message')}`,
                    ),
                    '_blank',
                  )
                }}
                className="premium-card grid gap-5 p-6 sm:grid-cols-2 sm:p-8"
              >
                <label className="grid gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:col-span-2">
                  {t.name}
                  <input name="name" required className="input-field" />
                </label>
                <label className="grid gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  {t.arrival}
                  <input
                    type="date"
                    name="arrival"
                    min={today}
                    value={arrivalDate}
                    onChange={(e) => setArrivalDate(e.target.value)}
                    className="input-field"
                  />
                </label>
                <label className="grid gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  {t.departure}
                  <input type="date" name="departure" min={arrivalDate || today} className="input-field" />
                </label>
                <label className="grid gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  {t.adults}
                  <input type="number" min="1" name="adults" className="input-field" />
                </label>
                <label className="grid gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  {t.children}
                  <input type="number" min="0" name="children" className="input-field" />
                </label>
                <label className="grid gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:col-span-2">
                  {t.message}
                  <textarea name="message" rows={3} placeholder={t.placeholder} className="input-field resize-none" />
                </label>
                <button type="submit" className="btn-whatsapp sm:col-span-2">
                  {t.continue}
                  <WhatsAppIcon className="size-4" />
                </button>
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
            <div>
              <a href="#top" aria-label="Riad Tadarte" className="inline-block">
                <Image
                  src="/images/logo-nav.png"
                  alt="Riad Tadarte Familier"
                  width={220}
                  height={160}
                  className="h-20 w-auto object-contain sm:h-24"
                />
              </a>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-foreground/55">{t.footer}</p>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.14em] text-primary-foreground/70">
              {t.nav.map((n, i) => (
                <a key={n} href={`#${navIds[i]}`} className="transition-opacity hover:opacity-50">
                  {n}
                </a>
              ))}
              <a href="#contact" className="transition-opacity hover:opacity-50">
                {t.direct}
              </a>
            </div>
          </div>
          <div className="mt-12 flex flex-col justify-between gap-4 border-t border-primary-foreground/10 pt-8 text-xs text-primary-foreground/45 sm:flex-row sm:items-center">
            <span>{siteConfig.location}</span>
            <div className="flex gap-6">
              <a href={siteConfig.googleMapsUrl} className="transition-opacity hover:opacity-70">
                {contactLabels.maps}
              </a>
              <a href={wa(message)} className="transition-opacity hover:opacity-70">
                {contactLabels.whatsapp}
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <a
        href={wa(message)}
        aria-label={t.reserve}
        className="group fixed bottom-6 start-6 z-40 inline-flex size-14 items-center justify-center overflow-hidden rounded-full bg-whatsapp text-whatsapp-foreground shadow-2xl shadow-whatsapp/30 transition-all duration-500 hover:w-52 hover:justify-start hover:px-5 hover:shadow-whatsapp/40 focus-visible:w-52 focus-visible:justify-start focus-visible:px-5"
      >
        <WhatsAppIcon className="size-6 shrink-0" />
        <span className="max-w-0 whitespace-nowrap ps-0 text-[10px] font-medium uppercase tracking-[0.14em] opacity-0 transition-all duration-500 group-hover:max-w-xs group-hover:ps-3 group-hover:opacity-100 group-focus-visible:max-w-xs group-focus-visible:ps-3 group-focus-visible:opacity-100">
          {t.reserve}
        </span>
      </a>
    </div>
  )
}

export default RiadSite
