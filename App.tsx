import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { OrderFormModal } from './components/OrderFormModal';
import { ShareMenu } from './components/ShareMenu';

// Lazy loaded components
const LandingPage = React.lazy(() => import('./components/LandingPage'));
const SunnetTemplate = React.lazy(() => import('./components/SunnetTemplate'));
const BabyShowerTemplate = React.lazy(() => import('./components/BabyShowerTemplate'));
const WeddingTemplate = React.lazy(() => import('./components/WeddingTemplate'));
const ModernEngagementTemplate = React.lazy(() => import('./components/ModernEngagementTemplate'));
const BirthdayTemplate = React.lazy(() => import('./components/BirthdayTemplate'));
const KinaTemplate = React.lazy(() => import('./components/KinaTemplate'));
const MezuniyetTemplate = React.lazy(() => import('./components/MezuniyetTemplate'));
const AuroraTemplate = React.lazy(() => import('./components/AuroraTemplate'));
const DarkLuxuryTemplate = React.lazy(() => import('./components/DarkLuxuryTemplate'));
const ClassicEnvelopeTemplate = React.lazy(() => import('./components/ClassicEnvelopeTemplate'));
const MemoryBoxTemplate = React.lazy(() => import('./components/MemoryBoxTemplate'));
const HostDashboard = React.lazy(() => import('./components/HostDashboard'));
const AeternaTemplate = React.lazy(() => import('./components/AeternaTemplate'));

