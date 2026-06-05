import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StarField from './StarField';
import ConceptAnimation from './ConceptAnimation';
import RSVPForm from './RSVPForm';
import LocationMap from './LocationMap';
import SpiritualCorner from './SpiritualCorner';
import BackgroundMusic from './BackgroundMusic';
import EventTimeline from './EventTimeline';
import WeatherWidget from './WeatherWidget';
import CalendarButton from './CalendarButton';
import { translations } from '../src/constants/translations';
import { Chatbot } from './Chatbot';

interface WeddingTemplateProps {
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

const WeddingTemplate: React.FC<WeddingTemplateProps> = ({ onBack, language, onOrder, eventId, eventContext }) => {
  const [hasEntered, setHasEntered] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  const t = translations[language].wedding;
  const themeColor = "#d4af37"; // Gold color for wedding

  const targetDate = new Date('2026-08-15T19:00:00').getTime();

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const gap = targetDate - now;
      if (gap > 0) {
        setCountdown({
          days: Math.floor(gap / (1000 * 60 * 60 * 24)),
          hours: Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          mins: Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60)),
          secs: Math.floor((gap % (1000 * 60)) / 1000),
        });
      }
    };
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const handleEnter = () => {
    setIsOpening(true);
    setTimeout(() => {
      setHasEntered(true);
      setIsOpening(false);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#fffaff] text-[#2d3436] font-serif relative overflow-x-hidden pb-20">
      <StarField color="#d4af37" opacity={0.15} backgroundColor="#fffaff" />
      
      {hasEntered && <ConceptAnimation type="wedding" />}

      <button 
        onClick={onBack}
        className="fixed top-6 left-6 z-[110] bg-white/90 border border-[#d4af37]/30 px-5 py-2.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-[3px] hover:bg-[#d4af37] hover:text-white transition-all shadow-md"
      >
        ← {t.back}
      </button>

      {/* Floating Order Button */}
      {hasEntered && !eventContext && (
        <button 
          onClick={onOrder}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[110] px-6 py-3 sm:px-8 sm:py-4 bg-[#d4af37] border border-[#d4af37] rounded-full text-white text-[10px] sm:text-xs uppercase tracking-[3px] font-bold hover:bg-[#b5952f] transition-all duration-500 shadow-xl hover:shadow-[0_10px_30px_rgba(212,175,55,0.4)] flex items-center gap-2 group"
        >
          <span>{language === 'tr' ? 'Bu Tasarımla Sipariş Ver' : 'Order with this Design'}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </button>
      )}

      <AnimatePresence>
        {!hasEntered && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#fffaff] flex items-center justify-center p-4"
          >
            <div className={`relative w-full max-w-2xl h-[500px] md:h-[600px] transition-all duration-1000 ease-in-out ${isOpening ? 'scale-[2] opacity-0 translate-y-[-100px]' : 'scale-100'}`} style={{ perspective: '2000px' }}>
              <div className="absolute inset-0 bg-white rounded-b-lg shadow-2xl border border-[#d4af37]/20 overflow-hidden">
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
                
                <div className={`relative z-40 h-full flex flex-col items-center justify-center p-8 text-center transition-all duration-700 ${isOpening ? 'blur-sm' : ''}`}>
                  <div className="mb-10">
                    <span className="text-[10px] uppercase tracking-[8px] text-[#d4af37] block mb-6 font-bold">{t.title}</span>
                    <h2 className="text-5xl md:text-7xl text-[#2d3436] mb-4 font-light italic">{t.names}</h2>
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-6"></div>
                  </div>
                  
                  <p className="text-[#2d3436]/60 mb-12 font-sans tracking-[5px] text-[10px] uppercase max-w-xs leading-loose">{t.subtitle}</p>
                  
                  <button 
                    onClick={handleEnter}
                    disabled={isOpening}
                    className="group relative px-12 py-5 overflow-hidden rounded-full transition-all active:scale-95 border border-[#d4af37]/40 hover:border-[#d4af37]"
                  >
                    <span className="relative z-10 text-[#d4af37] group-hover:text-white font-sans font-bold tracking-[5px] uppercase text-xs transition-colors duration-300">
                      {isOpening ? t.opening : t.open}
                    </span>
                    <span className="absolute inset-0 bg-[#d4af37] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  </button>
                </div>

                <div className="absolute inset-0 pointer-events-none z-20">
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#d4af37]/5 to-transparent"></div>
                  <div className="absolute inset-0" style={{ clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)', background: 'rgba(255, 255, 255, 0.9)', borderTop: '1px solid rgba(212, 175, 55, 0.1)' }}></div>
                </div>
              </div>

              <div 
                className={`absolute top-0 left-0 w-full h-1/2 bg-white origin-top transition-transform duration-1000 z-30 shadow-sm ${isOpening ? 'rotate-x-180' : 'rotate-x-0'}`}
                style={{ 
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  backfaceVisibility: 'hidden',
                  borderBottom: '1px solid rgba(212, 175, 55, 0.2)'
                }}
              >
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center border border-[#d4af37]/30">
                  <span className="text-[#d4af37] text-xl">💍</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {hasEntered && (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center p-6 md:p-16 relative z-10"
        >
          <div className="w-full max-w-3xl bg-white/80 backdrop-blur-md border border-[#d4af37]/20 p-10 md:p-24 text-center rounded-sm shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#d4af37]"></div>
            
            <div className="mb-16">
              <span className="text-[10px] md:text-xs uppercase tracking-[10px] text-[#d4af37] block mb-8 font-bold">{t.title}</span>
              <h1 className="text-4xl md:text-7xl text-[#2d3436] font-light italic mb-8 break-words">{eventContext?.title || t.names}</h1>
              <p className="text-[#2d3436]/70 text-sm md:text-lg leading-relaxed max-w-lg mx-auto font-sans font-light">
                {language === 'tr' ? 'Hayatımızın en anlamlı gününde, mutluluğumuzu paylaşmak için sizleri düğün törenimize bekliyoruz.' : 'On the most meaningful day of our lives, we invite you to join us at our wedding ceremony to share our happiness.'}
              </p>
            </div>

            <div className="mb-20">
              <div className="h-px w-24 bg-[#d4af37]/30 mx-auto mb-10"></div>
              <h2 className="text-4xl md:text-6xl text-[#2d3436] tracking-[6px] mb-4 font-light">{t.date}</h2>
              <p className="text-[#d4af37] text-xs tracking-[10px] uppercase font-bold">{t.day} | {t.time}</p>
              <div className="h-px w-24 bg-[#d4af37]/30 mx-auto mt-10"></div>
            </div>

            <div className="grid grid-cols-4 gap-6 mb-20">
              {[
                { label: language === 'tr' ? 'GÜN' : 'DAYS', value: countdown.days },
                { label: language === 'tr' ? 'SAAT' : 'HOURS', value: countdown.hours },
                { label: language === 'tr' ? 'DAK' : 'MINS', value: countdown.mins },
                { label: language === 'tr' ? 'SN' : 'SECS', value: countdown.secs }
              ].map((item, idx) => (
                <div key={idx} className="border border-[#d4af37]/10 p-5 rounded-none bg-white/50">
                  <div className="text-3xl md:text-5xl font-light text-[#2d3436] mb-2">{String(item.value).padStart(2, '0')}</div>
                  <div className="text-[8px] md:text-[10px] text-[#d4af37] tracking-widest font-bold">{item.label}</div>
                </div>
              ))}
            </div>

            {!eventContext && (
              <div className="mb-20 flex flex-col items-center gap-8">
                <CalendarButton 
                  label={t.calendarButton} 
                  themeColor={themeColor} 
                  theme="light"
                  event={{
                    title: `${t.names} ${t.title}`,
                    date: "2026-08-15",
                    location: t.address,
                    description: t.inviteText
                  }}
                />
                
                <WeatherWidget 
                  title={t.weatherTitle} 
                  desc={t.weatherDesc} 
                  themeColor={themeColor} 
                  theme="light"
                />
              </div>
            )}

            {!eventContext && (
              <div className="mb-20">
                <EventTimeline 
                  items={t.timeline} 
                  title={t.timelineTitle} 
                  themeColor={themeColor} 
                  theme="light"
                />
              </div>
            )}

            {/* LOCATION & MAP */}
            <LocationMap 
              language={language} 
              themeColor={themeColor} 
              venueName={eventContext?.venue?.name || t.venue} 
              address={eventContext?.venue?.address || t.address} 
              googleMapsUrl={eventContext?.venue?.address ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(eventContext.venue.address)}` : t.googleMapsUrl} 
              theme="light"
            />

            <div className="my-20">
              {/* RSVP SECTION */}
              <RSVPForm language={language} themeColor={themeColor} theme="light" eventId={eventId || 'wedding-demo'} />
            </div>

            <Chatbot language={language} eventContext={eventContext} />

            {/* SHARE MEMORIES */}
            {!eventContext && (
              <div className="mb-20 p-10 rounded-3xl border border-[#d4af37]/10 bg-[#d4af37]/5">
                <h4 className="text-xs uppercase tracking-[8px] text-[#d4af37] mb-4 font-black">{t.shareMemoriesTitle}</h4>
                <p className="text-[#2d3436]/60 text-sm mb-8">{t.shareMemoriesDesc}</p>
                <button className="px-8 py-3 rounded-full bg-[#d4af37] text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#b8962f] transition-all">
                  {language === 'tr' ? 'Fotoğraf Yükle' : 'Upload Photos'}
                </button>
              </div>
            )}

            {/* PHOTO GALLERY */}
            {!eventContext && (
              <div className="mb-20">
                <h4 className="text-[#d4af37] mb-8 font-bold tracking-[6px] uppercase text-xs">{t.galleryTitle}</h4>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-square bg-gray-100 overflow-hidden rounded-lg">
                      <img src={`https://picsum.photos/seed/wedding-${i}/400/400`} alt="gallery" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI SPIRITUAL CORNER */}
            <SpiritualCorner 
              language={language} 
              themeColor={themeColor} 
              eventNames={eventContext?.title || t.names} 
              eventType={t.title} 
              theme="light"
            />

            {/* GIFT LIST */}
            {!eventContext && (
              <div className="mt-20 border-t border-[#d4af37]/10 pt-16">
                <h4 className="text-[#d4af37] mb-4 font-bold tracking-[6px] uppercase text-xs">{t.giftTitle}</h4>
                <p className="text-[#2d3436]/60 text-sm mb-6 italic">{t.giftDesc}</p>
                <div className="inline-block border border-[#d4af37]/30 p-4 rounded-lg bg-white shadow-sm">
                  <span className="text-[10px] block text-[#d4af37] mb-1 font-bold">IBAN</span>
                  <span className="font-mono text-xs">TR00 0000 0000 0000 0000 0000 00</span>
                </div>
              </div>
            )}

            <div className="mt-16 text-[10px] text-[#2d3436]/40 uppercase tracking-[6px] font-bold">
              {eventContext?.title || t.names}
            </div>
          </div>
        </motion.div>
      )}

      <style>{`
        .rotate-x-180 { transform: rotateX(180deg); }
        .rotate-x-0 { transform: rotateX(0deg); }
      `}</style>
      <BackgroundMusic url="https://www.chosic.com/wp-content/uploads/2021/07/Pachelbel-Canon-in-D.mp3" />
    </div>
  );
};

export default WeddingTemplate;
