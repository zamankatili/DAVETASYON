import React, { useEffect, useState, useMemo } from 'react';
import { collection, query, onSnapshot, orderBy, addDoc, serverTimestamp, doc, getDoc, getDocs, where } from 'firebase/firestore';
import { db, auth, loginWithGoogle, logout } from '../src/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { Lock, Sparkles, TrendingUp, Users, CalendarDays, MapPin, Clock, ShoppingBag, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export const ADMIN_EMAIL = 'zamankatilii@gmail.com';

interface RSVP {
  id: string;
  name: string;
  status: 'yes' | 'no';
  count: number;
  note?: string;
  createdAt: any;
}

interface Event {
  id: string;
  title: string;
  templateId: string;
  createdAt: any;
  venue?: { name: string; address: string; };
  aiContext?: string;
}

interface Capsule {
  id: string;
  name: string;
  message: string;
  createdAt: any;
  unlocksAt: any;
}

interface OrderItem {
  id: string;
  names: string;
  eventType: string;
  contact: string;
  concept?: string;
  date?: string;
  venueName?: string;
  status?: string;
  createdAt: any;
}

const COLORS = ['#C9A87C', '#C0756C', '#7D9A6E'];

const HostDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [capsules, setCapsules] = useState<Capsule[]>([]);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [ordersError, setOrdersError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'guests' | 'capsules' | 'orders'>('overview');
  const [showQR, setShowQR] = useState(false);
  const isAdmin = user?.email === ADMIN_EMAIL;

  const eventLink = selectedEventId ? `${window.location.origin}/event/${selectedEventId}` : '';
  const downloadQR = () => {
    const svg = document.getElementById('event-qr-svg');
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 360;
      canvas.height = 360;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.fillStyle = '#0F0E0C';
      ctx.fillRect(0, 0, 360, 360);
      ctx.drawImage(img, 0, 0, 360, 360);
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = 'davetasyon-qr.png';
      a.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setLoading(false);
        setEvents([]);
        setRsvps([]);
        setCapsules([]);
        setOrders([]);
        setSelectedEventId(null);
      }
    });
    return () => unsubscribeAuth();
  }, []);

  // Fetch host's events
  useEffect(() => {
    if (!user) return;
    setLoading(true);
    
    // Admin (zamankatilii@gmail.com) could see all, but for simplicity let's stick to hostId == user.uid
    const q = query(collection(db, 'events'), where("hostId", "==", user.uid));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const eventData: Event[] = [];
      snapshot.forEach((doc) => {
        eventData.push({ id: doc.id, ...doc.data() } as Event);
      });
      setEvents(eventData);
      setLoading(false);
      
      // Auto select first if nothing selected
      if (eventData.length > 0 && !selectedEventId) {
        setSelectedEventId(eventData[0].id);
      }
    }, (err) => {
      console.error("Error fetching events:", err);
      // It might fail before index creation or auth propagation
      setTimeout(() => setLoading(false), 1000); 
    });

    return () => unsubscribe();
  }, [user, selectedEventId]);

  // Admin: sipariş taleplerini dinle (sadece admin e-postası rules'a takılır)
  useEffect(() => {
    if (!isAdmin) {
      setOrders([]);
      return;
    }
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data: OrderItem[] = [];
        snapshot.forEach((docSnap) => {
          data.push({ id: docSnap.id, ...(docSnap.data() as Omit<OrderItem, 'id'>) });
        });
        setOrders(data);
        setOrdersError(null);
      },
      (err) => {
        console.error('Siparişler okunamadı:', err);
        setOrdersError('Siparişler okunamadı (admin yetkisi yoksa normaldir).');
      }
    );
    return () => unsubscribe();
  }, [isAdmin]);

  // Fetch RSVPs and Capsules for selected event
  useEffect(() => {
    if (!user || !selectedEventId) {
      setRsvps([]);
      setCapsules([]);
      return;
    }

    const rsvpsRef = collection(db, 'events', selectedEventId, 'rsvps');
    const qRsvps = query(rsvpsRef, orderBy('createdAt', 'desc'));
    
    const unsubscribeRsvps = onSnapshot(qRsvps, (snapshot) => {
      const rsvpData: RSVP[] = [];
      snapshot.forEach((doc) => {
        rsvpData.push({ id: doc.id, ...doc.data() } as RSVP);
      });
      setRsvps(rsvpData);
    });

    const capsulesRef = collection(db, 'events', selectedEventId, 'capsules');
    const qCapsules = query(capsulesRef, orderBy('createdAt', 'desc'));
    
    const unsubscribeCapsules = onSnapshot(qCapsules, (snapshot) => {
      const capsuleData: Capsule[] = [];
      snapshot.forEach((doc) => {
        capsuleData.push({ id: doc.id, ...doc.data() } as Capsule);
      });
      setCapsules(capsuleData);
    });

    return () => {
      unsubscribeRsvps();
      unsubscribeCapsules();
    };
  }, [selectedEventId, user]);

  const handleCreateDemoEvent = async () => {
    if (!user) return;
    try {
      setLoading(true);
      await addDoc(collection(db, 'events'), {
        hostId: user.uid,
        title: "Berna & Melih Düğün",
        templateId: "aurora",
        venue: {
          name: "Camdan Köşk",
          address: "Uludağ Yolu 15. Km, Osmangazi / Bursa"
        },
        aiContext: "Otopark ücretsizdir. Çocuklar için ayrı bir oyun alanı mevcuttur. Kıyafet kodu: Black Tie (Siyah Kravat / Gece Elbisesi).",
        createdAt: serverTimestamp()
      });
    } catch (err) {
      console.error(err);
      setError("Demo etkinlik oluşturulamadı.");
    } finally {
      setLoading(false);
    }
  };

  const totalAttending = rsvps.filter(r => r.status === 'yes').reduce((sum, r) => sum + r.count, 0);
  const totalNotAttending = rsvps.filter(r => r.status === 'no').length;

  const pieData = [
    { name: 'Katılanlar', value: totalAttending },
    { name: 'Reddedenler', value: totalNotAttending },
  ];

  // Group RSVPs by day for Bar Chart
  const dailyData = useMemo(() => {
    const days: Record<string, number> = {};
    rsvps.forEach(r => {
      if (!r.createdAt?.toDate) return;
      const dateStr = new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: 'short' }).format(r.createdAt.toDate());
      if (!days[dateStr]) days[dateStr] = 0;
      if (r.status === 'yes') days[dateStr] += r.count;
    });
    return Object.keys(days).reverse().map(date => ({ date, count: days[date] }));
  }, [rsvps]);

  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 text-ivory relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,168,124,0.1),transparent_50%)] pointer-events-none"></div>
        <div className="max-w-md w-full bg-zinc-900/50 backdrop-blur-xl border border-ivory/10 p-10 rounded-[2rem] text-center relative z-10 shadow-2xl">
          <div className="w-16 h-16 bg-[#C9A87C]/10 border border-[#C9A87C]/30 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(201,168,124,0.2)]">
            <Lock className="text-[#C9A87C] w-8 h-8" />
          </div>
          <h2 className="text-3xl font-serif italic mb-3 text-ivory">Aeterna Kontrol</h2>
          <p className="text-ivory/50 text-sm mb-10 font-light leading-relaxed">Geleceğe mühürlenmiş etkinliklerinizi yönetmek, yapay zeka öngörülerini ve konuk analizlerini görmek için giriş yapın.</p>
          <button 
            onClick={loginWithGoogle}
            className="w-full bg-[#F7F3EA] text-[#0F0E0C] py-4 rounded-xl font-bold tracking-[0.2em] uppercase text-[10px] hover:bg-[#C9A87C] hover:text-ink hover:shadow-[0_0_20px_rgba(201,168,124,0.4)] transition-all duration-300"
          >
            Google ile Giriş Yap
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-[#F7F3EA] p-4 md:p-8 font-sans selection:bg-[#C9A87C] selection:text-[#0F0E0C] pt-24 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#C9A87C]/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-ivory/10 pb-8 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full bg-[#7D9A6E] shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse"></div>
              <h3 className="text-[#C9A87C] text-[9px] uppercase tracking-[0.4em] font-bold">Aeterna Yönetim Çekirdeği</h3>
            </div>
            <h1 className="text-5xl font-serif italic text-ivory mb-2 tracking-tight">Merkez Komuta</h1>
            <p className="text-ivory/40 text-sm font-light tracking-wide">{user.email}</p>
          </div>
          <button 
            onClick={logout}
            className="px-8 py-3 border border-ivory/10 text-ivory/50 rounded-full text-[10px] uppercase tracking-[0.2em] hover:bg-ivory/10 hover:text-ivory transition-all backdrop-blur-md"
          >
            Sistemi Kapat
          </button>
        </div>

        {events.length === 0 && !loading ? (
          <div className="text-center py-40 border border-ivory/5 rounded-[2rem] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-[#C9A87C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="w-20 h-20 rounded-full border border-ivory/10 flex items-center justify-center mx-auto mb-8 bg-ink/50 backdrop-blur-md">
              <Sparkles className="w-8 h-8 text-[#C9A87C]" />
            </div>
            <h2 className="text-4xl font-serif italic mb-4 text-ivory">Etkinlik Matrisi Boş</h2>
            <p className="text-ivory/40 mb-10 max-w-md mx-auto font-light leading-relaxed">Sistemimizin yeni devrimsel SaaS mimarisini test etmek için yapay zeka destekli bir demo kurun.</p>
            <button 
              onClick={handleCreateDemoEvent}
              className="px-10 py-5 bg-transparent border border-[#C9A87C]/50 text-[#C9A87C] font-bold uppercase tracking-[0.3em] text-[10px] rounded-full hover:bg-[#C9A87C] hover:text-ink transition-all duration-500 shadow-[0_0_30px_rgba(201,168,124,0.1)] hover:shadow-[0_0_50px_rgba(201,168,124,0.4)]"
            >
              Simülasyonu Başlat
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Sidebar: Event List */}
            <div className="xl:col-span-1 flex flex-col gap-4">
              <div className="flex items-center justify-between ml-4 mb-2">
                <h3 className="text-[10px] text-ivory/40 uppercase tracking-[0.3em] font-bold">Aktif Düğümler</h3>
                <span className="text-[10px] text-[#C9A87C] bg-[#C9A87C]/10 px-2 py-1 rounded-full">{events.length}</span>
              </div>
              
              <div className="space-y-3">
                {events.map((e) => (
                  <div 
                    key={e.id} 
                    onClick={() => setSelectedEventId(e.id)}
                    className={`p-6 rounded-[1.5rem] cursor-pointer border transition-all duration-500 overflow-hidden relative group
                      ${selectedEventId === e.id 
                        ? 'bg-gradient-to-br from-[#1F1D1A] to-[#0F0E0C] border-[#C9A87C]/30 shadow-[0_0_30px_rgba(201,168,124,0.05)]' 
                        : 'bg-ivory/[0.02] border-ivory/5 hover:border-ivory/20'}`}
                  >
                    {selectedEventId === e.id && (
                      <div className="absolute top-0 left-0 w-1 h-full bg-[#C9A87C] shadow-[0_0_10px_#C9A87C]"></div>
                    )}
                    <h4 className="text-xl font-serif italic mb-2 text-ivory group-hover:text-[#C9A87C] transition-colors">{e.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-ivory/30 tracking-widest uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-ivory/20"></span>
                      {e.templateId}
                    </div>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={handleCreateDemoEvent}
                className="mt-4 p-5 border border-dashed border-ivory/10 rounded-[1.5rem] text-ivory/30 hover:text-[#C9A87C] hover:border-[#C9A87C]/50 transition-all text-[10px] uppercase tracking-[0.3em] font-bold flex items-center justify-center gap-3 group bg-ivory/[0.01] hover:bg-[#C9A87C]/5"
              >
                <div className="w-6 h-6 rounded-full bg-ivory/5 flex items-center justify-center group-hover:bg-[#C9A87C]/20 transition-colors">
                  <span className="text-lg leading-none mt-[-2px]">+</span>
                </div>
                Yeni Düğüm Ekle
              </button>
            </div>

            {/* Main: Event Details */}
            {selectedEventId && (
              <div className="xl:col-span-3 flex flex-col gap-6">
                
                {/* Event Top Bar */}
                <div className="bg-gradient-to-r from-[#111111] to-[#0F0E0C] border border-ivory/5 rounded-[2rem] p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-64 h-full bg-[radial-gradient(circle_at_100%_50%,rgba(201,168,124,0.05),transparent_70%)] pointer-events-none"></div>
                  
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-[#C9A87C]/10 border border-[#C9A87C]/20 flex items-center justify-center">
                      <CalendarDays className="w-6 h-6 text-[#C9A87C]" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-serif italic mb-1 text-ivory">{events.find(e => e.id === selectedEventId)?.title}</h2>
                      <div className="flex items-center gap-2 text-xs text-ivory/40 tracking-widest uppercase">
                        <MapPin className="w-3 h-3" />
                        {events.find(e => e.id === selectedEventId)?.venue?.name || "Yer Belirtilmedi"}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowQR(v => !v)}
                      className="px-6 py-3 border border-ivory/10 rounded-full text-[10px] uppercase tracking-[0.2em] hover:bg-ivory/5 transition-all text-ivory/70 flex items-center gap-2"
                      title="Davetiye linki QR'ı"
                    >
                      <QrCode className="w-4 h-4" /> QR
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(eventLink);
                        alert("📡 Yayın frekansı kopyalandı!");
                      }}
                      className="px-6 py-3 border border-ivory/10 rounded-full text-[10px] uppercase tracking-[0.2em] hover:bg-ivory/5 transition-all text-ivory/70"
                    >
                      Linki Kopyala
                    </button>
                    <a 
                      href={`/event/${selectedEventId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-3 bg-[#C9A87C] text-ink rounded-full text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#F7F3EA] hover:shadow-[0_0_20px_rgba(201,168,124,0.3)] transition-all"
                    >
                      Canlı Yayına Git
                    </a>
                  </div>
                </div>

                {/* QR Panel */}
                {showQR && (
                  <div className="bg-[#111111] border border-ivory/10 rounded-[2rem] p-6 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
                    <div className="bg-[#0F0E0C] p-4 rounded-2xl border border-[#C9A87C]/20 shrink-0">
                      <QRCodeSVG id="event-qr-svg" value={eventLink} size={170} bgColor="#0F0E0C" fgColor="#F7F3EA" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-lg font-serif italic text-ivory mb-2">Kapıdaki QR Karşılama</h3>
                      <p className="text-ivory/50 text-xs leading-relaxed mb-4 max-w-sm">Bu QR'ı çıktı alıp karşılama masasına ve davetli masalarına koyabilirsiniz; misafirler telefonuyla okutup davetiyeye, LCV'ye ve Anı Kutusu'na ulaşır.</p>
                      <button
                        onClick={downloadQR}
                        className="px-6 py-2.5 bg-[#C9A87C] text-ink rounded-full text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#F7F3EA] transition-all"
                      >
                        PNG İndir (360px)
                      </button>
                    </div>
                  </div>
                )}

                {/* Tabs */}
                <div className="flex gap-2 border-b border-ivory/5 pb-0">
                  <button 
                    onClick={() => setActiveTab('overview')}
                    className={`px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold border-b-2 transition-all ${activeTab === 'overview' ? 'text-[#C9A87C] border-[#C9A87C]' : 'text-ivory/30 border-transparent hover:text-ivory/70'}`}
                  >
                    Genel Bakış
                  </button>
                  <button 
                    onClick={() => setActiveTab('guests')}
                    className={`px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold border-b-2 transition-all ${activeTab === 'guests' ? 'text-[#C9A87C] border-[#C9A87C]' : 'text-ivory/30 border-transparent hover:text-ivory/70'}`}
                  >
                    Davetli Listesi ({rsvps.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('capsules')}
                    className={`px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold border-b-2 transition-all ${activeTab === 'capsules' ? 'text-[#C9A87C] border-[#C9A87C]' : 'text-ivory/30 border-transparent hover:text-ivory/70'}`}
                  >
                    Zaman Kapsülleri ({capsules.length})
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => setActiveTab('orders')}
                      className={`px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold border-b-2 transition-all flex items-center gap-2 ${activeTab === 'orders' ? 'text-[#C9A87C] border-[#C9A87C]' : 'text-ivory/30 border-transparent hover:text-ivory/70'}`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Sipariş Talepleri ({orders.length})
                    </button>
                  )}
                </div>

                {/* CONTENT AREA */}
                {activeTab === 'overview' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    
                    {/* Key Metrics */}
                    <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="bg-ivory/[0.02] border border-ivory/5 p-8 rounded-[2rem] flex items-center justify-between group hover:border-ivory/10 transition-colors">
                        <div>
                          <p className="text-[10px] text-ivory/40 uppercase tracking-[0.3em] font-bold mb-3">Onaylı Kişi</p>
                          <p className="text-4xl font-serif text-[#7D9A6E]">{totalAttending}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-[#7D9A6E]/10 flex items-center justify-center text-[#7D9A6E]">
                          <Users className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="bg-ivory/[0.02] border border-ivory/5 p-8 rounded-[2rem] flex items-center justify-between group hover:border-ivory/10 transition-colors">
                        <div>
                          <p className="text-[10px] text-ivory/40 uppercase tracking-[0.3em] font-bold mb-3">Reddedenler</p>
                          <p className="text-4xl font-serif text-[#C0756C]">{totalNotAttending}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-[#C0756C]/10 flex items-center justify-center text-[#C0756C]">
                          <div className="w-4 h-0.5 bg-current rounded-full rotate-45"></div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-[#C9A87C]/10 to-transparent border border-[#C9A87C]/20 p-8 rounded-[2rem] flex flex-col justify-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4">
                          <TrendingUp className="w-5 h-5 text-[#C9A87C]/50" />
                        </div>
                        <p className="text-[10px] text-[#C9A87C]/80 uppercase tracking-[0.3em] font-bold mb-3">Tepki Oranı</p>
                        <div className="flex items-end gap-2">
                          <p className="text-4xl font-serif text-[#F7F3EA]">
                            {rsvps.length > 0 ? Math.round((rsvps.filter(r => r.status === 'yes').length / rsvps.length) * 100) : 0}<span className="text-xl text-ivory/40">%</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* AI Insights Card */}
                    <div className="md:col-span-3 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] bg-[#111111] border border-ivory/10 p-8 rounded-[2rem] relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-transparent z-0"></div>
                      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                        <div className="w-24 h-24 rounded-full border border-[#C9A87C]/30 flex items-center justify-center bg-ink shadow-[0_0_30px_rgba(201,168,124,0.15)] shrink-0">
                          <Sparkles className="w-10 h-10 text-[#C9A87C]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-serif italic text-[#C9A87C] mb-2">Katılım Özeti</h3>
                          <p className="text-ivory/60 font-light leading-relaxed text-sm max-w-3xl">
                            {rsvps.length === 0
                              ? 'Henüz yanıt yok. Davetli listenizi ve davetiye linkinizi paylaştığınızda yanıtlar burada anında toplanır.'
                              : `${rsvps.length} yanıtın ${rsvps.filter(r => r.status === 'yes').length}'i onay, ${totalNotAttending}'i ret. Güncel onay oranınız: %%${rsvps.length > 0 ? Math.round((rsvps.filter(r => r.status === 'yes').length / rsvps.length) * 100) : 0}. Günlük ortalama onaylı kişi: ${dailyData.length > 0 ? Math.round(dailyData.reduce((sum, d) => sum + d.count, 0) / dailyData.length) : 0}.`}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Charts */}
                    <div className="md:col-span-2 bg-ivory/[0.02] border border-ivory/5 p-8 rounded-[2rem]">
                      <h4 className="text-[10px] text-ivory/40 uppercase tracking-[0.3em] font-bold mb-8">Günlük Katılım İvmesi</h4>
                      <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={dailyData}>
                            <XAxis dataKey="date" stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
                            <RechartsTooltip 
                              cursor={{fill: '#ffffff05'}}
                              contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                            />
                            <Bar dataKey="count" fill="#C9A87C" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="md:col-span-1 bg-ivory/[0.02] border border-ivory/5 p-8 rounded-[2rem] flex flex-col items-center justify-center">
                      <h4 className="text-[10px] text-ivory/40 uppercase tracking-[0.3em] font-bold mb-8 w-full text-left">Dağılım</h4>
                      <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={pieData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                              stroke="none"
                            >
                              {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <RechartsTooltip 
                              contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex gap-4 mt-4 w-full justify-center">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#C9A87C]"></div>
                          <span className="text-xs text-ivory/50">Katılanlar</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#C0756C]"></div>
                          <span className="text-xs text-ivory/50">Reddedenler</span>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {activeTab === 'guests' && (
                  <div className="bg-ivory/[0.02] border border-ivory/5 rounded-[2rem] overflow-hidden animate-in fade-in duration-500">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-ivory/[0.02] border-b border-ivory/10 text-[10px] uppercase tracking-[0.2em] text-ivory/40">
                            <th className="py-6 px-8 font-bold">Misafir / Frekans</th>
                            <th className="py-6 px-8 font-bold">Kişi</th>
                            <th className="py-6 px-8 font-bold">Mühürlü Not</th>
                            <th className="py-6 px-8 font-bold text-right">Zaman Damgası</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm">
                          {rsvps.map((rsvp) => (
                            <tr key={rsvp.id} className="border-b border-ivory/5 hover:bg-ivory/[0.05] transition-colors group">
                              <td className="py-6 px-8 flex items-center gap-4">
                                <div className={`w-2.5 h-2.5 rounded-full ${rsvp.status === 'yes' ? 'bg-[#7D9A6E] shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-[#C0756C] shadow-[0_0_10px_rgba(239,68,68,0.5)]'}`} />
                                <span className="font-serif text-lg text-ivory/90 group-hover:text-ivory transition-colors">{rsvp.name}</span>
                              </td>
                              <td className="py-6 px-8 text-ivory/60">
                                {rsvp.status === 'yes' ? (
                                  <span className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-ivory/30" /> {rsvp.count}
                                  </span>
                                ) : (
                                  <span className="text-ivory/20">-</span>
                                )}
                              </td>
                              <td className="py-6 px-8 text-ivory/40 italic font-serif">
                                {rsvp.note ? `"${rsvp.note}"` : <span className="not-italic text-ivory/10">-</span>}
                              </td>
                              <td className="py-6 px-8 text-[#C9A87C]/60 text-xs text-right whitespace-nowrap tracking-wider">
                                {rsvp.createdAt?.toDate ? new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).format(rsvp.createdAt.toDate()) : 'Şimdi'}
                              </td>
                            </tr>
                          ))}
                          {rsvps.length === 0 && (
                            <tr>
                              <td colSpan={4} className="py-16 text-center text-ivory/30 text-xs font-light italic tracking-wide">Henüz hiçbir frekans yankılanmadı.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === 'capsules' && (
                  <div className="bg-ivory/[0.02] border border-ivory/5 rounded-[2rem] overflow-hidden animate-in fade-in duration-500">
                    <div className="p-8 border-b border-ivory/10 bg-gradient-to-br from-[#1F1D1A] to-[#0F0E0C]">
                      <h3 className="text-2xl font-serif italic text-ivory mb-2 flex items-center gap-3">
                        <Lock className="w-6 h-6 text-[#C9A87C]" />
                        Sonsuzluk Kapsülleri
                      </h3>
                      <p className="text-ivory/50 text-sm font-light">Bu mesajlar geleceğe mühürlenmiş birer hatıradır. İçerikler yalnızca davetiye sahibi (ve admin) tarafından görülebilir; 10 yıl sonra tekrar açılmak üzere saklanır.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
                      {capsules.map((capsule) => (
                        <div key={capsule.id} className="bg-ink/50 border border-[#C9A87C]/20 p-6 rounded-[1.5rem] relative overflow-hidden group hover:border-[#C9A87C]/50 transition-colors">
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C9A87C]/10 via-[#C9A87C]/50 to-[#C9A87C]/10"></div>
                          
                          <div className="flex justify-between items-start mb-6">
                            <div>
                              <p className="text-[10px] text-ivory/40 uppercase tracking-[0.3em] font-bold mb-1">Mühürleyen</p>
                              <p className="text-lg font-serif text-ivory group-hover:text-[#C9A87C] transition-colors">{capsule.name}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full border border-ivory/10 flex items-center justify-center bg-ivory/5">
                              <Lock className="w-4 h-4 text-ivory/30 group-hover:text-[#C9A87C] transition-colors" />
                            </div>
                          </div>
                          
                          <p className="text-ivory/60 font-serif italic text-sm mb-8 line-clamp-3 group-hover:line-clamp-none transition-all duration-500">"{capsule.message}"</p>
                          
                          <div className="pt-4 border-t border-ivory/5 flex items-center justify-between">
                            <div>
                               <p className="text-[9px] text-[#C9A87C] uppercase tracking-[0.2em] font-bold">Mühürlenme</p>
                               <p className="text-xs text-ivory/40">{capsule.createdAt?.toDate ? new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' }).format(capsule.createdAt.toDate()) : 'Şimdi'}</p>
                            </div>
                            <div className="text-right">
                               <p className="text-[9px] text-[#7D9A6E] uppercase tracking-[0.2em] font-bold">Açılış</p>
                               <p className="text-xs text-ivory/40">2036</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      {capsules.length === 0 && (
                        <div className="col-span-1 md:col-span-2 text-center py-20">
                           <div className="w-16 h-16 rounded-full border border-ivory/10 mx-auto flex items-center justify-center mb-4">
                             <Clock className="w-6 h-6 text-[#C9A87C]/30" />
                           </div>
                           <p className="text-ivory/30 text-sm font-light italic">Zaman çizgisinde henüz mühürlenmiş bir kapsül bulunmuyor.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ORDERS TAB (sadece admin) */}
                {activeTab === 'orders' && isAdmin && (
                  <div className="bg-ivory/[0.02] border border-ivory/5 rounded-[2rem] overflow-hidden animate-in fade-in duration-500">
                    <div className="p-8 border-b border-ivory/10 bg-gradient-to-br from-[#1F1D1A] to-[#0F0E0C]">
                      <h3 className="text-2xl font-serif italic text-ivory mb-2 flex items-center gap-3">
                        <ShoppingBag className="w-6 h-6 text-[#C9A87C]" />
                        Sipariş Talepleri
                      </h3>
                      <p className="text-ivory/50 text-sm font-light">
                        Sitedeki sipariş formundan gelen talepler. Kişisel verileri yalnızca bu ekrandan (ve Firebase konsolundan) admin görsün.
                        {ordersError && <span className="block text-red-400/80 text-xs mt-2">{ordersError}</span>}
                      </p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-ivory/[0.02] border-b border-ivory/10 text-[10px] uppercase tracking-[0.2em] text-ivory/40">
                            <th className="py-5 px-6 font-bold">Müşteri</th>
                            <th className="py-5 px-6 font-bold">Etkinlik / Konsept</th>
                            <th className="py-5 px-6 font-bold">İletişim</th>
                            <th className="py-5 px-6 font-bold">Tarih</th>
                            <th className="py-5 px-6 font-bold text-right">Talep Zamanı</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm">
                          {orders.map((o) => (
                            <tr key={o.id} className="border-b border-ivory/5 hover:bg-ivory/[0.05] transition-colors">
                              <td className="py-5 px-6 text-ivory/90 font-medium">{o.names}</td>
                              <td className="py-5 px-6 text-ivory/60">
                                <span className="block">{o.eventType}</span>
                                {o.concept && <span className="block text-xs text-ivory/35">{o.concept}</span>}
                              </td>
                              <td className="py-5 px-6 text-[#C9A87C]/80">{o.contact}</td>
                              <td className="py-5 px-6 text-ivory/50">{o.date || '—'}</td>
                              <td className="py-5 px-6 text-ivory/40 text-xs text-right whitespace-nowrap">
                                {o.createdAt?.toDate ? new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).format(o.createdAt.toDate()) : 'Şimdi'}
                              </td>
                            </tr>
                          ))}
                          {orders.length === 0 && (
                            <tr>
                              <td colSpan={5} className="py-16 text-center text-ivory/30 text-xs italic">
                                Henüz sipariş talebi yok — site çalıştığında burada listelenecek.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HostDashboard;
