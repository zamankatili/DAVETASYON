import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RSVPForm from './RSVPForm';
import LocationMap from './LocationMap';
import SpiritualCorner from './SpiritualCorner';
import { Chatbot } from './Chatbot';

interface GardenWeddingTemplateProps {
  onBack: () => void;
  language: 'tr' | 'en';
  onOrder: () => void;
  eventId?: string;
  eventContext?: {
    title?: string;
    venue?: { name: string; address: string; };
    aiContext?: string;
  };
}

const GardenWeddingTemplate: React.FC<GardenWeddingTemplateProps> = ({ onBack, language, onOrder, eventId, eventContext }) => {
  const [hasEntered, setHasEntered] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  const themeColor = '#4B5D42';

  const t = {
    tr: {
      back: 'Geri Dön',
      envelopeLabel: 'Bahçe Düğünü',
      envelopeHint: 'Zarif bir bahçede, yeşilin ve altının buluştuğu bir gün',
      open: 'Davetiyeyi Aç',
      opening: 'Açılıyor...',
      names: 'Defne & Kerem',
      eyebrow: 'Bahçe Düğünü',
      subtitle: 'Hayatımızın en yeşil gününde, en sevdiklerimizle birlikte olmak istiyoruz.',
      date: '12 Eylül 2026',
      day: 'Cumartesi · 18:30',
      inviteTitle: 'Sizi Aramızda Görmek İsteriz',
      inviteText: 'Bir bahçenin sakinliğinde, uzun sofraların ve çiçeklerin arasında evleniyoruz. Bu günü bizimle paylaşmanız, bize verebileceğiniz en güzel hediyedir.',
      countdown: ['Gün', 'Saat', 'Dakika', 'Saniye'],
      programTitle: 'Bahçe Programı',
      program: [
        { time: '18:30', activity: 'Karşılama & Bahçe Kokteyli' },
        { time: '19:30', activity: 'Tören' },
        { time: '20:30', activity: 'Akşam Yemeği & Dans' },
      ],
      galleryTitle: 'Bahçeden Kareler',
      storyTitle: 'Hikayemiz',
      storyText: 'Yedi yıl önce bir bahçe düğününde tanıştık. O gün söylediğimiz "bir gün burada evlenelim" cümlesi, bugün gerçek oluyor.',
      dressTitle: 'Kıyafet Notu',
      dressText: 'Toprak tonları, adaçayı yeşili ve kremler; açık havada rahat edeceğiniz ayakkabılar öneririz.',
      location: 'Zeytin Bahçesi, İzmir',
      address: 'Sığacık Mah. Zeytinlik Yolu No: 8, Seferihisar / İzmir',
      mapsUrl: 'https://maps.google.com',
      rsvpNote: 'Lütfen 1 Eylül’e kadar yanıt verin.',
      order: 'Bu Tasarımla Sipariş Ver',
      footer: 'Defne & Kerem · 12.09.2026',
    },
    en: {
      back: 'Go Back',
      envelopeLabel: 'Garden Wedding',
      envelopeHint: 'A day where green and gold meet in a graceful garden',
      open: 'Open Invitation',
      opening: 'Opening...',
      names: 'Defne & Kerem',
      eyebrow: 'Garden Wedding',
      subtitle: 'On the greenest day of our lives, we want to be surrounded by the people we love most.',
      date: 'September 12, 2026',
      day: 'Saturday · 6:30 PM',
      inviteTitle: 'We Would Love To Have You With Us',
      inviteText: 'We are getting married in the calm of a garden, among long tables and flowers. Sharing this day with us is the most beautiful gift you could give.',
      countdown: ['Days', 'Hours', 'Mins', 'Secs'],
      programTitle: 'Garden Programme',
      program: [
        { time: '6:30 PM', activity: 'Welcome & Garden Cocktail' },
        { time: '7:30 PM', activity: 'Ceremony' },
        { time: '8:30 PM', activity: 'Dinner & Dancing' },
      ],
      galleryTitle: 'Moments From The Garden',
      storyTitle: 'Our Story',
      storyText: 'We met at a garden wedding seven years ago. The sentence we said that day — "one day we will marry here" — is coming true today.',
      dressTitle: 'Dress Note',
      dressText: 'Earth tones, sage green and creams; we recommend shoes you can comfortably wear outdoors.',
      location: 'Olive Garden, Izmir',
      address: 'Sigacik, Zeytinlik Road No: 8, Seferihisar / Izmir',
      mapsUrl: 'https://maps.google.com',
      rsvpNote: 'Please reply by September 1.',
      order: 'Order with this Design',
      footer: 'Defne & Kerem · 09.12.2026',
    },
  }[language];

  const targetDate = new Date('2026-09-12T18:30:00').getTime();

  useEffect(() => {
    const updateCountdown = () => {
      const gap = targetDate - new Date().getTime();
      if (gap > 0) {
        setCountdown({
          days: Math.floor(gap / (1000 * 60 * 60 * 24)),
          hours: Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          mins: Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60)),
          secs: Math.floor((gap % (1000 * 60)) / 1000),
        });
      }
    };
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const handleEnter = () => {
    setIsOpening(true);
    setTimeout(() => {
      setHasEntered(true);
      setIsOpening(false);
    }, 1600);
  };

  const names = eventContext?.title || t.names;

  return (
    <div className="min-h-screen bg-[#F7F4EC] text-[#2E3528] font-sans relative overflow-x-hidden">
      {/* Paper grain */}
      <div
        className="fixed inset-0 z-0 opacity-[0.035] pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')" }}
      ></div>

      <button
        onClick={onBack}
        className="fixed top-5 left-4 sm:top-6 sm:left-6 z-[110] bg-white/[0.85] backdrop-blur-md border border-[#4B5D42]/[0.15] px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[2px] text-[#2E3528] hover:bg-[#4B5D42] hover:text-[#F7F4EC] transition-all shadow-sm"
      >
        ← {t.back}
      </button>

      {hasEntered && !eventContext && (
        <button
          onClick={onOrder}
          className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-[110] px-6 py-3 sm:px-8 sm:py-4 bg-[#4B5D42] text-[#F7F4EC] rounded-full text-[10px] sm:text-xs uppercase tracking-[3px] font-bold hover:bg-[#2E3528] transition-all duration-500 shadow-[0_10px_30px_rgba(75,93,66,0.35)] flex items-center gap-2 group"
        >
          <span className="whitespace-nowrap">{t.order}</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      )}

      <AnimatePresence>
        {!hasEntered && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.9 } }}
            className="fixed inset-0 z-[100] bg-[#F7F4EC] flex items-center justify-center p-4 overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={`relative w-full max-w-md transition-all duration-1000 ${isOpening ? 'scale-110 opacity-0 -translate-y-10' : 'scale-100'}`}
            >
              <div className="relative bg-[#FCFAF3] border border-[#4B5D42]/[0.15] shadow-[0_30px_80px_rgba(46,53,40,0.12)] px-8 pt-28 pb-12 text-center overflow-hidden">
                {/* Botanical corners */}
                <svg className="absolute -top-6 -left-6 w-32 h-32 text-[#4B5D42]/25" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M10 90 C 20 60, 30 40, 60 20" />
                  <path d="M28 66 C 20 58, 18 50, 24 44 C 32 48, 34 58, 28 66 Z" />
                  <path d="M44 46 C 38 38, 38 30, 46 26 C 52 32, 52 42, 44 46 Z" />
                  <path d="M36 78 C 44 78, 50 74, 50 68 C 42 66, 36 70, 36 78 Z" />
                </svg>
                <svg className="absolute -bottom-6 -right-6 w-32 h-32 text-[#4B5D42]/25 rotate-180" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M10 90 C 20 60, 30 40, 60 20" />
                  <path d="M28 66 C 20 58, 18 50, 24 44 C 32 48, 34 58, 28 66 Z" />
                  <path d="M44 46 C 38 38, 38 30, 46 26 C 52 32, 52 42, 44 46 Z" />
                </svg>

                <div className="relative">
                  <div className="w-16 h-16 mx-auto mb-8 rounded-full border border-[#C9A87C]/60 flex items-center justify-center">
                    <span className="font-serif italic text-2xl text-[#7E6340]">D&K</span>
                  </div>
                  <p className="font-cinzel text-[9px] uppercase tracking-[0.45em] text-[#4B5D42]/70 mb-5">{t.envelopeLabel}</p>
                  <h2 className="font-serif italic text-4xl sm:text-5xl text-[#2E3528] leading-tight mb-4">{names}</h2>
                  <p className="text-[11px] leading-relaxed text-[#2E3528]/[0.55] max-w-[16rem] mx-auto mb-9 font-light">{t.envelopeHint}</p>
                  <div className="w-10 h-px bg-[#C9A87C] mx-auto mb-9"></div>
                  <button
                    onClick={handleEnter}
                    disabled={isOpening}
                    className="px-10 py-4 bg-[#4B5D42] text-[#F7F4EC] text-[10px] font-bold uppercase tracking-[4px] rounded-full hover:bg-[#2E3528] transition-colors disabled:opacity-70"
                  >
                    {isOpening ? t.opening : t.open}
                  </button>
                  <p className="mt-8 font-cinzel text-[9px] uppercase tracking-[0.35em] text-[#2E3528]/[0.35]">{t.date}</p>
                </div>
              </div>

              {/* Envelope flap */}
              <div
                className={`absolute top-0 left-0 w-full h-28 bg-[#E4E9DA] origin-top transition-transform duration-1000 z-30 ${isOpening ? 'rotate-x-180' : 'rotate-x-0'}`}
                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)', backfaceVisibility: 'hidden' }}
              >
                <div className="absolute top-[calc(100%-10px)] left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#C9A87C]"></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {hasEntered && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="relative z-10">
          {/* Hero */}
          <header className="relative h-[78vh] min-h-[520px] w-full overflow-hidden">
            <img
              src="/images/scene/day-garden.webp"
              alt={language === 'tr' ? 'Bahçede düğün çifti' : 'Couple in a garden'}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: '50% 32%' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14180F]/80 via-[#14180F]/20 to-[#14180F]/10"></div>
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 md:p-16 pb-14 sm:pb-16">
              <p className="font-cinzel text-[9px] sm:text-[10px] uppercase tracking-[0.5em] text-[#E4E9DA]/80 mb-5">{t.eyebrow}</p>
              <h1 className="font-serif italic text-5xl sm:text-7xl lg:text-8xl text-[#F7F4EC] leading-[0.95] break-words drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)]">
                {names}
              </h1>
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[#F7F4EC]/[0.85]">
                <span className="font-cinzel text-xs sm:text-sm tracking-[0.25em]">{t.date}</span>
                <span className="w-8 h-px bg-[#C9A87C]"></span>
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em]">{t.day}</span>
              </div>
            </div>
          </header>

          {/* Invitation */}
          <section className="max-w-2xl mx-auto px-6 sm:px-8 pt-20 sm:pt-28 pb-4 text-center">
            <p className="font-cinzel text-[9px] uppercase tracking-[0.45em] text-[#4B5D42]/70 mb-6">{t.inviteTitle}</p>
            <p className="font-serif italic text-2xl sm:text-3xl leading-relaxed text-[#2E3528] mb-8">{t.subtitle}</p>
            <p className="text-sm sm:text-[15px] leading-loose text-[#2E3528]/[0.65] font-light">{t.inviteText}</p>
            <div className="w-16 h-px bg-[#C9A87C] mx-auto mt-10"></div>
          </section>

          {/* Countdown */}
          <section className="max-w-2xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
            <div className="grid grid-cols-4 border-y border-[#4B5D42]/[0.15]">
              {[
                { label: t.countdown[0], value: countdown.days },
                { label: t.countdown[1], value: countdown.hours },
                { label: t.countdown[2], value: countdown.mins },
                { label: t.countdown[3], value: countdown.secs },
              ].map((item, idx) => (
                <div key={idx} className={`py-6 sm:py-8 text-center ${idx < 3 ? 'border-r border-[#4B5D42]/10' : ''}`}>
                  <div className="font-serif text-3xl sm:text-4xl text-[#4B5D42] mb-2 tabular-nums">{String(item.value).padStart(2, '0')}</div>
                  <div className="font-cinzel text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[#2E3528]/[0.45]">{item.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Programme */}
          <section className="max-w-xl mx-auto px-6 sm:px-8 pb-20 sm:pb-24">
            <h2 className="font-cinzel text-[9px] uppercase tracking-[0.45em] text-center text-[#4B5D42]/70 mb-10">{t.programTitle}</h2>
            <div className="divide-y divide-[#4B5D42]/10 border-y border-[#4B5D42]/10">
              {t.program.map((item, idx) => (
                <div key={idx} className="flex items-baseline gap-6 py-5">
                  <span className="font-serif italic text-lg text-[#7E6340] w-20 shrink-0">{item.time}</span>
                  <span className="text-sm text-[#2E3528]/75 tracking-wide">{item.activity}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Story + Gallery (demo only) */}
          {!eventContext && (
            <>
              <section className="max-w-2xl mx-auto px-6 sm:px-8 pb-20 text-center">
                <h2 className="font-cinzel text-[9px] uppercase tracking-[0.45em] text-[#4B5D42]/70 mb-6">{t.storyTitle}</h2>
                <p className="font-serif italic text-xl sm:text-2xl leading-relaxed text-[#2E3528]/80">{t.storyText}</p>
              </section>

              <section className="max-w-5xl mx-auto px-4 sm:px-8 pb-20 sm:pb-24">
                <h2 className="font-cinzel text-[9px] uppercase tracking-[0.45em] text-center text-[#4B5D42]/70 mb-8">{t.galleryTitle}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2 aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-[#E4E9DA]">
                    <img src="/images/scene/chairs-garden.webp" alt={language === 'tr' ? 'Bahçe sandalyeleri' : 'Garden chairs'} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
                  </div>
                  <div className="grid grid-rows-2 gap-4">
                    <div className="overflow-hidden bg-[#E4E9DA]">
                      <img src="/images/scene/flowers-tulips.webp" alt={language === 'tr' ? 'Bahçe çiçekleri' : 'Garden flowers'} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
                    </div>
                    <div className="overflow-hidden bg-[#E4E9DA]">
                      <img src="/images/scene/hero-table.webp" alt={language === 'tr' ? 'Bahçe sofrası' : 'Garden table'} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* Dress code + Map */}
          <section className="max-w-3xl mx-auto px-6 sm:px-8 pb-16">
            <div className="border border-[#4B5D42]/[0.12] bg-[#FCFAF3]/70 px-6 sm:px-8 py-7 text-center">
              <h3 className="font-cinzel text-[9px] uppercase tracking-[0.4em] text-[#4B5D42]/70 mb-3">{t.dressTitle}</h3>
              <p className="text-sm text-[#2E3528]/60 font-light leading-relaxed">{t.dressText}</p>
            </div>
          </section>

          <section className="max-w-3xl mx-auto px-4 sm:px-8 pb-20">
            <LocationMap
              language={language}
              themeColor={themeColor}
              venueName={eventContext?.venue?.name || t.location}
              address={eventContext?.venue?.address || t.address}
              googleMapsUrl={eventContext?.venue?.address ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(eventContext.venue.address)}` : t.mapsUrl}
              theme="light"
            />
          </section>

          {/* RSVP */}
          <section className="max-w-3xl mx-auto px-4 sm:px-8 pb-20">
            <p className="text-center text-[11px] uppercase tracking-[0.3em] text-[#2E3528]/[0.45] mb-6">{t.rsvpNote}</p>
            <RSVPForm language={language} themeColor={themeColor} theme="light" eventId={eventId || 'gardenwedding-demo'} />
          </section>

          <SpiritualCorner
            language={language}
            themeColor={themeColor}
            eventNames={names}
            eventType={t.eyebrow}
            theme="light"
          />

          <Chatbot language={language} eventContext={eventContext} />

          <footer className="border-t border-[#4B5D42]/10 py-10 text-center">
            <p className="font-cinzel text-[9px] uppercase tracking-[0.4em] text-[#2E3528]/[0.35]">{t.footer}</p>
          </footer>
        </motion.div>
      )}

      <style>{`
        .rotate-x-180 { transform: rotateX(180deg); }
        .rotate-x-0 { transform: rotateX(0deg); }
      `}</style>
    </div>
  );
};

export default GardenWeddingTemplate;
