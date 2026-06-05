import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import StarField from './StarField';
import ConceptAnimation from './ConceptAnimation';
import RSVPForm from './RSVPForm';
import LocationMap from './LocationMap';
import SpiritualCorner from './SpiritualCorner';
import BackgroundMusic from './BackgroundMusic';
import { translations } from '../src/constants/translations';
import { Chatbot } from './Chatbot';

interface BirthdayTemplateProps {
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

const BirthdayTemplate: React.FC<BirthdayTemplateProps> = ({ onBack, language, onOrder, eventId, eventContext }) => {
  const [hasEntered, setHasEntered] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  const t = translations[language].birthday;
  const themeColor = "#38bdf8"; // Birthday blue

  const targetDate = new Date('2026-07-05T15:00:00').getTime();

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

  useEffect(() => {
    if (hasEntered) {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [hasEntered]);

  const handleEnter = () => {
    setIsOpening(true);
    setTimeout(() => {
      setHasEntered(true);
      setIsOpening(false);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans relative overflow-x-hidden pb-20">
      <StarField color="#38bdf8" opacity={0.4} backgroundColor="#0f172a" />
      
      {hasEntered && <ConceptAnimation type="birthday" />}

      <button 
        onClick={onBack}
        className="fixed top-6 left-6 z-[110] bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-lg"
      >
        ← {t.back}
      </button>

      {/* Floating Order Button */}
      {hasEntered && !eventContext && (
        <button 
          onClick={onOrder}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[110] px-6 py-3 sm:px-8 sm:py-4 bg-[#38bdf8] border border-[#38bdf8] rounded-full text-white text-[10px] sm:text-xs uppercase tracking-[3px] font-bold hover:bg-[#0284c7] transition-all duration-500 shadow-xl hover:shadow-[0_10px_30px_rgba(56,189,248,0.4)] flex items-center gap-2 group"
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
            className="fixed inset-0 z-[100] bg-[#0f172a] flex items-center justify-center p-4"
          >
            <div className={`relative w-full max-w-2xl h-[500px] md:h-[600px] transition-all duration-1000 ease-in-out ${isOpening ? 'scale-[2] opacity-0 translate-y-[-100px]' : 'scale-100'}`} style={{ perspective: '2000px' }}>
              <div className="absolute inset-0 bg-[#1e293b] rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                
                <div className={`relative z-40 h-full flex flex-col items-center justify-center p-6 text-center transition-all duration-700 ${isOpening ? 'blur-sm' : ''}`}>
                  <div className="mb-10">
                    <motion.div 
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="text-6xl mb-6"
                    >
                      🎈
                    </motion.div>
                    <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter text-[#38bdf8]">{t.title}</h2>
                    <div className="h-2 w-24 bg-[#38bdf8] mx-auto mt-4 rounded-full"></div>
                  </div>
                  
                  <p className="text-white/70 mb-12 tracking-[8px] text-[10px] md:text-xs uppercase max-w-xs leading-loose font-black">{t.subtitle}</p>
                  
                  <button 
                    onClick={handleEnter}
                    disabled={isOpening}
                    className="group relative px-16 py-6 overflow-hidden rounded-2xl transition-all active:scale-95 bg-[#38bdf8] hover:bg-[#0ea5e9] shadow-[0_0_40px_rgba(56,189,248,0.3)]"
                  >
                    <span className="relative z-10 text-black font-black tracking-[4px] uppercase text-sm">
                      {isOpening ? t.opening : t.open}
                    </span>
                  </button>
                </div>

                <div className="absolute inset-0 pointer-events-none z-20">
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#38bdf8]/10 to-transparent"></div>
                  <div className="absolute inset-0" style={{ clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)', background: 'rgba(30, 41, 59, 0.95)', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}></div>
                </div>
              </div>

              <div 
                className={`absolute top-0 left-0 w-full h-1/2 bg-[#1e293b] origin-top transition-transform duration-1000 z-30 shadow-xl ${isOpening ? 'rotate-x-180' : 'rotate-x-0'}`}
                style={{ 
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  backfaceVisibility: 'hidden',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-[#38bdf8] shadow-[0_0_30px_rgba(56,189,248,0.5)] flex items-center justify-center">
                  <span className="text-black text-2xl font-black">🎂</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {hasEntered && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center p-4 md:p-16 relative z-10"
        >
          <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-10 md:p-20 text-center rounded-[50px] shadow-[0_0_100px_rgba(56,189,248,0.1)]">
            <div className="mb-16">
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="text-7xl mb-10"
              >
                🎉
              </motion.div>
              <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-[#38bdf8] break-words">{eventContext?.title || t.mainTitle}</h1>
              <p className="text-white/60 text-sm md:text-lg leading-relaxed max-w-md mx-auto font-medium tracking-wide">
                {t.desc}
              </p>
            </div>

            <div className="mb-20">
              <div className="h-1 w-20 bg-[#38bdf8] mx-auto mb-10 rounded-full"></div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-2">{t.date}</h2>
              <p className="text-[#38bdf8] text-xs tracking-[10px] uppercase font-black">{t.day} | {t.time}</p>
              <div className="h-1 w-20 bg-[#38bdf8] mx-auto mt-10 rounded-full"></div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-20">
              {[
                { label: t.countdownLabels[0], value: countdown.days },
                { label: t.countdownLabels[1], value: countdown.hours },
                { label: t.countdownLabels[2], value: countdown.mins },
                { label: t.countdownLabels[3], value: countdown.secs }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-3xl p-6">
                  <div className="text-3xl md:text-5xl font-black text-[#38bdf8] mb-1">{String(item.value).padStart(2, '0')}</div>
                  <div className="text-[8px] md:text-[10px] text-white/40 tracking-widest font-bold">{item.label}</div>
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
            />

            <div className="my-20">
              {/* RSVP SECTION */}
              <RSVPForm language={language} themeColor={themeColor} eventId={eventId || 'birthday-demo'} />
            </div>

            <Chatbot language={language} eventContext={eventContext} />

            {/* AI SPIRITUAL CORNER */}
            <SpiritualCorner 
              language={language} 
              themeColor={themeColor} 
              eventNames={eventContext?.title || t.names} 
              eventType={t.title} 
            />

            <div className="mt-16 text-[10px] text-white/20 uppercase tracking-[6px] font-black">
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

export default BirthdayTemplate;
