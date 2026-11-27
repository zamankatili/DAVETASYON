import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RSVPForm from './RSVPForm';
import LocationMap from './LocationMap';
import SpiritualCorner from './SpiritualCorner';
import { Chatbot } from './Chatbot';

interface ModernKinaTemplateProps {
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

const ModernKinaTemplate: React.FC<ModernKinaTemplateProps> = ({ onBack, language, onOrder, eventId, eventContext }) => {
  const [hasEntered, setHasEntered] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  const themeColor = '#7E2A33';

  const t = {
    tr: {
      back: 'Geri Dön',
      envelopeLabel: 'Modern Kına',
      envelopeHint: 'Kırmızının en modern hâli, altının en sade dokunuşu',
      open: 'Davetiyeyi Aç',
      opening: 'Açılıyor...',
      names: 'Selin & Mert',
      eyebrow: 'Modern Kına Gecesi',
      subtitle: 'Geleneğin sıcaklığını, bugünün sadeliğiyle buluşturduğumuz bir geceye davetlisiniz.',
      date: '26 Eylül 2026',
      day: 'Cumartesi · 20:00',
      sections: ['Davet', 'Program', 'Kareler', 'Konum'],
      inviteTitle: 'Bir Gece, Bir Başlangıç',
      inviteText: 'Kına yakılacak, türküler söylenecek; ama bu kez her şey daha sade, daha bizden. Bu geceyi birlikte hatırlamak için sizi bekliyoruz.',
      countdown: ['Gün', 'Saat', 'Dakika', 'Saniye'],
      programTitle: 'Gecenin Akışı',
      program: [
        { time: '20:00', activity: 'Kapılar Açılıyor · Hoş Geldin Kokteyli' },
        { time: '21:00', activity: 'Kına Yakma Töreni' },
        { time: '22:00', activity: 'Müzik & Dans' },
        { time: '23:30', activity: 'Gece Kapanışı' },
      ],
      galleryTitle: 'Gecenin Hazırlığı',
      storyTitle: 'Neden Modern Kına?',
      storyText: 'Kına gecesi bizim için bir veda değil, yeni bir ailenin ilk sofrası. O yüzden geleneği koruyup ritüeli sadeleştirdik.',
      dressTitle: 'Kıyafet Notu',
      dressText: 'Bordo, gül kurusu ve altın tonları; rahat ama şık bir gece için ideal.',
      location: 'Nar Salon, İstanbul',
      address: 'Bomonti Mah. Silahşör Cad. No: 22, Şişli / İstanbul',
      mapsUrl: 'https://maps.google.com',
      rsvpNote: 'Lütfen 15 Eylül’e kadar yanıt verin.',
      order: 'Bu Tasarımla Sipariş Ver',
      footer: 'Selin & Mert · 26.09.2026',
    },
    en: {
      back: 'Go Back',
      envelopeLabel: 'Modern Henna',
      envelopeHint: 'The most modern shade of red, the quietest touch of gold',
      open: 'Open Invitation',
      opening: 'Opening...',
      names: 'Selin & Mert',
      eyebrow: 'Modern Henna Night',
      subtitle: 'You are invited to a night where the warmth of tradition meets the simplicity of today.',
      date: 'September 26, 2026',
      day: 'Saturday · 8:00 PM',
      sections: ['Invitation', 'Programme', 'Moments', 'Location'],
      inviteTitle: 'One Night, One Beginning',
      inviteText: 'Henna will be applied, songs will be sung; but this time everything is simpler, more ours. We are waiting for you to remember this night together.',
      countdown: ['Days', 'Hours', 'Mins', 'Secs'],
      programTitle: 'Flow of the Night',
      program: [
        { time: '8:00 PM', activity: 'Doors Open · Welcome Cocktail' },
        { time: '9:00 PM', activity: 'Henna Ceremony' },
        { time: '10:00 PM', activity: 'Music & Dancing' },
        { time: '11:30 PM', activity: 'Closing' },
      ],
      galleryTitle: 'Preparations',
      storyTitle: 'Why Modern Henna?',
      storyText: 'For us, the henna night is not a farewell but the first table of a new family. So we kept the tradition and simplified the ritual.',
      dressTitle: 'Dress Note',
      dressText: 'Burgundy, dusty rose and gold tones; ideal for a comfortable yet elegant night.',
      location: 'Nar Hall, Istanbul',
      address: 'Bomonti, Silahsor St. No: 22, Sisli / Istanbul',
      mapsUrl: 'https://maps.google.com',
      rsvpNote: 'Please reply by September 15.',
      order: 'Order with this Design',
      footer: 'Selin & Mert · 09.26.2026',
    },
  }[language];

  const targetDate = new Date('2026-09-26T20:00:00').getTime();

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

  const SectionLabel = ({ index, title }: { index: number; title: string }) => (
    <div className="flex items-center gap-4 mb-10">
      <span className="font-cinzel text-[10px] tracking-[0.3em] text-[#C9A87C]/70">{String(index).padStart(2, '0')}</span>
      <span className="h-px w-10 bg-[#C9A87C]/30"></span>
      <span className="font-cinzel text-[10px] uppercase tracking-[0.35em] text-[#F7F3EA]/[0.45]">{title}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#170D0F] text-[#F7F3EA] font-sans relative overflow-x-hidden">
      {/* Candle glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-15%] right-[-10%] w-[55%] h-[55%] bg-[#7E2A33]/20 blur-[140px] rounded-full"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#C9A87C]/10 blur-[150px] rounded-full"></div>
      </div>

      <button
        onClick={onBack}
        className="fixed top-5 left-4 sm:top-6 sm:left-6 z-[110] bg-[#170D0F]/80 backdrop-blur-md border border-[#C9A87C]/25 px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[2px] text-[#F7F3EA]/80 hover:bg-[#C9A87C] hover:text-[#170D0F] transition-all"
      >
        ← {t.back}
      </button>

      {hasEntered && !eventContext && (
        <button
          onClick={onOrder}
          className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-[110] px-6 py-3 sm:px-8 sm:py-4 bg-[#7E2A33] border border-[#C9A87C]/40 rounded-full text-[#F7F3EA] text-[10px] sm:text-xs uppercase tracking-[3px] font-bold hover:bg-[#C9A87C] hover:text-[#170D0F] transition-all duration-500 shadow-[0_10px_30px_rgba(126,42,51,0.5)] flex items-center gap-2 group"
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
            className="fixed inset-0 z-[100] bg-[#170D0F] flex items-center justify-center p-4 overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={`relative w-full max-w-md transition-all duration-1000 ${isOpening ? 'scale-110 opacity-0 -translate-y-10' : 'scale-100'}`}
            >
              <div className="relative bg-[#211114] border border-[#C9A87C]/20 px-8 pt-28 pb-12 text-center overflow-hidden">
                {/* Henna-inspired geometric frame */}
                <svg className="absolute inset-0 w-full h-full text-[#C9A87C]/[0.15]" viewBox="0 0 400 520" fill="none" stroke="currentColor" strokeWidth="0.8" preserveAspectRatio="none">
                  <path d="M24 24 H376 V496 H24 Z" />
                  <path d="M40 40 H360 V480 H40 Z" strokeDasharray="2 6" />
                  <circle cx="200" cy="200" r="70" />
                  <circle cx="200" cy="200" r="88" strokeDasharray="1 8" />
                  <path d="M200 112 L208 136 L232 144 L208 152 L200 176 L192 152 L168 144 L192 136 Z" />
                </svg>

                <div className="relative">
                  <p className="font-cinzel text-[9px] uppercase tracking-[0.45em] text-[#C9A87C] mb-6">{t.envelopeLabel}</p>
                  <h2 className="font-serif italic text-4xl sm:text-5xl leading-tight mb-4">{names}</h2>
                  <p className="text-[11px] leading-relaxed text-[#F7F3EA]/50 max-w-[16rem] mx-auto mb-9 font-light">{t.envelopeHint}</p>
                  <div className="flex items-center justify-center gap-3 mb-9">
                    <span className="h-px w-8 bg-[#C9A87C]/40"></span>
                    <span className="w-1.5 h-1.5 rotate-45 bg-[#C9A87C]"></span>
                    <span className="h-px w-8 bg-[#C9A87C]/40"></span>
                  </div>
                  <button
                    onClick={handleEnter}
                    disabled={isOpening}
                    className="px-10 py-4 bg-[#7E2A33] text-[#F7F3EA] text-[10px] font-bold uppercase tracking-[4px] hover:bg-[#C9A87C] hover:text-[#170D0F] transition-colors disabled:opacity-70"
                  >
                    {isOpening ? t.opening : t.open}
                  </button>
                  <p className="mt-8 font-cinzel text-[9px] uppercase tracking-[0.35em] text-[#F7F3EA]/[0.35]">{t.date}</p>
                </div>
              </div>

              <div
                className={`absolute top-0 left-0 w-full h-28 bg-[#2A1216] origin-top transition-transform duration-1000 z-30 border-b border-[#C9A87C]/20 ${isOpening ? 'rotate-x-180' : 'rotate-x-0'}`}
                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)', backfaceVisibility: 'hidden' }}
              >
                <div className="absolute top-[calc(100%-10px)] left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#C9A87C]"></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {hasEntered && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} className="relative z-10">
          {/* Hero */}
          <header className="max-w-6xl mx-auto px-5 sm:px-8 pt-24 sm:pt-28 pb-16 sm:pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-7 order-2 lg:order-1">
                <p className="font-cinzel text-[9px] sm:text-[10px] uppercase tracking-[0.5em] text-[#C9A87C] mb-6">{t.eyebrow}</p>
                <h1 className="font-serif italic text-5xl sm:text-7xl lg:text-8xl leading-[0.95] break-words">{names}</h1>
                <p className="mt-8 max-w-lg text-sm sm:text-base leading-loose text-[#F7F3EA]/[0.55] font-light">{t.subtitle}</p>
                <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <span className="font-cinzel text-xs sm:text-sm tracking-[0.25em] text-[#F7F3EA]/[0.85]">{t.date}</span>
                  <span className="w-8 h-px bg-[#C9A87C]/50"></span>
                  <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#C9A87C]">{t.day}</span>
                </div>
              </div>

              <div className="lg:col-span-5 order-1 lg:order-2">
                <div className="relative mx-auto max-w-[290px] sm:max-w-[340px]">
                  <div className="absolute -inset-3 border border-[#C9A87C]/25"></div>
                  <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[#C9A87C]"></div>
                  <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-[#C9A87C]"></div>
                  <div className="aspect-[3/4] overflow-hidden bg-[#211114]">
                    <img
                      src="/images/covers/kina.webp"
                      alt={language === 'tr' ? 'Kına yakılmış gelin eli' : 'Bride hand with henna'}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: '50% 40%' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#170D0F]/60 via-transparent to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Countdown */}
          <section className="max-w-5xl mx-auto px-5 sm:px-8 pb-16">
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              {[
                { label: t.countdown[0], value: countdown.days },
                { label: t.countdown[1], value: countdown.hours },
                { label: t.countdown[2], value: countdown.mins },
                { label: t.countdown[3], value: countdown.secs },
              ].map((item, idx) => (
                <div key={idx} className="border border-[#C9A87C]/[0.15] bg-[#211114]/60 py-5 sm:py-7 text-center">
                  <div className="font-serif text-2xl sm:text-4xl text-[#C9A87C] tabular-nums mb-1">{String(item.value).padStart(2, '0')}</div>
                  <div className="font-cinzel text-[7px] sm:text-[9px] uppercase tracking-[0.2em] text-[#F7F3EA]/40">{item.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Invitation */}
          <section className="max-w-3xl mx-auto px-5 sm:px-8 py-10">
            <SectionLabel index={1} title={t.sections[0]} />
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
              <h2 className="md:col-span-5 font-serif italic text-3xl sm:text-4xl leading-snug">{t.inviteTitle}</h2>
              <p className="md:col-span-7 text-sm sm:text-[15px] leading-loose text-[#F7F3EA]/[0.55] font-light">{t.inviteText}</p>
            </div>
          </section>

          {/* Programme */}
          <section className="max-w-3xl mx-auto px-5 sm:px-8 py-10">
            <SectionLabel index={2} title={t.sections[1]} />
            <h3 className="font-serif italic text-2xl sm:text-3xl mb-8">{t.programTitle}</h3>
            <div className="border-t border-[#C9A87C]/[0.15]">
              {t.program.map((item, idx) => (
                <div key={idx} className="flex items-center gap-5 sm:gap-8 py-5 border-b border-[#F7F3EA]/[0.08]">
                  <span className="font-cinzel text-[11px] tracking-[0.2em] text-[#C9A87C] w-16 sm:w-20 shrink-0">{item.time}</span>
                  <span className="w-1.5 h-1.5 rotate-45 bg-[#7E2A33] shrink-0"></span>
                  <span className="text-sm text-[#F7F3EA]/70">{item.activity}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Story + Gallery (demo only) */}
          {!eventContext && (
            <>
              <section className="max-w-3xl mx-auto px-5 sm:px-8 py-10">
                <SectionLabel index={3} title={t.sections[2]} />
                <div className="mb-10">
                  <h3 className="font-serif italic text-2xl sm:text-3xl mb-4">{t.storyTitle}</h3>
                  <p className="text-sm leading-loose text-[#F7F3EA]/50 font-light max-w-2xl">{t.storyText}</p>
                </div>
                <h4 className="font-cinzel text-[9px] uppercase tracking-[0.35em] text-[#F7F3EA]/40 mb-5">{t.galleryTitle}</h4>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {[
                    { src: '/images/scene/hero-table.webp', alt: language === 'tr' ? 'Gece sofrası' : 'Table setting' },
                    { src: '/images/scene/flowers-tulips.webp', alt: language === 'tr' ? 'Çiçekler' : 'Flowers' },
                    { src: '/images/scene/rings-pearls.webp', alt: language === 'tr' ? 'Yüzükler' : 'Rings' },
                  ].map((img, idx) => (
                    <div key={idx} className="aspect-[3/4] overflow-hidden bg-[#211114] border border-[#F7F3EA]/5">
                      <img src={img.src} alt={img.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
                    </div>
                  ))}
                </div>
              </section>

              <section className="max-w-3xl mx-auto px-5 sm:px-8 pt-6">
                <div className="border border-[#C9A87C]/[0.15] bg-[#211114]/50 px-6 sm:px-8 py-7">
                  <h3 className="font-cinzel text-[9px] uppercase tracking-[0.4em] text-[#C9A87C]/80 mb-3">{t.dressTitle}</h3>
                  <p className="text-sm text-[#F7F3EA]/[0.55] font-light leading-relaxed">{t.dressText}</p>
                </div>
              </section>
            </>
          )}

          {/* Location */}
          <section className="max-w-3xl mx-auto px-4 sm:px-8 py-12">
            <div className="px-2 sm:px-4">
              <SectionLabel index={eventContext ? 3 : 4} title={t.sections[3]} />
            </div>
            <LocationMap
              language={language}
              themeColor={themeColor}
              venueName={eventContext?.venue?.name || t.location}
              address={eventContext?.venue?.address || t.address}
              googleMapsUrl={eventContext?.venue?.address ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(eventContext.venue.address)}` : t.mapsUrl}
              theme="dark"
            />
          </section>

          {/* RSVP */}
          <section className="max-w-3xl mx-auto px-4 sm:px-8 pb-20">
            <p className="text-center text-[10px] uppercase tracking-[0.3em] text-[#F7F3EA]/[0.35] mb-6">{t.rsvpNote}</p>
            <RSVPForm language={language} themeColor={themeColor} theme="dark" eventId={eventId || 'modernkina-demo'} />
          </section>

          <SpiritualCorner
            language={language}
            themeColor={themeColor}
            eventNames={names}
            eventType={t.eyebrow}
            theme="dark"
          />

          <Chatbot language={language} eventContext={eventContext} />

          <footer className="border-t border-[#C9A87C]/10 py-10 text-center">
            <p className="font-cinzel text-[9px] uppercase tracking-[0.4em] text-[#F7F3EA]/30">{t.footer}</p>
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

export default ModernKinaTemplate;
