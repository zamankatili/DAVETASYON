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

interface BabyShowerTemplateProps {
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

const BabyShowerTemplate: React.FC<BabyShowerTemplateProps> = ({ onBack, language, onOrder, eventId, eventContext }) => {
  const [hasEntered, setHasEntered] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  const t = translations[language].babyshower;
  const themeColor = "#8a8a6a"; // Sage green for baby shower

  const targetDate = new Date('2026-05-20T14:00:00').getTime();

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
    <div className="min-h-screen bg-[#fffcf5] text-[#5a5a40] font-serif relative overflow-x-hidden pb-20">
      <StarField color="#5a5a40" opacity={0.3} backgroundColor="#fffcf5" />
      
      {hasEntered && <ConceptAnimation type="babyshower" />}

      <button 
        onClick={onBack}
        className="fixed top-6 left-6 z-[110] bg-white/80 border border-[#5a5a40]/20 px-4 py-2 rounded-full text-[10px] font-sans font-bold uppercase tracking-widest hover:bg-[#5a5a40] hover:text-white transition-all shadow-sm"
      >
        ← {t.back}
      </button>

      {/* Floating Order Button */}
      {hasEntered && !eventContext && (
        <button 
          onClick={onOrder}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[110] px-6 py-3 sm:px-8 sm:py-4 bg-[#5a5a40] border border-[#5a5a40] rounded-full text-white text-[10px] sm:text-xs uppercase tracking-[3px] font-bold hover:bg-[#8a8a6a] transition-all duration-500 shadow-xl hover:shadow-[0_10px_30px_rgba(90,90,64,0.4)] flex items-center gap-2 group"
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
            className="fixed inset-0 z-[100] bg-[#fffcf5] flex items-center justify-center p-4"
          >
            <div className={`relative w-full max-w-2xl h-[500px] md:h-[600px] transition-all duration-1000 ease-in-out ${isOpening ? 'scale-[2] opacity-0 translate-y-[-100px]' : 'scale-100'}`} style={{ perspective: '2000px' }}>
              <div className="absolute inset-0 bg-[#fdf8e1] rounded-b-3xl shadow-2xl border border-[#5a5a40]/10 overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#5a5a40 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }}></div>
                
                <div className={`relative z-40 h-full flex flex-col items-center justify-center p-6 text-center transition-all duration-700 ${isOpening ? 'blur-sm' : ''}`}>
                  <div className="mb-8 md:mb-12">
                    <h2 className="text-5xl md:text-7xl text-[#5a5a40] mb-4 font-light italic">{t.title}</h2>
                    <div className="h-px w-20 bg-[#5a5a40]/30 mx-auto mt-4"></div>
                  </div>
                  
                  <p className="text-[#5a5a40]/70 mb-10 md:mb-14 font-sans tracking-[6px] text-[10px] md:text-xs uppercase max-w-xs leading-loose font-bold">{t.subtitle}</p>
                  
                  <button 
                    onClick={handleEnter}
                    disabled={isOpening}
                    className="group relative flex items-center justify-center p-1 overflow-hidden rounded-full transition-all active:scale-95 shadow-2xl"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#5a5a40] via-[#8a8a6a] to-[#5a5a40] opacity-20"></span>
                    <span className="relative px-16 py-6 md:px-24 md:py-8 transition-all ease-in duration-75 bg-white rounded-full group-hover:bg-[#5a5a40]">
                      <span className="relative text-[#5a5a40] group-hover:text-white font-sans font-bold tracking-[6px] md:tracking-[8px] uppercase text-xs md:text-sm">
                        {isOpening ? t.opening : t.open}
                      </span>
                    </span>
                  </button>
                </div>

                <div className="absolute inset-0 pointer-events-none z-20">
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#5a5a40]/5 to-transparent"></div>
                  <div className="absolute inset-0" style={{ clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)', background: 'rgba(253, 248, 225, 0.8)', borderTop: '1px solid rgba(90, 90, 64, 0.1)' }}></div>
                </div>
              </div>

              <div 
                className={`absolute top-0 left-0 w-full h-1/2 bg-[#fdf8e1] origin-top transition-transform duration-1000 z-30 shadow-md ${isOpening ? 'rotate-x-180' : 'rotate-x-0'}`}
                style={{ 
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  backfaceVisibility: 'hidden',
                  borderBottom: '1px solid rgba(90, 90, 64, 0.1)'
                }}
              >
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center border border-[#5a5a40]/20">
                  <span className="text-[#5a5a40] text-lg">👶</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {hasEntered && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center p-4 md:p-10 relative z-10"
        >
          <div className="w-full max-w-2xl bg-white/40 backdrop-blur-sm border border-[#5a5a40]/10 p-8 md:p-16 text-center rounded-3xl shadow-xl">
            <div className="mb-12">
              <span className="text-[10px] md:text-xs uppercase tracking-[6px] text-[#5a5a40]/60 block mb-4 font-bold">{language === 'tr' ? 'Baby Shower Daveti' : 'Baby Shower Invitation'}</span>
              <h1 className="text-5xl md:text-8xl text-[#5a5a40] font-light italic mb-6 break-words">{eventContext?.title || t.mainTitle}</h1>
              <p className="text-[#5a5a40]/80 text-sm md:text-base leading-relaxed max-w-md mx-auto">
                {t.desc}
              </p>
            </div>

            <div className="mb-16">
              <div className="h-px w-16 bg-[#5a5a40]/20 mx-auto mb-8"></div>
              <h2 className="text-3xl md:text-5xl text-[#5a5a40] tracking-[4px] mb-2">{t.date}</h2>
              <p className="text-[#5a5a40]/60 text-xs tracking-[8px] uppercase font-bold">{t.day} | {t.time}</p>
              <div className="h-px w-16 bg-[#5a5a40]/20 mx-auto mt-8"></div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-16">
              {[
                { label: t.countdownLabels[0], value: countdown.days },
                { label: t.countdownLabels[1], value: countdown.hours },
                { label: t.countdownLabels[2], value: countdown.mins },
                { label: t.countdownLabels[3], value: countdown.secs }
              ].map((item, idx) => (
                <div key={idx} className="bg-[#fdf8e1] border border-[#5a5a40]/5 rounded-2xl p-4">
                  <div className="text-2xl md:text-4xl font-light text-[#5a5a40] mb-1">{String(item.value).padStart(2, '0')}</div>
                  <div className="text-[8px] md:text-[10px] text-[#5a5a40]/60 tracking-widest font-bold">{item.label}</div>
                </div>
              ))}
            </div>

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
              <RSVPForm language={language} themeColor={themeColor} theme="light" eventId={eventId || 'babyshower-demo'} />
            </div>

            <Chatbot language={language} eventContext={eventContext} />

            {/* AI SPIRITUAL CORNER */}
            <SpiritualCorner 
              language={language} 
              themeColor={themeColor} 
              eventNames={eventContext?.title || t.names} 
              eventType={t.title} 
              theme="light"
            />

            <div className="mt-16 text-[10px] text-[#5a5a40]/40 uppercase tracking-[4px] font-bold">
              {eventContext?.title || t.names}
            </div>
          </div>
        </motion.div>
      )}

      <style>{`
        .rotate-x-180 { transform: rotateX(180deg); }
        .rotate-x-0 { transform: rotateX(0deg); }
      `}</style>
      <BackgroundMusic url="https://www.chosic.com/wp-content/uploads/2021/04/Soft-Piano-Music.mp3" />
    </div>
  );
};

export default BabyShowerTemplate;
