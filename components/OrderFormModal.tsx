import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OrderFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'tr' | 'en';
  initialConcept?: string;
}

export const OrderFormModal: React.FC<OrderFormModalProps> = ({ isOpen, onClose, language, initialConcept }) => {
  const [formData, setFormData] = useState({
    eventType: '',
    names: '',
    date: '',
    time: '',
    venueName: '',
    address: '',
    mapLink: '',
    concept: initialConcept || '',
    invitationText: '',
    notes: '',
    music: '',
    wantsRSVP: false,
    wantsAI: false,
  });

  // Update concept when initialConcept changes
  useEffect(() => {
    if (initialConcept) {
      setFormData(prev => ({ ...prev, concept: initialConcept }));
    }
  }, [initialConcept]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const text = language === 'tr' 
      ? `Merhaba, dijital davetiye siparişi vermek için formu doldurdum. Bilgilerim:\n\n*Temel Bilgiler*\nEtkinlik Türü: ${formData.eventType}\nİsimler: ${formData.names}\nTarih: ${formData.date}\nSaat: ${formData.time}\n\n*Mekan Detayları*\nMekan Adı: ${formData.venueName}\nAdres: ${formData.address}\nHarita Linki: ${formData.mapLink}\n\n*Tasarım & İçerik*\nKonsept/Renk: ${formData.concept}\nDavetiye Metni: ${formData.invitationText}\nÖzel Notlar: ${formData.notes}\n\n*Ekstra Özellikler*\nMüzik: ${formData.music}\nLCV Paneli İstiyor mu?: ${formData.wantsRSVP ? 'Evet' : 'Hayır'}\nAI Mesaj İstiyor mu?: ${formData.wantsAI ? 'Evet' : 'Hayır'}`
      : `Hello, I have filled out the form to order a digital invitation. My details:\n\n*Basic Info*\nEvent Type: ${formData.eventType}\nNames: ${formData.names}\nDate: ${formData.date}\nTime: ${formData.time}\n\n*Venue Details*\nVenue Name: ${formData.venueName}\nAddress: ${formData.address}\nMap Link: ${formData.mapLink}\n\n*Design & Content*\nConcept/Colors: ${formData.concept}\nInvitation Text: ${formData.invitationText}\nSpecial Notes: ${formData.notes}\n\n*Extra Features*\nMusic: ${formData.music}\nWants RSVP Panel?: ${formData.wantsRSVP ? 'Yes' : 'No'}\nWants AI Message?: ${formData.wantsAI ? 'Yes' : 'No'}`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encodedText}`, '_blank');
    onClose();
  };

  const t = {
    tr: {
      title: "Sipariş Formu",
      subtitle: "Tasarım sürecini başlatmak için lütfen aşağıdaki bilgileri doldurun.",
      basicInfo: "Temel Bilgiler",
      eventType: "Etkinlik Türü (Düğün, Sünnet vb.)",
      names: "İsimler",
      date: "Tarih",
      time: "Saat",
      venueDetails: "Mekan Detayları",
      venueName: "Mekan Adı",
      address: "Açık Adres",
      mapLink: "Google Haritalar Linki",
      designContent: "Tasarım & İçerik",
      concept: "Konsept ve Renk Tercihleri",
      invitationText: "Davetiye Metni",
      notes: "Özel Notlar (Kıyafet kodu vb.)",
      extraFeatures: "Ekstra Özellikler",
      music: "İstenen Müzik (YouTube Linki veya Adı)",
      wantsRSVP: "LCV (Katılım Bildirimi) Paneli İstiyorum",
      wantsAI: "Yapay Zeka (AI) Karşılama Mesajı İstiyorum",
      submit: "WhatsApp Üzerinden Gönder",
      cancel: "İptal"
    },
    en: {
      title: "Order Form",
      subtitle: "Please fill out the information below to start the design process.",
      basicInfo: "Basic Information",
      eventType: "Event Type (Wedding, Birthday etc.)",
      names: "Names",
      date: "Date",
      time: "Time",
      venueDetails: "Venue Details",
      venueName: "Venue Name",
      address: "Full Address",
      mapLink: "Google Maps Link",
      designContent: "Design & Content",
      concept: "Concept and Color Preferences",
      invitationText: "Invitation Text",
      notes: "Special Notes (Dress code etc.)",
      extraFeatures: "Extra Features",
      music: "Desired Music (YouTube Link or Name)",
      wantsRSVP: "I want an RSVP Panel",
      wantsAI: "I want an AI Welcome Message",
      submit: "Send via WhatsApp",
      cancel: "Cancel"
    }
  }[language];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-[#d4af37]/30 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] custom-scrollbar"
          >
            <div className="sticky top-0 z-10 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#d4af37]/20 p-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-serif text-white">{t.title}</h2>
                <p className="text-white/60 text-sm mt-1">{t.subtitle}</p>
              </div>
              <button onClick={onClose} className="text-white/50 hover:text-white transition-colors p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-8">
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="text-[#d4af37] font-serif text-lg border-b border-[#d4af37]/20 pb-2">{t.basicInfo}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/70 text-xs uppercase tracking-wider mb-2">{t.eventType}</label>
                    <input required type="text" name="eventType" value={formData.eventType} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#d4af37]/50 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-white/70 text-xs uppercase tracking-wider mb-2">{t.names}</label>
                    <input required type="text" name="names" value={formData.names} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#d4af37]/50 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-white/70 text-xs uppercase tracking-wider mb-2">{t.date}</label>
                    <input required type="date" name="date" value={formData.date} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#d4af37]/50 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-white/70 text-xs uppercase tracking-wider mb-2">{t.time}</label>
                    <input required type="time" name="time" value={formData.time} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#d4af37]/50 transition-colors" />
                  </div>
                </div>
              </div>

              {/* Venue Details */}
              <div className="space-y-4">
                <h3 className="text-[#d4af37] font-serif text-lg border-b border-[#d4af37]/20 pb-2">{t.venueDetails}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/70 text-xs uppercase tracking-wider mb-2">{t.venueName}</label>
                    <input required type="text" name="venueName" value={formData.venueName} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#d4af37]/50 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-white/70 text-xs uppercase tracking-wider mb-2">{t.address}</label>
                    <textarea required name="address" value={formData.address} onChange={handleChange} rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#d4af37]/50 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-white/70 text-xs uppercase tracking-wider mb-2">{t.mapLink}</label>
                    <input type="url" name="mapLink" value={formData.mapLink} onChange={handleChange} placeholder="https://goo.gl/maps/..." className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#d4af37]/50 transition-colors" />
                  </div>
                </div>
              </div>

              {/* Design & Content */}
              <div className="space-y-4">
                <h3 className="text-[#d4af37] font-serif text-lg border-b border-[#d4af37]/20 pb-2">{t.designContent}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/70 text-xs uppercase tracking-wider mb-2">{t.concept}</label>
                    <input type="text" name="concept" value={formData.concept} onChange={handleChange} placeholder="Örn: Siyah ve Altın, Minimalist, Çiçekli..." className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#d4af37]/50 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-white/70 text-xs uppercase tracking-wider mb-2">{t.invitationText}</label>
                    <textarea required name="invitationText" value={formData.invitationText} onChange={handleChange} rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#d4af37]/50 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-white/70 text-xs uppercase tracking-wider mb-2">{t.notes}</label>
                    <textarea name="notes" value={formData.notes} onChange={handleChange} rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#d4af37]/50 transition-colors" />
                  </div>
                </div>
              </div>

              {/* Extra Features */}
              <div className="space-y-4">
                <h3 className="text-[#d4af37] font-serif text-lg border-b border-[#d4af37]/20 pb-2">{t.extraFeatures}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/70 text-xs uppercase tracking-wider mb-2">{t.music}</label>
                    <input type="text" name="music" value={formData.music} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#d4af37]/50 transition-colors" />
                  </div>
                  <div className="flex flex-col gap-3 mt-4">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center w-6 h-6 rounded border border-white/20 bg-white/5 group-hover:border-[#d4af37]/50 transition-colors">
                        <input type="checkbox" name="wantsRSVP" checked={formData.wantsRSVP} onChange={handleChange} className="opacity-0 absolute inset-0 cursor-pointer" />
                        {formData.wantsRSVP && <svg className="w-4 h-4 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <span className="text-white/80 text-sm">{t.wantsRSVP}</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center w-6 h-6 rounded border border-white/20 bg-white/5 group-hover:border-[#d4af37]/50 transition-colors">
                        <input type="checkbox" name="wantsAI" checked={formData.wantsAI} onChange={handleChange} className="opacity-0 absolute inset-0 cursor-pointer" />
                        {formData.wantsAI && <svg className="w-4 h-4 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <span className="text-white/80 text-sm">{t.wantsAI}</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-6 flex gap-4">
                <button type="button" onClick={onClose} className="flex-1 py-4 rounded-full border border-white/20 text-white hover:bg-white/5 transition-colors font-medium tracking-wide">
                  {t.cancel}
                </button>
                <button type="submit" className="flex-1 py-4 rounded-full bg-[#d4af37] text-black hover:bg-white transition-colors font-medium tracking-wide shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                  {t.submit}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
