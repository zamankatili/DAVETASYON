import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
    title: language === 'tr' ? 'Maliyet ve Zaman Tasarrufu' : 'Cost & Time Savings',
    subtitle: language === 'tr' ? 'Klasik matbaanın gizli maliyetleriyle yüzleşin.' : 'Face the hidden costs of traditional printing.',
    inputsTitle: language === 'tr' ? 'Etkinlik Detaylarınız' : 'Your Event Details',
    totalInvites: language === 'tr' ? 'Davetiye Sayısı' : 'Total Invitations',
    cargoInvites: language === 'tr' ? 'Kargo Seçeneği (Adet)' : 'To Send via Mail',
    handInvites: language === 'tr' ? 'Elden Dağıtılacak' : 'Hand Delivered',
    classic: language === 'tr' ? 'Geleneksel Matbaa Kâbusu' : 'Traditional Nightmare',
    davetasyon: language === 'tr' ? 'Davetasyon Konforu' : 'Davetasyon Comfort',
    totalCost: language === 'tr' ? 'Toplam Maliyet' : 'Total Cost',
    totalTime: language === 'tr' ? 'Harcanan Zaman' : 'Time Spent',
    hours: language === 'tr' ? 'Saat' : 'Hours',
    davetCost: language === 'tr' ? 'Lansmana Özel Fiyat!' : 'Launch Special Price!',
    davetTime: language === 'tr' ? 'Sadece 5 Dakika!' : 'Only 5 Minutes!',
    footer: language === 'tr' 
      ? 'Matbaa stresi, kargo masrafları ve kapı kapı gezerek harcayacağınız onlarca saat yerine; Davetasyon ile hem paranız cebinizde kalsın hem de en mutlu gününüze stressiz hazırlanın!' 
      : 'Instead of printing stress, cargo costs, and spending dozens of hours going door-to-door; keep your money in your pocket and prepare for your happiest day stress-free with Davetasyon!',
    priceFormat: (val: number) => new Intl.NumberFormat(language === 'tr' ? 'tr-TR' : 'en-US', { style: 'currency', currency: language === 'tr' ? 'TRY' : 'USD', minimumFractionDigits: 0 }).format(language === 'tr' ? val : val / 30)
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-[#FFD700] text-black border-y-4 border-black relative z-30" id="calculator">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4 drop-shadow-[4px_4px_0_rgba(0,0,0,1)] text-white" style={{ WebkitTextStroke: '2px black' }}>
            {t.title}
          </h2>
          <p className="text-xl md:text-2xl font-bold bg-black text-white inline-block px-6 py-2 border-2 border-black shadow-[4px_4px_0_#FFF]">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Inputs Section */}
          <div className="lg:col-span-5 bg-white border-4 border-black shadow-[8px_8px_0_#000] p-8 space-y-8 flex flex-col justify-center">
            <h3 className="text-2xl font-black border-b-4 border-black pb-4 mb-2">{t.inputsTitle}</h3>
            
            <div className="space-y-4">
              <label className="flex justify-between font-bold text-lg items-center">
                <span>{t.totalInvites}</span>
                <span className="bg-[#4ECDC4] px-4 py-1 border-2 border-black font-black text-xl">{totalInvitations}</span>
              </label>
              <input 
                type="range" 
                min="50" 
                max="1000" 
                step="50"
                value={totalInvitations} 
                onChange={(e) => setTotalInvitations(Number(e.target.value))}
                className="w-full h-4 bg-gray-200 border-2 border-black rounded-full appearance-none cursor-pointer accent-black"
                style={{ 
                   WebkitAppearance: 'none',
                   background: `linear-gradient(to right, #4ECDC4 0%, #4ECDC4 ${(totalInvitations - 50) / 950 * 100}%, #e5e7eb ${(totalInvitations - 50) / 950 * 100}%, #e5e7eb 100%)`
                }}
              />
            </div>

            <div className="space-y-4">
              <label className="flex justify-between font-bold text-lg items-center">
                <span>{t.cargoInvites}</span>
                <span className="bg-[#FF6B6B] text-white px-4 py-1 border-2 border-black font-black text-xl">{cargoCount}</span>
              </label>
              <input 
                type="range" 
                min="0" 
                max={totalInvitations} 
                step="10"
                value={cargoCount} 
                onChange={(e) => setCargoCount(Number(e.target.value))}
                className="w-full h-4 bg-gray-200 border-2 border-black rounded-full appearance-none cursor-pointer accent-black"
                style={{ 
                   WebkitAppearance: 'none',
                   background: `linear-gradient(to right, #FF6B6B 0%, #FF6B6B ${(cargoCount) / (totalInvitations || 1) * 100}%, #e5e7eb ${(cargoCount) / (totalInvitations || 1) * 100}%, #e5e7eb 100%)`
                }}
              />
            </div>

            <div className="pt-6 border-t-4 border-black border-dashed">
              <div className="flex justify-between items-center font-black text-2xl">
                <span>{t.handInvites}:</span>
                <span className="text-3xl">{handDeliveryCount}</span>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Classic Output */}
            <motion.div 
              className="bg-[#FF6B6B] border-4 border-black shadow-[8px_8px_0_#000] p-6 lg:p-8 text-black"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-2xl lg:text-3xl font-black mb-6 flex items-center gap-3 uppercase">
                <span className="text-4xl">🛑</span> {t.classic}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border-2 border-black p-4 text-center transform rotate-1">
                  <p className="font-bold text-sm lg:text-base uppercase mb-2">{t.totalCost}</p>
                  <p className="text-3xl lg:text-4xl font-black">{t.priceFormat(totalCost)}</p>
                </div>
                <div className="bg-white border-2 border-black p-4 text-center transform -rotate-1">
                  <p className="font-bold text-sm lg:text-base uppercase mb-2">{t.totalTime}</p>
                  <p className="text-3xl lg:text-4xl font-black">{totalTimeHours} <span className="text-xl">{t.hours}</span></p>
                </div>
              </div>
            </motion.div>

            {/* Davetasyon Output */}
            <motion.div 
              className="bg-[#4ECDC4] border-4 border-black shadow-[8px_8px_0_#000] p-6 lg:p-8 text-black"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-2xl lg:text-3xl font-black mb-6 flex items-center gap-3 uppercase">
                <span className="text-4xl">😍</span> {t.davetasyon}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border-2 border-black p-4 text-center transform -rotate-1 flex flex-col justify-center items-center">
                  <p className="font-bold text-sm lg:text-base uppercase mb-2">{t.totalCost}</p>
                  <p className="text-xl lg:text-2xl font-black text-[#FF6B6B] uppercase">{t.davetCost}</p>
                </div>
                <div className="bg-white border-2 border-black p-4 text-center transform rotate-1 flex flex-col justify-center items-center">
                  <p className="font-bold text-sm lg:text-base uppercase mb-2">{t.totalTime}</p>
                  <p className="text-2xl lg:text-3xl font-black text-[#4ECDC4]">{t.davetTime}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer Neo-Brutalist Banner */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 bg-black text-white border-4 border-white shadow-[8px_8px_0_#4ECDC4] p-6 md:p-8 text-center"
        >
          <p className="text-xl md:text-3xl font-black leading-relaxed tracking-wide">
            {t.footer}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
