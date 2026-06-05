import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StarField from './StarField';
import ConceptAnimation from './ConceptAnimation';
import RSVPForm from './RSVPForm';
import LocationMap from './LocationMap';
import SpiritualCorner from './SpiritualCorner';
import BackgroundMusic from './BackgroundMusic';
import { translations } from '../src/constants/translations';
import { Chatbot } from './Chatbot';

interface SunnetTemplateProps {
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

const SunnetTemplate: React.FC<SunnetTemplateProps> = ({ onBack, language, onOrder, eventId, eventContext }) => {
  const [hasEntered, setHasEntered] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  const t = translations[language].sunnet;
  const themeColor = "#f7e08b";

  const targetDate = new Date('2026-05-24T19:00:00').getTime();

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
    <div className="min-h-screen bg-[#020617] text-white font-montserrat relative overflow-x-hidden pb-20">
      <StarField />

      {hasEntered && <ConceptAnimation type="sunnet" />}

      <button 
        onClick={onBack}
        className="fixed top-6 left-6 z-[110] bg-black/80 border border-[#f7e08b]/30 px-5 py-2.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-[3px] text-[#f7e08b] hover:bg-[#f7e08b] hover:text-black transition-all shadow-xl"
      >
        ← {t.back}
      </button>

      {/* Floating Order Button */}
      {hasEntered && !eventContext && (
        <button 
          onClick={onOrder}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[110] px-6 py-3 sm:px-8 sm:py-4 bg-[#d4af37] border border-[#f7e08b] rounded-full text-black text-[10px] sm:text-xs uppercase tracking-[3px] font-bold hover:bg-[#f7e08b] transition-all duration-500 shadow-xl hover:shadow-[0_10px_30px_rgba(247,224,139,0.4)] flex items-center gap-2 group"
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
            className="fixed inset-0 z-[100] bg-[#020617] flex items-center justify-center p-4"
          >
            <div className={`relative w-full max-w-2xl h-[500px] md:h-[600px] transition-all duration-1000 ease-in-out ${isOpening ? 'scale-[2] opacity-0 translate-y-[-100px]' : 'scale-100'}`} style={{ perspective: '2000px' }}>
              <div className="absolute inset-0 bg-[#0f172a] rounded-b-3xl shadow-2xl border border-white/10 overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#f7e08b 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }}></div>
                {/* Envelope Side Folds (Visual Depth) */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                <div className={`relative z-40 h-full flex flex-col items-center justify-center p-6 pb-20 md:pb-32 text-center transition-all duration-700 ${isOpening ? 'blur-sm' : ''}`}>
                  <div className="mb-4 md:mb-6">
                    <div className="w-32 h-32 md:w-44 md:h-44 mx-auto mb-4 rounded-full border-[3px] border-[#d4af37] p-1.5 backdrop-blur-sm shadow-[0_0_40px_rgba(212,175,55,0.3)] overflow-hidden relative group">
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#d4af37]/10 to-transparent z-10 pointer-events-none"></div>
                      <img src="https://picsum.photos/seed/royal-child/400/400" alt="Sünnet Kapak" className="w-full h-full object-cover rounded-full grayscale-[0.1] group-hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" loading="lazy" />
                    </div>
                    <h2 className="font-script text-5xl md:text-7xl text-[#f7e08b] mb-2 text-shadow-glow break-words">{eventContext?.title || t.names}</h2>
                    <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#f7e08b]/40 to-transparent mx-auto mt-2"></div>
                  </div>
                  <p className="text-[#f7e08b]/60 mb-6 md:mb-8 tracking-[6px] text-[8px] md:text-[10px] uppercase font-bold">{eventContext?.title ? (language === 'tr' ? 'SÜNNET MERASİMİ' : 'CIRCUMCISION CEREMONY') : t.title}</p>
                  
                  <button 
                    onClick={handleEnter} 
                    disabled={isOpening} 
                    className="group relative flex items-center justify-center p-[2px] overflow-hidden rounded-full transition-all active:scale-95 shadow-[0_0_40px_rgba(212,175,55,0.2)] hover:shadow-[0_0_60px_rgba(212,175,55,0.4)] flex-shrink-0 z-50"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#d4af37] via-[#f7e08b] to-[#d4af37] animate-[shimmer_2s_infinite_linear] bg-[length:200%_100%]"></span>
                    <span className="relative h-12 md:h-16 px-8 md:px-16 transition-all ease-in duration-300 bg-[#020617] rounded-full group-hover:bg-transparent flex items-center justify-center gap-3">
                      <span className="w-1 h-1 rounded-full bg-[#f7e08b] group-hover:bg-black animate-pulse flex-shrink-0"></span>
                      <span className="text-[#f7e08b] group-hover:text-black font-black tracking-[4px] uppercase text-[10px] md:text-sm whitespace-nowrap leading-none flex items-center h-full">
                        {isOpening ? t.opening : t.enter}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-[#f7e08b] group-hover:bg-black animate-pulse flex-shrink-0"></span>
                    </span>
                  </button>
                </div>
              </div>

              {/* Top Flap Wrapper - Handles Rotation */}
              <div 
                className={`absolute top-0 left-0 w-full h-1/2 origin-top transition-transform duration-1000 z-30 ${isOpening ? 'rotate-x-180' : 'rotate-x-0'}`} 
                style={{ backfaceVisibility: 'hidden' }}
              >
                {/* The Visual Flap (Clipped) */}
                <div 
                  className="absolute inset-0 bg-[#1e293b] shadow-[0_15px_35px_rgba(0,0,0,0.5)]" 
                  style={{ 
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)', 
                    borderBottom: '1px solid rgba(247, 224, 139, 0.2)' 
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
                </div>

                {/* Wax Seal Visual - Positioned at the tip but NOT clipped */}
                <div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-16 h-16 bg-gradient-to-br from-[#8a1c1c] via-[#b91c1c] to-[#7f1d1d] shadow-[0_8px_20px_rgba(0,0,0,0.6),inset_0_0_12px_rgba(0,0,0,0.5)] flex items-center justify-center group cursor-pointer z-50 transition-transform hover:scale-110 active:scale-95"
                  style={{ 
                    borderRadius: '45% 55% 50% 50% / 50% 50% 55% 45%',
                    border: '2px solid rgba(0,0,0,0.1)'
                  }}
                >
                  {/* Inner Stamp Circle */}
                  <div 
                    className="w-11 h-11 rounded-full border border-black/20 flex flex-col items-center justify-center bg-[#991b1b] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4),0_1px_2px_rgba(255,255,255,0.1)]"
                    style={{ borderRadius: '48% 52% 50% 50% / 50% 50% 52% 48%' }}
                  >
                    <span className="text-[10px] text-black/40 font-black leading-none mb-0.5" style={{ textShadow: '0 1px 1px rgba(255,255,255,0.1)' }}>⚜️</span>
                    <span className="font-serif italic text-[#f7e08b]/80 text-xl font-black leading-none tracking-tighter" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5), -1px -1px 0px rgba(255,255,255,0.1)' }}>S</span>
                  </div>
                  <div className="absolute inset-0 opacity-30 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/leather.png")' }}></div>
                  <div className="absolute top-1 left-2 w-4 h-4 bg-white/10 rounded-full blur-[2px] pointer-events-none"></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {hasEntered && (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center p-4 md:p-10 relative z-10">
          <div className="invitation-container w-full max-w-2xl bg-[#020617]/40 backdrop-blur-[3px] border border-[#f7e08b]/20 p-6 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] text-center rounded-2xl">
            <div className="flex justify-between text-[10px] md:text-xs uppercase tracking-[0.4em] text-slate-300 mb-12 border-b border-white/5 pb-10 font-bold">
              <div className="text-left w-1/2"><span className="block text-[#f7e08b] mb-1">{t.parents[0]}</span><span className="text-white/40">YILMAZ</span></div>
              <div className="text-right w-1/2"><span className="block text-[#f7e08b] mb-1">{t.parents[1]}</span><span className="text-white/40">KAYA</span></div>
            </div>

            <div className="mb-10">
              <span className="text-[10px] md:text-sm uppercase tracking-[8px] text-slate-200 block mb-2 font-black">{t.host}</span>
              <span className="text-xs italic text-slate-400 font-medium tracking-widest">{t.inviteText}</span>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 mb-10 mt-10">
              <h1 className="font-script text-7xl md:text-9xl text-[#f7e08b] drop-shadow-[0_0_30px_rgba(247,224,139,0.6)]">{t.names}</h1>
            </div>

            <div className="mb-12 flex flex-col items-center gap-3">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#f7e08b]/50 to-transparent"></div>
              <h2 className="font-cinzel text-2xl md:text-4xl text-[#f7e08b] tracking-[6px] font-bold text-shadow-glow">{t.date}</h2>
              <p className="text-[#f7e08b]/70 text-[10px] md:text-xs tracking-[10px] uppercase font-black">{t.day}</p>
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#f7e08b]/50 to-transparent"></div>
            </div>

            <div className="my-14 text-sm md:text-xl italic leading-relaxed text-white space-y-4 font-bold tracking-wide px-4 text-shadow-glow">
              {t.poem.map((line: string, i: number) => <p key={i}>{line}</p>)}
            </div>

            <div className="grid grid-cols-4 gap-4 mb-16">
              {[
                { label: language === 'tr' ? 'GÜN' : 'DAYS', value: countdown.days },
                { label: language === 'tr' ? 'SAAT' : 'HRS', value: countdown.hours },
                { label: language === 'tr' ? 'DAK' : 'MIN', value: countdown.mins },
                { label: language === 'tr' ? 'SN' : 'SEC', value: countdown.secs }
              ].map((item, idx) => (
                <div key={idx} className="bg-[#020617]/40 backdrop-blur-[3px] border border-[#f7e08b]/20 p-4 rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.3)]">
                  <div className="text-2xl md:text-4xl font-bold text-[#f7e08b] mb-1">{String(item.value).padStart(2, '0')}</div>
                  <div className="text-[8px] md:text-[10px] text-white/40 tracking-widest font-black">{item.label}</div>
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
              <RSVPForm language={language} themeColor={themeColor} eventId={eventId || 'sunnet-demo'} />
            </div>

            <Chatbot language={language} eventContext={eventContext} />

            {/* AI SPIRITUAL CORNER */}
            <SpiritualCorner 
              language={language} 
              themeColor={themeColor} 
              eventNames={eventContext?.title || t.names} 
              eventType={t.title} 
            />
          </div>
        </motion.div>
      )}

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .rotate-x-180 { transform: rotateX(180deg); }
        .rotate-x-0 { transform: rotateX(0deg); }
        .font-script { font-family: 'Dancing Script', cursive; }
        .font-cinzel { font-family: 'Cinzel', serif; }
        .text-shadow-glow { text-shadow: 0 0 20px rgba(247, 224, 139, 0.5); }
      `}</style>
      <BackgroundMusic url="https://www.chosic.com/wp-content/uploads/2021/04/Soft-Piano-Music.mp3" />
    </div>
  );
};

export default SunnetTemplate;
