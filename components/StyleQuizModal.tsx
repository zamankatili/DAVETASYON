import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StyleQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'tr' | 'en';
  onSelectTemplate: (templateId: string) => void;
  onOrder: (templateId: string) => void;
}

const quizQuestions = [
  {
    id: 'vibe',
    question: {
      tr: 'Etkinliğinizin ruhunu hangisi daha iyi yansıtıyor?',
      en: 'Which best reflects the soul of your event?'
    },
    options: [
      {
        id: 'elegant',
        label: { tr: 'Zarif & Zamansız', en: 'Elegant & Timeless' },
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600'
      },
      {
        id: 'luxury',
        label: { tr: 'Gösterişli & VIP', en: 'Glamorous & VIP' },
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600'
      },
      {
        id: 'romantic',
        label: { tr: 'Doğal & Bahar Esintisi', en: 'Natural & Spring Breeze' },
        image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=600'
      },
      {
        id: 'fun',
        label: { tr: 'Eğlenceli & Enerjik', en: 'Fun & Energetic' },
        image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=600'
      }
    ]
  },
  {
    id: 'time',
    question: {
      tr: 'Hikayeniz ne zaman, nasıl bir ışık altında hayat bulacak?',
      en: 'When will your story come to life, under what light?'
    },
    options: [
      {
        id: 'day',
        label: { tr: 'Güneşli Bir Gündüz', en: 'Sunny Daytime' },
        image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=600'
      },
      {
        id: 'sunset',
        label: { tr: 'Günbatımı Romantizmi', en: 'Sunset Romance' },
        image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=600'
      },
      {
        id: 'night',
        label: { tr: 'Büyülü Bir Gece', en: 'Magical Night' },
        image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=600'
      }
    ]
  },
  {
    id: 'detail',
    question: {
      tr: 'Davetiyenizdeki "imza" detay ne olmalı?',
      en: 'What should be the "signature" detail in your invitation?'
    },
    options: [
      {
        id: 'minimal',
        label: { tr: 'Sade Tipografi ve Sanat', en: 'Clean Typography & Art' },
        image: 'https://images.unsplash.com/photo-1507290439931-a861b5a38200?auto=format&fit=crop&q=80&w=600'
      },
      {
        id: 'gold',
        label: { tr: 'Altın Yansımalar ve Parıltı', en: 'Gold Reflections & Sparkle' },
        image: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=600'
      },
      {
        id: 'floral',
        label: { tr: 'Çiçekler ve Doğa Motifleri', en: 'Flowers & Nature Motifs' },
        image: 'https://images.unsplash.com/photo-1500366601446-5ecb8abf1b34?auto=format&fit=crop&q=80&w=600'
      },
      {
        id: 'traditional',
        label: { tr: 'Kültürel & Geleneksel', en: 'Cultural & Traditional Textures' },
        image: 'https://images.unsplash.com/photo-1590073844006-3a44a7f3ff91?auto=format&fit=crop&q=80&w=600'
      }
    ]
  }
];

