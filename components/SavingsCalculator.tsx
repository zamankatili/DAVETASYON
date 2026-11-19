import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';

export const SavingsCalculator: React.FC<{ language: 'tr' | 'en' }> = ({ language }) => {
  const [totalInvitations, setTotalInvitations] = useState(200);
  const [cargoCount, setCargoCount] = useState(50);

  useEffect(() => {
    if (cargoCount > totalInvitations) {
      setCargoCount(totalInvitations);
    }
  }, [totalInvitations, cargoCount]);

  const handDeliveryCount = totalInvitations - cargoCount;
  const totalCost = (totalInvitations * 25) + (cargoCount * 70) + (handDeliveryCount * 15);
  const totalTimeHours = Math.floor((handDeliveryCount * 20) / 60);

  const t = {
    eyebrow: language === 'tr' ? 'Karşılaştırma' : 'Comparison',
    title: language === 'tr' ? 'Maliyet ve Zaman Tasarrufu' : 'Cost & Time Savings',
    subtitle: language === 'tr' ? 'Klasik matbaanın gizli maliyetleriyle yüzleşin.' : 'Face the hidden costs of traditional printing.',
    inputsTitle: language === 'tr' ? 'Etkinlik Detaylarınız' : 'Your Event Details',
    totalInvites: language === 'tr' ? 'Davetiye Sayısı' : 'Total Invitations',
    cargoInvites: language === 'tr' ? 'Kargo Seçeneği (Adet)' : 'To Send via Mail',
    handInvites: language === 'tr' ? 'Elden Dağıtılacak' : 'Hand Delivered',
    classic: language === 'tr' ? 'Geleneksel Matbaa' : 'Traditional Printing',
    davetasyon: language === 'tr' ? 'Davetasyon' : 'Davetasyon',
    totalCost: language === 'tr' ? 'Toplam Maliyet' : 'Total Cost',
    totalTime: language === 'tr' ? 'Harcanan Zaman' : 'Time Spent',
    hours: language === 'tr' ? 'Saat' : 'Hours',
    davetCost: language === 'tr' ? 'Lansmana Özel Fiyat' : 'Launch Special Price',
    davetTime: language === 'tr' ? 'Sadece 5 Dakika' : 'Only 5 Minutes',
    footer: language === 'tr'
      ? 'Matbaa stresi, kargo masrafları ve kapı kapı gezerek harcayacağınız onlarca saat yerine; Davetasyon ile hem paranız cebinizde kalsın hem de en mutlu gününüze stressiz hazırlanın!'
      : 'Instead of printing stress, cargo costs, and spending dozens of hours going door-to-door; keep your money in your pocket and prepare for your happiest day stress-free with Davetasyon!',
    priceFormat: (val: number) => new Intl.NumberFormat(language === 'tr' ? 'tr-TR' : 'en-US', { style: 'currency', currency: language === 'tr' ? 'TRY' : 'USD', minimumFractionDigits: 0 }).format(language === 'tr' ? val : val / 30)
  };

  const pct = (v: number, max: number) => Math.min(100, Math.max(0, (v / (max || 1)) * 100));

  return (
    <section className="relative z-30 bg-[#0F0E0C] border-y border-[#F7F3EA]/10 py-24 px-6 md:px-12" id="calculator">
      {/* Üstte ince altın çizgi: bölümü sayfadan ayırır, bağırmaz */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A87C]/40 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-cinzel block text-[10px] tracking-[0.42em] uppercase text-[#C9A87C] font-semibold mb-5">
            {t.eyebrow}
          </span>
          <h2 className="font-serif italic text-[#F7F3EA] text-4xl md:text-6xl tracking-tight leading-[1.1] mb-5">
            {t.title}
          </h2>
          <p className="text-[#B9B2A6] text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Girdiler */}
          <div className="lg:col-span-5 bg-[#171614] border border-[#F7F3EA]/10 rounded-[2rem] p-8 md:p-10 flex flex-col justify-center gap-9">
            <h3 className="font-serif italic text-2xl md:text-3xl text-[#F7F3EA]">
              {t.inputsTitle}
            </h3>

            <div className="space-y-4">
              <label className="flex justify-between items-center gap-4">
                <span className="text-[#B9B2A6] text-sm tracking-wide">{t.totalInvites}</span>
                <span className="font-cinzel text-lg text-[#C9A87C] border border-[#C9A87C]/35 rounded-full px-4 py-1 min-w-[64px] text-center">
                  {totalInvitations}
                </span>
              </label>
              <input
                type="range"
                min="50"
                max="1000"
                step="50"
                value={totalInvitations}
                onChange={(e) => setTotalInvitations(Number(e.target.value))}
                className="lux-range w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[#C9A87C]"
                style={{
                  WebkitAppearance: 'none',
                  background: `linear-gradient(to right, #C9A87C 0%, #C9A87C ${pct(totalInvitations - 50, 950)}%, rgba(247,243,234,0.12) ${pct(totalInvitations - 50, 950)}%, rgba(247,243,234,0.12) 100%)`
                }}
              />
            </div>

            <div className="space-y-4">
              <label className="flex justify-between items-center gap-4">
                <span className="text-[#B9B2A6] text-sm tracking-wide">{t.cargoInvites}</span>
                <span className="font-cinzel text-lg text-[#C9A87C] border border-[#C9A87C]/35 rounded-full px-4 py-1 min-w-[64px] text-center">
                  {cargoCount}
                </span>
              </label>
              <input
                type="range"
                min="0"
                max={totalInvitations}
                step="10"
                value={cargoCount}
                onChange={(e) => setCargoCount(Number(e.target.value))}
                className="lux-range w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[#C9A87C]"
                style={{
                  WebkitAppearance: 'none',
                  background: `linear-gradient(to right, #C9A87C 0%, #C9A87C ${pct(cargoCount, totalInvitations)}%, rgba(247,243,234,0.12) ${pct(cargoCount, totalInvitations)}%, rgba(247,243,234,0.12) 100%)`
                }}
              />
            </div>

            <div className="pt-7 border-t border-[#F7F3EA]/10 flex justify-between items-baseline">
              <span className="text-[#B9B2A6] text-xs uppercase tracking-[0.2em]">{t.handInvites}</span>
              <span className="font-serif text-3xl text-[#F7F3EA]">{handDeliveryCount}</span>
            </div>
          </div>

          {/* Sonuçlar */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <motion.div
              className="rounded-[2rem] border border-[#C0756C]/30 bg-[#C0756C]/[0.07] p-7 lg:p-9"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-7">
                <span className="w-7 h-7 rounded-full border border-[#C0756C]/40 flex items-center justify-center">
                  <X className="w-3.5 h-3.5 text-[#C0756C]" />
                </span>
                <h3 className="font-cinzel text-xs md:text-sm tracking-[0.28em] uppercase text-[#C0756C]">
                  {t.classic}
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0F0E0C]/60 border border-[#F7F3EA]/10 rounded-2xl p-5 text-center">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#B9B2A6]/80 mb-3">{t.totalCost}</p>
                  <p className="font-serif text-2xl md:text-3xl text-[#F7F3EA]">{t.priceFormat(totalCost)}</p>
                </div>
                <div className="bg-[#0F0E0C]/60 border border-[#F7F3EA]/10 rounded-2xl p-5 text-center">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#B9B2A6]/80 mb-3">{t.totalTime}</p>
                  <p className="font-serif text-2xl md:text-3xl text-[#F7F3EA]">
                    {totalTimeHours} <span className="text-base text-[#B9B2A6]">{t.hours}</span>
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative rounded-[2rem] border border-[#C9A87C]/40 bg-[#C9A87C]/[0.07] p-7 lg:p-9 overflow-hidden"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A87C]/70 to-transparent" />
              <div className="flex items-center gap-3 mb-7">
                <span className="w-7 h-7 rounded-full border border-[#C9A87C]/50 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-[#C9A87C]" />
                </span>
                <h3 className="font-cinzel text-xs md:text-sm tracking-[0.28em] uppercase text-[#C9A87C]">
                  {t.davetasyon}
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0F0E0C]/60 border border-[#C9A87C]/20 rounded-2xl p-5 text-center flex flex-col justify-center">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#B9B2A6]/80 mb-3">{t.totalCost}</p>
                  <p className="font-serif italic text-xl md:text-2xl text-[#E3C9A4] leading-snug">{t.davetCost}</p>
                </div>
                <div className="bg-[#0F0E0C]/60 border border-[#C9A87C]/20 rounded-2xl p-5 text-center flex flex-col justify-center">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#B9B2A6]/80 mb-3">{t.totalTime}</p>
                  <p className="font-serif italic text-xl md:text-2xl text-[#E3C9A4] leading-snug">{t.davetTime}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 rounded-[2rem] border border-[#C9A87C]/20 bg-[#C9A87C]/[0.05] px-7 py-8 md:px-12 md:py-10 text-center"
        >
          <p className="font-serif italic text-lg md:text-2xl leading-relaxed text-[#F7F3EA]/90">
            {t.footer}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
