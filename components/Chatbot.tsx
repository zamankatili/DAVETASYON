import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  // Sohbet sunucuda yürütülür (/api/gemini) — API anahtarı tarayıcıya asla gelmez.
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
    const isEventGuest = !!eventContext;
    const initialGreetingTr = isEventGuest
      ? `Merhaba! 👋 ${eventContext?.title || 'Bu etkinlik'} için sanal asistanınızım. Size nasıl yardımcı olabilirim? (Giyim kodu, ulaşım, çocuk vb.)`
      : "Merhaba! 👋 Davetasyon'a hoş geldiniz. Hayalinizdeki etkinlik ne zaman?";
    const initialGreetingEn = isEventGuest
      ? `Hello! 👋 I am your virtual concierge for ${eventContext?.title || 'this event'}. How can I help you?`
      : "Hello! 👋 Welcome to Davetasyon. When is your dream event?";
    const greeting = language === 'tr' ? initialGreetingTr : initialGreetingEn;
    setMessages([{
      id: Date.now().toString(),
      text: greeting,
      sender: 'bot'
    }]);
    speak(greeting);
  };

  // Dil değişince sohbeti sıfırla
  useEffect(() => {
    setMessages([]);
  }, [language]);

  // Chat penceresi açıldığında ve sohbet henüz boşken karşılama mesajını bas
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initChat();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, language, messages.length]);

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
      const history = [...messages, { id: 'pending', text: userMsg, sender: 'user' as const }]
        .map((m) => ({ role: m.sender === 'user' ? 'user' : 'model' as const, text: m.text }));
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'chat', language, eventContext, history }),
      });
      const data = await res.json();
      const responseText = data?.text || (language === 'tr'
        ? 'Şu an yanıt üretemiyorum, lütfen birkaç saniye sonra tekrar deneyin.'
        : 'I cannot produce a reply right now, please try again in a few seconds.');
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
        text: language === 'tr' ? "Üzgünüm, şu anda bir bağlantı sorunu yaşıyorum. Lütfen daha sonra tekrar deneyin." : "I'm sorry, I'm experiencing a connection issue right now. Please try again later.",
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
