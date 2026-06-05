import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Phone } from 'lucide-react';
import RSVPForm from './RSVPForm';
import { Chatbot } from './Chatbot';

interface ClassicEnvelopeTemplateProps {
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

const ClassicEnvelopeTemplate: React.FC<ClassicEnvelopeTemplateProps> = ({ onBack, language, onOrder, eventId, eventContext }) => {
  const [hasEntered, setHasEntered] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleEnter = () => {
    setIsOpening(true);
    setTimeout(() => {
      setHasEntered(true);
    }, 1800); // Zarf açılma ve kartın çıkma süresi
  };

  return (
    <div className="min-h-screen text-zinc-100 flex flex-col items-center justify-center p-4 md:p-8 font-montserrat overflow-hidden relative selection:bg-[#d4af37] selection:text-black bg-[#050505]">
      {/* Noise Texture for Premium Print Feel */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-50" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      {/* Optimized Background Glows (GPU Accelerated) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-[#d4af37]/5 rounded-full blur-[100px] transform-gpu"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-zinc-800/20 rounded-full blur-[100px] transform-gpu"></div>
        
        {/* Shooting Stars */}
        <div className="shooting-star star-1"></div>
        <div className="shooting-star star-2"></div>
        <div className="shooting-star star-3"></div>
      </div>

      <style>{`
        @keyframes shooting-star {
          0% { transform: translateX(0) translateY(0) rotate(-45deg); opacity: 1; }
          100% { transform: translateX(-1500px) translateY(1500px) rotate(-45deg); opacity: 0; }
        }
        .shooting-star {
          position: absolute;
          width: 150px;
          height: 1px;
          background: linear-gradient(90deg, rgba(212, 175, 55, 0.8), transparent);
          opacity: 0;
          will-change: transform, opacity;
        }
        .star-1 { top: 10%; left: 80%; animation: shooting-star 4s linear infinite 1s; }
        .star-2 { top: 30%; left: 90%; animation: shooting-star 5s linear infinite 3s; }
        .star-3 { top: -10%; left: 50%; animation: shooting-star 6s linear infinite 5s; }
        
        .gold-text {
          background: linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
      `}</style>

      {/* Navigation */}
      <div className="fixed top-6 left-6 z-50 flex gap-4">
        <button 
          onClick={onBack}
          className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-zinc-300 hover:bg-white/10 hover:text-white transition-all shadow-sm text-xs uppercase tracking-widest"
        >
          ← {language === 'tr' ? 'Geri' : 'Back'}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <motion.div 
            key="entry"
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#050505]"
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            {/* CSS 3D Envelope */}
            <div className="relative w-[320px] h-[220px] md:w-[440px] md:h-[300px] cursor-pointer group perspective-[1500px]" onClick={handleEnter}>
              {/* Envelope Back */}
              <div className="absolute inset-0 bg-[#0a0a0a] rounded-lg border border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"></div>
              
              {/* Inner Letter */}
              <motion.div 
                className="absolute left-3 right-3 bottom-0 top-4 bg-[#111] border border-[#d4af37]/30 rounded-t-lg flex flex-col items-center pt-10 px-4 shadow-inner overflow-hidden"
                animate={isOpening ? { y: -160, opacity: 0 } : { y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
              >
                <h2 className="font-cinzel gold-text text-xl md:text-3xl tracking-[0.2em] mb-4 whitespace-nowrap overflow-hidden text-ellipsis max-w-full text-center">
                  {eventContext?.title ? eventContext.title.toUpperCase() : 'BERNA & MELİH'}
                </h2>
                <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent mb-4"></div>
                <p className="font-montserrat text-[10px] md:text-xs tracking-[0.3em] text-zinc-500 uppercase">16 Mayıs 2026</p>
              </motion.div>
              
              {/* Envelope Flaps */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
                {/* Left Flap */}
                <div className="absolute inset-0 bg-[#0f0f11] border-r border-[#d4af37]/10" style={{ clipPath: 'polygon(0 0, 50% 50%, 0 100%)' }}></div>
                {/* Right Flap */}
                <div className="absolute inset-0 bg-[#0f0f11] border-l border-[#d4af37]/10" style={{ clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)' }}></div>
                {/* Bottom Flap */}
                <div className="absolute inset-0 bg-[#141416] border-t border-[#d4af37]/20 shadow-[0_-10px_20px_rgba(0,0,0,0.8)]" style={{ clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)' }}></div>
              </div>

              {/* Top Flap (Opens) */}
              <motion.div 
                className="absolute inset-0 bg-[#1a1a1d] border-b border-[#d4af37]/30 origin-top z-20 drop-shadow-2xl" 
                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 55%)' }}
                animate={isOpening ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 20 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                {/* Wax Seal */}
                <motion.div 
                  className="absolute w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#7a0000] to-[#3a0000] rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.8)] flex items-center justify-center border border-[#ff6b6b]/20"
                  style={{ left: '50%', top: '55%', x: '-50%', y: '-50%' }}
                  animate={isOpening ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="font-script text-[#d4af37] text-xl md:text-2xl drop-shadow-md">
                    {eventContext?.title ? eventContext.title.split('&').map(n => n.trim()[0]).join('&') : 'B&M'}
                  </span>
                </motion.div>
              </motion.div>
            </div>
            
            <motion.p 
              className="mt-16 font-montserrat text-[10px] md:text-xs tracking-[0.4em] text-zinc-500 uppercase"
              animate={isOpening ? { opacity: 0 } : { opacity: 1 }}
            >
              {language === 'tr' ? 'Açmak için dokunun' : 'Tap to open'}
            </motion.p>
          </motion.div>
        ) : (
          <motion.div 
            key="main"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="max-w-2xl w-[calc(100%-1.5rem)] md:w-full text-center z-10 space-y-12 p-8 md:p-16 border border-white/5 bg-black/40 backdrop-blur-md rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative my-8"
          >
            {/* Corner Borders (Elegant) */}
            <div className="absolute top-6 left-6 w-8 h-8 md:w-12 md:h-12 border-t border-l border-[#d4af37]/30"></div>
            <div className="absolute top-6 right-6 w-8 h-8 md:w-12 md:h-12 border-t border-r border-[#d4af37]/30"></div>
            <div className="absolute bottom-6 left-6 w-8 h-8 md:w-12 md:h-12 border-b border-l border-[#d4af37]/30"></div>
            <div className="absolute bottom-6 right-6 w-8 h-8 md:w-12 md:h-12 border-b border-r border-[#d4af37]/30"></div>

            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 1.2 }}
              className="space-y-8"
            >
              {/* Top Text */}
              <div className="flex justify-center items-center gap-4 text-zinc-500 mb-10">
                <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#d4af37]/50"></span>
                <span className="font-cinzel tracking-[0.3em] text-[10px] md:text-xs uppercase text-[#d4af37]">Mutlu Sonsuz</span>
                <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#d4af37]/50"></span>
              </div>

              {/* Names */}
              <div className="relative inline-flex flex-col items-center font-cinzel text-5xl md:text-7xl lg:text-8xl tracking-[0.15em] mx-auto py-8 gap-6 w-full max-w-full">
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-zinc-800/40 font-script text-[150px] md:text-[250px] z-0 pointer-events-none select-none">
                  &
                </span>
                {eventContext?.title ? (
                  eventContext.title.split('&').map((name, i) => (
                    <span key={i} className="relative z-10 gold-text drop-shadow-lg w-full text-center whitespace-normal break-words break-all md:break-normal max-w-[90%] md:max-w-full px-2" style={{ hyphens: 'auto' }}>
                      {name.trim().toUpperCase()}
                    </span>
                  ))
                ) : (
                  <>
                    <span className="relative z-10 gold-text drop-shadow-lg w-full text-center max-w-full truncate px-4">BERNA</span>
                    <span className="relative z-10 gold-text drop-shadow-lg w-full text-center max-w-full truncate px-4">MELİH</span>
                  </>
                )}
              </div>

              {/* Intro Text */}
              <div className="space-y-12 text-zinc-300 font-light text-sm md:text-base leading-relaxed pt-8">
                <p className="max-w-md mx-auto text-lg md:text-xl font-cinzel leading-loose text-zinc-200">
                  Sevgiyle dolu bu günümüzde sizleri de aramızda görmekten onur duyarız.
                </p>

                {/* Parents */}
                {!eventContext && (
                  <div className="flex justify-between items-center max-w-md mx-auto text-sm md:text-base pt-6">
                    <div className="text-center flex-1">
                      <p className="font-medium text-zinc-200 font-cinzel">İlknur & Hasan</p>
                      <p className="text-[#d4af37] tracking-[0.2em] text-[10px] mt-2 uppercase">PEHLİVAN</p>
                    </div>
                    <div className="w-px h-16 bg-gradient-to-b from-transparent via-zinc-700 to-transparent mx-4"></div>
                    <div className="text-center flex-1">
                      <p className="font-medium text-zinc-200 font-cinzel">Fatma & İbrahim</p>
                      <p className="text-[#d4af37] tracking-[0.2em] text-[10px] mt-2 uppercase">TÜSÜZ</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Date & Time Box */}
              <div className="py-12 border-y border-white/5 my-12 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#050505] border border-[#d4af37]/20 rounded-full px-8 py-2 shadow-lg">
                  <span className="font-cinzel tracking-[0.3em] text-[10px] md:text-xs text-[#d4af37] uppercase">Düğün - Kına</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      <Calendar className="w-5 h-5 text-[#d4af37] stroke-[1.5]" />
                    </div>
                    <p className="font-cinzel text-xl md:text-2xl text-zinc-100">16 Mayıs 2026</p>
                    <p className="font-script text-3xl md:text-4xl text-zinc-400 mt-1">Cumartesi</p>
                  </div>
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      <Clock className="w-5 h-5 text-[#d4af37] stroke-[1.5]" />
                    </div>
                    <p className="font-cinzel text-xl md:text-2xl text-zinc-100">Saat: 19.00</p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="flex flex-col items-center space-y-4 mt-12">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 mb-2">
                  <MapPin className="w-5 h-5 text-[#d4af37] stroke-[1.5]" />
                </div>
                <p className="font-cinzel text-xl md:text-2xl text-zinc-100">{eventContext?.venue?.name || 'Başka Düğün Salonları'}</p>
                <p className="text-xs md:text-sm text-zinc-400 max-w-xs mx-auto mt-4 leading-relaxed text-center">
                  {eventContext?.venue?.address || (
                    <>
                      Çarşı Mah. Çevre Yolu Cad. 250 Sk. No: 38<br/>
                      <span className="text-zinc-500 text-[10px] md:text-xs">Bozüyük / Bilecik</span>
                    </>
                  )}
                </p>
              </div>

              {/* Extra Details */}
              {!eventContext && (
                <div className="space-y-5 text-sm text-zinc-300 text-left bg-[#0a0a0a]/50 p-6 md:p-8 rounded-xl border border-white/5 mt-12 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="mt-1.5 min-w-[6px] h-[6px] bg-[#d4af37] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
                    <p className="leading-relaxed">
                      <strong className="text-zinc-100 font-medium font-cinzel tracking-wider">Gelin Alma:</strong> 16 Mayıs Cumartesi Saat: 14.00'da Erkek Evinden Hareket Edilecektir.
                    </p>
                  </div>
                  <div className="w-full h-[1px] bg-white/5"></div>
                  <div className="flex items-start gap-4">
                    <div className="mt-1.5 min-w-[6px] h-[6px] bg-[#d4af37] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
                    <p className="leading-relaxed">
                      <strong className="text-zinc-100 font-medium font-cinzel tracking-wider">Kız Evi:</strong> Yediler Mah. 705 Sk. No: 16 Kat: 2
                      <br/>
                      <span className="flex items-center gap-2 mt-2 text-zinc-400 text-xs"><Phone className="w-3 h-3 text-[#d4af37]" /> İrt: 0536 689 0036</span>
                    </p>
                  </div>
                  <div className="w-full h-[1px] bg-white/5"></div>
                  <div className="flex items-start gap-4">
                    <div className="mt-1.5 min-w-[6px] h-[6px] bg-[#d4af37] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
                    <p className="leading-relaxed">
                      <strong className="text-zinc-100 font-medium font-cinzel tracking-wider">Erkek Evi:</strong> Yediler Mah. Çortuk Cad. 590 Sk. No: 1 Kat: 2
                      <br/>
                      <span className="flex items-center gap-2 mt-2 text-zinc-400 text-xs"><Phone className="w-3 h-3 text-[#d4af37]" /> İrt: 0546 684 2696</span>
                    </p>
                  </div>
                </div>
              )}

              {/* Map Button */}
              <div className="mt-12 flex justify-center pb-4">
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-gradient-to-r from-[#d4af37] to-[#aa771c] hover:from-[#e5c048] hover:to-[#bc882d] text-black font-medium rounded-full text-xs md:text-sm tracking-[0.2em] uppercase transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transform hover:-translate-y-1"
                >
                  <MapPin className="w-4 h-4" />
                  Yol Tarifi Al
                </a>
              </div>
              
              {/* RSVP Form */}
              <div className="w-full mt-12 border-t border-white/5 pt-12">
                <RSVPForm 
                  language={language}
                  themeColor="#d4af37"
                  eventId={eventId || 'classic-demo'}
                  theme="dark"
                />
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Chatbot language={language} eventContext={eventContext} />

      {!eventContext && hasEntered && (
        <button 
          onClick={onOrder}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-black text-[10px] md:text-xs uppercase tracking-[3px] font-bold rounded-full hover:from-[#e5c048] hover:to-[#bc882d] transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center gap-2 group"
        >
          <span>{language === 'tr' ? 'BU TASARIMI SİPARİŞ VER' : 'ORDER THIS DESIGN'}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </button>
      )}
    </div>
  );
};

export default ClassicEnvelopeTemplate;
