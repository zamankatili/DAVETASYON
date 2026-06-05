import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SpiritualCorner from './SpiritualCorner';
import BackgroundMusic from './BackgroundMusic';
import RSVPForm from './RSVPForm';
import { Chatbot } from './Chatbot';

interface AuroraTemplateProps {
  language: 'tr' | 'en';
  onBack: () => void;
  onOrder: () => void;
  eventId?: string;
  eventContext?: {
    title?: string;
    venue?: { name: string; address: string; }
    aiContext?: string;
  };
}

const AuroraTemplate: React.FC<AuroraTemplateProps> = ({ language, onBack, onOrder, eventId, eventContext }) => {
  const [hasEntered, setHasEntered] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const targetDate = new Date('2026-12-24T19:00:00').getTime();

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
      envelopeText: "Kozmik Bir Davet",
      title: "Büyülü Bir Geceye Davetlisiniz",
      names: "Aylin & Can",
      date: "24 Aralık 2026",
      time: "19:00",
      venue: "Camdan Köşk",
      address: "Uludağ Yolu 15. Km, Osmangazi / Bursa",
      message: "Kuzey ışıklarının büyüsü altında, hayatımızı birleştirdiğimiz bu özel gecede sizleri de aramızda görmekten onur duyarız.",
      directions: "Yol Tarifi Al",
      storyTitle: "Hikayemiz",
      storyText: "Yollarımız yıldızların altında kesişti ve o günden beri evrenimiz hiç eskisi gibi olmadı. Yolculuğumuzun en parlak anına şahitlik etmeye davetlisiniz.",
      countdownTitle: "Büyüye Kalan Zaman",
      back: "Geri Dön",
      order: "Bu Tasarımla Sipariş Ver",
      dateLabel: "Tarih",
      timeLabel: "Saat",
      locationLabel: "Lokasyon"
    },
    en: {
      openBtn: "Open Invitation",
      openingBtn: "Opening...",
      envelopeText: "A Cosmic Invitation",
      title: "You are invited to a Magical Night",
      names: "Aylin & Can",
      date: "December 24, 2026",
      time: "7:00 PM",
      venue: "Glass Pavilion",
      address: "Uludag Road 15th Km, Osmangazi / Bursa",
      message: "Under the magic of the northern lights, we would be honored to have you with us on this special night as we unite our lives.",
      directions: "Get Directions",
      storyTitle: "Our Story",
      storyText: "Our paths crossed under the stars, and since that day, our universe has never been never the same. We invite you to witness the brightest moment of our journey.",
      countdownTitle: "Time Until the Magic",
      back: "Go Back",
      order: "Order with this Design",
      dateLabel: "Date",
      timeLabel: "Time",
      locationLabel: "Location"
    }
  }[language];

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-teal-500/30 relative overflow-x-hidden">
      {/* Background Layer - Static image with dark overlay for performance */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=1920&h=1080)' }}
      />
      <div className="fixed inset-0 z-0 bg-[#020617]/85" />

      {/* Performant Ambient Light - No heavy blurs, just a soft radial gradient */}
      <motion.div 
        className="fixed inset-0 z-0 opacity-40 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, rgba(45, 212, 191, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 30%, rgba(45, 212, 191, 0.15) 0%, transparent 50%)',
          ]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      {/* Tiny performant stars */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white rounded-full"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              opacity: Math.random() * 0.5
            }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
          />
        ))}
      </div>

      {/* Shooting Stars */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`shooting-star-${i}`}
            className="absolute h-[1px] w-24 md:w-32 bg-gradient-to-r from-transparent via-teal-100/40 to-white rounded-full will-change-transform will-change-opacity"
            initial={{ 
              top: `${Math.random() * 50}%`,
              left: `${Math.random() * 80}%`,
              rotate: 45,
              x: -100, 
              y: -100, 
              opacity: 0 
            }}
            animate={{
              x: [0, 1000],
              y: [0, 1000],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 1.2 + Math.random() * 0.8,
              repeat: Infinity,
              repeatDelay: 5 + Math.random() * 15,
              ease: "linear",
              delay: Math.random() * 10
            }}
          >
            {/* Glowing Head */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-[2px] md:w-[3px] md:h-[3px] bg-white rounded-full shadow-[0_0_12px_3px_rgba(255,255,255,0.9)]" />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {!hasEntered ? (
          <motion.div 
            key="entry"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#020617]/90 backdrop-blur-sm p-4"
          >
            <div className={`relative w-full max-w-md h-[350px] md:h-[400px] transition-all duration-1500 ease-in-out ${isOpening ? 'scale-150 opacity-0 translate-y-[-100px]' : 'scale-100'}`}>
              {/* Envelope Body */}
              <div className="absolute inset-0 bg-[#0f172a] rounded-lg shadow-[0_0_50px_rgba(45,212,191,0.1)] border border-teal-500/20 flex flex-col items-center justify-center p-8 text-center overflow-hidden">
                {/* Subtle glow inside envelope */}
                <div className="absolute inset-0 bg-gradient-to-b from-teal-500/5 to-purple-500/5 pointer-events-none" />
                
                <div className="w-20 h-20 rounded-full border border-teal-500/40 flex items-center justify-center mb-8 bg-[#020617]/50 shadow-[0_0_20px_rgba(45,212,191,0.2)]">
                  <span className="font-serif italic text-3xl text-teal-200">
                    {eventContext?.title ? eventContext.title.split('&').map(n => n.trim()[0]).join('&') : 'A&C'}
                  </span>
                </div>
                
                <p className="text-teal-400/80 uppercase tracking-[4px] text-xs font-medium mb-12 relative z-10">
                  {t.envelopeText}
                </p>
                
                <button 
                  onClick={handleEnter}
                  disabled={isOpening}
                  className="relative z-10 px-10 py-3 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-300 uppercase tracking-[3px] text-xs font-light hover:bg-teal-500/20 hover:border-teal-500/50 transition-all duration-500 shadow-[0_0_30px_rgba(45,212,191,0.2)]"
                >
                  {isOpening ? t.openingBtn : t.openBtn}
                </button>
              </div>
              
              {/* Envelope Flap */}
              <div 
                className={`absolute top-0 left-0 w-full h-1/2 bg-[#1e293b] origin-top transition-transform duration-1000 z-30 shadow-sm rounded-t-lg border-b border-teal-500/20 ${isOpening ? 'rotate-x-180 opacity-0' : 'rotate-x-0'}`}
                style={{ 
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  backfaceVisibility: 'hidden',
                }}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="main"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="relative z-10 flex flex-col items-center pt-32 pb-40 px-6 max-w-4xl mx-auto"
          >
            {/* Hero Section */}
            <div className="text-center mb-24 w-full">
              <p className="text-teal-400/80 uppercase tracking-[6px] text-xs font-medium mb-12">
                {t.title}
              </p>
              
              <h1 className="text-7xl md:text-9xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-white to-purple-200 mb-12 drop-shadow-lg">
                {eventContext?.title || t.names}
              </h1>
              
              <div className="w-px h-20 bg-gradient-to-b from-teal-500/50 to-transparent mx-auto mb-12" />
              
              <p className="text-lg md:text-xl font-light text-white/70 leading-relaxed max-w-2xl mx-auto">
                {t.message}
              </p>
            </div>

            {/* Event Details (Date & Time) */}
            <div className="flex flex-col md:flex-row gap-16 md:gap-32 mb-24 text-center">
              <div>
                <p className="text-teal-400/60 uppercase tracking-[4px] text-[10px] mb-4">{t.dateLabel}</p>
                <p className="text-2xl font-serif text-white/90">{t.date}</p>
              </div>
              <div>
                <p className="text-teal-400/60 uppercase tracking-[4px] text-[10px] mb-4">{t.timeLabel}</p>
                <p className="text-2xl font-serif text-white/90">{t.time}</p>
              </div>
            </div>

            {/* Location Section (Simple, No Map) */}
            <div className="w-full max-w-2xl bg-white/[0.03] border border-white/10 rounded-3xl p-10 md:p-16 text-center mb-24">
              <p className="text-teal-400/60 uppercase tracking-[4px] text-[10px] mb-6">{t.locationLabel}</p>
              <h3 className="text-3xl md:text-4xl font-serif text-white/90 mb-4">{eventContext?.venue?.name || t.venue}</h3>
              <p className="text-white/50 font-light mb-10 max-w-sm mx-auto">{eventContext?.venue?.address || t.address}</p>
              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(t.venue + ' ' + t.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 rounded-full border border-teal-500/30 text-teal-300 uppercase tracking-[3px] text-xs font-medium hover:bg-teal-500 hover:text-[#020617] transition-all duration-300"
              >
                {t.directions}
              </a>
            </div>

            {/* Our Story Section */}
            <div className="text-center mb-24 max-w-2xl">
              <h2 className="text-3xl font-serif italic text-purple-200/80 mb-8">{t.storyTitle}</h2>
              <p className="text-white/60 font-light leading-relaxed">
                {t.storyText}
              </p>
            </div>

            {/* Countdown Section */}
            <div className="text-center w-full mb-32">
              <p className="text-teal-400/60 uppercase tracking-[6px] text-[10px] mb-12">{t.countdownTitle}</p>
              <div className="flex justify-center gap-6 md:gap-12">
                {[
                  { label: language === 'tr' ? 'GÜN' : 'DAYS', value: countdown.days },
                  { label: language === 'tr' ? 'SAAT' : 'HOURS', value: countdown.hours },
                  { label: language === 'tr' ? 'DAKİKA' : 'MINS', value: countdown.mins },
                  { label: language === 'tr' ? 'SANİYE' : 'SECS', value: countdown.secs }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <span className="text-4xl md:text-5xl font-light text-white mb-2">{item.value.toString().padStart(2, '0')}</span>
                    <span className="text-[9px] uppercase tracking-[3px] text-teal-400/50">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Spiritual Corner Section */}
            <div className="w-full max-w-2xl mb-24">
              <SpiritualCorner 
                language={language} 
                themeColor="#2dd4bf" 
                eventNames={eventContext?.title || t.names} 
                eventType={language === 'tr' ? "Düğün" : "Wedding"} 
                theme="dark" 
              />
            </div>

            {/* RSVP Form - Uses eventId to isolate data */}
            <div className="w-full max-w-2xl">
              <RSVPForm 
                language={language} 
                themeColor="#2dd4bf" 
                eventId={eventId || 'aurora-demo'} 
                theme="dark"
              />
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Chatbot Concierge */}
      <Chatbot language={language} eventContext={eventContext} />

      {/* Fixed Controls */}
      <button 
        onClick={onBack}
        className="fixed top-6 left-6 md:top-8 md:left-8 z-50 px-6 py-2 rounded-full border border-white/10 text-white/50 text-[10px] uppercase tracking-widest hover:bg-white/5 hover:text-white transition-all"
      >
        {t.back}
      </button>

      {hasEntered && !eventContext && (
        <button 
          onClick={onOrder}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 px-6 py-3 md:px-8 md:py-4 bg-teal-500 text-[#020617] text-[10px] md:text-xs uppercase tracking-[3px] font-bold rounded-full hover:bg-teal-400 transition-all duration-300 shadow-[0_0_20px_rgba(45,212,191,0.3)] flex items-center gap-2 group"
        >
          <span>{t.order}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </button>
      )}

      {hasEntered && <BackgroundMusic url="https://cdn.pixabay.com/audio/2022/02/07/audio_672202111a.mp3" />}
    </div>
  );
};

export default AuroraTemplate;
