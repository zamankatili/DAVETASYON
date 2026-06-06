import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from '@google/genai';
import Markdown from 'react-markdown';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

interface ChatbotProps {
  language: 'tr' | 'en';
  eventContext?: {
    title?: string;
    venue?: { name: string; address: string; }
    aiContext?: string;
  };
}

export const Chatbot: React.FC<ChatbotProps> = ({ language, eventContext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const speak = (text: string) => {
    if (!isVoiceEnabled || !synthRef.current) return;
    
    // Stop any ongoing speech
    synthRef.current.cancel();

    // Remove emojis for speech
    const cleanText = text.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = language === 'tr' ? 'tr-TR' : 'en-US';
    // Let's try to find a female voice
    const voices = synthRef.current.getVoices();
    const targetVoice = voices.find(v => v.lang.includes(language === 'tr' ? 'tr' : 'en') && (v.name.includes('Female') || v.name.includes('Yelda') || v.name.includes('Google')));
    if (targetVoice) {
      utterance.voice = targetVoice;
    }
    
    utterance.rate = 1.05;
    utterance.pitch = 1.1;
    synthRef.current.speak(utterance);
  };

  const playNotificationSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const playTone = (freq: number, startTime: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.05, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.6);
      };

      // Elegant double chime (A5 -> E6)
      playTone(880, ctx.currentTime);
      playTone(1318.51, ctx.currentTime + 0.15);
    } catch (e) {
      console.log("Audio play blocked or not supported", e);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowTooltip(true);
        playNotificationSound();
      }
    }, 4000); // Show after 4 seconds
    return () => clearTimeout(timer);
  }, [isOpen]);

  const initChat = () => {
    try {
      // The platform injects the Gemini API key into process.env.GEMINI_API_KEY
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.error("Gemini API Key is missing.");
        return;
      }
      
      const isEventGuest = !!eventContext;
      
      const salesPromptTr = `Sen 'Davetasyon'un lüks, samimi ve profesyonel dijital asistanısın. Müşterilere rüya gibi bir dijital davetiye deneyimi sunmak için buradasın.
Kurallar:
1. Mümkün olduğunca KISA ve ÖZ cevaplar ver. Asla uzun paragraflar yazma. 1-2 cümle yeterli. Açıklayıcı ve nazik ol.
2. ETKİLEŞİMİ KORU: Her cevabının sonuna mutlaka müşteriyi sohbette tutacak bir açık uçlu soru ekle (örn: Hangi konsept ilginizi çekiyor? Etkinliğiniz ne zaman?).
3. Ürünlerimiz / Konseptlerimiz:
  - Özel Premium Serisi: Aeterna (Başyapıt - Zaman kapsüllü), Dijital Anı Kutusu (Kamerayla anı yükleme), Kurumsal Gala (Dark Luxury), Kuzey Işıkları (Aurora), Klasik Zarf.
  - Tören Serisi: Düğün & Evlilik (Elite), Nişan & Söz (Spring), Kına Gecesi (Traditional).
  - Özel Günler: Sünnet Merasimi, Baby Shower, Doğum Günü, Mezuniyet Balosu.
4. Temel Sistem Özelliklerimiz: Dinamik LCV, Yapay Zeka Asistanı, Merkez Komuta (Host Dashboard), Müzik Entegrasyonu.
5. Paketler ve Başlangıç Fiyatlarımız:
  - Zarif Başlangıç: 2.450 ₺ (Standart müzik, LCV, Geri Sayım)
  - İmza Deneyimi: 3.450 ₺ (En Çok Tercih Edilen - Çift dil, Yapay zeka asistanı, özel müzik)
  - Haute Couture: 14.900 ₺ (Tamamen özel tasarım, size özel alan adı)
  - Dijital Anı Kutusu (Davetiyeden Bağımsız): 2.250 ₺ (Davetiyeye ek alımlarda sadece 1.450 ₺)
6. Sipariş ve Detaylar: Detaylandırma sonrası müşteriyi her zaman WhatsApp iletişimine yönlendir ("Detayları konuşmak isterseniz WhatsApp hattımıza yazabilirsiniz.").
7. Sadece dijital davetiye ve etkinlik sorularına cevap ver. Başka konuları kibarca reddet.`;

      const salesPromptEn = `You are the luxury, friendly, and professional digital assistant of 'Davetasyon'. You are here to offer customers a dream-like digital invitation experience.
Rules:
1. Keep answers as SHORT and CONCISE as possible. Never write long paragraphs. 1-2 sentences are enough. Be explanatory and polite.
2. MAINTAIN INTERACTION: Always add an open-ended question at the end to keep the customer engaged (e.g., Which concept interests you? When is your event?).
3. Our Products / Concepts:
  - Premium Series: Aeterna (Masterpiece - Time capsule), Digital Memory Box (QR photo uploads), Corporate Gala (Dark Luxury), Northern Lights (Aurora), Classic Envelope.
  - Ceremony Series: Wedding & Marriage (Elite), Engagement (Spring), Henna Night (Traditional).
  - Special Events: Circumcision Ceremony, Baby Shower, Birthday, Graduation Prom.
4. Core Platform Features: Dynamic RSVP, AI Assistant, Command Center (Host Dashboard), Atmospheric Music Integration.
5. Packages and Starting Prices:
  - Classic Elegance: $99 (Standard music, RSVP, Countdown)
  - Signature Experience: $149 (Most Popular - Dual language, AI assistant, custom music)
  - Haute Couture: $490 (Fully custom design, custom domain)
  - Digital Memory Box (Standalone): $79 (If added to an invitation, only $49)
6. Orders and Details: Always direct the customer to WhatsApp for final details ("If you want to discuss the details, you can write to our WhatsApp line.").
7. Only answer questions related to digital invitations and events. Politely decline other topics.`;

      const guestPromptTr = `Sen '${eventContext?.title || 'Bu Harika Etkinlik'}' için özel bir Davet / Misafir Karşılama Asistanısın (Concierge).
Görevin: Etkinliğe katılacak misafirlerin sorularını nazikçe, kısa ve öz yanıtlamak.
Etkinlik Bilgileri: 
Mekan: ${eventContext?.venue?.name || 'Bilinmiyor'}, ${eventContext?.venue?.address || 'Bilinmiyor'}.
Özel Kurallar/Notlar (Bunu dikkate al!): ${eventContext?.aiContext || 'Ek kural yok.'}
Kurallar:
1. Sen etkinlik sahibini (davet edeni) temsil ediyorsun. 
2. Çok KISA ve NET cevaplar ver. 
3. Etkinlik dışı soru sorulursa kibarca davete odaklan.
4. Otopark, çocuk getirme, kıyafet kodu gibi soruları 'Özel Kurallar' bölümüne göre cevapla. Eğer orada yazmıyorsa 'Bu konuda kesin bir bilgim yok, dilerseniz LCV formuna not olarak yazabilirsiniz' de.`;

      const guestPromptEn = `You are the exclusive Guest Concierge for '${eventContext?.title}'. Use the provided AI Context to answer guest questions compactly and politely. Context: ${eventContext?.aiContext}`;

      const sysInstructionTr = isEventGuest ? guestPromptTr : salesPromptTr;
      const sysInstructionEn = isEventGuest ? guestPromptEn : salesPromptEn;

      const ai = new GoogleGenAI({ apiKey });
      chatRef.current = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: language === 'tr' ? sysInstructionTr : sysInstructionEn
        }
      });
      
      const initialGreetingTr = isEventGuest 
        ? `Merhaba! 👋 ${eventContext?.title} için sanal asistanınızım. Etkinlikle ilgili sormak istediğiniz bir şey var mı? (Giyim kodu, ulaşım, çocuk vb.)`
        : "Merhaba! 👋 Davetasyon'a hoş geldiniz. Hayalinizdeki etkinlik ne zaman?";
      
      const initialGreetingEn = isEventGuest
        ? `Hello! 👋 I am your virtual concierge for ${eventContext?.title}. Do you have any questions regarding the event?`
        : "Hello! 👋 Welcome to Davetasyon. When is your dream event?";

      const greeting = language === 'tr' ? initialGreetingTr : initialGreetingEn;
      // Add initial greeting
      setMessages([{
        id: Date.now().toString(),
        text: greeting,
        sender: 'bot'
      }]);
      speak(greeting);
    } catch (error) {
      console.error("Failed to initialize chat:", error);
    }
  };

  useEffect(() => {
    if (isOpen && !chatRef.current) {
      initChat();
    }
  }, [isOpen, language]);

  // Re-init if language changes
  useEffect(() => {
    if (isOpen) {
      chatRef.current = null;
      initChat();
    }
  }, [language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const quickReplies = language === 'tr' ? [
    "💍 Fiyatlarınız nedir?",
    "✨ Hangi özellikleri sunuyorsunuz?",
    "📅 Sipariş vermek istiyorum",
    "🎨 Örnek tasarımları görebilir miyim?"
  ] : [
    "💍 What are your prices?",
    "✨ What features do you offer?",
    "📅 I want to order",
    "🎨 Can I see sample designs?"
  ];

  const sendMessage = async (userMsg: string) => {
    if (isLoading) return;
    
    setMessages(prev => [...prev, { id: Date.now().toString(), text: userMsg, sender: 'user' }]);
    setIsLoading(true);

    try {
      if (!chatRef.current) initChat();
      const response = await chatRef.current.sendMessage({ message: userMsg });
      
      const responseText = response.text || '';
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        text: responseText, 
        sender: 'bot' 
      }]);
      playNotificationSound();
      speak(responseText);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        text: language === 'tr' ? "Üzgünüm, şu anda bir bağlantı sorunu yaşıyorum. Lütfen daha sonra tekrar deneyin veya doğrudan WhatsApp üzerinden bize ulaşın." : "I'm sorry, I'm experiencing a connection issue right now. Please try again later or contact us directly via WhatsApp.", 
        sender: 'bot' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    await sendMessage(userMsg);
  };

  return (
    <>
      {/* Attention Grabber Tooltip */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="fixed bottom-[90px] sm:bottom-8 right-6 sm:right-[90px] z-[199] bg-[#0a0a0a]/60 backdrop-blur-xl border border-[#d4af37]/50 text-white px-5 py-3 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center gap-3 cursor-pointer"
            onClick={() => {
              setIsOpen(true);
              setShowTooltip(false);
            }}
          >
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#d4af37]"></span>
            </div>
            <p className="text-sm font-medium whitespace-nowrap">
              {language === 'tr' ? 'Size nasıl yardımcı olabilirim?' : 'How can I help you?'}
            </p>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="ml-2 text-white/50 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
            {/* Triangle pointer */}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-[#0a0a0a]/60 border-b border-r border-[#d4af37]/50 transform rotate-45 backdrop-blur-xl"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        onClick={() => {
          setIsOpen(true);
          setShowTooltip(false);
        }}
        className={`fixed bottom-6 sm:bottom-6 right-6 z-[200] w-14 h-14 rounded-full bg-[#d4af37] text-black flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-110 transition-transform ${isOpen ? 'hidden' : 'flex'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/>
        </svg>
        {/* Unread dot notification */}
        <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-[#050505]" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 sm:bottom-24 right-6 sm:right-6 z-[200] w-[350px] h-[500px] max-h-[80vh] max-w-[calc(100vw-3rem)] bg-[#0a0a0a]/30 backdrop-blur-xl border border-[#d4af37]/30 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-transparent border-b border-[#d4af37]/20 p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#d4af37] flex items-center justify-center text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 8V4H8"/>
                    <rect width="16" height="12" x="4" y="8" rx="2"/>
                    <path d="M2 14h2"/>
                    <path d="M20 14h2"/>
                    <path d="M15 13v2"/>
                    <path d="M9 13v2"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-serif text-sm font-medium leading-none mb-1">Davetasyon</h3>
                  <span className="text-white/60 text-[9px] block mb-1">Davetiye Atölyesi</span>
                  <p className="text-[#d4af37] text-[10px] uppercase tracking-wider">
                    {language === 'tr' ? 'Dijital Asistan' : 'Digital Assistant'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isVoiceEnabled ? 'bg-[#d4af37]/20 text-[#d4af37]' : 'bg-white/5 text-white/50 hover:text-white'}`}
                  title={isVoiceEnabled ? "Voice On" : "Voice Off"}
                >
                  {isVoiceEnabled ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
                  )}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18"/>
                    <path d="m6 6 12 12"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-transparent">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                      msg.sender === 'user' 
                        ? 'bg-[#d4af37]/80 backdrop-blur-md text-black rounded-tr-sm' 
                        : 'bg-white/10 backdrop-blur-md text-white/90 border border-white/10 rounded-tl-sm'
                    }`}
                  >
                    {msg.sender === 'bot' ? (
                      <div className="markdown-body prose prose-invert prose-sm max-w-none prose-a:text-[#d4af37] prose-a:underline">
                        <Markdown>{msg.text}</Markdown>
                      </div>
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl rounded-tl-sm flex gap-1">
                    <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 2 && !isLoading && (
              <div className="px-4 pb-3 flex flex-wrap gap-2 bg-transparent">
                {quickReplies.map((reply, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(reply)}
                    className="text-[11px] px-3 py-1.5 rounded-full border border-[#d4af37]/50 text-[#d4af37] bg-black/40 hover:bg-[#d4af37] hover:text-black transition-colors whitespace-nowrap backdrop-blur-md"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSend} className="p-3 bg-transparent border-t border-[#d4af37]/20 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={language === 'tr' ? 'Mesajınızı yazın...' : 'Type your message...'}
                className="flex-1 bg-black/40 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37]/50 transition-colors"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-full bg-[#d4af37] text-black flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <path d="m22 2-7 20-4-9-9-4Z"/>
                  <path d="M22 2 11 13"/>
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
