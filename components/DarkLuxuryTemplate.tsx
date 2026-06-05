import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LocationMap from './LocationMap';
import RSVPForm from './RSVPForm';
import { Chatbot } from './Chatbot';

interface DarkLuxuryProps {
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

const VenueArchitecture = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-[0] opacity-40">
    <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="floorFade" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ceilingFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="columnFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#d4af37" stopOpacity="0.02" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* Horizon Line */}
      <line x1="0" y1="55" x2="100" y2="55" stroke="#d4af37" strokeWidth="0.1" opacity="0.5" vectorEffect="nonScalingStroke" />

      {/* Floor Perspective Lines */}
      {[5, 25, 50, 75, 95].map(x => (
        <line key={`floor-${x}`} x1={x} y1="100" x2="50" y2="55" stroke="url(#floorFade)" strokeWidth="0.2" vectorEffect="nonScalingStroke" />
      ))}
      
      {/* Ceiling Perspective Lines */}
      {[5, 25, 50, 75, 95].map(x => (
        <line key={`ceil-${x}`} x1={x} y1="0" x2="50" y2="55" stroke="url(#ceilingFade)" strokeWidth="0.2" vectorEffect="nonScalingStroke" />
      ))}

      {/* Left Columns */}
      <rect x="2" y="0" width="6" height="100" stroke="url(#columnFade)" fill="none" strokeWidth="0.2" vectorEffect="nonScalingStroke" />
      <rect x="12" y="15" width="4" height="70" stroke="url(#columnFade)" fill="none" strokeWidth="0.2" vectorEffect="nonScalingStroke" />
      <rect x="22" y="30" width="2" height="40" stroke="url(#columnFade)" fill="none" strokeWidth="0.2" vectorEffect="nonScalingStroke" />

      {/* Right Columns */}
      <rect x="92" y="0" width="6" height="100" stroke="url(#columnFade)" fill="none" strokeWidth="0.2" vectorEffect="nonScalingStroke" />
      <rect x="84" y="15" width="4" height="70" stroke="url(#columnFade)" fill="none" strokeWidth="0.2" vectorEffect="nonScalingStroke" />
      <rect x="76" y="30" width="2" height="40" stroke="url(#columnFade)" fill="none" strokeWidth="0.2" vectorEffect="nonScalingStroke" />

      {/* Abstract Chandelier / Stage Lights */}
      <path d="M 35 0 L 50 25 L 65 0 M 42 0 L 50 35 L 58 0 M 47 0 L 50 45 L 53 0" stroke="url(#ceilingFade)" fill="none" strokeWidth="0.2" vectorEffect="nonScalingStroke" />
    </svg>
  </div>
);