const analysisSnippets = {
  vibe: {
    elegant: { tr: "Zarafetin ön planda olduğu, zamansız ve asil bir duruş...", en: "A timeless and noble stance where elegance is at the forefront..." },
    luxury: { tr: "İhtişamın ve VIP hissiyatının her detaya işlendiği görkemli bir hayal...", en: "A glorious dream where grandeur and VIP sentiment are woven into every detail..." },
    romantic: { tr: "Aşkın doğallığıyla harmanlanmış, naif ve masalsı bir esinti...", en: "A naive and fairytale breeze synthesized with the naturalness of love..." },
    fun: { tr: "Yüksek enerjinin ve bitmeyen neşenin merkezde olduğu coşkulu bir kutlama...", en: "An exuberant celebration centered around high energy and endless joy..." }
  },
  time: {
    day: { tr: "Güneşin sıcak dokunuşlarıyla aydınlanan, ferah ve umut dolu anlar,", en: "Spacious and hopeful moments illuminated by the warm touches of the sun," },
    sunset: { tr: "Gün batımının o eşsiz kızıllığında, romantizmin zirve yaptığı dakikalar,", en: "Moments where romance peaks in the unique crimson of the sunset," },
    night: { tr: "Gecenin karanlığını aydınlatan büyüleyici ışıklar ve loş bir gizem,", en: "Enchanting lights illuminating the darkness of the night and a dim mystery," }
  },
  detail: {
    minimal: { tr: "göz yormayan, sade tipografi ve güçlü minimal tasarımla birleşiyor. Sizin hikayeniz kesinlikle gereksiz detaylardan uzak, net ve vurucu.", en: "unite with the flawless power of clean typography and minimal design. Your story is definitely clear, striking, and far from unnecessary details." },
    gold: { tr: "incelikle işlenmiş altın yansımalar ve ışıltılı detaylarla taçlanıyor. Sizin hikayeniz lüksün parıltısını her milimetresinde hissettirmeli.", en: "are crowned with delicately crafted gold reflections and sparkling details. Your story should make the sparkle of luxury felt in every millimeter." },
    floral: { tr: "doğanın en güzel renkleri ve zarif çiçek motifleriyle bezeniyor. Tıpkı aşkınız gibi açan ve kalplere dokunan bir kompozisyon yaratıyoruz.", en: "are adorned with nature's most beautiful colors and elegant floral motifs. We create a composition that blooms and touches hearts just like your love." },
    traditional: { tr: "köklerine bağlı, kültürel ve geleneksel dokunuşların sıcaklığıyla tamamlanıyor. Geçmişin değerleri, modern dünyanın şıklığıyla birleşerek misafirlerinizi kucaklıyor.", en: "are completed with the warmth of cultural and traditional touches connected to their roots. The values of the past embrace your guests by combining with the elegance of the modern world." }
  }
};

