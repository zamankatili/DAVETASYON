export type Language = 'tr' | 'en';

export type TemplateId =
  | 'aeterna'
  | 'memorybox'
  | 'classicenvelope'
  | 'darkluxury'
  | 'sunnet'
  | 'wedding'
  | 'gardenwedding'
  | 'babyshower'
  | 'engagement'
  | 'seasideengagement'
  | 'birthday'
  | 'kina'
  | 'modernkina'
  | 'graduation'
  | 'aurora';

export type Localized = Record<Language, string>;

export interface CollectionItem {
  id: TemplateId;
  title: Localized;
  description: Localized;
  icon: string;
  tag: string;
  image: string;
}

export interface CollectionSection {
  id: string;
  label: Localized;
  description: Localized;
  items: CollectionItem[];
}

/**
 * Tek koleksiyon kaynağı. Yeni bir şablon eklemek için ilgili bölümün
 * `items` dizisine bir kart eklemek yeterlidir; kart görseli, başlığı ve
 * yönlendirme bu veriden üretilir.
 */
export const collectionSections: CollectionSection[] = [
  {
    id: 'weddings',
    label: { tr: 'Düğün & Nişan', en: 'Weddings & Engagements' },
    description: {
      tr: 'Aşkınızın her hâlini, zamansız bir davetiye diliyle anlatır.',
      en: 'Every chapter of your love, told in a timeless invitation language.',
    },
    items: [
      {
        id: 'aeterna',
        title: { tr: 'Aeterna (Başyapıt)', en: 'Aeterna (Masterpiece)' },
        description: {
          tr: 'Dün, bugün ve yarını birleştiren; anılarınızı geleceğe mühürleyen yapay zeka destekli zaman ötesi bir deneyim.',
          en: 'A timeless experience supported by AI that unites yesterday, today and tomorrow, sealing your memories into the future.',
        },
        icon: '⏳',
        tag: 'Masterpiece',
        image: '/images/covers/aeterna.webp',
      },
      {
        id: 'gardenwedding',
        title: { tr: 'Bahçe Düğünü', en: 'Garden Wedding' },
        description: {
          tr: 'Açık havada, uzun sofralar ve zeytin ağaçları arasında geçen; yeşil, krem ve altın tonlarında editoryal bir düğün davetiyesi.',
          en: 'An editorial garden wedding invitation in green, cream and gold — long tables under olive trees, in the open air.',
        },
        icon: '🌿',
        tag: 'Garden',
        image: '/images/scene/day-garden.webp',
      },
      {
        id: 'wedding',
        title: { tr: 'Düğün & Evlilik', en: 'Wedding & Marriage' },
        description: {
          tr: 'Zarafet ve lüksün buluştuğu, sonsuz aşkınızı en şık şekilde duyuran dijital sanat eseri.',
          en: 'A digital masterpiece where elegance and luxury meet, announcing your eternal love in the most stylish way.',
        },
        icon: '💍',
        tag: 'Elite',
        image: '/images/covers/wedding.webp',
      },
      {
        id: 'engagement',
        title: { tr: 'Nişan & Söz', en: 'Engagement' },
        description: {
          tr: 'Baharın uyanışı, uçuşan kelebekler ve doğanın sesleriyle bezenmiş masalsı bir başlangıç.',
          en: 'A fairytale beginning adorned with the awakening of spring, fluttering butterflies, and the sounds of nature.',
        },
        icon: '🌸',
        tag: 'Spring',
        image: '/images/covers/engagement.webp',
      },
      {
        id: 'seasideengagement',
        title: { tr: 'Sahil Nişanı', en: 'Seaside Engagement' },
        description: {
          tr: 'Gün batımında denize bakan bir koyda geçen, kum ve deniz mavisi tonlarında ferah bir nişan davetiyesi.',
          en: 'An airy engagement invitation in sand and sea-blue, set in a cove overlooking the sea at sunset.',
        },
        icon: '🌊',
        tag: 'Coastal',
        image: '/images/templates/seaside-hero.webp',
      },
      {
        id: 'classicenvelope',
        title: { tr: 'Klasik Zarf (Berna & Melih)', en: 'Classic Envelope (Berna & Melih)' },
        description: {
          tr: 'Zarif bir zarf animasyonu ile açılan, sade, şık ve zamansız bir düğün davetiyesi.',
          en: 'A simple, elegant, and timeless wedding invitation that opens with a graceful envelope animation.',
        },
        icon: '✉️',
        tag: 'Classic',
        image: '/images/covers/classicenvelope.webp',
      },
    ],
  },
  {
    id: 'traditions',
    label: { tr: 'Geleneksel & Kültürel', en: 'Traditions & Culture' },
    description: {
      tr: 'Köklerimizden gelen sıcaklığı, çağdaş bir deneyimle buluşturur.',
      en: 'The warmth of our roots, meeting a contemporary experience.',
    },
    items: [
      {
        id: 'kina',
        title: { tr: 'Kına Gecesi', en: 'Henna Night' },
        description: {
          tr: 'Geleneksel kına gecesi ruhunu, modern ve lüks detaylarla harmanlayan büyüleyici bir davet.',
          en: 'An enchanting invitation blending the traditional henna night spirit with modern and luxury details.',
        },
        icon: '🌹',
        tag: 'Traditional',
        image: '/images/covers/kina.webp',
      },
      {
        id: 'modernkina',
        title: { tr: 'Modern Kına', en: 'Modern Henna' },
        description: {
          tr: 'Kına gecesini bordo, gül kurusu ve altınla yeniden yorumlayan; geometrik çizgilerle sadeleşmiş çağdaş bir davet.',
          en: 'A contemporary take on the henna night: burgundy, dusty rose and gold, refined with geometric lines.',
        },
        icon: '🕯️',
        tag: 'Modern',
        image: '/images/scene/hero-table.webp',
      },
      {
        id: 'sunnet',
        title: { tr: 'Sünnet Merasimi', en: 'Circumcision Ceremony' },
        description: {
          tr: 'Geleneksel motiflerin manevi derinlik ve modern teknolojiyle harmanlandığı özel bir deneyim.',
          en: 'A special experience blending traditional motifs with spiritual depth and modern technology.',
        },
        icon: '🌙',
        tag: 'Couture',
        image: '/images/covers/sunnet.webp',
      },
    ],
  },
  {
    id: 'celebrations',
    label: { tr: 'Kutlamalar & Kutlu Günler', en: 'Celebrations' },
    description: {
      tr: 'Yeni başlangıçlar, doğum günleri ve unutulmaz mezuniyet geceleri.',
      en: 'New beginnings, birthdays and unforgettable graduation nights.',
    },
    items: [
      {
        id: 'babyshower',
        title: { tr: 'Baby Shower', en: 'Baby Shower' },
        description: {
          tr: 'Minik mucizenizin gelişini kutlayan, sıcak ve sevgi dolu tasarımlarla hazırlanan davetiyeler.',
          en: 'Invitations prepared with warm and loving designs, celebrating the arrival of your little miracle.',
        },
        icon: '👶',
        tag: 'Boutique',
        image: '/images/covers/babyshower.webp',
      },
      {
        id: 'birthday',
        title: { tr: 'Doğum Günü', en: 'Birthday' },
        description: {
          tr: 'Eğlenceli, interaktif ve enerji dolu kutlamalar için tasarlanmış renkli dijital dünyalar.',
          en: 'Colorful digital worlds designed for fun, interactive, and energetic celebrations.',
        },
        icon: '🎈',
        tag: 'Fun',
        image: '/images/covers/birthday.webp',
      },
      {
        id: 'graduation',
        title: { tr: 'Mezuniyet Balosu', en: 'Graduation Prom' },
        description: {
          tr: 'Başarılarınızı kutladığınız, prestijli ve unutulmaz bir gece için tasarlanmış dijital bir anı.',
          en: 'A digital memory designed for a prestigious and unforgettable night where you celebrate your achievements.',
        },
        icon: '🎓',
        tag: 'Prestige',
        image: '/images/covers/graduation.webp',
      },
    ],
  },
  {
    id: 'experiences',
    label: { tr: 'Deneyim & Kurumsal', en: 'Experience & Corporate' },
    description: {
      tr: 'Sıradan bir davetiyeyi, akılda kalan bir ana dönüştürür.',
      en: 'Turns an ordinary invitation into a moment worth remembering.',
    },
    items: [
      {
        id: 'darkluxury',
        title: { tr: 'Kurumsal Gala (Dark Luxury)', en: 'Corporate Gala (Dark Luxury)' },
        description: {
          tr: 'Siyah ve altının buluştuğu, prestijli ve kurumsal etkinlikler için tasarlanmış VIP deneyim.',
          en: 'A VIP experience designed for prestigious and corporate events where black and gold meet.',
        },
        icon: '🏛️',
        tag: 'VIP',
        image: '/images/covers/darkluxury.webp',
      },
      {
        id: 'aurora',
        title: { tr: 'Kuzey Işıkları (Aurora)', en: 'Northern Lights (Aurora)' },
        description: {
          tr: 'Büyüleyici kuzey ışıkları altında, masalsı ve kozmik bir atmosferde gerçekleşecek etkinlikler için.',
          en: 'For events taking place in a fairytale and cosmic atmosphere under the enchanting northern lights.',
        },
        icon: '🌌',
        tag: 'Magical',
        image: '/images/covers/aurora.webp',
      },
      {
        id: 'memorybox',
        title: { tr: 'Dijital Anı Kutusu', en: 'Digital Memory Box' },
        description: {
          tr: 'Tüm sevdiklerinizin o gece çektiği fotoğrafları sizin için tek bir bulutta toplayan interaktif misafir kamerası.',
          en: 'An interactive guest camera that securely collects all the photos taken by your loved ones that night in a private cloud.',
        },
        icon: '📸',
        tag: 'New / Yeni',
        image: '/images/covers/memorybox.webp',
      },
    ],
  },
];
