import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateGraduationMessage } from '../services/geminiService';

interface GraduationMessageGeneratorProps {
  language: 'tr' | 'en';
  themeColor: string;
}

const GraduationMessageGenerator: React.FC<GraduationMessageGeneratorProps> = ({ language, themeColor }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<'friends' | 'family' | 'teachers' | 'social'>('friends');
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const t = {
    tr: {
      title: "Mezuniyet Mesajı Oluştur",
      desc: "Gemini AI ile sevdiklerinize özel mezuniyet mesajları hazırlayın.",
      placeholder: "Adınızı Yazın...",
      generate: "Mesaj Oluştur",
      generating: "Hazırlanıyor...",
      categories: {
        friends: "Arkadaşlar İçin",
        family: "Aile İçin",
        teachers: "Öğretmenler İçin",
        social: "Sosyal Medya"
      }
    },
    en: {
      title: "Create Graduation Message",
      desc: "Prepare special graduation messages for your loved ones with Gemini AI.",
      placeholder: "Enter Your Name...",
      generate: "Generate Message",
      generating: "Generating...",
      categories: {
        friends: "For Friends",
        family: "For Family",
        teachers: "For Teachers",
        social: "Social Media"
      }
    }
  }[language];

  const handleGenerate = async () => {
    if (!name.trim()) return;
    setIsLoading(true);
    const result = await generateGraduationMessage(category, name);
    setMessage(result);
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-20 pt-20 border-t border-white/5">
      <div className="text-center mb-12">
        <div className="inline-block px-6 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
          <span className="text-[10px] uppercase tracking-[4px] font-black" style={{ color: themeColor }}>{t.title}</span>
        </div>
        <p className="text-white/40 text-xs uppercase tracking-widest">{t.desc}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {(Object.keys(t.categories) as Array<keyof typeof t.categories>).map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              category === cat 
                ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                : 'bg-white/5 text-white/60 border border-white/10 hover:border-white/30'
            }`}
          >
            {t.categories[cat]}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-6 max-w-md mx-auto">
        <div className="relative">
          <input 
            type="text" 
            placeholder={t.placeholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-sm focus:outline-none transition-all focus:border-white/30 text-white"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20">🎓</div>
        </div>
        
        <button 
          onClick={handleGenerate}
          disabled={isLoading || !name.trim()}
          className="w-full py-5 rounded-2xl text-[10px] font-black uppercase tracking-[4px] transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-30 shadow-2xl"
          style={{ backgroundColor: themeColor, color: '#000' }}
        >
          {isLoading ? t.generating : t.generate}
        </button>
      </div>

      <AnimatePresence>
        {message && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95 }}
            className="mt-12 p-10 rounded-[40px] border text-center relative overflow-hidden bg-white/5 backdrop-blur-xl"
            style={{ borderColor: `${themeColor}40` }}
          >
            <div className="relative z-10 text-lg italic leading-relaxed text-white/90">
              "{message}"
            </div>
            <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] blur-[80px] rounded-full" style={{ backgroundColor: `${themeColor}20` }}></div>
            
            <button 
              onClick={() => navigator.clipboard.writeText(message)}
              className="mt-8 text-[8px] uppercase tracking-[4px] text-white/40 hover:text-white transition-colors"
            >
              [ {language === 'tr' ? 'Metni Kopyala' : 'Copy Text'} ]
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GraduationMessageGenerator;