const Silhouettes = () => {
  const [people, setPeople] = useState<any[]>([]);
  const [tables, setTables] = useState<any[]>([]);

  useEffect(() => {
    // Generate static people (standing, talking)
    const generatedPeople = Array.from({ length: 12 }).map((_, i) => {
      const depth = Math.random(); // 0 (background) to 1 (foreground)
      const type = Math.floor(Math.random() * 3); // 0: Woman, 1: Man, 2: Couple
      
      return {
        id: `p-${i}`,
        type,
        depth,
        size: depth * 250 + 120, // 120px to 370px
        leftOffset: Math.random() * 90 + 5, // 5% to 95% horizontal position
        swayDuration: Math.random() * 4 + 4, // 4s to 8s breathing animation
        delay: Math.random() * -5,
        opacity: depth * 0.25 + 0.05, // 0.05 to 0.30
        bottomOffset: (1 - depth) * 45 + 5, // 5% to 50%
        blur: (1 - depth) * 4, // 0px to 4px
        strokeWidth: depth * 0.3 + 0.15 // 0.15px to 0.45px
      };
    });

    // Generate static tables with people
    const generatedTables = Array.from({ length: 3 }).map((_, i) => {
      const depth = Math.random() * 0.6; // Tables stay in mid/background
      return {
        id: `t-${i}`,
        depth,
        size: depth * 250 + 150,
        leftOffset: Math.random() * 80 + 10,
        bottomOffset: (1 - depth) * 45 + 5,
        opacity: depth * 0.25 + 0.05,
        blur: (1 - depth) * 4,
        strokeWidth: depth * 0.3 + 0.15,
        swayDuration: Math.random() * 4 + 4,
        delay: Math.random() * -5
      };
    });

    setPeople(generatedPeople);
    setTables(generatedTables);
  }, []);

  const renderPersonSVG = (type: number) => {
    if (type === 0) {
      // Elegant Woman in Gown
      return (
        <>
          <circle cx="12" cy="3" r="1.5" vectorEffect="nonScalingStroke" />
          <path d="M12 5.5 C10 7 9 10 8.5 14 C8 18 6 22 4 24 L20 24 C18 22 16 18 15.5 14 C15 10 14 7 12 5.5 Z" vectorEffect="nonScalingStroke" />
          <path d="M10.5 7 C9 9 9 12 10 14" vectorEffect="nonScalingStroke" />
        </>
      );
    } else if (type === 1) {
      // Elegant Man in Tuxedo
      return (
        <>
          <circle cx="12" cy="3" r="1.5" vectorEffect="nonScalingStroke" />
          <path d="M12 5.5 C9 5.5 7 7 6.5 10 L7.5 16 L9.5 16 L9.5 24 L14.5 24 L14.5 16 L16.5 16 L17.5 10 C17 7 15 5.5 12 5.5 Z" vectorEffect="nonScalingStroke" />
          <path d="M12 5.5 L12 12 M10.5 5.5 L12 10 L13.5 5.5" vectorEffect="nonScalingStroke" />
        </>
      );
    } else {
      // Elegant Couple
      return (
        <>
          {/* Man */}
          <circle cx="9" cy="3" r="1.5" vectorEffect="nonScalingStroke" />
          <path d="M9 5.5 C7 5.5 5 7 4.5 10 L5.5 16 L7.5 16 L7.5 24 L11.5 24 L11.5 16 L12.5 16" vectorEffect="nonScalingStroke" />
          {/* Woman */}
          <circle cx="15" cy="4" r="1.5" vectorEffect="nonScalingStroke" />
          <path d="M15 6.5 C13 8 12 11 11.5 15 C11 19 9 22 7 24 L21 24 C19 22 18 19 17.5 15 C17 11 16 8 15 6.5 Z" vectorEffect="nonScalingStroke" />
        </>
      );
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      {/* Tables */}
      {tables.map((table) => (
        <motion.div
          key={table.id}
          className="absolute"
          style={{
            bottom: `${table.bottomOffset}%`,
            left: `${table.leftOffset}%`,
            height: table.size,
            width: table.size * 1.5,
            opacity: table.opacity,
            filter: `blur(${table.blur}px)`,
            zIndex: Math.floor(table.depth * 10)
          }}
          animate={{ y: [0, -3, 0], opacity: [table.opacity, table.opacity * 0.7, table.opacity] }}
          transition={{ duration: table.swayDuration, repeat: Infinity, ease: "easeInOut", delay: table.delay }}
        >
          <svg viewBox="0 0 40 24" fill="none" stroke="#d4af37" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full" preserveAspectRatio="xMidYMax meet" style={{ strokeWidth: table.strokeWidth }}>
            {/* Table */}
            <path d="M12 15h16v1H12z M19 16v8 M21 16v8 M16 24h8" vectorEffect="nonScalingStroke" />
            {/* Person 1 (Woman Left) */}
            <circle cx="8" cy="4" r="1.5" vectorEffect="nonScalingStroke" />
            <path d="M8 6.5 C6 8 5 11 4.5 15 C4 18 3 21 2 24 L14 24 C13 21 12 18 11.5 15 C11 11 10 8 8 6.5 Z" vectorEffect="nonScalingStroke" />
            {/* Person 2 (Man Right) */}
            <circle cx="32" cy="3" r="1.5" vectorEffect="nonScalingStroke" />
            <path d="M32 5.5 C29 5.5 27 7 26.5 10 L27.5 16 L29.5 16 L29.5 24 L34.5 24 L34.5 16 L36.5 16 L37.5 10 C37 7 35 5.5 32 5.5 Z" vectorEffect="nonScalingStroke" />
          </svg>
        </motion.div>
      ))}

      {/* Static People */}
      {people.map((person) => (
        <motion.div
          key={person.id}
          className="absolute"
          style={{
            bottom: `${person.bottomOffset}%`,
            left: `${person.leftOffset}%`,
            height: person.size,
            width: person.size * 0.5,
            opacity: person.opacity,
            filter: `blur(${person.blur}px)`,
            zIndex: Math.floor(person.depth * 10)
          }}
          animate={{ y: [0, -3, 0], opacity: [person.opacity, person.opacity * 0.7, person.opacity] }}
          transition={{
            duration: person.swayDuration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: person.delay
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full" preserveAspectRatio="xMidYMax meet" style={{ strokeWidth: person.strokeWidth }}>
            {renderPersonSVG(person.type)}
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

const DarkLuxuryTemplate: React.FC<DarkLuxuryProps> = ({ language, onBack, onOrder, eventId, eventContext }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-11-12T19:30:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          mins: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          secs: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    const timer = setInterval(updateTimer, 1000);
    updateTimer();
    return () => clearInterval(timer);
  }, []);

  const t = {
    tr: {
      tag: "Özel Davet",
      title: "15. Geleneksel Teknoloji ve İnovasyon Ödülleri Galası",
      host: "Nexus Teknoloji A.Ş.",
      date: "12 Kasım 2026",
      time: "19:30",
      location: "Çırağan Palace Kempinski, İstanbul",
      message: "Sektörün öncülerinin bir araya geleceği, inovasyon ve vizyonun ödüllendirileceği 15. Geleneksel Gala Gecemizde sizleri de aramızda görmekten onur duyarız.",
      rsvp: "LCV Bildir",
      back: "Geri Dön",
      directions: "Yol Tarifi Al",
      dressCode: "Kıyafet Kodu: Black Tie",
      scheduleTitle: "Gecenin Akışı",
      countdown: {
        days: "GÜN",
        hours: "SAAT",
        mins: "DAKİKA",
        secs: "SANİYE"
      },
      schedule: [
        { time: "19:30", event: "Karşılama & Kokteyl" },
        { time: "20:30", event: "Açılış Konuşması" },
        { time: "21:00", event: "Gala Yemeği" },
        { time: "22:00", event: "Ödül Töreni" },
        { time: "23:30", event: "Networking & Kapanış" }
      ]
    },
    en: {
      tag: "Exclusive Invitation",
      title: "15th Annual Technology & Innovation Awards Gala",
      host: "Nexus Technology Corp.",
      date: "November 12, 2026",
      time: "7:30 PM",
      location: "Ciragan Palace Kempinski, Istanbul",
      message: "We would be honored to have you join us at our 15th Annual Gala Night, where industry leaders gather and innovation and vision are rewarded.",
      rsvp: "RSVP",
      back: "Go Back",
      directions: "Get Directions",
      dressCode: "Dress Code: Black Tie",
      scheduleTitle: "Evening Schedule",
      countdown: {
        days: "DAYS",
        hours: "HOURS",
        mins: "MINS",
        secs: "SECS"
      },
      schedule: [
        { time: "7:30 PM", event: "Welcome & Cocktail" },
        { time: "8:30 PM", event: "Opening Keynote" },
        { time: "9:00 PM", event: "Gala Dinner" },
        { time: "10:00 PM", event: "Awards Ceremony" },
        { time: "11:30 PM", event: "Networking & Closing" }
      ]
    }
  }[language];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f2ed] font-sans selection:bg-[#d4af37]/30 relative overflow-x-hidden">
      {/* Subtle Grain Texture */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-50" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png")' }}></div>

      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#d4af37]/5 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#d4af37]/5 blur-[150px] rounded-full"></div>
        {/* Center Stage Spotlight */}
        <div className="absolute top-0 left-[20%] right-[20%] h-[60%] bg-gradient-to-b from-[#d4af37]/10 to-transparent blur-[80px]"></div>
      </div>

      {/* Animated Background Wrapper for Zoom In/Out Effect */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-0 origin-center"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Architectural Space */}
        <VenueArchitecture />

        {/* Moving Silhouettes Animation */}
        <Silhouettes />
      </motion.div>

      <button 
        onClick={onBack}
        className="fixed top-8 left-8 z-50 px-6 py-2 rounded-full border border-white/20 text-white/70 text-[10px] uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all backdrop-blur-md"
      >
        {t.back}
      </button>

      {/* Floating Order Button */}
      {!eventContext && (
        <button 
          onClick={onOrder}
          className="fixed bottom-8 right-8 z-50 px-8 py-4 bg-transparent border border-[#d4af37] rounded-full text-[#d4af37] text-[10px] uppercase tracking-[3px] font-bold hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-all duration-500 shadow-[0_0_30px_rgba(212,175,55,0.1)] hover:shadow-[0_0_50px_rgba(212,175,55,0.3)] backdrop-blur-md flex items-center gap-2 group"
        >
          <span>{language === 'tr' ? 'Bu Tasarımla Sipariş Ver' : 'Order with this Design'}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </button>
      )}

      <Chatbot language={language} eventContext={eventContext} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-32 flex flex-col items-center text-center">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full mb-32"
        >
          <div className="inline-block mb-12">
            <span className="text-[10px] uppercase tracking-[8px] text-[#d4af37] font-bold border-b border-[#d4af37]/30 pb-2">{t.tag}</span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif font-light tracking-tight mb-8 leading-[1.1] text-white">
            {eventContext?.title || t.title}
          </h1>
          
          <p className="text-sm sm:text-base uppercase tracking-[4px] text-white/50 mb-16">
            Hosted by <span className="text-[#d4af37]">{t.host}</span>
          </p>

          <div className="w-px h-32 bg-gradient-to-b from-[#d4af37]/50 to-transparent mx-auto mb-16"></div>

          <p className="text-lg sm:text-2xl font-serif font-light text-white/80 max-w-2xl mx-auto leading-relaxed mb-16">
            "{t.message}"
          </p>
        </motion.div>

        {/* Countdown Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex justify-center gap-4 sm:gap-8 mb-32"
        >
          {[
            { label: t.countdown.days, value: timeLeft.days },
            { label: t.countdown.hours, value: timeLeft.hours },
            { label: t.countdown.mins, value: timeLeft.mins },
            { label: t.countdown.secs, value: timeLeft.secs }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center border border-[#d4af37]/30 bg-black/40 backdrop-blur-md rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.1)] mb-3 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-[#d4af37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="text-2xl sm:text-4xl font-mono text-[#d4af37] font-light tracking-wider">{item.value.toString().padStart(2, '0')}</span>
              </div>
              <span className="text-[9px] sm:text-[11px] uppercase tracking-[3px] text-white/50">{item.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Details Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5 }}
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 border-y border-white/10 py-20 mb-32"
        >
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-[4px] text-white/40 mb-4">Date</span>
            <span className="text-xl font-serif text-[#d4af37]">{t.date}</span>
          </div>
          <div className="flex flex-col items-center md:border-x border-white/10">
            <span className="text-[10px] uppercase tracking-[4px] text-white/40 mb-4">Time</span>
            <span className="text-xl font-serif text-[#d4af37]">{t.time}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-[4px] text-white/40 mb-4">Venue</span>
            <span className="text-xl font-serif text-[#d4af37] mb-4 text-center max-w-[200px]">{eventContext?.venue?.name || t.location}</span>
            <a 
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(eventContext?.venue?.address || t.location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[2px] text-white/60 hover:text-[#d4af37] transition-colors border-b border-white/20 hover:border-[#d4af37] pb-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              {t.directions}
            </a>
          </div>
        </motion.div>

        {/* Schedule Section */}
        {!eventContext && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="w-full max-w-2xl mx-auto mb-32"
          >
            <h2 className="text-3xl font-serif italic text-center text-white mb-16">{t.scheduleTitle}</h2>
            <div className="space-y-8">
              {t.schedule.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-white/5 pb-4 group">
                  <span className="text-sm font-serif text-[#d4af37] group-hover:text-white transition-colors">{item.time}</span>
                  <span className="text-sm uppercase tracking-[2px] text-white/60 group-hover:text-[#d4af37] transition-colors">{item.event}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* RSVP Form Section */}
        <div className="w-full max-w-2xl mx-auto mb-32">
          <RSVPForm 
            language={language}
            themeColor="#d4af37"
            eventId={eventId || 'darkluxury-demo'}
            theme="dark"
          />
        </div>

        {/* Location Map Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="w-full max-w-3xl mx-auto mb-32"
        >
          <LocationMap 
            language={language}
            themeColor="#d4af37"
            venueName={eventContext?.venue?.name || t.location.split(',')[0]}
            address={eventContext?.venue?.address || t.location}
            googleMapsUrl={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(eventContext?.venue?.address || t.location)}`}
            darkTheme={true}
          />
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="text-center"
        >
          <p className="text-[10px] uppercase tracking-[6px] text-white/30 mb-4">{t.dressCode}</p>
          <div className="w-12 h-12 rounded-full border border-[#d4af37]/30 flex items-center justify-center mx-auto text-[#d4af37] font-serif italic text-xl">
            D
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DarkLuxuryTemplate;
