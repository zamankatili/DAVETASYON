import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StarField from './StarField';
import ConceptAnimation from './ConceptAnimation';
import RSVPForm from './RSVPForm';
import LocationMap from './LocationMap';
import SpiritualCorner from './SpiritualCorner';
import BackgroundMusic from './BackgroundMusic';
import { translations } from '../src/constants/translations';

interface EngagementTemplateProps {
  onBack: () => void;
  language: 'tr' | 'en';
}

const EngagementTemplate: React.FC<EngagementTemplateProps> = ({ onBack, language }) => {
  const [hasEntered, setHasEntered] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  const t = translations[language].engagement;
  const themeColor = "#ff85a2"; // Engagement pink

  const targetDate = new Date('2026-06-12T20:00:00').getTime();

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
    <div className="min-h-screen bg-[#fff5f5] text-[#4a4a4a] font-serif relative overflow-x-hidden pb-20">
      <StarField color="#e0aaff" opacity={0.2} backgroundColor="#fff5f5" />
      
      {hasEntered && <ConceptAnimation type="engagement" />}

      <button 
        onClick={onBack}
        className="fixed top-6 left-6 z-[110] bg-white/80 border border-[#ff85a2]/20 px-4 py-2 rounded-full text-xs font-sans font-bold uppercase tracking-widest hover:bg-[#ff85a2] hover:text-white transition-all shadow-sm"
      >
        ← {t.back}
      </button>

      <AnimatePresence>
        {!hasEntered && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#fff5f5] flex items-center justify-center p-4"
          >
            <div className={`relative w-full max-w-2xl h-[500px] md:h-[600px] transition-all duration-1000 ease-in-out ${isOpening ? 'scale-[2] opacity-0 translate-y-[-100px]' : 'scale-100'}`} style={{ perspective: '2000px' }}>
              <div className="absolute inset-0 bg-[#fffafa] rounded-3xl shadow-2xl border border-[#ff85a2]/10 overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ff85a2 0.5px, transparent 0.5px)', backgroundSize: '25px 25px' }}></div>
                
                <div className={`relative z-40 h-full flex flex-col items-center justify-center p-6 text-center transition-all duration-700 ${isOpening ? 'blur-sm' : ''}`}>
                  <div className="mb-10">
                    <h2 className="text-5xl md:text-7xl text-[#ff85a2] mb-4 font-light italic">{t.title}</h2>
                    <div className="h-px w-16 bg-[#ff85a2]/30 mx-auto mt-4"></div>
                  </div>
                  
                  <p className="text-[#4a4a4a]/70 mb-12 font-sans tracking-[6px] text-[10px] md:text-xs uppercase max-w-xs leading-loose font-bold">{t.subtitle}</p>
                  
                  <button 
                    onClick={handleEnter}
                    disabled={isOpening}
                    className="group relative flex items-center justify-center p-1 overflow-hidden rounded-full transition-all active:scale-95 shadow-lg"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#ff85a2] via-[#ffb3c1] to-[#ff85a2] opacity-20"></span>
                    <span className="relative px-16 py-6 md:px-24 md:py-8 transition-all ease-in duration-75 bg-white rounded-full group-hover:bg-[#ff85a2]">
                      <span className="relative text-[#ff85a2] group-hover:text-white font-sans font-bold tracking-[6px] uppercase text-xs">
                        {isOpening ? t.opening : t.open}
                      </span>
                    </span>
                  </button>
                </div>

                <div className="absolute inset-0 pointer-events-none z-20">
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#ff85a2]/5 to-transparent"></div>
                  <div className="absolute inset-0" style={{ clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)', background: 'rgba(255, 250, 250, 0.9)', borderTop: '1px solid rgba(255, 133, 162, 0.1)' }}></div>
                </div>
              </div>

              <div 
                className={`absolute top-0 left-0 w-full h-1/2 bg-[#fffafa] origin-top transition-transform duration-1000 z-30 shadow-md ${isOpening ? 'rotate-x-180' : 'rotate-x-0'}`}
                style={{ 
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  backfaceVisibility: 'hidden',
                  borderBottom: '1px solid rgba(255, 133, 162, 0.1)'
                }}
              >
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center border border-[#ff85a2]/20">
                  <span className="text-[#ff85a2] text-lg">💖</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {hasEntered && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center p-4 md:p-12 relative z-10"
        >
          <div className="w-full max-w-2xl bg-white/30 backdrop-blur-sm border border-[#ff85a2]/20 p-8 md:p-20 text-center rounded-[40px] shadow-2xl">
            <div className="mb-12">
              <span className="text-[10px] md:text-xs uppercase tracking-[8px] text-[#ff85a2] block mb-6 font-bold">{t.tag}</span>
              <h1 className="text-6xl md:text-8xl text-[#ff85a2] font-light italic mb-6">{t.mainTitle}</h1>
              <p className="text-[#4a4a4a]/80 text-sm md:text-base leading-relaxed max-w-md mx-auto font-sans">
                {t.desc}
              </p>
            </div>

            <div className="mb-16">
              <div className="h-px w-12 bg-[#ff85a2]/20 mx-auto mb-8"></div>
              <h2 className="text-3xl md:text-5xl text-[#4a4a4a] tracking-[4px] mb-2">{t.date}</h2>
              <p className="text-[#ff85a2] text-xs tracking-[8px] uppercase font-bold">{t.day} | {t.time}</p>
              <div className="h-px w-12 bg-[#ff85a2]/20 mx-auto mt-8"></div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-16">
              {[
                { label: t.countdownLabels[0], value: countdown.days },
                { label: t.countdownLabels[1], value: countdown.hours },
                { label: t.countdownLabels[2], value: countdown.mins },
                { label: t.countdownLabels[3], value: countdown.secs }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/20 border border-[#ff85a2]/10 rounded-3xl p-4 backdrop-blur-sm">
                  <div className="text-2xl md:text-4xl font-light text-[#ff85a2] mb-1">{String(item.value).padStart(2, '0')}</div>
                  <div className="text-[8px] md:text-[10px] text-[#4a4a4a]/60 tracking-widest font-bold">{item.label}</div>
                </div>
              ))}
            </div>

            {/* LOCATION & MAP */}
            <LocationMap 
              language={language} 
              themeColor={themeColor} 
              venueName={t.venue} 
              address={t.address} 
              googleMapsUrl={t.googleMapsUrl} 
              theme="light"
            />

            <div className="my-20">
              {/* RSVP SECTION */}
              <RSVPForm language={language} themeColor={themeColor} theme="light" />
            </div>

            {/* AI SPIRITUAL CORNER */}
            <SpiritualCorner 
              language={language} 
              themeColor={themeColor} 
              eventNames={t.names} 
              eventType={t.title} 
              theme="light"
            />

            <div className="mt-16 text-[10px] text-[#4a4a4a]/40 uppercase tracking-[4px] font-bold">
              {t.names}
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

export default EngagementTemplate;
