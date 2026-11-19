import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../src/firebase';

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
    contact: '',
    wantsRSVP: false,
    wantsAI: false,
  });
  const [acceptConsent, setAcceptConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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

  // Reset başarı ekranını modal kapatıldığında sıfırla
  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
      setSubmitError(null);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptConsent || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      // Sipariş talebini Firestore'a yaz — WhatsApp yoksa bile asla kaybolmaz
      await addDoc(collection(db, 'orders'), {
        eventType: formData.eventType.trim(),
        names: formData.names.trim(),
        date: formData.date,
        time: formData.time,
        venueName: formData.venueName.trim(),
        address: formData.address.trim(),
        mapLink: formData.mapLink.trim(),
        concept: formData.concept.trim(),
        invitationText: formData.invitationText.trim(),
        notes: formData.notes.trim(),
        music: formData.music.trim(),
        contact: formData.contact.trim(),
        wantsRSVP: formData.wantsRSVP,
        wantsAI: formData.wantsAI,
        language,
        initialConcept: initialConcept || '',
        status: 'new',
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Sipariş kaydı hatası:', err);
      setSubmitError(language === 'tr'
        ? 'Talebiniz kaydedilemedi. Lütfen tekrar deneyin ya da daha sonra bize ulaşın.'
        : 'Your request could not be saved. Please try again or contact us later.');
    } finally {
      setIsSubmitting(false);
    }
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
      contactLabel: "İletişim (WhatsApp no veya e-posta)",
      contactPlaceholder: "05__ ... veya ornek@eposta.com",
      consent: "Bilgilerimin sipariş talebimin değerlendirilmesi amacıyla KVKK kapsamında işlenmesini kabul ediyorum.",
      submit: "Sipariş Talebi Gönder",
      submitting: "Gönderiliyor...",
      successTitle: "Talebiniz güvenle alındı 🎉",
      successDesc: "Ekibimiz 24 saat içinde size dönüş yapacaktır. Formunuzdaki tüm detaylar kaydedildi.",
      close: "Kapat",
      errorConsent: "Devam etmek için bilgilerinizin işlenmesini kabul etmelisiniz.",
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
      contactLabel: "Contact (WhatsApp no. or email)",
      contactPlaceholder: "+90 5__ ... or you@email.com",
      consent: "I consent to my data being processed under KVKK/GDPR for handling my order request.",
      submit: "Send Order Request",
      submitting: "Submitting...",
      successTitle: "Your request is safely with us 🎉",
      successDesc: "Our team will get back to you within 24 hours. Every detail of your form has been saved.",
      close: "Close",
      errorConsent: "Please consent to data processing to continue.",
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
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0F0E0C] border border-[#C9A87C]/30 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] custom-scrollbar"
          >
            <div className="sticky top-0 z-10 bg-[#0F0E0C]/90 backdrop-blur-md border-b border-[#C9A87C]/20 p-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-serif text-ivory">{t.title}</h2>
                <p className="text-ivory/60 text-sm mt-1">{t.subtitle}</p>
              </div>
              <button onClick={onClose} className="text-ivory/50 hover:text-ivory transition-colors p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>

            {submitted ? (
              <div className="p-10 text-center">
                <div className="w-20 h-20 rounded-full bg-[#C9A87C]/15 border border-[#C9A87C]/40 flex items-center justify-center mx-auto mb-8">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#C9A87C]"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h3 className="text-2xl font-serif text-ivory mb-4">{t.successTitle}</h3>
                <p className="text-ivory/60 text-sm leading-relaxed mb-10 max-w-sm mx-auto">{t.successDesc}</p>
                <button onClick={onClose} className="px-12 py-4 rounded-full bg-[#C9A87C] text-ink hover:bg-ivory transition-colors font-medium tracking-wide">
                  {t.close}
                </button>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-8">
              {/* Contact (WhatsApp yoksa bile size ulaşabilelim) */}
              <div className="space-y-4">
                <h3 className="text-[#C9A87C] font-serif text-lg border-b border-[#C9A87C]/20 pb-2">{t.contactLabel}</h3>
                <input required type="text" name="contact" value={formData.contact} onChange={handleChange} placeholder={t.contactPlaceholder} className="w-full bg-ivory/5 border border-ivory/10 rounded-lg px-4 py-3 text-ivory focus:outline-none focus:border-[#C9A87C]/50 transition-colors" />
              </div>

              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="text-[#C9A87C] font-serif text-lg border-b border-[#C9A87C]/20 pb-2">{t.basicInfo}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-ivory/70 text-xs uppercase tracking-wider mb-2">{t.eventType}</label>
                    <input required type="text" name="eventType" value={formData.eventType} onChange={handleChange} className="w-full bg-ivory/5 border border-ivory/10 rounded-lg px-4 py-3 text-ivory focus:outline-none focus:border-[#C9A87C]/50 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-ivory/70 text-xs uppercase tracking-wider mb-2">{t.names}</label>
                    <input required type="text" name="names" value={formData.names} onChange={handleChange} className="w-full bg-ivory/5 border border-ivory/10 rounded-lg px-4 py-3 text-ivory focus:outline-none focus:border-[#C9A87C]/50 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-ivory/70 text-xs uppercase tracking-wider mb-2">{t.date}</label>
                    <input required type="date" name="date" value={formData.date} onChange={handleChange} className="w-full bg-ivory/5 border border-ivory/10 rounded-lg px-4 py-3 text-ivory focus:outline-none focus:border-[#C9A87C]/50 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-ivory/70 text-xs uppercase tracking-wider mb-2">{t.time}</label>
                    <input required type="time" name="time" value={formData.time} onChange={handleChange} className="w-full bg-ivory/5 border border-ivory/10 rounded-lg px-4 py-3 text-ivory focus:outline-none focus:border-[#C9A87C]/50 transition-colors" />
                  </div>
                </div>
              </div>

              {/* Venue Details */}
              <div className="space-y-4">
                <h3 className="text-[#C9A87C] font-serif text-lg border-b border-[#C9A87C]/20 pb-2">{t.venueDetails}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-ivory/70 text-xs uppercase tracking-wider mb-2">{t.venueName}</label>
                    <input required type="text" name="venueName" value={formData.venueName} onChange={handleChange} className="w-full bg-ivory/5 border border-ivory/10 rounded-lg px-4 py-3 text-ivory focus:outline-none focus:border-[#C9A87C]/50 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-ivory/70 text-xs uppercase tracking-wider mb-2">{t.address}</label>
                    <textarea required name="address" value={formData.address} onChange={handleChange} rows={2} className="w-full bg-ivory/5 border border-ivory/10 rounded-lg px-4 py-3 text-ivory focus:outline-none focus:border-[#C9A87C]/50 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-ivory/70 text-xs uppercase tracking-wider mb-2">{t.mapLink}</label>
                    <input type="url" name="mapLink" value={formData.mapLink} onChange={handleChange} placeholder="https://goo.gl/maps/..." className="w-full bg-ivory/5 border border-ivory/10 rounded-lg px-4 py-3 text-ivory focus:outline-none focus:border-[#C9A87C]/50 transition-colors" />
                  </div>
                </div>
              </div>

              {/* Design & Content */}
              <div className="space-y-4">
                <h3 className="text-[#C9A87C] font-serif text-lg border-b border-[#C9A87C]/20 pb-2">{t.designContent}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-ivory/70 text-xs uppercase tracking-wider mb-2">{t.concept}</label>
                    <input type="text" name="concept" value={formData.concept} onChange={handleChange} placeholder="Örn: Siyah ve Altın, Minimalist, Çiçekli..." className="w-full bg-ivory/5 border border-ivory/10 rounded-lg px-4 py-3 text-ivory focus:outline-none focus:border-[#C9A87C]/50 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-ivory/70 text-xs uppercase tracking-wider mb-2">{t.invitationText}</label>
                    <textarea required name="invitationText" value={formData.invitationText} onChange={handleChange} rows={3} className="w-full bg-ivory/5 border border-ivory/10 rounded-lg px-4 py-3 text-ivory focus:outline-none focus:border-[#C9A87C]/50 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-ivory/70 text-xs uppercase tracking-wider mb-2">{t.notes}</label>
                    <textarea name="notes" value={formData.notes} onChange={handleChange} rows={2} className="w-full bg-ivory/5 border border-ivory/10 rounded-lg px-4 py-3 text-ivory focus:outline-none focus:border-[#C9A87C]/50 transition-colors" />
                  </div>
                </div>
              </div>

              {/* Extra Features */}
              <div className="space-y-4">
                <h3 className="text-[#C9A87C] font-serif text-lg border-b border-[#C9A87C]/20 pb-2">{t.extraFeatures}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-ivory/70 text-xs uppercase tracking-wider mb-2">{t.music}</label>
                    <input type="text" name="music" value={formData.music} onChange={handleChange} className="w-full bg-ivory/5 border border-ivory/10 rounded-lg px-4 py-3 text-ivory focus:outline-none focus:border-[#C9A87C]/50 transition-colors" />
                  </div>
                  <div className="flex flex-col gap-3 mt-4">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center w-6 h-6 rounded border border-ivory/20 bg-ivory/5 group-hover:border-[#C9A87C]/50 transition-colors">
                        <input type="checkbox" name="wantsRSVP" checked={formData.wantsRSVP} onChange={handleChange} className="opacity-0 absolute inset-0 cursor-pointer" />
                        {formData.wantsRSVP && <svg className="w-4 h-4 text-[#C9A87C]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <span className="text-ivory/80 text-sm">{t.wantsRSVP}</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center w-6 h-6 rounded border border-ivory/20 bg-ivory/5 group-hover:border-[#C9A87C]/50 transition-colors">
                        <input type="checkbox" name="wantsAI" checked={formData.wantsAI} onChange={handleChange} className="opacity-0 absolute inset-0 cursor-pointer" />
                        {formData.wantsAI && <svg className="w-4 h-4 text-[#C9A87C]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <span className="text-ivory/80 text-sm">{t.wantsAI}</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* KVKK Onayı */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center w-5 h-5 mt-0.5 rounded border border-ivory/20 bg-ivory/5 group-hover:border-[#C9A87C]/50 transition-colors shrink-0">
                  <input type="checkbox" checked={acceptConsent} onChange={(e) => setAcceptConsent(e.target.checked)} className="opacity-0 absolute inset-0 cursor-pointer" />
                  {acceptConsent && <svg className="w-3.5 h-3.5 text-[#C9A87C]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                </div>
                <span className="text-ivory/50 text-[11px] leading-relaxed">{t.consent}</span>
              </label>

              {submitError && <p className="text-red-400 text-xs">{submitError}</p>}
              {!acceptConsent && <p className="text-ivory/20 text-[10px]">{t.errorConsent}</p>}

              <div className="pt-2 flex gap-4">
                <button type="button" onClick={onClose} className="flex-1 py-4 rounded-full border border-ivory/20 text-ivory hover:bg-ivory/5 transition-colors font-medium tracking-wide">
                  {t.cancel}
                </button>
                <button type="submit" disabled={!acceptConsent || isSubmitting} className="flex-1 py-4 rounded-full bg-[#C9A87C] text-ink hover:bg-ivory transition-colors font-medium tracking-wide shadow-[0_0_20px_rgba(212,175,55,0.3)] disabled:opacity-40 disabled:cursor-not-allowed">
                  {isSubmitting ? t.submitting : t.submit}
                </button>
              </div>
            </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
