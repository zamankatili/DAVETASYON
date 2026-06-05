import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ImagePlus, Heart, HandHeart, Sparkles, X, CheckCircle2 } from 'lucide-react';

export default function MemoryBoxTemplate({ 
  language, 
  onBack, 
  onOrder,
  eventId,
  eventContext 
}: { 
  language: 'tr' | 'en';
  onBack: () => void;
  onOrder: () => void;
  eventId?: string;
  eventContext?: {
    title?: string;
    venue?: { name: string; address: string; };
    aiContext?: string;
  };
}) {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'success'>('idle');

  const photos = [
    { url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80', cols: 2 },
    { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80', cols: 1 },
    { url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80', cols: 1 },
    { url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80', cols: 2 },
    { url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80', cols: 1 },
    { url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80', cols: 1 },
    { url: 'https://images.unsplash.com/photo-1509927083803-4bd519298ac4?auto=format&fit=crop&w=800&q=80', cols: 2 },
  ];

  const handleUpload = () => {
    setUploadState('uploading');
    // Simulate network delay
    setTimeout(() => {
      setUploadState('success');
      setTimeout(() => {
        setShowModal(false);
        setUploadState('idle');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
      }, 1800);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#11100F] text-[#F5F2EB] font-sans selection:bg-[#C9A87C] selection:text-[#11100F] pb-20 md:pb-0 relative overflow-x-hidden">
      {/* Natural Canvas Noise Overlay */}
      <div 
        className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
      ></div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-gradient-to-b from-[#11100F]/90 via-[#11100F]/40 to-transparent pointer-events-none">
        <button 
          onClick={onBack}
          className="pointer-events-auto px-5 py-2.5 rounded-full bg-[#F5F2EB]/5 backdrop-blur-md border border-[#F5F2EB]/10 text-[10px] tracking-widest uppercase hover:bg-[#F5F2EB]/10 transition-all font-medium text-[#F5F2EB]/80"
        >
          {language === 'tr' ? '← Galeriye Dön' : '← Return'}
        </button>
        {!eventContext && (
          <button 
            onClick={onOrder}
            className="pointer-events-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C9A87C] to-[#E5CCAA] text-[#11100F] font-bold text-[10px] tracking-widest uppercase hover:scale-105 transition-all shadow-[0_0_25px_rgba(201,168,124,0.25)] flex items-center gap-2"
          >
            <Sparkles className="w-3 h-3" />
            {language === 'tr' ? 'Kendi Anı Kutunuzu Oluşturun' : 'Create Your Memory Box'}
          </button>
        )}
      </nav>

      {/* Hero Header */}
      <header className="relative pt-36 pb-16 px-6 md:px-12 flex flex-col items-center text-center z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(201,168,124,0.08),transparent_60%)] pointer-events-none z-0"></div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 w-full max-w-2xl"
        >
          <span className="text-[#C9A87C] flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.4em] font-semibold mb-6">
            <HandHeart className="w-4 h-4" />
            {language === 'tr' ? 'Bizim İçin Biriktirdiğiniz Anılar' : 'Memories Collected For Us'}
          </span>
          <h1 className="text-5xl md:text-7xl font-serif italic font-light mb-8 opacity-90 tracking-tight text-[#F5F2EB] break-words">
            {eventContext?.title || 'Berna & Melih'}
          </h1>
          <p className="text-[#F5F2EB]/60 mx-auto text-[15px] md:text-[17px] leading-relaxed mb-12 font-light">
            {language === 'tr' 
              ? 'Bu özel günümüzde yanımızda olduğunuz için o kadar şanslıyız ki... Lütfen gözünüze ve kalbinize takılan o güzel anları bu sihirli kutuya bırakın. Bize verebileceğiniz en değerli hediye, birlikte paylaştığımız bu tebessümler olacak. 🤍' 
              : 'We feel so lucky to have you with us on this special day... Please leave the beautiful moments that catch your eye and your heart into this magic box. The most precious gift you can give us will be these smiles we share together. 🤍'}
          </p>
          
          <button 
            onClick={() => setShowModal(true)}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#F5F2EB]/5 backdrop-blur-xl border border-[#F5F2EB]/10 text-[#F5F2EB] rounded-full overflow-hidden hover:scale-[1.02] transition-all duration-500 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.02)] hover:shadow-[0_0_40px_rgba(201,168,124,0.15)] hover:border-[#C9A87C]/40"
          >
            <Camera className="w-5 h-5 flex-shrink-0 text-[#C9A87C] group-hover:scale-110 transition-transform duration-500" />
            <span className="font-light tracking-wider text-sm md:text-base">
              {language === 'tr' ? 'Bir Kalp Bırakın & Fotoğraf Ekleyin' : 'Leave a Heart & Add Photo'}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A87C]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
          </button>
        </motion.div>
      </header>

      {/* Stats/Info bar */}
      <div className="flex justify-center items-center gap-12 py-8 border-y border-[#F5F2EB]/5 bg-[#F5F2EB]/[0.01] text-[11px] tracking-[0.2em] uppercase font-medium relative z-10">
        <div className="flex items-center gap-3 text-[#F5F2EB]/50 hover:text-[#F5F2EB]/80 transition-colors">
          <ImagePlus className="w-5 h-5 text-[#F5F2EB]/40" />
          <span>{language === 'tr' ? '124 Gülümseme' : '124 Smiles'}</span>
        </div>
        <div className="flex items-center gap-3 text-[#F5F2EB]/50 hover:text-[#C9A87C] transition-colors">
          <Heart className="w-5 h-5 text-[#C9A87C]/70" />
          <span>{language === 'tr' ? '86 Kalp' : '86 Hearts'}</span>
        </div>
      </div>

      {/* Masonry Live Gallery */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 auto-rows-[220px]">
          {photos.map((photo, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: 'easeOut' }}
              className={`relative group rounded-[2rem] overflow-hidden cursor-pointer shadow-lg outline outline-1 outline-[#F5F2EB]/5 hover:outline-[#C9A87C]/50 hover:shadow-[0_0_30px_rgba(201,168,124,0.15)] transition-all duration-500 ${
                photo.cols === 2 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'
              }`}
            >
              <img 
                src={photo.url} 
                alt="Wedding moment" 
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100 placeholder-blur"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#11100F]/80 via-[#11100F]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <div className="flex justify-between items-center text-[#F5F2EB]/90">
                  <div className="flex items-center gap-2 bg-[#11100F]/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#F5F2EB]/10">
                    <Heart className="w-3.5 h-3.5 text-[#C9A87C]" />
                    <span className="text-[10px] font-medium tracking-wide">12</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Floating Action Button (Mobile Friendly) */}
      <motion.button 
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowModal(true)}
        className="fixed bottom-8 right-6 md:hidden z-40 w-16 h-16 bg-gradient-to-t from-[#C9A87C] to-[#E5CCAA] text-[#11100F] rounded-full flex items-center justify-center shadow-[0_10px_35px_rgba(201,168,124,0.4)]"
      >
        <Camera className="w-6 h-6" />
      </motion.button>

      {/* Upload Modal (Simulated) */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-[#11100F]/80 backdrop-blur-xl"
              onClick={() => uploadState === 'idle' && setShowModal(false)}
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full max-w-md bg-[#1A1817] border border-[#F5F2EB]/10 rounded-[2.5rem] p-8 overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)]"
            >
              {uploadState === 'idle' && (
                <>
                  <button 
                    onClick={() => setShowModal(false)}
                    className="absolute top-6 right-6 text-[#F5F2EB]/40 hover:text-[#F5F2EB]/90 transition-colors bg-[#F5F2EB]/5 p-2 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="text-center mb-10 pt-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#C9A87C]/10 to-transparent rounded-full flex items-center justify-center mx-auto mb-6 border border-[#C9A87C]/20 shadow-inner">
                      <ImagePlus className="w-8 h-8 text-[#C9A87C]" />
                    </div>
                    <h3 className="text-2xl font-serif italic text-[#F5F2EB] mb-3">
                      {language === 'tr' ? 'Anımızı Ölümsüzleştirin 🤍' : 'Immortalize our memory 🤍'}
                    </h3>
                    <p className="text-[#F5F2EB]/60 text-sm font-light leading-relaxed max-w-[280px] mx-auto">
                      {language === 'tr' 
                        ? 'Hemen şimdi tatlı bir tebessüm yakalayın veya galerinizdeki en güzel anı çekip çıkarın.' 
                        : 'Capture a sweet smile right now or pull out the most beautiful memory from your gallery.'}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <button onClick={handleUpload} className="w-full py-4 bg-[#F5F2EB]/90 hover:bg-[#F5F2EB] text-[#11100F] rounded-[1.5rem] font-medium tracking-wide flex items-center justify-center gap-3 transition-colors shadow-lg">
                      <Camera className="w-5 h-5" />
                      {language === 'tr' ? 'Kamerayı Aç, Gülümse!' : 'Open Camera, Say Cheese!'}
                    </button>
                    <button onClick={handleUpload} className="w-full py-4 bg-[#F5F2EB]/5 text-[#F5F2EB]/90 hover:text-[#F5F2EB] rounded-[1.5rem] font-medium tracking-wide flex items-center justify-center gap-3 hover:bg-[#F5F2EB]/10 transition-colors border border-[#F5F2EB]/10">
                      <ImagePlus className="w-5 h-5" />
                      {language === 'tr' ? 'Fotoğraf Arşivinden Seç' : 'Choose from Photo Archive'}
                    </button>
                  </div>
                </>
              )}

              {uploadState === 'uploading' && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 border-2 border-[#F5F2EB]/5 border-t-[#C9A87C] border-l-[#C9A87C] rounded-full animate-[spin_1.5s_linear_infinite] mx-auto mb-8"></div>
                  <h3 className="text-xl font-serif italic text-[#F5F2EB] mb-3">
                    {language === 'tr' ? 'Anılarınız bize ulaşıyor...' : 'Your memories are reaching us...'}
                  </h3>
                  <p className="text-[#F5F2EB]/40 text-xs tracking-widest uppercase">
                    {language === 'tr' ? 'Sevgiyle işleniyor' : 'Processing with love'}
                  </p>
                </motion.div>
              )}

              {uploadState === 'success' && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <motion.div 
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="w-20 h-20 bg-gradient-to-tr from-[#C9A87C]/20 to-transparent text-[#C9A87C] rounded-full mx-auto mb-8 flex items-center justify-center border border-[#C9A87C]/30"
                  >
                    <CheckCircle2 className="w-8 h-8" />
                  </motion.div>
                  <h3 className="text-2xl font-serif italic text-[#F5F2EB] mb-3">
                    {language === 'tr' ? 'Kalpten Teşekkürler!' : 'Heartfelt Thanks!'}
                  </h3>
                  <p className="text-[#F5F2EB]/60 text-sm font-light leading-relaxed max-w-[250px] mx-auto">
                    {language === 'tr' ? 'Elinize, kalbinize sağlık. Bu güzel anı sonsuza dek bizimle kalacak.' : 'Bless your hands and heart. This beautiful memory will stay with us forever.'}
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-[#F5F2EB]/95 backdrop-blur-md text-[#11100F] px-6 py-4 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex items-center gap-4 font-medium text-sm border border-[#F5F2EB]/20"
          >
            <div className="w-8 h-8 bg-red-50 text-red-500 rounded-full flex items-center justify-center shrink-0">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <span className="font-light tracking-wide text-gray-800">
              {language === 'tr' ? 'Kalbinizden kopan bu anı için sonsuz teşekkürler. ✨' : 'Endless thanks for this memory straight from your heart. ✨'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