export const StyleQuizModal: React.FC<StyleQuizModalProps> = ({ isOpen, onClose, language, onSelectTemplate, onOrder }) => {
  const [step, setStep] = useState(0); 
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [recommended, setRecommended] = useState('');
  const [poeticText, setPoeticText] = useState<{tr: string, en: string}>({tr: '', en: ''});

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setAnswers({});
      setRecommended('');
      setPoeticText({tr: '', en: ''});
    }
  }, [isOpen]);

  const handleSelect = (questionId: string, optionId: string) => {
    const newAnswers = { ...answers, [questionId]: optionId };
    setAnswers(newAnswers);
    
    if (step < quizQuestions.length) {
      setStep(step + 1);
    }
    
    if (step === quizQuestions.length) {
      setStep(4);
      
      // Generate poetic context
      const vibeKey = newAnswers.vibe as keyof typeof analysisSnippets.vibe;
      const timeKey = newAnswers.time as keyof typeof analysisSnippets.time;
      const detailKey = newAnswers.detail as keyof typeof analysisSnippets.detail;

      const generatedTr = `${analysisSnippets.vibe[vibeKey]?.tr || ''} ${analysisSnippets.time[timeKey]?.tr || ''} ${analysisSnippets.detail[detailKey]?.tr || ''}`;
      const generatedEn = `${analysisSnippets.vibe[vibeKey]?.en || ''} ${analysisSnippets.time[timeKey]?.en || ''} ${analysisSnippets.detail[detailKey]?.en || ''}`;
      
      setPoeticText({ tr: generatedTr, en: generatedEn });
    }
  };

  const calculateResult = (finalAnswers: Record<string, string>) => {
    const { vibe, detail } = finalAnswers;
    let result = 'classicenvelope';

    if (detail === 'traditional') {
      result = vibe === 'fun' ? 'sunnet' : 'kina';
    } else if (vibe === 'fun') {
      result = 'birthday';
    } else if (vibe === 'luxury' || detail === 'gold') {
      result = detail === 'minimal' ? 'darkluxury' : 'aurora';
    } else if (vibe === 'romantic' || detail === 'floral') {
      result = 'engagement';
    } else {
      result = 'wedding'; 
    }

    setRecommended(result);
    setStep(5);
  };

  const templateMap: Record<string, { title: { tr: string, en: string }, desc: { tr: string, en: string }, image: string }> = {
    aurora: {
      title: { tr: 'Kuzey Işıkları (Aurora)', en: 'Northern Lights' },
      desc: { tr: 'Seçimlerinize dayanarak önerdiğimiz bu tasarım, ihtişamı ve büyülü parıltıları seven ruhunuzu tam 12\'den vuracak. Unutulmaz bir geceye hazır olun.', en: 'Based on your choices, this design will hit your soul that loves grandeur and magical sparkles right on the mark. Get ready for an unforgettable night.' },
      image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=800'
    },
    darkluxury: {
      title: { tr: 'Kurumsal Gala (Dark Luxury)', en: 'Corporate Gala' },
      desc: { tr: 'Fazlalıklardan arınmış, şık ve karanlık asalet. VIP hissiyatini, prestiji ve geceye yakışan ağırlığı bu lüks tasarımda bulacaksınız.', en: 'Free from excess, chic and dark nobility. You will find the VIP feeling, prestige, and the weight befitting the night in this luxury design.' },
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800'
    },
    engagement: {
      title: { tr: 'Nişan & Bahar Esintisi', en: 'Engagement & Spring Breeze' },
      desc: { tr: 'Aradığınız o naif, doğayla iç içe ve sevgi dolu histi biliyoruz. Romantizmi ve çiçeklerin doğallığını bu tasarımda hissedeceksiniz.', en: 'We know that naive, nature-intertwined and affectionate feeling you are looking for. You will feel romance and the naturalness of flowers in this design.' },
      image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=800'
    },
    wedding: {
      title: { tr: 'Modern Düğün Zarafeti', en: 'Modern Wedding Elegance' },
      desc: { tr: 'Aklınızdaki durultu ve moderniteyi sezebiliyoruz. Zarif detaylar ve sanatsal dokunuşlarla sonsuz aşkınızın en mükemmel dijital yansıması.', en: 'We can sense the clarity and modernity in your mind. The most perfect digital reflection of your eternal love with elegant details and artistic touches.' },
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800'
    },
    classicenvelope: {
      title: { tr: 'Zarif Klasik Zarf', en: 'Elegant Classic Envelope' },
      desc: { tr: 'Asla modası geçmeyecek bir ruh haliniz var. Minimalizmin asaletini savunan, zamansız ve etkileyici bir klasik; kesinlikle tam size göre.', en: 'You have a mood that will never go out of style. A timeless and impressive classic that defends the nobility of minimalism; definitely meant for you.' },
      image: 'https://images.unsplash.com/photo-1507290439931-a861b5a38200?auto=format&fit=crop&q=80&w=800'
    },
    birthday: {
      title: { tr: 'Eğlenceli Kutlama', en: 'Fun Celebration' },
      desc: { tr: 'İçinizdeki çocuğu ve partileme hissini duyabiliyoruz! Yüksek enerjinizi ve kutlama ruhunuzu ekrandan taşıran renkli bir deneyim.', en: 'We can hear your inner child and party feeling! A colorful experience that overflows your high energy and celebration spirit from the screen.' },
      image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=800'
    },
    kina: {
      title: { tr: 'Geleneksel Masal (Kına)', en: 'Traditional Tale (Henna)' },
      desc: { tr: 'Kültürün büyüleyici dokularını koruyan ancak gösterişten taviz vermeyen muazzam lüks bir seçim.', en: 'A tremendous luxury choice that preserves the enchanting textures of culture but does not compromise on ostentation.' },
      image: 'https://images.unsplash.com/photo-1590073844006-3a44a7f3ff91?auto=format&fit=crop&q=80&w=800'
    },
    sunnet: {
      title: { tr: 'Dini & Geleneksel Merasim', en: 'Traditional Ceremony' },
      desc: { tr: 'Maneviyatı yüksek, köklerine sıkı sıkıya bağlı ve aileyi güçlü bir bağla bir araya getiren prestijli bir tasarım.', en: 'A prestigious design that has high spirituality, is tightly connected to its roots, and brings the family together with a strong bond.' },
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800'
    }
  };

  const currentQ = quizQuestions[step - 1];
  const resultData = recommended ? templateMap[recommended] : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] bg-[#050505]/98 backdrop-blur-2xl flex items-center justify-center overflow-x-hidden overflow-y-auto"
        >
          {/* Background Ambient Glow */}
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-[#C9A87C]/5 blur-[150px]"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-[#E5CCAA]/5 blur-[150px]"></div>
          </div>

          <button 
            onClick={onClose}
            className="fixed top-8 right-8 z-[310] p-3 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all font-sans text-sm tracking-widest uppercase flex items-center gap-2"
          >
            {language === 'tr' ? 'Kapat' : 'Close'}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>

          <div className="w-full max-w-6xl mx-auto px-6 py-20 relative z-10 flex flex-col items-center justify-center min-h-[100dvh]">
            
            {/* Step 0: Intro */}
            {step === 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="text-center max-w-2xl"
              >
                <div className="inline-block px-4 py-1 border border-[#C9A87C]/30 rounded-full text-[#C9A87C] text-[10px] uppercase tracking-[0.4em] mb-8 font-bold">
                  {language === 'tr' ? 'Karar Vermekte Zorlanıyor Musunuz?' : 'Having Trouble Deciding?'}
                </div>
                <h2 className="text-5xl md:text-7xl font-serif italic text-[#F5F2EB] mb-8 leading-tight">
                  {language === 'tr' ? 'Gerçek Tarzınızı Birlikte Keşfedelim.' : 'Let\'s Discover Your True Style Together.'}
                </h2>
                <p className="text-[#F5F2EB]/50 text-lg md:text-xl font-light mb-12 leading-relaxed">
                  {language === 'tr' ? 'Sadece 3 kısa görsel soru ile zihninizdeki soyut konsepti somutlaştırıyor ve size en mükemmel şaheseri öneriyoruz.' : 'With visual questions, we materialize the abstract concept in your mind and recommend the most perfect masterpiece for you.'}
                </p>
                <button 
                  onClick={() => setStep(1)}
                  className="px-12 py-5 bg-[#C9A87C] text-[#11100F] text-xs uppercase tracking-[0.3em] font-bold rounded-full hover:bg-[#F5F2EB] transition-all duration-500 shadow-[0_10px_40px_rgba(201,168,124,0.3)] hover:-translate-y-1"
                >
                  {language === 'tr' ? 'Testi Başlat' : 'Start Quiz'}
                </button>
              </motion.div>
            )}

            {/* Step 1-3: Questions */}
            {step > 0 && step <= quizQuestions.length && currentQ && (
              <motion.div 
                key={`step-${step}`}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="w-full flex justify-center items-center flex-col min-h-[60vh]"
              >
                <div className="text-center mb-16 max-w-3xl">
                  <div className="text-[#C9A87C] text-[10px] uppercase tracking-[0.4em] font-bold mb-4">
                    {language === 'tr' ? `${step} / 3 Adım` : `Step ${step} / 3`}
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-[#F5F2EB] leading-tight">
                    {currentQ.question[language]}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
                  {currentQ.options.map(option => (
                    <motion.div 
                      key={option.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelect(currentQ.id, option.id)}
                      className="group cursor-pointer relative rounded-3xl overflow-hidden aspect-[4/5] border border-white/5 bg-[#11100F] shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                    >
                      <img 
                        src={option.image} 
                        alt={option.label[language]} 
                        className="w-full h-full object-cover grayscale-[0.5] opacity-60 group-hover:grayscale-[0.1] group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" 
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 w-full p-6 text-center transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <div className="w-8 h-8 rounded-full border border-white/20 mx-auto mb-4 flex items-center justify-center group-hover:bg-[#C9A87C] group-hover:border-[#C9A87C] transition-colors duration-500">
                          <div className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-[#11100F] transition-colors duration-500"></div>
                        </div>
                        <h3 className="text-[#F5F2EB] font-serif italic text-xl md:text-2xl drop-shadow-lg">{option.label[language]}</h3>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4: Loading/Calculating */}
            {step === 4 && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center flex flex-col items-center justify-center w-full max-w-3xl"
              >
                <div className="w-24 h-24 relative mb-12">
                  <motion.div 
                    animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-[1px] border-dashed border-[#C9A87C]/50 rounded-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-4xl">✨</div>
                </div>
                <h2 className="text-3xl md:text-5xl font-serif italic text-[#F5F2EB] mb-8 leading-relaxed">
                  {language === 'tr' ? 'Hikayeniz Zihnimizde Şekilleniyor...' : 'Your Story is Forming in Our Minds...'}
                </h2>
                
                {/* Poetic Typewriter Effect during loading */}
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="text-[#C9A87C] text-lg md:text-2xl font-serif italic leading-relaxed text-center px-4 mb-8"
                >
                  {poeticText[language]}
                </motion.p>

                <button
                  onClick={() => calculateResult(answers)}
                  className="px-10 py-5 bg-[#C9A87C] text-[#11100F] text-[10px] uppercase tracking-[0.3em] font-bold rounded-full hover:bg-[#F5F2EB] transition-all duration-500 shadow-[0_15px_30px_rgba(201,168,124,0.3)]"
                >
                  {language === 'tr' ? 'Sanatsal Eşleşmeyi Gör' : 'View Artistic Match'}
                </button>
              </motion.div>
            )}

            {/* Step 5: Result */}
            {step === 5 && resultData && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full flex flex-col items-center pb-20"
              >
                {/* Poetic Text Recap placed on top */}
                <div className="w-full max-w-4xl text-center mb-12 flex flex-col items-center justify-center gap-4 relative z-20 layout-float">
                  <div className="text-[60px] md:text-[80px] text-[#C9A87C]/20 font-serif leading-none italic select-none">"</div>
                  <h3 className="text-[#C9A87C] text-[10px] uppercase tracking-[0.4em] font-bold mb-2">
                    {language === 'tr' ? 'Sanatsal Analizimiz' : 'Our Artistic Analysis'}
                  </h3>
                  <p className="text-[#F5F2EB]/90 text-xl md:text-2xl lg:text-3xl font-serif italic leading-relaxed px-4">
                    {poeticText[language]}
                  </p>
                </div>

                <div className="w-full max-w-6xl bg-[#11100F] border border-white/10 rounded-[3rem] p-8 md:p-12 lg:p-16 flex flex-col md:flex-row gap-12 lg:gap-20 items-center shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative overflow-hidden">
                  {/* Result Glow background */}
                  <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-[#C9A87C]/5 to-transparent pointer-events-none" />

                  <div className="w-full md:w-[45%] aspect-[4/5] relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl z-10 group bg-[#1A1817]">
                    <img src={resultData.image} alt="Recommendation" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] sepia-[0.1]" />
                    <div className="absolute top-6 left-6 px-5 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-[9px] uppercase tracking-[0.3em] text-[#C9A87C] font-bold shadow-xl">
                      {language === 'tr' ? '%100 Kusursuz Eşleşme' : '100% Perfect Match'}
                    </div>
                  </div>

                  <div className="w-full md:w-[55%] flex flex-col justify-center relative z-10 text-center md:text-left">
                    <div className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#C9A87C] mb-4">
                      {language === 'tr' ? 'İşte Masalınızın Başrolü:' : 'The Protagonist of Your Tale:'}
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-[#F5F2EB] mb-8 leading-tight tracking-tight">
                      {resultData.title[language]}
                    </h2>
                    <p className="text-[#F5F2EB]/60 text-base md:text-lg lg:text-xl font-light mb-12 leading-relaxed max-w-lg mx-auto md:mx-0">
                      {resultData.desc[language]}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-5 items-center justify-center md:justify-start">
                      <button 
                        onClick={() => {
                          onClose();
                          onSelectTemplate(recommended);
                        }}
                        className="w-full sm:w-auto px-10 py-5 bg-[#C9A87C] text-[#11100F] text-[10px] uppercase tracking-[0.3em] font-bold rounded-full hover:bg-[#F5F2EB] transition-all duration-500 shadow-[0_15px_30px_rgba(201,168,124,0.3)] flex items-center justify-center gap-3 group"
                      >
                        {language === 'tr' ? 'Şaheseri Gör' : 'View Masterpiece'}
                        <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                      </button>
                      <button 
                        onClick={() => {
                          onClose();
                          onOrder(recommended);
                        }}
                        className="w-full sm:w-auto px-10 py-5 border border-[#C9A87C]/30 text-[#C9A87C] text-[10px] uppercase tracking-[0.3em] font-bold rounded-full hover:bg-[#C9A87C] hover:text-[#11100F] transition-all duration-500"
                      >
                        {language === 'tr' ? 'Hemen Sana Uyarlayalım' : 'Adapt It For You Now'}
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => setStep(0)}
                      className="mt-12 text-[10px] text-[#F5F2EB]/30 hover:text-[#C9A87C] uppercase tracking-[0.3em] font-bold transition-colors inline-block text-center md:text-left"
                    >
                      {language === 'tr' ? '↺ Testi Baştan Çöz' : '↺ Retake Quiz'}
                    </button>
                  </div>

                </div>
              </motion.div>
            )}

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
