import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../src/firebase';

interface RSVPFormProps {
  language: 'tr' | 'en';
  themeColor: string;
  eventId?: string; // Replaced eventType with eventId
  onSuccess?: () => void;
  theme?: 'light' | 'dark';
}

const RSVPForm: React.FC<RSVPFormProps> = ({ language, themeColor, eventId, onSuccess, theme = 'dark' }) => {
  const [status, setStatus] = useState<'yes' | 'no' | null>(null);
  const [name, setName] = useState('');
  const [count, setCount] = useState(1);
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = {
    tr: {
      title: "Katılım Durumu (LCV)",
      desc: "Lütfen katılım durumunuzu bildiriniz.",
      nameLabel: "Adınız Soyadınız",
      countLabel: "Kişi Sayısı",
      noteLabel: "Bize Bir Notunuz Var Mı? (Opsiyonel)",
      yes: "Katılıyorum",
      no: "Katılamıyorum",
      submit: "Gönder",
      submitting: "Gönderiliyor...",
      thanks: "Yanıtınız kaydedildi. Teşekkür ederiz!",
      error: "Bir hata oluştu. Lütfen tekrar deneyin."
    },
    en: {
      title: "RSVP",
      desc: "Please let us know your attendance status.",
      nameLabel: "Full Name",
      countLabel: "Number of Guests",
      noteLabel: "Any notes for us? (Optional)",
      yes: "I'm Attending",
      no: "I Can't Attend",
      submit: "Submit",
      submitting: "Submitting...",
      thanks: "Your response has been saved. Thank you!",
      error: "An error occurred. Please try again."
    }
  }[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !status) return;
    
    // Rate limiting check
    const lastSubmit = localStorage.getItem(`lastRsvpSubmit_${eventId || 'general'}`);
    if (lastSubmit && Date.now() - parseInt(lastSubmit) < 60000) {
      setError(language === 'tr' ? 'Lütfen tekrar göndermeden önce biraz bekleyin.' : 'Please wait a moment before submitting again.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // If eventId is provided, save to the specific subcollection
      await addDoc(collection(db, 'events', eventId as string, 'rsvps'), {
        name,
        status,
        count: status === 'yes' ? count : 1,
        note,
        createdAt: serverTimestamp()
      });
      
      localStorage.setItem(`lastRsvpSubmit_${eventId || 'general'}`, Date.now().toString());
      setSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Error submitting RSVP:", err);
      setError(t.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLight = theme === 'light';

  // Önizleme modunda (yayında olmayan davetiye) LCV toplanamaz —
  // kök 'rsvps' koleksiyonu rules tarafından reddedilir. Bunun yerine dürüst bir bildirim göster.
  if (!eventId) {
    return (
      <div className={`w-full max-w-md mx-auto p-8 rounded-3xl border ${isLight ? 'border-ink/10 bg-ink/5' : 'border-ivory/10 bg-ivory/5'} backdrop-blur-md shadow-xl text-center`}>
        <h3 className="text-xl font-serif italic mb-3" style={{ color: themeColor }}>LCV</h3>
        <p className={`${isLight ? 'text-ink/50' : 'text-ivory/40'} text-xs uppercase tracking-widest mb-6`}>{language === 'tr' ? 'Önizleme Modu' : 'Preview Mode'}</p>
        <p className={`${isLight ? 'text-ink/60' : 'text-ivory/50'} text-sm leading-relaxed`}>
          {language === 'tr'
            ? 'Bu bir önizlemedir. LCV yanıtları yalnızca davetiyeniz canlıya alındığında toplanır.'
            : 'This is a preview. RSVP responses are only collected once your invitation goes live.'}
        </p>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-md mx-auto p-8 rounded-3xl border ${isLight ? 'border-ink/10 bg-ink/5' : 'border-ivory/10 bg-ivory/5'} backdrop-blur-md shadow-xl`}>
      <h3 className="text-xl font-serif italic mb-2" style={{ color: themeColor }}>{t.title}</h3>
      <p className={`${isLight ? 'text-ink/50' : 'text-ivory/40'} text-xs mb-8 uppercase tracking-widest`}>{t.desc}</p>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.form 
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="flex justify-center gap-4">
              <button 
                type="button"
                onClick={() => setStatus('yes')}
                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${status === 'yes' ? (isLight ? 'bg-ink text-ivory' : 'bg-ivory text-ink') : (isLight ? 'border border-ink/20 text-ink/60 hover:bg-ink/10' : 'border border-ivory/20 text-ivory/60 hover:bg-ivory/10')}`}
              >
                {t.yes}
              </button>
              <button 
                type="button"
                onClick={() => setStatus('no')}
                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${status === 'no' ? 'bg-[#C0756C] text-[#0F0E0C]' : (isLight ? 'border border-[#C0756C]/30 text-[#B0605A] hover:bg-[#C0756C]/10' : 'border border-[#C0756C]/25 text-[#C0756C]/70 hover:bg-[#C0756C]/10')}`}
              >
                {t.no}
              </button>
            </div>

            <div className="space-y-4">
              <div className="text-left">
                <label className={`text-[9px] uppercase tracking-widest ${isLight ? 'text-ink/40' : 'text-ivory/30'} mb-2 block`}>{t.nameLabel}</label>
                <input 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full ${isLight ? 'bg-ink/5 border-ink/10 text-ink focus:border-ink/30' : 'bg-ivory/5 border-ivory/10 text-ivory focus:border-ivory/30'} border rounded-xl px-4 py-3 text-sm focus:outline-none transition-all`}
                  required
                />
              </div>

              {status === 'yes' && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="text-left">
                  <label className={`text-[9px] uppercase tracking-widest ${isLight ? 'text-ink/40' : 'text-ivory/30'} mb-2 block`}>{t.countLabel}</label>
                  <div className="flex items-center gap-4">
                    <button type="button" onClick={() => setCount(Math.max(1, count - 1))} className={`w-10 h-10 rounded-full border ${isLight ? 'border-ink/20 text-ink' : 'border-ivory/10 text-ivory'} flex items-center justify-center`}>-</button>
                    <span className={`text-xl font-serif ${isLight ? 'text-ink' : 'text-ivory'}`}>{count}</span>
                    <button type="button" onClick={() => setCount(Math.min(10, count + 1))} className={`w-10 h-10 rounded-full border ${isLight ? 'border-ink/20 text-ink' : 'border-ivory/10 text-ivory'} flex items-center justify-center`}>+</button>
                  </div>
                </motion.div>
              )}

              <div className="text-left mt-4">
                <label className={`text-[9px] uppercase tracking-widest ${isLight ? 'text-ink/40' : 'text-ivory/30'} mb-2 block`}>{t.noteLabel}</label>
                <textarea 
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className={`w-full ${isLight ? 'bg-ink/5 border-ink/10 text-ink focus:border-ink/30' : 'bg-ivory/5 border-ivory/10 text-ivory focus:border-ivory/30'} border rounded-xl px-4 py-3 text-sm focus:outline-none transition-all resize-none`}
                  rows={2}
                  maxLength={150}
                />
              </div>
            </div>

            {error && <p className="text-red-400 text-xs">{error}</p>}

            <button 
              type="submit"
              disabled={!name || !status || isSubmitting}
              className="w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-[4px] transition-all disabled:opacity-30"
              style={{ backgroundColor: themeColor, color: isLight ? '#fff' : '#000' }}
            >
              {isSubmitting ? t.submitting : t.submit}
            </button>
          </motion.form>
        ) : (
          <motion.div 
            key="thanks"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="py-10 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <p className={`${isLight ? 'text-ink' : 'text-ivory'} font-bold tracking-wide`}>{t.thanks}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RSVPForm;
