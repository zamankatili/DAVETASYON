import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StarField from './StarField';
import ConceptAnimation from './ConceptAnimation';
import RSVPForm from './RSVPForm';
import LocationMap from './LocationMap';
import SpiritualCorner from './SpiritualCorner';
import BackgroundMusic from './BackgroundMusic';
import { translations } from '../src/constants/translations';
import { Chatbot } from './Chatbot';

interface KinaTemplateProps {
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

const KinaTemplate: React.FC<KinaTemplateProps> = ({ onBack, language, onOrder, eventId, eventContext }) => {
  const [hasEntered, setHasEntered] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  const t = translations[language].kina;
  const themeColor = "#d4af37"; // Gold
  const accentColor = "#8b0000"; // Deep Red

  const targetDate = new Date('2026-09-10T19:00:00').getTime();

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
    <div className="min-h-screen bg-[#1a0000] text-white font-serif relative overflow-x-hidden pb-20">
      <StarField color="#d4af37" opacity={0.15} backgroundColor="#1a0000" />
      
      {hasEntered && <ConceptAnimation type="wedding" />} {/* Reusing wedding animation for now or can create a specific one */}

      <button 
        onClick={onBack}
        className="fixed top-6 left-6 z-[110] bg-black/80 border border-[#d4af37]/30 px-5 py-2.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-[3px] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all shadow-xl"
      >
        ← {t.back}
      </button>

      {/* Floating Order Button */}
      {hasEntered && !eventContext && (
        <button 
          onClick={onOrder}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[110] px-6 py-3 sm:px-8 sm:py-4 bg-[#8b0000] border border-[#d4af37] rounded-full text-[#d4af37] text-[10px] sm:text-xs uppercase tracking-[3px] font-bold hover:bg-[#d4af37] hover:text-[#8b0000] transition-all duration-500 shadow-xl hover:shadow-[0_10px_30px_rgba(212,175,55,0.4)] flex items-center gap-2 group"
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
            className="fixed inset-0 z-[100] bg-[#1a0000] flex items-center justify-center p-4"
          >
            <div className={`relative w-full max-w-2xl h-[500px] md:h-[600px] transition-all duration-1000 ease-in-out ${isOpening ? 'scale-[2] opacity-0 translate-y-[-100px]' : 'scale-100'}`} style={{ perspective: '2000px' }}>
              <div className="absolute inset-0 bg-[#2d0000] rounded-b-lg shadow-2xl border border-[#d4af37]/20 overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/pinstripe.png")' }}></div>
                
                <div className={`relative z-40 h-full flex flex-col items-center justify-center p-8 text-center transition-all duration-700 ${isOpening ? 'blur-sm' : ''}`}>
                  <div className="mb-10">
                    <span className="text-[10px] uppercase tracking-[8px] text-[#d4af37] block mb-6 font-bold">{t.title}</span>
                    <h2 className="text-5xl md:text-7xl text-[#f7e08b] mb-4 font-light italic break-words">{eventContext?.title || t.names}</h2>
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-6"></div>
                  </div>
                  
                  <button 
                    onClick={handleEnter}
                    disabled={isOpening}
                    className="group relative px-12 py-5 overflow-hidden rounded-full transition-all active:scale-95 border border-[#d4af37]/40 hover:border-[#d4af37]"
                  >
                    <span className="relative z-10 text-[#d4af37] group-hover:text-black font-sans font-bold tracking-[5px] uppercase text-xs transition-colors duration-300">
                      {isOpening ? t.opening : t.enter}
                    </span>
                    <span className="absolute inset-0 bg-[#d4af37] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  </button>
                </div>

                <div className="absolute inset-0 pointer-events-none z-20">
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#8b0000]/20 to-transparent"></div>
                  <div className="absolute inset-0" style={{ clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)', background: 'rgba(45, 0, 0, 0.95)', borderTop: '1px solid rgba(212, 175, 55, 0.1)' }}></div>
                </div>
              </div>

              <div 
                className={`absolute top-0 left-0 w-full h-1/2 bg-[#2d0000] origin-top transition-transform duration-1000 z-30 shadow-sm ${isOpening ? 'rotate-x-180' : 'rotate-x-0'}`}
                style={{ 
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  backfaceVisibility: 'hidden',
                  borderBottom: '1px solid rgba(212, 175, 55, 0.2)'
                }}
              >
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-[#8b0000] shadow-lg flex items-center justify-center border border-[#d4af37]/30">
                  <span className="text-[#d4af37] text-xl">🌹</span>
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
          <div className="w-full max-w-3xl bg-[#2d0000]/80 backdrop-blur-md border border-[#d4af37]/20 p-10 md:p-24 text-center rounded-sm shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#8b0000] via-[#d4af37] to-[#8b0000]"></div>
            
            <div className="mb-16">
              <span className="text-[10px] md:text-xs uppercase tracking-[10px] text-[#d4af37] block mb-8 font-bold">{t.title}</span>
              <h1 className="text-4xl md:text-7xl text-[#f7e08b] font-light italic mb-8 drop-shadow-[0_0_20px_rgba(212,175,55,0.3)] break-words">{eventContext?.title || t.names}</h1>
              <p className="text-white/80 text-sm md:text-lg leading-relaxed max-w-lg mx-auto font-sans font-light">
                {t.inviteText}
              </p>
            </div>

            <div className="mb-20">
              <div className="h-px w-24 bg-[#d4af37]/30 mx-auto mb-10"></div>
              <h2 className="text-4xl md:text-6xl text-white tracking-[6px] mb-4 font-light">{t.date}</h2>
              <p className="text-[#d4af37] text-xs tracking-[10px] uppercase font-bold">{t.day}</p>
              <div className="h-px w-24 bg-[#d4af37]/30 mx-auto mt-10"></div>
            </div>

            <div className="grid grid-cols-4 gap-6 mb-20">
              {[
                { label: language === 'tr' ? 'GÜN' : 'DAYS', value: countdown.days },
                { label: language === 'tr' ? 'SAAT' : 'HOURS', value: countdown.hours },
                { label: language === 'tr' ? 'DAK' : 'MINS', value: countdown.mins },
                { label: language === 'tr' ? 'SN' : 'SECS', value: countdown.secs }
              ].map((item, idx) => (
                <div key={idx} className="border border-[#d4af37]/10 p-5 rounded-none bg-black/30">
                  <div className="text-3xl md:text-5xl font-light text-[#f7e08b] mb-2">{String(item.value).padStart(2, '0')}</div>
                  <div className="text-[8px] md:text-[10px] text-[#d4af37] tracking-widest font-bold">{item.label}</div>
                </div>
              ))}
            </div>

            {/* LOCATION & MAP */}
            <LocationMap 
              language={language} 
              themeColor={themeColor} 
              venueName={eventContext?.venue?.name || t.locationName} 
              address={eventContext?.venue?.address || t.address} 
              googleMapsUrl={eventContext?.venue?.address ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(eventContext.venue.address)}` : t.googleMapsUrl} 
            />

            <div className="my-20">
              {/* RSVP SECTION */}
              <RSVPForm language={language} themeColor={themeColor} eventId={eventId || 'kina-demo'} />
            </div>

            <Chatbot language={language} eventContext={eventContext} />

            {/* AI SPIRITUAL CORNER */}
            <SpiritualCorner 
              language={language} 
              themeColor={themeColor} 
              eventNames={eventContext?.title || t.names} 
              eventType={t.title} 
            />

            <div className="mt-16 text-[10px] text-white/40 uppercase tracking-[6px] font-bold">
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

export default KinaTemplate;
