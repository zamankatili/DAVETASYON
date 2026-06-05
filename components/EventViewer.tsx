import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../src/firebase';

// Lazy loading all available templates
const templates: Record<string, any> = {
  sunnet: React.lazy(() => import('./SunnetTemplate')),
  babyshower: React.lazy(() => import('./BabyShowerTemplate')),
  wedding: React.lazy(() => import('./WeddingTemplate')),
  engagement: React.lazy(() => import('./ModernEngagementTemplate')),
  birthday: React.lazy(() => import('./BirthdayTemplate')),
  kina: React.lazy(() => import('./KinaTemplate')),
  graduation: React.lazy(() => import('./MezuniyetTemplate')),
  aurora: React.lazy(() => import('./AuroraTemplate')),
  darkluxury: React.lazy(() => import('./DarkLuxuryTemplate')),
  classicenvelope: React.lazy(() => import('./ClassicEnvelopeTemplate'))
};

export default function EventViewer() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!eventId) return;
      try {
        const docRef = doc(db, 'events', eventId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setEventData({ id: docSnap.id, ...data });
          window.dispatchEvent(new CustomEvent('setEventTemplate', { detail: data.templateId }));
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching event:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvent();
  }, [eventId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-[#C9A87C]">
        <div className="w-16 h-16 border-4 border-[#C9A87C]/20 border-t-[#C9A87C] rounded-full animate-spin mb-8"></div>
        <p className="text-[10px] tracking-[0.4em] uppercase font-serif">Davetiye Yükleniyor...</p>
      </div>
    );
  }

  if (error || !eventData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-white p-8 text-center">
        <h1 className="text-4xl font-serif italic text-[#C9A87C] mb-4">Davetiye Bulunamadı</h1>
        <p className="text-white/50 max-w-md mx-auto leading-relaxed mb-8">
          Bu bağlantı geçersiz olabilir veya davetiye sahibi tarafından kaldırılmış olabilir.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="px-8 py-3 bg-white/10 hover:bg-white/20 transition-colors rounded-full text-xs uppercase tracking-widest font-bold"
        >
          Ana Sayfaya Dön
        </button>
      </div>
    );
  }

  const TemplateComponent = templates[eventData.templateId];

  if (!TemplateComponent) {
    return <div className="text-white p-10 text-center">Şablon Bulunamadı ({eventData.templateId})</div>;
  }

  // Inject EventID into the template! 
  // Notice we override language to always match what event might specify if we wanted, 
  // and pass eventId to power the specific RSVPs and AI Chatbot
  return (
    <div className="relative">
      <TemplateComponent 
        language="tr" 
        onBack={() => navigate('/')} 
        onOrder={() => navigate('/')}
        eventId={eventId}
        eventContext={{
          title: eventData.title,
          venue: eventData.venue,
          aiContext: eventData.aiContext
        }}
      />
    </div>
  );
}
