import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { translations } from '../src/constants/translations';
import { Chatbot } from './Chatbot';
import LocationMap from './LocationMap';
import RSVPForm from './RSVPForm';
import { Lock, Clock, Heart, Star, Sparkles, MapPin, Calendar, Camera } from 'lucide-react';
import { db } from '../src/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface AeternaTemplateProps {
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

export const AeternaTemplate: React.FC<AeternaTemplateProps> = ({ onBack, language, onOrder, eventId, eventContext }) => {
  const [activeStage, setActiveStage] = useState<'intro' | 'yesterday' | 'today' | 'tomorrow'>('intro');
  const [timeCapsuleMessage, setTimeCapsuleMessage] = useState('');
  const [timeCapsuleGuest, setTimeCapsuleGuest] = useState('');
  const [isSealed, setIsSealed] = useState(false);
  const [isSealing, setIsSealing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSealTimeCapsule = async () => {
    if (timeCapsuleMessage.trim().length === 0 || timeCapsuleGuest.trim().length === 0) return;
    try {
      setIsSealing(true);
      const targetEventId = eventId || 'masterpiece';
      await addDoc(collection(db, 'events', targetEventId, 'capsules'), {
        name: timeCapsuleGuest.trim(),
        message: timeCapsuleMessage.trim(),
        createdAt: serverTimestamp(),
        unlocksAt: new Date(new Date().setFullYear(new Date().getFullYear() + 10))
      });
      setIsSealed(true);
    } catch (error) {
      console.error("Error sealing capsule:", error);
    } finally {
      setIsSealing(false);
    }
  };
  
  const title = eventContext?.title || "Berna & Melih";

  const t = {
    tr: {
      begin: "Zamanın Ötesine Yolculuk",
      yesterday: "DÜN",
      yesterdayTitle: "Başlangıç",
      yesterdayText: "Her ihtişamlı hikaye, küçük bir tebessümle başlar. Yıldızların altında kesişen yollarımız, bugün sonsuzlukla mühürleniyor.",
      today: "BUGÜN",
      todayTitle: "Rezonans",
      todayText: "Şimdi, burada, bu anın içindeyiz. Kalplerimiz aynı ritimle atarken, bu büyülü geceye tanıklık etmeniz için sizi bekliyoruz.",
      tomorrow: "YARIN",
      tomorrowTitle: "Sonsuzluk Kapsülü",
      tomorrowText: "Bize gelecekten bir not bırakın. Bu dijital kapsül mühürlenecek ve tam 10 yıl sonra, 2036'da sizin adınızla açılacak.",
      sealBtn: "Mesajı Geleceğe Mühürle",
      sealedText: "Mesajınız zamanın derinliklerine mühürlendi. 2036'da görüşmek üzere...",
      rsvpText: "Bu eşsiz gecede yerinizi ayırın.",
    },
    en: {
      begin: "Journey Beyond Time",
      yesterday: "YESTERDAY",
      yesterdayTitle: "The Genesis",
      yesterdayText: "Every magnificent story starts with a small smile. Our paths that crossed under the stars are sealed with eternity today.",
      today: "TODAY",
      todayTitle: "The Resonance",
      todayText: "We are here, right now, in this moment. As our hearts beat to the same rhythm, we await your presence to witness this magical night.",
      tomorrow: "TOMORROW",
      tomorrowTitle: "The Eternity Capsule",
      tomorrowText: "Leave us a note from the future. This digital capsule will be sealed and opened in exactly 10 years, in 2036, bearing your name.",
      sealBtn: "Seal Message to the Future",
      sealedText: "Your message has been sealed into the depths of time. See you in 2036...",
      rsvpText: "Reserve your place in this unique night.",
    }
  }[language];

  // Particle background effect
  const particles = Array.from({ length: 50 });

  const renderIntro = () => (
    <motion.div 
      key="intro"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 1.5 }}
      className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-[#020202]"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(212,175,55,0.05)_0%,transparent_70%)] rounded-full animate-pulse-slow"></div>
      </div>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-center relative z-10"
      >
        <span className="text-[10px] tracking-[10px] text-[#d4af37]/60 uppercase block mb-8 font-light">Aeterna Masterpiece</span>
        <h1 className="text-5xl md:text-8xl font-serif text-[#F5F2EB] italic font-light mb-12 tracking-tight drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">{title}</h1>
        <button 
          onClick={() => setActiveStage('yesterday')}
          className="group relative px-10 py-4 bg-transparent border border-[#d4af37]/30 rounded-full overflow-hidden hover:border-[#d4af37] transition-all duration-700"
        >
          <div className="absolute inset-0 bg-[#d4af37]/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-700 ease-out"></div>
          <span className="relative text-[#d4af37] text-[10px] uppercase tracking-[4px] font-medium">{t.begin}</span>
        </button>
      </motion.div>
    </motion.div>
  );

  const renderYesterday = () => (
    <motion.div
      key="yesterday"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 overflow-y-auto overflow-x-hidden pt-32 pb-40 px-6 md:px-20"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-20">
          <div className="h-px w-20 bg-[#d4af37]"></div>
          <span className="text-[10px] tracking-[8px] text-[#d4af37] font-bold uppercase">{t.yesterday}</span>
        </div>
        
        <h2 className="text-6xl md:text-8xl font-serif italic text-white mb-12 leading-tight">{t.yesterdayTitle}</h2>
        <p className="text-xl md:text-3xl text-white/60 font-light leading-relaxed max-w-2xl mb-24 font-serif">
          {t.yesterdayText}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          <div className="aspect-[3/4] relative rounded-t-full overflow-hidden border border-[#d4af37]/20 p-2">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
            <img src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800" alt="Memory" className="w-full h-full object-cover rounded-t-full grayscale-[0.5] hover:grayscale-0 transition-all duration-[2s]" />
          </div>
          <div className="aspect-[3/4] relative rounded-b-full overflow-hidden border border-[#d4af37]/20 p-2 md:mt-32">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent z-10"></div>
            <img src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=800" alt="Memory 2" className="w-full h-full object-cover rounded-b-full grayscale-[0.5] hover:grayscale-0 transition-all duration-[2s]" />
          </div>
        </div>

        <div className="mt-32 flex justify-end">
          <button onClick={() => setActiveStage('today')} className="text-[#d4af37] flex items-center gap-4 group">
            <span className="text-[10px] tracking-[4px] uppercase font-bold group-hover:translate-x-[-10px] transition-transform duration-500">{t.today}'e Geç</span>
            <div className="w-12 h-12 rounded-full border border-[#d4af37]/30 flex items-center justify-center group-hover:bg-[#d4af37]/10 transition-colors">
              →
            </div>
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderToday = () => (
    <motion.div
      key="today"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 overflow-y-auto overflow-x-hidden pt-32 pb-40 px-6 md:px-20 bg-[#050505]"
    >
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-20 text-center justify-center">
          <span className="text-[10px] tracking-[8px] text-[#F5F2EB]/40 font-bold uppercase">{t.yesterday}</span>
          <div className="h-px w-10 bg-[#d4af37]/30"></div>
          <span className="text-[10px] tracking-[8px] text-[#d4af37] font-bold uppercase">{t.today}</span>
          <div className="h-px w-10 bg-[#d4af37]/30"></div>
          <span className="text-[10px] tracking-[8px] text-[#F5F2EB]/40 font-bold uppercase">{t.tomorrow}</span>
        </div>
        
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-8xl font-serif italic text-white mb-8">{t.todayTitle}</h2>
          <p className="text-lg md:text-xl text-white/50 font-light max-w-xl mx-auto">{t.todayText}</p>
        </div>

        {/* Location & Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          <div className="bg-white/[0.02] border border-white/5 p-10 rounded-[2rem] backdrop-blur-md">
            <Calendar className="text-[#d4af37] w-8 h-8 mb-6" />
            <div className="text-[10px] text-[#d4af37] tracking-[4px] uppercase mb-2">Tarih</div>
            <div className="text-3xl font-serif text-white mb-2">15 Ağustos 2026</div>
            <div className="text-white/50 font-light">Cumartesi, 19:00</div>
          </div>
          <div className="bg-white/[0.02] border border-white/5 p-10 rounded-[2rem] backdrop-blur-md">
            <MapPin className="text-[#d4af37] w-8 h-8 mb-6" />
            <div className="text-[10px] text-[#d4af37] tracking-[4px] uppercase mb-2">Mekan</div>
            <div className="text-3xl font-serif text-white mb-2">Four Seasons Bosphorus</div>
            <div className="text-white/50 font-light text-sm">Çırağan Cd. No:28, 34349 Beşiktaş/İstanbul</div>
          </div>
        </div>

        <LocationMap 
           language={language}
           themeColor="#d4af37"
           venueName={eventContext?.venue?.name || "Four Seasons Bosphorus"}
           address={eventContext?.venue?.address || "Çırağan Cd. No:28, Beşiktaş/İstanbul"}
           googleMapsUrl="https://maps.google.com"
           theme="dark"
        />

        <div className="mt-20">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-serif italic text-white mb-4">LCV</h3>
            <p className="text-white/50 text-sm">{t.rsvpText}</p>
          </div>
          <RSVPForm language={language} themeColor="#d4af37" eventId={eventId || 'masterpiece'} theme="dark" />
        </div>

        <div className="mt-32 flex justify-between">
          <button onClick={() => setActiveStage('yesterday')} className="text-white/40 hover:text-[#d4af37] transition-colors text-[10px] tracking-[4px] uppercase">
            ← {t.yesterday}
          </button>
          <button onClick={() => setActiveStage('tomorrow')} className="flex items-center gap-4 group">
            <span className="text-[#d4af37] text-[10px] tracking-[4px] uppercase font-bold group-hover:translate-x-[-10px] transition-transform duration-500">Zaman Kapsülünü Aç ({t.tomorrow})</span>
            <div className="w-12 h-12 rounded-full border border-[#d4af37]/30 flex items-center justify-center group-hover:bg-[#d4af37]/10 transition-colors text-[#d4af37]">
              →
            </div>
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderTomorrow = () => (
    <motion.div
      key="tomorrow"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 overflow-y-auto overflow-x-hidden pt-32 pb-40 px-6 md:px-20 bg-gradient-to-b from-[#020202] to-[#0a0a05] perspective-1000"
    >
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 pointer-events-none"></div>
      
      <div className="max-w-3xl mx-auto relative z-10 text-center transform-style-3d">
        <motion.div 
          animate={{ rotateZ: 360 }} 
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="mb-12 inline-flex items-center justify-center w-24 h-24 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 backdrop-blur-xl relative shadow-[0_0_50px_rgba(212,175,55,0.2)]"
        >
          <div className="absolute inset-0 rounded-full border border-[#d4af37]/20"></div>
          <Clock className="w-8 h-8 text-[#d4af37] transform -rotate-12" />
        </motion.div>
        
        <h2 className="text-5xl md:text-8xl font-serif italic text-[#F5F2EB] mb-8 drop-shadow-[0_0_20px_rgba(212,175,55,0.2)]">{t.tomorrowTitle}</h2>
        <p className="text-lg text-white/50 font-light max-w-xl mx-auto mb-16 leading-relaxed">
          {t.tomorrowText}
        </p>

        {!isSealed ? (
          <motion.div 
            initial={{ opacity: 0, y: 50, rotateX: 10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="bg-white/[0.02] border border-[#d4af37]/20 rounded-[2rem] p-8 md:p-12 backdrop-blur-md text-left relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform translate-z-10"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-30"></div>
            
            <input
              type="text"
              value={timeCapsuleGuest}
              onChange={(e) => setTimeCapsuleGuest(e.target.value)}
              placeholder={language === 'tr' ? "Adınız Soyadınız" : "Your Name"}
              className="w-full bg-transparent border-b border-white/10 text-white placeholder-white/30 p-4 focus:outline-none focus:border-[#d4af37] transition-colors font-serif italic text-xl mb-4"
            />
            
            <textarea 
              value={timeCapsuleMessage}
              onChange={(e) => setTimeCapsuleMessage(e.target.value)}
              placeholder={language === 'tr' ? "2036 yılındaki çifte mühürlü notunuz..." : "Your note sealed until 2036..."}
              className="w-full bg-transparent border-b border-white/10 text-white placeholder-white/30 p-4 min-h-[150px] focus:outline-none focus:border-[#d4af37] transition-colors resize-none font-serif italic text-lg"
            ></textarea>
            
            <div className="mt-12 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white/40 text-xs">
                <Lock className="w-4 h-4" />
                <span>Quantum Encrypted. 256-bit.</span>
              </div>
              <button 
                onClick={handleSealTimeCapsule}
                disabled={isSealing || timeCapsuleMessage.trim().length === 0 || timeCapsuleGuest.trim().length === 0}
                className={`px-8 py-4 rounded-full text-[10px] tracking-[3px] uppercase font-bold transition-all duration-500 shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:shadow-[0_0_50px_rgba(212,175,55,0.5)] ${(timeCapsuleMessage.trim().length > 0 && timeCapsuleGuest.trim().length > 0) ? 'bg-[#d4af37] text-black hover:bg-[#F5F2EB]' : 'bg-white/5 text-white/30 cursor-not-allowed'}`}
              >
                {isSealing ? 'Mühürleniyor...' : t.sealBtn}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ type: "spring", damping: 12, stiffness: 50 }}
            className="flex flex-col items-center justify-center p-16 border border-[#d4af37]/30 rounded-[2rem] bg-[#d4af37]/5 backdrop-blur-xl relative overflow-hidden shadow-2xl"
          >
            <motion.div 
              animate={{ rotateY: 360, rotateX: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="mb-8"
            >
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#d4af37] flex items-center justify-center bg-black/50 shadow-[0_0_100px_rgba(212,175,55,0.6)]">
                <Lock className="w-10 h-10 text-[#d4af37]" />
              </div>
            </motion.div>
            <h3 className="text-4xl font-serif italic text-[#d4af37] mb-4">Locked Until 2036</h3>
            <p className="text-white/60 text-lg font-light tracking-wide">{t.sealedText}</p>
          </motion.div>
        )}

        <div className="mt-32 flex justify-center">
          <button onClick={() => setActiveStage('today')} className="text-white/40 hover:text-[#d4af37] transition-colors text-[10px] tracking-[4px] uppercase border-b border-transparent hover:border-[#d4af37] pb-1">
            Geri Dön
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="fixed inset-0 w-full h-full bg-[#020202] text-white overflow-hidden font-sans select-none">
      <button 
        onClick={onBack}
        className="fixed top-8 left-8 z-[100] w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all backdrop-blur-md"
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
      </button>

      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        {particles.map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-20"
            style={{
              width: Math.random() * 3 + 'px',
              height: Math.random() * 3 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, Math.random() * -100 - 50],
              opacity: [0.2, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeStage === 'intro' && renderIntro()}
        {activeStage === 'yesterday' && renderYesterday()}
        {activeStage === 'today' && renderToday()}
        {activeStage === 'tomorrow' && renderTomorrow()}
      </AnimatePresence>

      <Chatbot language={language} eventContext={eventContext} />
    </div>
  );
};

export default AeternaTemplate;
