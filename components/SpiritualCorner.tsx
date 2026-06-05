import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchSpiritualMessage, generateCustomBlessing } from '../services/geminiService';

interface SpiritualCornerProps {
  language: 'tr' | 'en';
  themeColor: string;
  eventNames: string;
  eventType: string;
  theme?: 'light' | 'dark';
}

const SpiritualCorner: React.FC<SpiritualCornerProps> = ({ language, themeColor, eventNames, eventType, theme = 'dark' }) => {
  const [spiritualMsg, setSpiritualMsg] = useState<string>("");
  const [guestName, setGuestName] = useState("");
  const [customBlessing, setCustomBlessing] = useState("");
  const [isLoadingBlessing, setIsLoadingBlessing] = useState(false);

  const t = {
    tr: {
      title: "Geleceğe Dua & İyi Dilekler",
      placeholder: "Adını Yaz...",
      generate: "Bana Özel Dua Oluştur",
      generating: "AI Hazırlıyor...",
      desc: "Gemini AI ile bu yeni başlangıcın için sana özel bir manevi mesaj hazırlayalım."
    },
    en: {
      title: "Future Prayers & Wishes",
      placeholder: "Your Name...",
      generate: "Create My Special Prayer",
      generating: "AI is Preparing...",
      desc: "Let's prepare a special spiritual message for your new beginning with Gemini AI."
    }
  }[language];

  useEffect(() => {
    const upperType = eventType.toUpperCase();
    const isGraduation = upperType.includes("MEZUNİYET") || upperType.includes("GRADUATION");
    const isMarriage = upperType.includes("DÜĞÜN") || upperType.includes("WEDDING") || 
                       upperType.includes("KINA") || upperType.includes("HENNA") ||
                       upperType.includes("NİŞAN") || upperType.includes("ENGAGEMENT");
    const isBabyShower = upperType.includes("BABY SHOWER") || upperType.includes("BEBEK") || upperType.includes("DOĞUM");
    
    let category = "default";
    if (isGraduation) category = "graduation";
    else if (isMarriage) category = "marriage";
    else if (isBabyShower) category = "babyshower";

    fetchSpiritualMessage(category).then(setSpiritualMsg);
  }, [eventType]);

  const handleGenerateBlessing = async () => {
    if (!guestName.trim()) return;
    setIsLoadingBlessing(true);
    const result = await generateCustomBlessing(guestName, eventNames, eventType);
    setCustomBlessing(result);
    setIsLoadingBlessing(false);
  };

  const isLight = theme === 'light';

  return (
    <div className={`w-full max-w-2xl mx-auto mt-20 pt-20 border-t ${isLight ? 'border-black/5' : 'border-white/5'}`}>
      <div className="text-center mb-12">
        <div className={`inline-block px-6 py-2 ${isLight ? 'bg-black/5 border-black/10' : 'bg-white/5 border-white/10'} rounded-full mb-6`}>
          <span className="text-[10px] uppercase tracking-[4px] font-bold" style={{ color: themeColor }}>{t.title}</span>
        </div>
        <p className={`${isLight ? 'text-black/40' : 'text-white/40'} text-xs uppercase tracking-widest`}>{t.desc}</p>
      </div>

      <div className={`mb-16 p-10 ${isLight ? 'bg-black/5 border-black/5 text-black/70' : 'bg-white/5 border-white/5 text-white/70'} rounded-[40px] border italic leading-relaxed text-lg relative text-center`}>
        <span className="absolute top-4 left-6 text-7xl opacity-10 font-serif" style={{ color: themeColor }}>"</span>
        {spiritualMsg || "..."}
        <span className="absolute bottom-0 right-6 text-7xl opacity-10 font-serif" style={{ color: themeColor }}>"</span>
      </div>
      
      <div className="flex flex-col gap-6 max-w-md mx-auto">
        <div className="relative">
          <input 
            type="text" 
            placeholder={t.placeholder}
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            className={`w-full ${isLight ? 'bg-black/5 border-black/10 text-black focus:border-black/30' : 'bg-white/5 border-white/10 text-white focus:border-white/30'} border rounded-2xl px-8 py-5 text-sm focus:outline-none transition-all`}
          />
          <div className={`absolute right-4 top-1/2 -translate-y-1/2 ${isLight ? 'text-black/20' : 'text-white/20'}`}>✨</div>
        </div>
        
        <button 
          onClick={handleGenerateBlessing}
          disabled={isLoadingBlessing || !guestName.trim()}
          className="w-full py-5 rounded-2xl text-[10px] font-black uppercase tracking-[4px] transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-30 shadow-2xl"
          style={{ backgroundColor: themeColor, color: isLight ? '#fff' : '#000' }}
        >
          {isLoadingBlessing ? t.generating : t.generate}
        </button>
      </div>

      {customBlessing && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mt-12 p-10 rounded-[40px] border text-center relative overflow-hidden"
          style={{ borderColor: `${themeColor}40`, backgroundColor: `${themeColor}10` }}
        >
          <div className="relative z-10 text-lg italic leading-relaxed" style={{ color: themeColor }}>
            {customBlessing}
          </div>
          <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] blur-[80px] rounded-full" style={{ backgroundColor: `${themeColor}20` }}></div>
        </motion.div>
      )}
    </div>
  );
};

export default SpiritualCorner;
