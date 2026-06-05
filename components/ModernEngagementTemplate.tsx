import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Chatbot } from './Chatbot';
import RSVPForm from './RSVPForm';
import LocationMap from './LocationMap';

interface ModernEngagementTemplateProps {
  language: 'tr' | 'en';
  onBack: () => void;
  onOrder: () => void;
  eventId?: string;
  eventContext?: {
    title?: string;
    venue?: { name: string; address: string; };
    aiContext?: string;
  };
}

const ModernEngagementTemplate: React.FC<ModernEngagementTemplateProps> = ({ language, onBack, onOrder, eventId, eventContext }) => {
  const [hasEntered, setHasEntered] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  const targetDate = new Date('2026-05-18T19:00:00').getTime();

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
    }, 1500);
  };

  const t = {
    tr: {
      openBtn: "Davetiyeyi Aç",
      openingBtn: "Açılıyor...",
      envelopeText: "Baharın Müjdesi",
      names: "Elif & Burak",
      title: "Nişan Töreni",
      subtitle: "Doğanın uyanışına şahitlik ettiğimiz bu güzel bahar gününde, hayatlarımızı birleştirirken sizleri de aramızda görmekten mutluluk duyarız.",
      date: "18 Mayıs 2026",
      time: "19:00",
      location: "Saklı Bahçe, İstanbul",
      address: "Bahar Sokak No:12, Beykoz / İstanbul",
      rsvpTitle: "Lütfen Katılım Durumunuzu Bildirin",
      rsvpBtn: "LCV Gönder",
      countdown: ["Gün", "Saat", "Dakika", "Saniye"],
      back: "Geri Dön",
      ourStory: "Hikayemiz",
      storyText: "Her şey bir bahar sabahı başladı. Yıllar içinde büyüyen sevgimiz, şimdi yeni bir başlangıca adım atıyor. Bu güzel yolculukta yanımızda olan herkese teşekkür ederiz.",
      gallery: "Fotoğraflarımız",
      dressCodeTitle: "Kıyafet Kuralları",
      dressCodeText: "Baharın enerjisini yansıtan pastel tonlar ve çiçek desenli kıyafetler tercih etmeniz bizi çok mutlu eder."
    },
    en: {
      openBtn: "Open Invitation",
      openingBtn: "Opening...",
      envelopeText: "Herald of Spring",
      names: "Elif & Burak",
      title: "Engagement Ceremony",
      subtitle: "On this beautiful spring day as we witness the awakening of nature, we would be delighted to have you with us as we unite our lives.",
      date: "May 18, 2026",
      time: "7:00 PM",
      location: "Hidden Garden, Istanbul",
      address: "Spring Street No:12, Beykoz / Istanbul",
      rsvpTitle: "Please RSVP",
      rsvpBtn: "Send RSVP",
      countdown: ["Days", "Hours", "Mins", "Secs"],
      back: "Go Back",
      ourStory: "Our Story",
      storyText: "It all started on a spring morning. Our love, which has grown over the years, is now taking a step towards a new beginning. Thank you to everyone who has been with us on this beautiful journey.",
      gallery: "Our Gallery",
      dressCodeTitle: "Dress Code",
      dressCodeText: "We would be thrilled if you chose pastel tones and floral patterns that reflect the energy of spring."
    }
  }[language];

  // Random positions for butterflies and bees
  const generateRandomPos = () => ({
    x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 500,
    y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 500,
  });

  return (
    <div className="min-h-screen bg-[#fdfaf6] text-[#4a5d4e] font-sans relative overflow-x-hidden">
      
      {/* Spring Background Elements (Flowers, Leaves) */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30">
        <svg className="absolute top-0 left-0 w-64 h-64 text-[#f2a6b0] transform -translate-x-1/4 -translate-y-1/4" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 10 C 60 40, 90 50, 50 90 C 10 50, 40 40, 50 10 Z" />
        </svg>
        <svg className="absolute bottom-0 right-0 w-96 h-96 text-[#a8c3a6] transform translate-x-1/4 translate-y-1/4" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 100 C 20 80, 0 50, 0 20 C 20 0, 50 0, 80 20 C 100 50, 80 80, 50 100 Z" />
        </svg>
      </div>

      {/* Animated Butterflies */}
      {hasEntered && [...Array(6)].map((_, i) => (
        <motion.div
          key={`butterfly-${i}`}
          className="fixed z-20 pointer-events-none"
          initial={{ x: -100, y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800) }}
          animate={{
            x: typeof window !== 'undefined' ? window.innerWidth + 100 : 1000,
            y: [null, Math.random() * 200 - 100, Math.random() * 200 - 100, null],
          }}
          transition={{ duration: Math.random() * 15 + 15, repeat: Infinity, ease: "linear", delay: Math.random() * 10 }}
        >
          <motion.svg width="24" height="24" viewBox="0 0 24 24" fill={i % 2 === 0 ? "#f2a6b0" : "#ffd166"} className="opacity-70"
            animate={{ scaleX: [1, 0.2, 1] }}
            transition={{ duration: 0.4, repeat: Infinity }}
          >
            <path d="M12,10 C8,3 2,5 2,10 C2,15 8,17 12,12 C16,17 22,15 22,10 C22,5 16,3 12,10 Z" />
          </motion.svg>
        </motion.div>
      ))}

      {/* Animated Bees */}
      {hasEntered && [...Array(4)].map((_, i) => (
        <motion.div
          key={`bee-${i}`}
          className="fixed z-20 pointer-events-none"
          initial={generateRandomPos()}
          animate={{
            x: [null, Math.random() * 300 - 150, Math.random() * 300 - 150, null],
            y: [null, Math.random() * 300 - 150, Math.random() * 300 - 150, null],
          }}
          transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-80">
            <ellipse cx="12" cy="12" rx="8" ry="5" fill="#ffd166" />
            <path d="M8 7 L8 17 M16 7 L16 17" stroke="#000" strokeWidth="2" />
            <circle cx="18" cy="10" r="1.5" fill="#000" />
            <path d="M12 7 Q 15 2 18 7" fill="none" stroke="#fff" strokeWidth="2" opacity="0.7" />
          </svg>
        </motion.div>
      ))}

      {/* Animated Birds */}
      {hasEntered && [...Array(3)].map((_, i) => (
        <motion.div
          key={`bird-${i}`}
          className="fixed z-10 pointer-events-none text-[#4a5d4e]/30"
          initial={{ x: -100, y: Math.random() * 300 + 50 }}
          animate={{ x: typeof window !== 'undefined' ? window.innerWidth + 100 : 1000, y: Math.random() * 200 }}
          transition={{ duration: Math.random() * 20 + 20, repeat: Infinity, ease: "linear", delay: i * 8 }}
        >
          <motion.svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          >
            <path d="M2 12 Q 7 6 12 12 Q 17 6 22 12" />
          </motion.svg>
        </motion.div>
      ))}

      <button 
        onClick={onBack}
        className="fixed top-6 left-6 z-[110] bg-white/80 border border-[#a8c3a6]/50 px-6 py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-[3px] text-[#4a5d4e] hover:bg-[#a8c3a6] hover:text-white transition-all shadow-sm backdrop-blur-md"
      >
        ← {t.back}
      </button>

      {/* Floating Order Button */}
      {hasEntered && !eventContext && (
        <button 
          onClick={onOrder}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[110] px-6 py-3 sm:px-8 sm:py-4 bg-[#4a5d4e] border border-[#a8c3a6] rounded-full text-white text-[10px] sm:text-xs uppercase tracking-[3px] font-bold hover:bg-[#a8c3a6] transition-all duration-500 shadow-xl hover:shadow-[0_10px_30px_rgba(168,195,166,0.4)] flex items-center gap-2 group"
        >
          <span>{language === 'tr' ? 'Bu Tasarımla Sipariş Ver' : 'Order with this Design'}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </button>
      )}

      <AnimatePresence>
        {!hasEntered && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="fixed inset-0 z-[100] bg-[#fdfaf6] flex items-center justify-center p-4"
          >
            <div className={`relative w-full max-w-md h-[500px] transition-all duration-1500 ease-in-out ${isOpening ? 'scale-150 opacity-0 translate-y-[-100px]' : 'scale-100'}`}>
              {/* Envelope Design */}
              <div className="absolute inset-0 bg-[#f5efe6] rounded-lg shadow-2xl border border-[#a8c3a6]/30 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 rounded-full border-2 border-[#f2a6b0] flex items-center justify-center mb-8 bg-white/50">
                  <span className="font-serif italic text-3xl text-[#f2a6b0]">E&B</span>
                </div>
                <p className="text-[#4a5d4e] uppercase tracking-[4px] text-xs font-bold mb-12">{t.envelopeText}</p>
                
                <button 
                  onClick={handleEnter}
                  disabled={isOpening}
                  className="px-8 py-3 bg-[#a8c3a6] text-white text-xs uppercase tracking-[3px] font-bold rounded-full hover:bg-[#8ba689] transition-colors shadow-lg"
                >
                  {isOpening ? t.openingBtn : t.openBtn}
                </button>
              </div>
              
              {/* Envelope Flap (Visual only) */}
              <div 
                className={`absolute top-0 left-0 w-full h-1/2 bg-[#eee6da] origin-top transition-transform duration-1000 z-30 shadow-sm rounded-t-lg ${isOpening ? 'rotate-x-180 opacity-0' : 'rotate-x-0'}`}
                style={{ 
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  backfaceVisibility: 'hidden',
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {hasEntered && (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 py-20"
        >
          <div className="w-full max-w-4xl bg-white/30 backdrop-blur-md border border-[#a8c3a6]/30 p-8 sm:p-16 text-center rounded-[40px] shadow-[0_20px_60px_rgba(168,195,166,0.15)]">
            
            {/* Spring Flower Icon */}
            <div className="mb-10 flex justify-center">
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#f2a6b0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22v-7" />
                <path d="M12 15a4 4 0 0 0-4-4 4 4 0 0 0-4 4 4 4 0 0 0 4 4h4" />
                <path d="M12 15a4 4 0 0 1 4-4 4 4 0 0 1 4 4 4 4 0 0 1-4 4h-4" />
                <path d="M12 15a4 4 0 0 0 4-4 4 4 0 0 0-4-4 4 4 0 0 0-4 4 4 4 0 0 0 4 4" />
              </svg>
            </div>

            <p className="text-[#a8c3a6] uppercase tracking-[6px] text-xs font-bold mb-6">{t.title}</p>
            
            <h1 className="text-5xl md:text-8xl font-serif text-[#4a5d4e] mb-10 italic break-words">
              {eventContext?.title || t.names}
            </h1>
            
            <div className="w-px h-16 bg-[#f2a6b0]/50 mx-auto mb-10"></div>
            
            <p className="text-[#4a5d4e]/80 text-sm md:text-base leading-loose max-w-xl mx-auto mb-16 font-light">
              {t.subtitle}
            </p>

            {/* Our Story Section */}
            {!eventContext && (
              <div className="mb-20">
                <h2 className="text-2xl font-serif text-[#4a5d4e] mb-6 italic">{t.ourStory}</h2>
                <p className="text-[#4a5d4e]/70 text-sm leading-relaxed max-w-lg mx-auto font-light">
                  {t.storyText}
                </p>
              </div>
            )}

            {/* Photo Gallery Grid */}
            {!eventContext && (
              <div className="mb-20">
                <h2 className="text-2xl font-serif text-[#4a5d4e] mb-8 italic">{t.gallery}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <img src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=400&h=400" alt="Gallery 1" className="w-full h-48 object-cover rounded-2xl shadow-sm hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <img src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=400&h=400" alt="Gallery 2" className="w-full h-48 object-cover rounded-2xl shadow-sm hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <img src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=400&h=400" alt="Gallery 3" className="w-full h-48 object-cover rounded-2xl shadow-sm hover:scale-105 transition-transform duration-500 col-span-2 md:col-span-1" loading="lazy" />
                </div>
              </div>
            )}

            {/* LOCATION MAP */}
            <LocationMap 
              language={language}
              themeColor="#f2a6b0"
              venueName={eventContext?.venue?.name || t.location}
              address={eventContext?.venue?.address || t.address}
              googleMapsUrl={eventContext?.venue?.address ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(eventContext.venue.address)}` : "https://maps.google.com"}
            />

            {/* Dress Code Section */}
            {!eventContext && (
              <div className="mb-20 bg-[#fdfaf6]/30 backdrop-blur-sm p-8 rounded-3xl border border-[#a8c3a6]/20 mt-16">
                <h2 className="text-xl font-serif text-[#4a5d4e] mb-4 italic">{t.dressCodeTitle}</h2>
                <p className="text-[#4a5d4e]/70 text-sm font-light max-w-md mx-auto">
                  {t.dressCodeText}
                </p>
              </div>
            )}

            {/* Countdown */}
            <div className="flex justify-center gap-4 md:gap-8 mb-16 mt-16">
              {[
                { label: t.countdown[0], value: countdown.days },
                { label: t.countdown[1], value: countdown.hours },
                { label: t.countdown[2], value: countdown.mins },
                { label: t.countdown[3], value: countdown.secs }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-[#f2a6b0]/50 flex items-center justify-center mb-3 bg-white/20 backdrop-blur-sm shadow-inner">
                    <span className="text-2xl md:text-3xl font-serif text-[#f2a6b0]">{String(item.value).padStart(2, '0')}</span>
                  </div>
                  <span className="text-[9px] uppercase tracking-[2px] text-[#4a5d4e] font-bold">{item.label}</span>
                </div>
              ))}
            </div>

            {/* RSVP Form */}
            <div className="mt-12">
              <RSVPForm language={language} themeColor="#f2a6b0" eventId={eventId || 'engagement-demo'} />
            </div>

            <Chatbot language={language} eventContext={eventContext} />

          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ModernEngagementTemplate;
