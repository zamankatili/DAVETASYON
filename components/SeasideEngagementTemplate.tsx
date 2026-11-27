import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RSVPForm from './RSVPForm';
import LocationMap from './LocationMap';
import SpiritualCorner from './SpiritualCorner';
import { Chatbot } from './Chatbot';

interface SeasideEngagementTemplateProps {
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

const SeasideEngagementTemplate: React.FC<SeasideEngagementTemplateProps> = ({ onBack, language, onOrder, eventId, eventContext }) => {
  const [hasEntered, setHasEntered] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  const themeColor = '#3E7C80';

  const t = {
    tr: {
      back: 'Geri Dön',
      envelopeLabel: 'Sahil Nişanı',
      envelopeHint: 'Denizin sesi, tuzlu hava ve iki kişilik bir başlangıç',
      open: 'Davetiyeyi Aç',
      opening: 'Açılıyor...',
      names: 'Lara & Deniz',
      eyebrow: 'Sahil Nişanı',
      subtitle: 'Sözümüzü, en sevdiğimiz manzaraya karşı vermek istiyoruz.',
      date: '5 Eylül 2026',
      day: 'Cumartesi · 17:30',
      inviteTitle: 'Gün Batımında Buluşalım',
      inviteText: 'Ayvalık’ta, denize bakan küçük bir koyda nişanlanıyoruz. Yanımızda olmanız, bu manzarayı bizim için tamamlayacak.',
      countdown: ['Gün', 'Saat', 'Dakika', 'Saniye'],
      programTitle: 'Sahil Notları',
      program: [
        { time: '17:30', activity: 'Koyda Karşılama' },
        { time: '18:30', activity: 'Nişan Töreni' },
        { time: '19:30', activity: 'Gün Batımı Sofrası' },
      ],
      galleryTitle: 'Koydan Kareler',
      storyTitle: 'Hikayemiz',
      storyText: 'İlk kez bir tekne turunda tanıştık; o gün denize bakarken konuştuğumuz her şey, bugün bu davetiyenin içinde.',
      dressTitle: 'Kıyafet Notu',
      dressText: 'Kum tonları, deniz mavisi ve keten kumaşlar; akşam serinliği için ince bir ceket iyi olur.',
      location: 'Küçük Koy, Ayvalık',
      address: 'Cunda Adası, Sahil Yolu No: 4, Ayvalık / Balıkesir',
      mapsUrl: 'https://maps.google.com',
      rsvpNote: 'Lütfen 25 Ağustos’a kadar yanıt verin.',
      order: 'Bu Tasarımla Sipariş Ver',
      footer: 'Lara & Deniz · 05.09.2026',
    },
    en: {
      back: 'Go Back',
      envelopeLabel: 'Seaside Engagement',
      envelopeHint: 'The sound of the sea, salty air and a beginning for two',
      open: 'Open Invitation',
      opening: 'Opening...',
      names: 'Lara & Deniz',
      eyebrow: 'Seaside Engagement',
      subtitle: 'We want to give our promise facing the view we love most.',
      date: 'September 5, 2026',
      day: 'Saturday · 5:30 PM',
      inviteTitle: 'Let’s Meet At Sunset',
      inviteText: 'We are getting engaged in a small cove overlooking the sea in Ayvalik. Having you with us will complete this view for us.',
      countdown: ['Days', 'Hours', 'Mins', 'Secs'],
      programTitle: 'Seaside Notes',
      program: [
        { time: '5:30 PM', activity: 'Welcome at the Cove' },
        { time: '6:30 PM', activity: 'Engagement Ceremony' },
        { time: '7:30 PM', activity: 'Sunset Table' },
      ],
      galleryTitle: 'Moments From The Cove',
      storyTitle: 'Our Story',
      storyText: 'We first met on a boat trip; everything we talked about that day while looking at the sea is inside this invitation.',
      dressTitle: 'Dress Note',
      dressText: 'Sand tones, sea blues and linen fabrics; a light jacket will be good for the evening breeze.',
      location: 'Little Cove, Ayvalik',
      address: 'Cunda Island, Sahil Road No: 4, Ayvalik / Balikesir',
      mapsUrl: 'https://maps.google.com',
      rsvpNote: 'Please reply by August 25.',
      order: 'Order with this Design',
      footer: 'Lara & Deniz · 09.05.2026',
    },
  }[language];

  const targetDate = new Date('2026-09-05T17:30:00').getTime();

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
    <div className="min-h-screen bg-[#F6F2E9] text-[#23484C] font-sans relative overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[45%] h-[45%] bg-[#DCE9E4]/60 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[5%] right-[-10%] w-[40%] h-[40%] bg-[#C9A87C]/10 blur-[120px] rounded-full"></div>
      </div>

      <button
        onClick={onBack}
        className="fixed top-5 left-4 sm:top-6 sm:left-6 z-[110] bg-white/80 backdrop-blur-md border border-[#3E7C80]/20 px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[2px] text-[#23484C] hover:bg-[#3E7C80] hover:text-[#F6F2E9] transition-all shadow-sm"
      >
        ← {t.back}
      </button>

      {hasEntered && !eventContext && (
        <button
          onClick={onOrder}
          className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-[110] px-6 py-3 sm:px-8 sm:py-4 bg-[#3E7C80] text-[#F6F2E9] rounded-full text-[10px] sm:text-xs uppercase tracking-[3px] font-bold hover:bg-[#23484C] transition-all duration-500 shadow-[0_10px_30px_rgba(62,124,128,0.35)] flex items-center gap-2 group"
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
            className="fixed inset-0 z-[100] bg-[#F6F2E9] flex items-center justify-center p-4 overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={`relative w-full max-w-md transition-all duration-1000 ${isOpening ? 'scale-110 opacity-0 -translate-y-10' : 'scale-100'}`}
            >
              <div className="relative bg-[#FBF8F1] border border-[#3E7C80]/[0.15] shadow-[0_30px_80px_rgba(35,72,76,0.14)] px-8 pt-28 pb-12 text-center overflow-hidden">
                <svg className="absolute inset-x-0 bottom-0 w-full h-24 text-[#DCE9E4]" viewBox="0 0 400 100" preserveAspectRatio="none" fill="currentColor">
                  <path d="M0 70 C 50 50, 90 90, 140 70 C 190 50, 230 90, 280 70 C 330 50, 370 90, 400 70 V 100 H 0 Z" opacity="0.7" />
                  <path d="M0 82 C 60 66, 100 98, 160 82 C 220 66, 260 98, 320 82 C 360 72, 380 90, 400 82 V 100 H 0 Z" opacity="0.5" />
                </svg>

                <div className="relative">
                  <div className="w-16 h-16 mx-auto mb-7 rounded-full border border-[#3E7C80]/40 flex items-center justify-center bg-white/60">
                    <span className="font-serif italic text-xl text-[#3E7C80]">L&D</span>
                  </div>
                  <p className="font-cinzel text-[9px] uppercase tracking-[0.45em] text-[#3E7C80]/80 mb-5">{t.envelopeLabel}</p>
                  <h2 className="font-serif italic text-4xl sm:text-5xl leading-tight mb-4">{names}</h2>
                  <p className="text-[11px] leading-relaxed text-[#23484C]/[0.55] max-w-[16rem] mx-auto mb-8 font-light">{t.envelopeHint}</p>

                  <div className="flex items-center justify-center gap-2 mb-8" aria-hidden="true">
                    <svg width="34" height="10" viewBox="0 0 34 10" fill="none" stroke="#C9A87C" strokeWidth="1.2"><path d="M1 5 C 6 1, 11 9, 17 5 C 23 1, 28 9, 33 5" /></svg>
                    <span className="w-1 h-1 rounded-full bg-[#C9A87C]"></span>
                    <svg width="34" height="10" viewBox="0 0 34 10" fill="none" stroke="#C9A87C" strokeWidth="1.2"><path d="M1 5 C 6 1, 11 9, 17 5 C 23 1, 28 9, 33 5" /></svg>
                  </div>

                  <button
                    onClick={handleEnter}
                    disabled={isOpening}
                    className="px-10 py-4 bg-[#3E7C80] text-[#F6F2E9] text-[10px] font-bold uppercase tracking-[4px] rounded-full hover:bg-[#23484C] transition-colors disabled:opacity-70"
                  >
                    {isOpening ? t.opening : t.open}
                  </button>
                  <p className="mt-8 font-cinzel text-[9px] uppercase tracking-[0.35em] text-[#23484C]/40">{t.date}</p>
                </div>
              </div>

              <div
                className={`absolute top-0 left-0 w-full h-28 bg-[#DCE9E4] origin-top transition-transform duration-1000 z-30 ${isOpening ? 'rotate-x-180' : 'rotate-x-0'}`}
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
          <header className="relative h-[82vh] min-h-[540px] w-full overflow-hidden">
            <img
              src="/images/templates/seaside-hero.webp"
              alt={language === 'tr' ? 'Gün batımında sahil' : 'Coast at sunset'}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: '50% 55%' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E2426]/75 via-[#0E2426]/[0.15] to-transparent"></div>

            <div className="absolute inset-x-0 bottom-0 px-6 sm:px-10 md:px-16 pb-24 sm:pb-28">
              <p className="font-cinzel text-[9px] sm:text-[10px] uppercase tracking-[0.5em] text-[#F6F2E9]/80 mb-5">{t.eyebrow}</p>
              <h1 className="font-serif italic text-5xl sm:text-7xl lg:text-8xl text-[#F6F2E9] leading-[0.95] break-words drop-shadow-[0_2px_20px_rgba(0,0,0,0.3)]">
                {names}
              </h1>
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[#F6F2E9]/[0.85]">
                <span className="font-cinzel text-xs sm:text-sm tracking-[0.25em]">{t.date}</span>
                <span className="w-8 h-px bg-[#C9A87C]"></span>
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em]">{t.day}</span>
              </div>
            </div>

            <svg className="absolute bottom-0 left-0 w-full h-16 sm:h-24 text-[#F6F2E9]" viewBox="0 0 1440 120" preserveAspectRatio="none" fill="currentColor">
              <path d="M0 70 C 180 30, 300 110, 480 70 C 660 30, 780 110, 960 70 C 1140 30, 1260 110, 1440 70 V 120 H 0 Z" />
            </svg>
          </header>

          {/* Invitation */}
          <section className="max-w-2xl mx-auto px-6 sm:px-8 pt-14 sm:pt-20 pb-6 text-center">
            <p className="font-cinzel text-[9px] uppercase tracking-[0.45em] text-[#3E7C80]/80 mb-6">{t.inviteTitle}</p>
            <p className="font-serif italic text-2xl sm:text-3xl leading-relaxed mb-8">{t.subtitle}</p>
            <p className="text-sm sm:text-[15px] leading-loose text-[#23484C]/[0.65] font-light">{t.inviteText}</p>
          </section>

          {/* Countdown */}
          <section className="max-w-2xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
            <div className="grid grid-cols-4 gap-3 sm:gap-6">
              {[
                { label: t.countdown[0], value: countdown.days },
                { label: t.countdown[1], value: countdown.hours },
                { label: t.countdown[2], value: countdown.mins },
                { label: t.countdown[3], value: countdown.secs },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#3E7C80]/25 bg-white/50 flex items-center justify-center mb-3">
                    <span className="font-serif text-2xl sm:text-3xl text-[#3E7C80] tabular-nums">{String(item.value).padStart(2, '0')}</span>
                  </div>
                  <span className="font-cinzel text-[7px] sm:text-[9px] uppercase tracking-[0.2em] text-[#23484C]/[0.45]">{item.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Programme */}
          <section className="max-w-4xl mx-auto px-6 sm:px-8 pb-16 sm:pb-20">
            <h2 className="font-cinzel text-[9px] uppercase tracking-[0.45em] text-center text-[#3E7C80]/80 mb-9">{t.programTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {t.program.map((item, idx) => (
                <div key={idx} className="border border-[#3E7C80]/[0.12] bg-white/40 px-6 py-7 text-center">
                  <div className="font-serif italic text-xl text-[#3E7C80] mb-2">{item.time}</div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[#23484C]/60 leading-relaxed">{item.activity}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Story + Gallery (demo only) */}
          {!eventContext && (
            <>
              <section className="max-w-2xl mx-auto px-6 sm:px-8 pb-16 text-center">
                <h2 className="font-cinzel text-[9px] uppercase tracking-[0.45em] text-[#3E7C80]/80 mb-6">{t.storyTitle}</h2>
                <p className="font-serif italic text-xl sm:text-2xl leading-relaxed text-[#23484C]/80">{t.storyText}</p>
              </section>

              <section className="max-w-5xl mx-auto px-4 sm:px-8 pb-20">
                <h2 className="font-cinzel text-[9px] uppercase tracking-[0.45em] text-center text-[#3E7C80]/80 mb-8">{t.galleryTitle}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="col-span-2 row-span-2 aspect-[4/3] overflow-hidden bg-[#DCE9E4]">
                    <img src="/images/templates/seaside-cove.webp" alt={language === 'tr' ? 'Koy manzarası' : 'Cove view'} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
                  </div>
                  <div className="aspect-square overflow-hidden bg-[#DCE9E4]">
                    <img src="/images/templates/seaside-sunset.webp" alt={language === 'tr' ? 'Gün batımı' : 'Sunset'} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
                  </div>
                  <div className="aspect-square overflow-hidden bg-[#DCE9E4]">
                    <img src="/images/templates/seaside-palm.webp" alt={language === 'tr' ? 'Palmiyeli sahil' : 'Palm beach'} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
                  </div>
                  <div className="col-span-2 aspect-[2/1] overflow-hidden bg-[#DCE9E4]">
                    <img src="/images/scene/rings-pearls.webp" alt={language === 'tr' ? 'Yüzükler' : 'Rings'} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
                  </div>
                </div>
              </section>
            </>
          )}

          {/* Dress code */}
          <section className="max-w-3xl mx-auto px-6 sm:px-8 pb-14">
            <div className="border border-[#3E7C80]/[0.12] bg-white/40 px-6 sm:px-8 py-7 text-center">
              <h3 className="font-cinzel text-[9px] uppercase tracking-[0.4em] text-[#3E7C80]/80 mb-3">{t.dressTitle}</h3>
              <p className="text-sm text-[#23484C]/60 font-light leading-relaxed">{t.dressText}</p>
            </div>
          </section>

          {/* Map */}
          <section className="max-w-3xl mx-auto px-4 sm:px-8 pb-16">
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
            <p className="text-center text-[11px] uppercase tracking-[0.3em] text-[#23484C]/[0.45] mb-6">{t.rsvpNote}</p>
            <RSVPForm language={language} themeColor={themeColor} theme="light" eventId={eventId || 'seasideengagement-demo'} />
          </section>

          <SpiritualCorner
            language={language}
            themeColor={themeColor}
            eventNames={names}
            eventType={t.eyebrow}
            theme="light"
          />

          <Chatbot language={language} eventContext={eventContext} />

          <footer className="border-t border-[#3E7C80]/10 py-10 text-center">
            <p className="font-cinzel text-[9px] uppercase tracking-[0.4em] text-[#23484C]/[0.35]">{t.footer}</p>
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

export default SeasideEngagementTemplate;