const App: React.FC = () => {
  const [language, setLanguage] = useState<'tr' | 'en'>('tr');
  const [isMuted, setIsMuted] = useState(true);
  const [userKilledAudio, setUserKilledAudio] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderConcept, setOrderConcept] = useState('');
  const [currentEventTemplate, setCurrentEventTemplate] = useState<string | null>(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  const ambientAudioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrackRef = useRef<string>("");

  useEffect(() => {
    const handleSetTemplate = (e: Event) => {
      const customEvent = e as CustomEvent;
      setCurrentEventTemplate(customEvent.detail);
    };
    window.addEventListener('setEventTemplate', handleSetTemplate);
    return () => window.removeEventListener('setEventTemplate', handleSetTemplate);
  }, []);

  const getCurrentTemplateKey = () => {
    const path = location.pathname;
    if (path === '/') {
      if (currentEventTemplate) setCurrentEventTemplate(null);
      return 'landing';
    }
    if (path === '/dashboard') return 'dashboard';
    if (path.startsWith('/preview/')) return path.replace('/preview/', '');
    if (path.startsWith('/event/')) return currentEventTemplate || '';
    return 'landing';
  };

  const currentKey = getCurrentTemplateKey();

  // Dinamik SEO Metadata Yönetimi
  const getSeoMetadata = () => {
    switch (currentKey) {
      case 'classicenvelope':
        return {
          title: "Berna & Melih - Klasik Zarflı Düğün Davetiyesi",
          description: "Berna ve Melih'in düğün törenine davetlisiniz. Klasik zarflı, koyu temalı ve şık şablon.",
        };
      case 'wedding':
        return {
          title: "Modern Düğün Davetiyesi Şablonu",
          description: "Zarif, animasyonlu ve LCV formlu modern düğün davetiyesi şablonu.",
        };
      case 'darkluxury':
        return {
          title: "Karanlık Çiçekli Nişan/Düğün Davetiyesi",
          description: "Premium ve lüks hissiyat sunan koyu renkli çiçek temalı davetiye.",
        };
      case 'sunnet':
        return {
          title: "Klasik Sünnet Davetiyesi",
          description: "Osman Emir ve Ömer Asaf'ın sünnet töreni için geleneksel ve modern Sünnet Düğünü davetiyesi.",
        };
      case 'aurora':
        return {
          title: "Görkemli ve Parıltılı Sünnet Davetiyesi",
          description: "Oğlunuzun en özel günü için ihtişamlı, parıltılı altın sarısı sünnet davetiyesi.",
        };
      case 'memorybox':
        return {
          title: "Berna & Melih - Dijital Anı Kutusu",
          description: "Gecenin tüm fotoğrafları ve anıları tek bir bulutta. Bizimle anılarınızı paylaşın.",
        };
      case 'aeterna':
        return {
          title: "Aeterna | Zamanın Ötesinde Bir Şaheser",
          description: "Dün, bugün ve yarını birleştiren; anılarınızı geleceğe mühürleyen yapay zeka destekli interaktif bir şaheser.",
        };
      case 'dashboard':
        return {
          title: "Müşteri Paneli | Gelen LCV'ler",
          description: "Davetiyenize gelen cevapları tek bir yerden güvenle takip edin.",
        };
      default:
        return {
          title: "Dijital Davetiye Atölyesi | Eşsiz Çevrimiçi Davetiyeler",
          description: "En özel anlarınız için profesyonel tasarımlı, mobil uyumlu ve animasyonlu yüzlerce dijital davetiye. Hemen oluşturun, paylaşın.",
        };
    }
  };

  const seoData = getSeoMetadata();

  // Ortam sesi başlatma (ilk etkileşimde)
  useEffect(() => {
    if (userKilledAudio) return; // Kullanıcı bilerek kapattıysa zorlama
    
    const interactionEvents = ['click', 'pointerdown', 'touchstart', 'keydown'];
    
    const startAmbient = async () => {
      if (ambientAudioRef.current && ambientAudioRef.current.paused && ambientAudioRef.current.src) {
        try {
          ambientAudioRef.current.volume = 0.2;
          ambientAudioRef.current.muted = false;
          await ambientAudioRef.current.play();
          setIsMuted(false);
          // Oynatma başarılı olunca dinleyicileri kaldır (kutuplaşmayı önlemek için)
          interactionEvents.forEach(e => window.removeEventListener(e, startAmbient));
        } catch (error) {
          console.warn("Tarayıcı otomatik ses oynatmayı engelledi, geçerli bir tıklama/dokunma bekleniyor...");
          setIsMuted(true);
        }
      }
    };

    // Dinleyicileri ekle
    interactionEvents.forEach(e => window.addEventListener(e, startAmbient, { passive: true }));
    
    // Cleanup
    return () => interactionEvents.forEach(e => window.removeEventListener(e, startAmbient));
  }, [userKilledAudio, currentKey]);

  const toggleMute = () => {
    if (ambientAudioRef.current) {
      const newMuted = !ambientAudioRef.current.muted;
      ambientAudioRef.current.muted = newMuted;
      setIsMuted(newMuted);
      setUserKilledAudio(newMuted); // Kullanıcı kendi eliyle kapattı
      if (!newMuted) {
        ambientAudioRef.current.play().catch(() => {});
      } else {
        ambientAudioRef.current.pause();
      }
    }
  };

  // Şablona göre müzik değiştirme
  useEffect(() => {
    if (!ambientAudioRef.current) return;

    const tracks: Record<string, string> = {
      landing: "/music/Restaurant%20with%20Background%20Music%20Sound%20Effect%20HD.mp3",
      sunnet: "/music/Einaudi%20-%20Experience%20(Cover).mp3",
      wedding: "/music/Chopin%20-%20Spring%20Waltz%20(Mariage%20d'Amour).mp3",
      engagement: "/music/Ayta%C3%A7%20Do%C4%9Fan%20-%20Bir%20K%C4%B1z%C4%B1l%20Goncaya%20Benzer%20Duda%C4%9F%C4%B1n%20(Live)%20(Official%20Video).mp3",
      birthday: "/music/Chopin%20-%20Spring%20Waltz%20(Mariage%20d'Amour).mp3",
      babyshower: "/music/4%20Beautiful%20Soundtracks%20%20Relaxing%20Piano%20%5B10min%5D.mp3",
      kina: "/music/Ayta%C3%A7%20Do%C4%9Fan%20-%20Kum%20Gibi%20(Live)%20(Official%20Video).mp3",
      graduation: "/music/Einaudi%20-%20Experience%20(Cover).mp3",
      aurora: "/music/Einaudi%20-%20Experience%20(Cover).mp3",
      darkluxury: "/music/Ayta%C3%A7%20Do%C4%9Fan%20-%20Ak%C5%9Fam%20G%C3%BCne%C5%9Fi%20(Live)%20(Official%20Video).mp3",
      classicenvelope: "/music/Chopin%20-%20Spring%20Waltz%20(Mariage%20d'Amour).mp3",
      memorybox: "/music/4%20Beautiful%20Soundtracks%20%20Relaxing%20Piano%20%5B10min%5D.mp3",
      aeterna: "/music/4%20Beautiful%20Soundtracks%20%20Relaxing%20Piano%20%5B10min%5D.mp3",
      dashboard: "" // No music for dashboard
    };

    const nextTrack = tracks[currentKey] || tracks.landing;
    
    if (currentTrackRef.current !== nextTrack && nextTrack !== "") {
      currentTrackRef.current = nextTrack;
      ambientAudioRef.current.src = nextTrack;
      ambientAudioRef.current.load();
      
      if (!isMuted) {
        const playPromise = ambientAudioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.warn("Şarkı değişimi oynatma engellendi:", err);
            setIsMuted(true);
            if (ambientAudioRef.current) ambientAudioRef.current.muted = true;
          });
        }
      }
    } else if (nextTrack === "") {
      ambientAudioRef.current.pause();
    }
  }, [currentKey, isMuted]);

  const handleOrderOpen = (concept: string) => {
    setOrderConcept(concept);
    setIsOrderModalOpen(true);
  };

  const handleBack = () => navigate('/');

  return (
    <div className="min-h-screen bg-[#050505]">
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="title" content={seoData.title} />
        <meta name="description" content={seoData.description} />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="twitter:title" content={seoData.title} />
        <meta property="twitter:description" content={seoData.description} />
      </Helmet>

      {/* Merkezi Ses Oynatıcı */}
      <audio 
        ref={ambientAudioRef}
        loop
        preload="auto"
      />

      {/* Global Ses Kontrol Butonu & Share Butonu */}
      {currentKey !== 'dashboard' && (
        <div className="fixed bottom-6 left-6 sm:left-auto sm:bottom-6 sm:right-[100px] z-[200] flex flex-col sm:flex-row gap-3">
          <ShareMenu 
            language={language}
            title={seoData.title}
            text={seoData.description}
            url={window.location.href}
          />
          <button 
            onClick={toggleMute}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all shadow-xl"
            title={isMuted ? "Sesi Aç" : "Sesi Kapat"}
          >
            {isMuted ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
            )}
          </button>
        </div>
      )}
      
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#050505]">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white/80 rounded-full animate-spin"></div>
        </div>
      }>
        <Routes>
          <Route path="/" element={
            <div className="relative">
              <LandingPage 
                language={language}
                setLanguage={setLanguage}
                onSelect={(t) => navigate(`/preview/${t}`)} 
                onOrderModalOpen={() => handleOrderOpen('')}
              />
              <button 
                onClick={() => navigate('/dashboard')}
                className="absolute bottom-6 left-6 z-[200] w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all shadow-xl"
                title="Host Dashboard"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </button>
            </div>
          } />
          
          <Route path="/dashboard" element={
            <div className="relative">
              <HostDashboard />
              <button 
                onClick={handleBack}
                className="absolute top-6 left-6 z-[200] px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all shadow-xl text-xs uppercase tracking-widest"
              >
                ← Back
              </button>
            </div>
          } />

          {/* Dynamic SaaS Routes */}
          <Route path="/event/:eventId" element={React.createElement(React.lazy(() => import('./components/EventViewer')))} />

          {/* Legacy Preview Routes */}
          <Route path="/preview/sunnet" element={<SunnetTemplate language={language} onBack={handleBack} onOrder={() => handleOrderOpen('sunnet')} />} />
          <Route path="/preview/babyshower" element={<BabyShowerTemplate language={language} onBack={handleBack} onOrder={() => handleOrderOpen('babyshower')} />} />
          <Route path="/preview/wedding" element={<WeddingTemplate language={language} onBack={handleBack} onOrder={() => handleOrderOpen('wedding')} />} />
          <Route path="/preview/engagement" element={<ModernEngagementTemplate language={language} onBack={handleBack} onOrder={() => handleOrderOpen('engagement')} />} />
          <Route path="/preview/birthday" element={<BirthdayTemplate language={language} onBack={handleBack} onOrder={() => handleOrderOpen('birthday')} />} />
          <Route path="/preview/kina" element={<KinaTemplate language={language} onBack={handleBack} onOrder={() => handleOrderOpen('kina')} />} />
          <Route path="/preview/graduation" element={<MezuniyetTemplate language={language} onBack={handleBack} onOrder={() => handleOrderOpen('graduation')} />} />
          <Route path="/preview/aurora" element={<AuroraTemplate language={language} onBack={handleBack} onOrder={() => handleOrderOpen('aurora')} />} />
          <Route path="/preview/darkluxury" element={<DarkLuxuryTemplate language={language} onBack={handleBack} onOrder={() => handleOrderOpen('darkluxury')} />} />
          <Route path="/preview/classicenvelope" element={<ClassicEnvelopeTemplate language={language} onBack={handleBack} onOrder={() => handleOrderOpen('classicenvelope')} />} />
          <Route path="/preview/memorybox" element={<MemoryBoxTemplate language={language} onBack={handleBack} onOrder={() => handleOrderOpen('memorybox')} />} />
          <Route path="/preview/aeterna" element={<AeternaTemplate language={language} onBack={handleBack} onOrder={() => handleOrderOpen('aeterna')} />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>

      {/* Global Order Form Modal */}
      <OrderFormModal 
        isOpen={isOrderModalOpen} 
        onClose={() => setIsOrderModalOpen(false)} 
        language={language}
        initialConcept={orderConcept}
      />
    </div>
  );
};

export default App;
