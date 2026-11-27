import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StarField from './StarField';
import ConceptAnimation from './ConceptAnimation';
import RSVPForm from './RSVPForm';
import LocationMap from './LocationMap';
import SpiritualCorner from './SpiritualCorner';
import GraduationMessageGenerator from './GraduationMessageGenerator';
import { translations } from '../src/constants/translations';
import { Chatbot } from './Chatbot';

interface MezuniyetTemplateProps {
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

const MezuniyetTemplate: React.FC<MezuniyetTemplateProps> = ({ onBack, language, onOrder, eventId, eventContext }) => {
  const [hasEntered, setHasEntered] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  const t = translations[language].graduation;
  const themeColor = "#8B7BD8"; // Electric Purple
  const accentColor = "#C9A87C"; // Neon Cyan

  const targetDate = new Date('2026-06-20T20:00:00').getTime();

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
    <div className="min-h-screen bg-[#0F0E0C] text-white font-sans relative overflow-x-hidden pb-20">
      <StarField color="#8B7BD8" opacity={0.3} backgroundColor="#0F0E0C" />
      
      {hasEntered && <ConceptAnimation type="graduation" />}

      <button 
        onClick={onBack}
        className="fixed top-6 left-6 z-[110] bg-black/80 border border-[#8B7BD8]/30 px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[3px] text-[#8B7BD8] hover:bg-[#8B7BD8] hover:text-black transition-all shadow-[0_0_15px_rgba(139,123,216,0.4)]"
      >
        ← {t.back}
      </button>

      {/* Floating Order Button */}
      {hasEntered && !eventContext && (
        <button 
          onClick={onOrder}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[110] px-6 py-3 sm:px-8 sm:py-4 bg-[#8B7BD8] border border-[#8B7BD8] rounded-full text-white text-[10px] sm:text-xs uppercase tracking-[3px] font-bold hover:bg-[#C9A87C] hover:text-black transition-all duration-500 shadow-[0_0_20px_rgba(139,123,216,0.5)] hover:shadow-[0_0_30px_rgba(201,168,124,0.6)] flex items-center gap-2 group"
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
            className="fixed inset-0 z-[100] bg-[#0F0E0C] flex items-center justify-center p-4"
          >
            <div className={`relative w-full max-w-2xl h-[500px] md:h-[600px] transition-all duration-1000 ease-in-out ${isOpening ? 'scale-[2] opacity-0 translate-y-[-100px]' : 'scale-100'}`} style={{ perspective: '2000px' }}>
              <div className="absolute inset-0 bg-[#141210] rounded-b-lg shadow-2xl border border-[#8B7BD8]/20 overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #8B7BD8 0%, transparent 70%)' }}></div>
                
                <div className={`relative z-40 h-full flex flex-col items-center justify-center p-8 text-center transition-all duration-700 ${isOpening ? 'blur-sm' : ''}`}>
                  <div className="mb-10">
                    <span className="text-[10px] uppercase tracking-[8px] text-[#C9A87C] block mb-6 font-black drop-shadow-[0_0_8px_#C9A87C]">{t.title}</span>
                    <h2 className="text-6xl md:text-8xl text-white mb-4 font-black tracking-tighter leading-none">{eventContext?.title || t.names}</h2>
                    <div className="h-1 w-32 bg-gradient-to-r from-transparent via-[#8B7BD8] to-transparent mx-auto mt-6 shadow-[0_0_10px_#8B7BD8]"></div>
                  </div>
                  
                  <button 
                    onClick={handleEnter}
                    disabled={isOpening}
                    className="group relative px-12 py-5 overflow-hidden rounded-xl transition-all active:scale-95 border border-[#8B7BD8]/40 hover:border-[#8B7BD8] bg-black/50 backdrop-blur-sm"
                  >
                    <span className="relative z-10 text-[#8B7BD8] group-hover:text-white font-black tracking-[5px] uppercase text-xs transition-colors duration-300">
                      {isOpening ? t.opening : t.enter}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#8B7BD8] to-[#A78BE8] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  </button>
                </div>

                <div className="absolute inset-0 pointer-events-none z-20">
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#8B7BD8]/10 to-transparent"></div>
                  <div className="absolute inset-0" style={{ clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)', background: 'rgba(10, 10, 10, 0.95)', borderTop: '1px solid rgba(139, 123, 216, 0.2)' }}></div>
                </div>
              </div>

              <div 
                className={`absolute top-0 left-0 w-full h-1/2 bg-[#141210] origin-top transition-transform duration-1000 z-30 shadow-sm ${isOpening ? 'rotate-x-180' : 'rotate-x-0'}`}
                style={{ 
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  backfaceVisibility: 'hidden',
                  borderBottom: '1px solid rgba(139, 123, 216, 0.2)'
                }}
              >
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl bg-[#8B7BD8] shadow-[0_0_20px_rgba(139,123,216,0.6)] flex items-center justify-center border border-white/20 rotate-45">
                  <span className="text-white text-2xl -rotate-45">🎓</span>
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
          <div className="w-full max-w-4xl bg-black/40 backdrop-blur-xl border border-white/10 p-10 md:p-24 text-center rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8B7BD8] via-[#C9A87C] to-[#A78BE8]"></div>
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#8B7BD8]/20 blur-[100px] rounded-full"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#C9A87C]/20 blur-[100px] rounded-full"></div>
            
            <div className="mb-16 relative z-10">
              <span className="text-[10px] md:text-xs uppercase tracking-[12px] text-[#C9A87C] block mb-8 font-black drop-shadow-[0_0_5px_#C9A87C]">{t.title}</span>
              <h1 className="text-5xl md:text-8xl text-white font-black tracking-tighter mb-8 leading-none uppercase italic break-words">{eventContext?.title || t.names}</h1>
              <p className="text-white/70 text-base md:text-xl leading-relaxed max-w-xl mx-auto font-medium">
                {t.inviteText}
              </p>
            </div>

            <div className="mb-20 relative z-10">
              <div className="h-1 w-24 bg-gradient-to-r from-[#8B7BD8] to-[#A78BE8] mx-auto mb-10"></div>
              <h2 className="text-5xl md:text-8xl text-white tracking-tighter mb-4 font-black italic">{t.date}</h2>
              <p className="text-[#C9A87C] text-sm tracking-[8px] uppercase font-black drop-shadow-[0_0_5px_#C9A87C]">{t.day}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 relative z-10">
              {[
                { label: language === 'tr' ? 'GÜN' : 'DAYS', value: countdown.days },
                { label: language === 'tr' ? 'SAAT' : 'HOURS', value: countdown.hours },
                { label: language === 'tr' ? 'DAK' : 'MINS', value: countdown.mins },
                { label: language === 'tr' ? 'SN' : 'SECS', value: countdown.secs }
              ].map((item, idx) => (
                <div key={idx} className="border border-white/10 p-6 rounded-2xl bg-white/5 backdrop-blur-md group hover:border-[#8B7BD8]/50 transition-colors">
                  <div className="text-4xl md:text-6xl font-black text-white mb-2 group-hover:text-[#8B7BD8] transition-colors">{String(item.value).padStart(2, '0')}</div>
                  <div className="text-[10px] text-[#C9A87C] tracking-widest font-black">{item.label}</div>
                </div>
              ))}
            </div>

            {/* LOCATION & MAP */}
            <div className="relative z-10">
              <LocationMap 
                language={language} 
                themeColor={themeColor} 
                venueName={eventContext?.venue?.name || t.locationName} 
                address={eventContext?.venue?.address || t.address} 
                googleMapsUrl={eventContext?.venue?.address ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(eventContext.venue.address)}` : t.googleMapsUrl} 
              />
            </div>

            <div className="my-20 relative z-10">
              {/* RSVP SECTION */}
              <RSVPForm language={language} themeColor={themeColor} eventId={eventId || 'mezuniyet-demo'} />
            </div>

            {/* AI CHATBOT */}
            <Chatbot language={language} eventContext={eventContext} />

            {/* AI SPIRITUAL CORNER (Random Scholar Quotes) */}
            <div className="relative z-10">
              <SpiritualCorner 
                language={language} 
                themeColor={themeColor} 
                eventNames={eventContext?.title || t.names} 
                eventType={t.title} 
              />
            </div>

            {/* MESSAGE GENERATOR */}
            <div className="relative z-10">
              <GraduationMessageGenerator 
                language={language} 
                themeColor={themeColor} 
              />
            </div>

            <div className="mt-16 text-[10px] text-white/20 uppercase tracking-[10px] font-black italic">
              {eventContext?.title || t.names} // 2026
            </div>
          </div>
        </motion.div>
      )}

      <style>{`
        .rotate-x-180 { transform: rotateX(180deg); }
        .rotate-x-0 { transform: rotateX(0deg); }
      `}</style>
    </div>
  );
};

export default MezuniyetTemplate;
