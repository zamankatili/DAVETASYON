import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BackgroundMusic from './BackgroundMusic';
import { Chatbot } from './Chatbot';
import { OrderFormModal } from './OrderFormModal';
import { StyleQuizModal } from './StyleQuizModal';

interface LandingPageProps {
  onSelect: (template: 'sunnet' | 'babyshower' | 'wedding' | 'engagement' | 'birthday' | 'kina' | 'graduation' | 'aurora' | 'darkluxury' | 'classicenvelope' | 'memorybox' | 'aeterna') => void;
  language: 'tr' | 'en';
  setLanguage: (lang: 'tr' | 'en') => void;
  onOrderModalOpen: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSelect, language, setLanguage, onOrderModalOpen }) => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const t = {
    tr: {
      heroTag: "SİZE ÖZEL, ZARİF & PRESTİJLİ",
      heroTitle: "Bırakın, Aşkınız Kalıplara Sığmasın.",
      heroSubtitle: "Her hikaye, parmak izi gibi tamamen size özeldir. Bırakın yorucu organizasyon ve LCV takiplerini biz omuzlayalım; siz sadece sevdiklerinizin o içten tebessümlerine ve bu eşsiz gecenin keyfine odaklanın. Zarafetinizin dijital yüzü biz olalım.",
      ctaPrimary: "Kendi Hikayenizi Yazın",
      ctaSecondary: "Tasarım Koleksiyonunu Keşfedin",
      orderFormBtn: "Size Özel Tasarlayalım",
      exclusiveTitle: "Sadece Sizin Mutluluğunuza Odaklıyız",
      exclusiveItems: [
        { title: "Aşkınız Fabrikasyon Olamaz", desc: "Sizi standart kutulara sığdırmıyoruz. Yalnızca ikinizin ruhunu, ortak zevklerinizi ve o büyük günün tarifsiz heyecanını yansıtan, ilmek ilmek dokunmuş bir sanat eseri vadediyoruz." },
        { title: "Misafirlerinizi Seçkin Hissettirin", desc: "Sevdiklerinizi sıradan, kuru bir mesajla çağırmayın. Onları, ekrana yansıyan sinematik bir zarf, ruhlarını okşayan bir ezgi ve kalplerine dokunan size özel kelimelerle, daha gelmeden büyüleyin." },
        { title: "Tatlı Telaşlar Yorgunluğa Dönüşmesin", desc: "Lütfen arkanıza yaslanın. 'Kimler geliyor, masalar nasıl olacak?' gibi soruları nazik ve akıllı asistanımız sizin adınıza takip etsin. Size sadece o eşsiz anı doyasıya yaşamak kalsın." }
      ],
      stats: [
        { label: "Kazandırılan Zaman (Saat)", value: "10k+" },
        { label: "Ağırlanan Değerli Konuk", value: "150k+" },
        { label: "Paylaşılan Eşsiz Hikaye", value: "2.4k+" }
      ],
      urgency: "Size hak ettiğiniz kaliteyi ve kusursuz vakti ayırabilmek için bu ay sadece 12 özel çiftimizin hikayesini kabul ediyoruz.",
      pricingTitle: "Düşünülmüş Detaylar",
      pricingSubtitle: "Hayatınızı Kolaylaştıran Çözümler",
      packagesTitle: "Size Özel Paketler",
      packagesSubtitle: "Konforunuzu Seçin",
      anchorText: "Geleneksel matbaa davetiyelerinin baskı, kargo ve lojistik maliyetleri ortalama 15.000 ₺ ile 25.000 ₺ arasındayken; biz hem bu ağır bütçeyi hem de saatler süren stresli dağıtım sürecini sıfırlıyoruz. Çok daha prestijli bir VIP deneyimi, erişilebilir bütçelerle sunuyoruz.",
      packages: [
        {
          name: "Haute Couture",
          price: "14.900 ₺",
          originalPrice: "24.500 ₺",
          priceNote: "/ tamamen size özel",
          desc: "Tamamen kuralsız, sınırların kalktığı ve sadece 'size ait' olan o rüya dünyasını inşa etmek isteyen çiftlerimiz için.",
          features: [
            "Sıfırdan Sadece Size Özel İlmek İlmek Tasarım",
            "Sınırsız Revizyon Özgürlüğü",
            "Size Özel İsim Soyisim Alan Adı (örn: aylincan.com)",
            "Gelişmiş Ziyaretçi Karşılama Ekranı",
            "✨ Opsiyonel: Dijital Anı Kutusu (İndirimli +1.450 ₺)"
          ]
        },
        {
          name: "İmza Deneyimi",
          price: "3.450 ₺",
          originalPrice: "8.500 ₺",
          priceNote: "/ tek ödeme",
          desc: "Misafirlerine kendilerini eşsiz hissettiren o zarif misafirperverliği sunmak ve tüm stresi ardında bırakmak isteyenler için.",
          popular: true,
          features: [
            "İç İçe Geçen Büyüleyici Hikaye Tasarımı",
            "2 Adet Revizyon Hakkı",
            "Yapay Zeka Destekli Kusursuz Misafir Karşılama",
            "Tüm Stresinizi Omuzlayan Akıllı LCV Asistanı",
            "Uluslararası Konuklarınız İçin Çift Dil Tasarımı",
            "Özgün Ruhunuzu Yansıtan Özel Arka Plan Müziği",
            "✨ Opsiyonel: Dijital Anı Kutusu (İndirimli +1.450 ₺)"
          ]
        },
        {
          name: "Zarif Başlangıç",
          price: "2.450 ₺",
          originalPrice: "6.500 ₺",
          priceNote: "/ tek ödeme",
          desc: "Gösterişten uzak, sade ve nazik bir tebessümle sevdiklerine ulaşmak isteyen çiftlerimiz için.",
          features: [
            "Estetik Şablonların Size Özel Uyarlanması",
            "1 Adet Revizyon Hakkı",
            "Misafirleriniz İçin İnteraktif Konum & Navigasyon",
            "Büyüleyici Standart Arka Plan Müzikleri",
            "Heyecan Verici Geri Sayım Sayacı",
            "Tüm Cihazlarda Kusursuz Görünüm",
            "✨ Opsiyonel: Dijital Anı Kutusu (İndirimli +1.450 ₺)"
          ]
        },
        {
          name: "Dijital Anı Kutusu",
          price: "2.250 ₺",
          originalPrice: "4.500 ₺",
          priceNote: "/ tek başına",
          desc: "Davetiyesini geleneksel yollarla ulaştırmış ancak o büyülü gecenin anılarını herkesin kendi gözünden dijital olarak saklamak isteyenlere.",
          features: [
            "Davetiyeden Bağımsız, Kusursuz Kullanım",
            "Misafir Masalarınız İçin Şık QR Yönlendirme Kartları",
            "Sonsuz Özgürlükte Davetli Fotoğraf Yüklemesi",
            "Gecenin Tüm Anılarının Toplandığı Saklı Bulut Albümü",
            "Tüm Gülücükleri Tek Tıkla Toplu Olarak İndirme",
            "Sadece İkinize Özel Güvenli Fotoğraf Havuzu"
          ]
        }
      ]
    },
    en: {
      heroTag: "EXCLUSIVE, ELEGANT & PRESTIGIOUS",
      heroTitle: "Let Your Love Break the Molds.",
      heroSubtitle: "Every story is as completely unique to you as a fingerprint. Let us shoulder the exhausting organization and RSVP tracking; you simply focus on the sincere smiles of your loved ones and the joy of this unique night. Let us be the digital face of your elegance.",
      ctaPrimary: "Write Your Own Story",
      ctaSecondary: "Explore Our Dream Gallery",
      orderFormBtn: "Let Us Design For You",
      exclusiveTitle: "Focused Solely on Your Happiness",
      exclusiveItems: [
        { title: "Your Love Cannot Be Fabricated", desc: "We don't box you into standard templates. We promise a delicately woven work of art that reflects only your soul, your shared tastes, and the indescribable excitement of that big day." },
        { title: "Make Your Guests Feel Elite", desc: "Don't invite your loved ones with a dry, ordinary message. Enchant them even before they arrive with a cinematic envelope opening on their screen, a melody that strokes their souls, and loving words tailored just for them." },
        { title: "Don't Let Sweet Rush Turn to Exhaustion", desc: "Please lean back. Let our gentle and smart digital assistant answer questions like 'Who is coming, how are the tables?' for you. All that's left for you is to live this miraculous moment to the fullest." }
      ],
      stats: [
        { label: "Time Saved (Hours)", value: "10k+" },
        { label: "Honored Guests", value: "150k+" },
        { label: "Unique Stories Shared", value: "2.4k+" }
      ],
      urgency: "To give you the quality and flawless time you deserve, we only accept the stories of 12 special couples this month.",
      pricingTitle: "Thoughtful Details",
      pricingSubtitle: "Solutions That Make Your Life Easier",
      packagesTitle: "Tailored Packages",
      packagesSubtitle: "Choose Your Comfort",
      anchorText: "While the printing, shipping, and logistics costs of traditional paper invitations average $1,000 to $1,500, we eliminate both this heavy budget and the stressful distribution process that takes hours. We offer a much more prestigious VIP experience at accessible budgets.",
      packages: [
        {
          name: "Haute Couture",
          price: "$490",
          originalPrice: "$990",
          priceNote: "/ fully custom",
          desc: "For those who want to cross boundaries and build a completely unique dream world that belongs solely to them.",
          features: [
            "Delicately Woven Custom Design Drawn from Scratch",
            "Unlimited Freedom of Revision",
            "Custom Name/Surname Domain (e.g., aylincan.com)",
            "Advanced Visitor Welcome Screen",
            "✨ Optional: Digital Memory Box (Discounted +$49)"
          ]
        },
        {
          name: "Signature Experience",
          price: "$149",
          originalPrice: "$290",
          priceNote: "/ one-time",
          desc: "For those who want to offer their guests that elegant hospitality that makes them feel unique, leaving all stress behind.",
          popular: true,
          features: [
            "Interwoven Enchanting Story Design",
            "2 Revisions Rights",
            "Flawless AI-Assisted Guest Welcome",
            "Smart RSVP Assistant That Shoulders All Your Stress",
            "Dual Language Design for Your International Guests",
            "Custom Background Music Reflecting Your Authentic Soul",
            "✨ Optional: Digital Memory Box (Discounted +$49)"
          ]
        },
        {
          name: "Classic Elegance",
          price: "$99",
          originalPrice: "$190",
          priceNote: "/ one-time",
          desc: "For our couples who want to reach their loved ones with a modest, elegant, and gentle smile, away from ostentation.",
          features: [
            "Tailored Adaptation of Aesthetic Templates",
            "1 Revision Right",
            "Interactive Navigation & Maps for Your Guests",
            "Enchanting Standard Background Musics",
            "Exciting Countdown Timer",
            "Flawless View Across All Devices",
            "✨ Optional: Digital Memory Box (Discounted +$49)"
          ]
        },
        {
          name: "Digital Memory Box",
          price: "$79",
          originalPrice: "$150",
          priceNote: "/ standalone",
          desc: "For those who have delivered their invitations traditionally but want to digitally store the memories of that magical night from everyone's perspective.",
          features: [
            "Flawless Independent Use Without Invitation",
            "Elegant QR Routing Cards for Guest Tables",
            "Infinite Freedom in Guest Photo Uploads",
            "Hidden Cloud Album Collecting All Memories of the Night",
            "Download All Smiles in Bulk with One Click",
            "Secure Photo Pool Exclusive Only to You Two"
          ]
        }
      ]
    }
  }[language];

  const concepts = [
    {
      id: 'aeterna',
      title: language === 'tr' ? 'Aeterna (Başyapıt)' : 'Aeterna (Masterpiece)',
      description: language === 'tr' ? 'Dün, bugün ve yarını birleştiren; anılarınızı geleceğe mühürleyen yapay zeka destekli zaman ötesi bir deneyim.' : 'A timeless experience supported by AI that unites yesterday, today and tomorrow, sealing your memories into the future.',
      icon: '⏳',
      tag: 'Masterpiece',
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800&h=1000'
    },
    {
      id: 'memorybox',
      title: language === 'tr' ? 'Dijital Anı Kutusu' : 'Digital Memory Box',
      description: language === 'tr' ? 'Tüm sevdiklerinizin o gece çektiği fotoğrafları sizin için tek bir bulutta toplayan interaktif misafir kamerası.' : 'An interactive guest camera that securely collects all the photos taken by your loved ones that night in a private cloud.',
      icon: '📸',
      tag: 'New / Yeni',
      image: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&q=80&w=800&h=1000'
    },
    {
      id: 'classicenvelope',
      title: language === 'tr' ? 'Klasik Zarf (Berna & Melih)' : 'Classic Envelope (Berna & Melih)',
      description: language === 'tr' ? 'Zarif bir zarf animasyonu ile açılan, sade, şık ve zamansız bir düğün davetiyesi.' : 'A simple, elegant, and timeless wedding invitation that opens with a graceful envelope animation.',
      icon: '✉️',
      tag: 'Classic',
      image: 'https://images.unsplash.com/photo-1507290439931-a861b5a38200?auto=format&fit=crop&q=80&w=800&h=1000'
    },
    {
      id: 'darkluxury',
      title: language === 'tr' ? 'Kurumsal Gala (Dark Luxury)' : 'Corporate Gala (Dark Luxury)',
      description: language === 'tr' ? 'Siyah ve altının buluştuğu, prestijli ve kurumsal etkinlikler için tasarlanmış VIP deneyim.' : 'A VIP experience designed for prestigious and corporate events where black and gold meet.',
      icon: '🏛️',
      tag: 'VIP',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800&h=1000'
    },
    {
      id: 'sunnet',
      title: language === 'tr' ? 'Sünnet Merasimi' : 'Circumcision Ceremony',
      description: language === 'tr' ? 'Geleneksel motiflerin manevi derinlik ve modern teknolojiyle harmanlandığı özel bir deneyim.' : 'A special experience blending traditional motifs with spiritual depth and modern technology.',
      icon: '🌙',
      tag: 'Couture',
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800&h=1000'
    },
    {
      id: 'wedding',
      title: language === 'tr' ? 'Düğün & Evlilik' : 'Wedding & Marriage',
      description: language === 'tr' ? 'Zarafet ve lüksün buluştuğu, sonsuz aşkınızı en şık şekilde duyuran dijital sanat eseri.' : 'A digital masterpiece where elegance and luxury meet, announcing your eternal love in the most stylish way.',
      icon: '💍',
      tag: 'Elite',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800&h=1000'
    },
    {
      id: 'babyshower',
      title: 'Baby Shower',
      description: language === 'tr' ? 'Minik mucizenizin gelişini kutlayan, sıcak ve sevgi dolu tasarımlarla hazırlanan davetiyeler.' : 'Invitations prepared with warm and loving designs, celebrating the arrival of your little miracle.',
      icon: '👶',
      tag: 'Boutique',
      image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800&h=1000'
    },
    {
      id: 'engagement',
      title: language === 'tr' ? 'Nişan & Söz' : 'Engagement',
      description: language === 'tr' ? 'Baharın uyanışı, uçuşan kelebekler ve doğanın sesleriyle bezenmiş masalsı bir başlangıç.' : 'A fairytale beginning adorned with the awakening of spring, fluttering butterflies, and the sounds of nature.',
      icon: '🌸',
      tag: 'Spring',
      image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=800&h=1000'
    },
    {
      id: 'birthday',
      title: language === 'tr' ? 'Doğum Günü' : 'Birthday',
      description: language === 'tr' ? 'Eğlenceli, interaktif ve enerji dolu kutlamalar için tasarlanmış renkli dijital dünyalar.' : 'Colorful digital worlds designed for fun, interactive, and energetic celebrations.',
      icon: '🎈',
      tag: 'Fun',
      image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=800&h=1000'
    },
    {
      id: 'kina',
      title: language === 'tr' ? 'Kına Gecesi' : 'Henna Night',
      description: language === 'tr' ? 'Geleneksel kına gecesi ruhunu, modern ve lüks detaylarla harmanlayan büyüleyici bir davet.' : 'An enchanting invitation blending the traditional henna night spirit with modern and luxury details.',
      icon: '🌹',
      tag: 'Traditional',
      image: 'https://images.unsplash.com/photo-1590073844006-3a44a7f3ff91?auto=format&fit=crop&q=80&w=800&h=1000'
    },
    {
      id: 'graduation',
      title: language === 'tr' ? 'Mezuniyet Balosu' : 'Graduation Prom',
      description: language === 'tr' ? 'Başarılarınızı kutladığınız, prestijli ve unutulmaz bir gece için tasarlanmış dijital bir anı.' : 'A digital memory designed for a prestigious and unforgettable night where you celebrate your achievements.',
      icon: '🎓',
      tag: 'Prestige',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800&h=1000'
    },
    {
      id: 'aurora',
      title: language === 'tr' ? 'Kuzey Işıkları (Aurora)' : 'Northern Lights (Aurora)',
      description: language === 'tr' ? 'Büyüleyici kuzey ışıkları altında, masalsı ve kozmik bir atmosferde gerçekleşecek etkinlikler için.' : 'For events taking place in a fairytale and cosmic atmosphere under the enchanting northern lights.',
      icon: '🌌',
      tag: 'Magical',
      image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=800&h=1000'
    }
  ];

  return (
    <div className="min-h-screen bg-[#11100F] text-[#F5F2EB] font-sans selection:bg-[#C9A87C] selection:text-[#11100F] overflow-x-hidden relative">
      {/* Natural Canvas Noise Overlay */}
      <div 
        className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
      ></div>

      {/* Cinematic Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#C9A87C]/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#C9A87C]/5 blur-[120px] rounded-full"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full h-24 border-b border-[#F5F2EB]/5 bg-[#11100F]/60 backdrop-blur-2xl z-50 flex items-center justify-between px-8 md:px-20">
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#C9A87C] to-[#E5CCAA] flex items-center justify-center text-[#11100F] font-serif italic text-2xl shadow-[0_0_30px_rgba(201,168,124,0.2)]">D</div>
          <span className="font-serif italic text-2xl tracking-tight hidden sm:block">Davetiye Atölyesi</span>
        </div>
        <div className="flex items-center gap-12 relative z-10">
          <div className="hidden lg:flex items-center gap-10 text-[10px] uppercase tracking-[5px] font-bold text-[#F5F2EB]/40">
            <span 
              onClick={() => document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-[#F5F2EB] border-b border-[#C9A87C] pb-1 cursor-pointer hover:opacity-80 transition-opacity"
            >
              Atölye
            </span>
            <span 
              onClick={() => document.getElementById('exclusive')?.scrollIntoView({ behavior: 'smooth' })}
              className="hover:text-[#F5F2EB] transition-colors cursor-pointer"
            >
              Süreç
            </span>
            <span 
              onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
              className="hover:text-[#F5F2EB] transition-colors cursor-pointer"
            >
              Özellikler
            </span>
            <button 
              onClick={onOrderModalOpen}
              className="px-4 py-2 border border-[#C9A87C]/40 text-[#C9A87C] rounded-full hover:bg-[#C9A87C] hover:text-[#11100F] transition-colors"
            >
              {t.orderFormBtn}
            </button>
          </div>
          <div className="flex items-center bg-[#F5F2EB]/5 rounded-full p-1 border border-[#F5F2EB]/10">
            <button onClick={() => setLanguage('tr')} className={`px-4 py-1.5 text-[10px] font-bold rounded-full transition-all ${language === 'tr' ? 'bg-[#C9A87C] text-[#11100F]' : 'text-[#F5F2EB]/40 hover:text-[#F5F2EB]/60'}`}>TR</button>
            <button onClick={() => setLanguage('en')} className={`px-4 py-1.5 text-[10px] font-bold rounded-full transition-all ${language === 'en' ? 'bg-[#C9A87C] text-[#11100F]' : 'text-[#F5F2EB]/40 hover:text-[#F5F2EB]/60'}`}>EN</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 px-8 md:px-20 z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-[#F5F2EB]/[0.02] border border-[#F5F2EB]/10 rounded-full mb-10 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A87C] animate-pulse"></span>
              <span className="text-[10px] uppercase tracking-[4px] font-bold text-[#C9A87C]">{t.heroTag}</span>
            </div>
            <h1 className="text-7xl md:text-[120px] font-serif italic leading-[0.9] mb-10 tracking-tighter">
              {language === 'tr' ? (
                <>Sıradanlığı <br /> <span className="text-[#C9A87C]">Terk Edin.</span></>
              ) : (
                <>Leave <br /> <span className="text-[#C9A87C]">Ordinary</span> <br /> Behind.</>
              )}
            </h1>
            <p className="text-lg md:text-xl text-[#F5F2EB]/60 max-w-xl leading-relaxed mb-16 font-light">
              {t.heroSubtitle}
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <button 
                onClick={() => document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-12 py-5 bg-[#C9A87C] text-[#11100F] text-[11px] uppercase tracking-[4px] font-bold rounded-full hover:bg-[#F5F2EB] transition-all duration-500 shadow-[0_15px_40px_rgba(201,168,124,0.2)] group flex items-center gap-4"
              >
                {t.ctaPrimary} <span className="block group-hover:translate-x-2 transition-transform">→</span>
              </button>
              <button 
                onClick={() => setIsQuizOpen(true)}
                className="group px-10 py-5 bg-[#F5F2EB]/5 border border-[#C9A87C]/30 text-[#C9A87C] text-[11px] uppercase tracking-[4px] font-bold rounded-full hover:bg-[#C9A87C] hover:text-[#11100F] transition-all duration-500 backdrop-blur-sm relative overflow-hidden flex items-center gap-3"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[200%] group-hover:animate-[shimmer_2s_infinite]"></div>
                ✨ {language === 'tr' ? 'Tarzını Keşfet (Quiz)' : 'Find Your Style (Quiz)'}
              </button>
            </div>
            
            <div className="mt-20 grid grid-cols-3 gap-12 border-t border-[#F5F2EB]/10 pt-12">
              {t.stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl lg:text-4xl font-serif italic text-[#C9A87C] mb-2">{stat.value}</div>
                  <div className="text-[9px] uppercase tracking-[3px] font-medium text-[#F5F2EB]/40">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-[#F5F2EB]/5 shadow-[0_20px_100px_rgba(0,0,0,0.8)]">
              <img 
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200&h=1500" 
                alt="Luxury Experience" 
                className="w-full h-full object-cover grayscale-[0.3] sepia-[0.2] hover:grayscale-0 transition-all duration-[3s]"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#11100F] via-transparent to-transparent opacity-80"></div>
              
              {/* Floating Invitation Preview Card */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 left-10 right-10 p-8 bg-[#11100F]/60 backdrop-blur-2xl border border-[#F5F2EB]/10 rounded-[2rem]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#C9A87C]">Canlı Demo</div>
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400/80 animate-pulse"></div>
                </div>
                <div className="text-2xl lg:text-3xl font-serif italic mb-3 text-[#F5F2EB]">Aeterna Masterpiece</div>
                <p className="text-[#F5F2EB]/50 text-xs leading-relaxed mb-6 font-light">Zamanın ötesindeki bu şaheseri deneyimleyin.</p>
                <button 
                  onClick={() => onSelect('aeterna')}
                  className="w-full py-3.5 bg-[#F5F2EB] text-[#11100F] text-[10px] font-bold uppercase tracking-[0.3em] rounded-full hover:bg-[#C9A87C] transition-all"
                >
                  Şimdi Keşfet
                </button>
              </motion.div>
            </div>
            
            {/* Urgency Badge */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-tr from-[#C9A87C] to-[#E5CCAA] rounded-full flex items-center justify-center text-center p-8 shadow-[0_10px_40px_rgba(201,168,124,0.3)] rotate-12">
              <div className="text-[#11100F]">
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] leading-relaxed">{t.urgency}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Platform Engine - Bento Grid Showcase */}
      <section className="py-32 px-8 md:px-20 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#C9A87C] mb-6 block">
              {language === 'tr' ? 'Teknoloji & Zarafet' : 'Technology & Elegance'}
            </span>
            <h2 className="text-5xl md:text-7xl font-serif italic tracking-tight font-light text-[#F5F2EB]">
              {language === 'tr' ? 'Sadece Davetiye Değil,' : 'Not Just an Invitation,'} <br />
              <span className="text-[#C9A87C]">{language === 'tr' ? 'Dijital Bir Ekosistem.' : 'A Digital Ecosystem.'}</span>
            </h2>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-8 auto-rows-[400px]">
            
            {/* Feature 1: Host Dashboard (Large) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-6 lg:col-span-8 rounded-[3rem] bg-[#1A1817] border border-[#F5F2EB]/10 overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#C9A87C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="p-10 md:p-14 relative z-10 w-full h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-serif italic text-[#F5F2EB] mb-4">{language === 'tr' ? 'Merkez Komuta: Host Dashboard' : 'Command Center: Host Dashboard'}</h3>
                  <p className="text-[#F5F2EB]/60 font-light max-w-md">
                    {language === 'tr' ? 'Tüm katılımcı verilerini, masaların dağılımını ve LCV yanıtlarını anlık finansal bir ekran gibi şık bir panelden izleyin.' : 'Monitor all attendee data, table distributions, and RSVP responses in real-time from a sleek panel as if it were a financial dashboard.'}
                  </p>
                </div>
                {/* Mockup UI representation */}
                <div className="mt-8 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-md p-6 overflow-hidden shadow-2xl transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700">
                  <div className="flex gap-4 mb-6">
                    <div className="w-1/3 h-16 rounded-xl bg-gradient-to-r from-[#10B981]/20 to-transparent border border-[#10B981]/30 flex flex-col justify-center px-4">
                      <span className="text-[9px] uppercase tracking-wider text-[#10B981]">Katılacaklar</span>
                      <span className="text-xl font-serif text-white">124</span>
                    </div>
                    <div className="w-1/3 h-16 rounded-xl bg-gradient-to-r from-[#EF4444]/20 to-transparent border border-[#EF4444]/30 flex flex-col justify-center px-4">
                      <span className="text-[9px] uppercase tracking-wider text-[#EF4444]">Katılamayacaklar</span>
                      <span className="text-xl font-serif text-white">12</span>
                    </div>
                    <div className="w-1/3 h-16 rounded-xl bg-gradient-to-r from-[#F5F2EB]/10 to-transparent border border-[#F5F2EB]/10 flex flex-col justify-center px-4">
                      <span className="text-[9px] uppercase tracking-wider text-[#F5F2EB]/50">Bekleyen</span>
                      <span className="text-xl font-serif text-white">45</span>
                    </div>
                  </div>
                  <div className="w-full h-24 rounded-lg bg-gradient-to-t from-[#C9A87C]/20 to-transparent border-b border-[#C9A87C]/30 relative">
                     <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100"><path d="M0,100 C20,80 40,90 60,40 C80,10 100,50 100,50 L100,100 Z" fill="rgba(201,168,124,0.1)" stroke="rgba(201,168,124,0.5)" strokeWidth="2" /></svg>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feature 2: AI Assistant (Medium - Square) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-6 lg:col-span-4 rounded-[3rem] bg-gradient-to-b from-[#1A1817] to-[#11100F] border border-[#F5F2EB]/10 overflow-hidden relative group"
            >
              <div className="p-10 relative z-10 w-full h-full flex flex-col">
                <div className="mb-auto">
                  <span className="text-3xl mb-4 block">🤖</span>
                  <h3 className="text-2xl font-serif italic text-[#F5F2EB] mb-3">{language === 'tr' ? 'Yapay Zeka Destekli Asistan' : 'AI-Powered Assistant'}</h3>
                  <p className="text-[#F5F2EB]/60 font-light text-sm">
                    {language === 'tr' ? 'Otopark nerede? Kıyafet kuralı nedir? Akıllı sanal asistanımız misafirlerinizin sorularını anında sesli ve yazılı yanıtlar.' : 'Where is the parking? What is the dress code? Our smart virtual assistant immediately answers your guests’ questions.'}
                  </p>
                </div>
                <div className="mt-6 space-y-3">
                  <div className="w-3/4 p-3 rounded-2xl rounded-tl-none bg-[#F5F2EB]/5 border border-[#F5F2EB]/10 text-xs text-[#F5F2EB]/70 ml-0">
                    Otopark hizmetiniz var mı?
                  </div>
                  <div className="w-5/6 p-3 rounded-2xl rounded-tr-none bg-[#C9A87C]/10 border border-[#C9A87C]/30 text-xs text-[#C9A87C] ml-auto">
                    Evet! Mekanımızda vale servisi ve 200 araçlık ücretsiz kapalı otopark bulunmaktadır.
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feature 3: Dynamic RSVP (Medium) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-6 lg:col-span-5 rounded-[3rem] bg-[#1A1817] border border-[#F5F2EB]/10 overflow-hidden relative group"
            >
               <div className="p-10 relative z-10 w-full h-full flex flex-col justify-center">
                  <h3 className="text-2xl font-serif italic text-[#F5F2EB] mb-3">{language === 'tr' ? 'Dinamik & Şık LCV' : 'Dynamic & Elegant RSVP'}</h3>
                  <p className="text-[#F5F2EB]/60 font-light text-sm mb-8">
                    {language === 'tr' ? 'Unutulmuş kağıtlar yok. Özel menüler, müzik istekleri ve katılım durumunu saniyeler içinde toplayın.' : 'No forgotten papers. Collect custom menus, music requests, and attendance status in seconds.'}
                  </p>
                  
                  <div className="w-full bg-[#11100F] rounded-2xl border border-[#F5F2EB]/10 p-5 transform transition-transform group-hover:scale-[1.02]">
                    <div className="w-full border-b border-white/5 pb-3 mb-3 text-sm text-white/80 font-serif">Misafir LCV Formu</div>
                    <div className="flex gap-2 mb-3">
                      <div className="px-4 py-2 bg-[#C9A87C] text-black text-[10px] font-bold uppercase rounded-lg">Katılıyorum</div>
                      <div className="px-4 py-2 bg-white/5 text-white/50 text-[10px] font-bold uppercase rounded-lg">Katılamıyorum</div>
                    </div>
                    <div className="w-full h-8 bg-white/5 rounded-lg border border-white/10 mb-2"></div>
                    <div className="w-full h-8 bg-white/5 rounded-lg border border-white/10"></div>
                  </div>
               </div>
            </motion.div>

            {/* Feature 4: Atmospheric Audio & Memory Box (Large) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-6 lg:col-span-7 rounded-[3rem] bg-[#11100F] border border-[#C9A87C]/20 overflow-hidden relative group p-10 flex flex-col md:flex-row items-center gap-8"
            >
              <div className="absolute inset-0 bg-[#C9A87C]/5 pointer-events-none"></div>
               <div className="w-24 h-24 rounded-full border border-[#C9A87C]/40 flex items-center justify-center flex-shrink-0 relative">
                 <div className="absolute inset-0 rounded-full border-2 border-[#C9A87C] border-dashed animate-[spin_10s_linear_infinite]"></div>
                 <span className="text-3xl animate-bounce">🎶</span>
               </div>
               <div className="relative z-10 text-center md:text-left">
                  <h3 className="text-3xl font-serif italic text-[#C9A87C] mb-4">{language === 'tr' ? 'Atmosferik Müzik Entegrasyonu' : 'Atmospheric Music Integration'}</h3>
                  <p className="text-[#F5F2EB]/70 font-light text-base leading-relaxed">
                    {language === 'tr' ? 'Giriş yaptıkları an duydukları naif bir melodi, tüm hikayenizin tonunu belirler. İster klasik piyano, ister tutkulu bir tango ezgisi; etkinlik ruhunu aylar öncesinden yaşatmaya başlayın.' : 'A gentle melody they hear the moment they enter sets the tone for your entire story. Whether classical piano or a passionate tango tune; start living the spirit of the event months in advance.'}
                  </p>
               </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Exclusive Features Section */}
      <section id="exclusive" className="py-40 px-8 md:px-20 bg-[#F5F2EB] text-[#11100F] rounded-[4rem] md:rounded-[6rem] relative z-20 mx-4 md:mx-8 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32 items-center">
            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#b0936b] mb-8 block">Exclusivity</span>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif italic mb-16 leading-[1.1] tracking-tight">
                {language === 'tr' ? 'Kahramanımız Sizsiniz.' : 'You Are Our Hero.'}
              </h2>
              <div className="space-y-16">
                {t.exclusiveItems.map((item, i) => (
                  <motion.div 
                    key={i} 
                    className="group"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                  >
                    <div className="flex items-center gap-6 mb-4">
                      <div className="text-3xl font-serif italic text-[#b0936b]">0{i+1}</div>
                      <h4 className="text-xl md:text-2xl font-medium">{item.title}</h4>
                    </div>
                    <p className="text-[#11100F]/60 text-base md:text-lg leading-relaxed font-light pl-14">{item.desc}</p>
                    <div className="h-px w-0 group-hover:w-full bg-[#11100F]/10 transition-all duration-700 mt-8"></div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-[#E5D7C5]/30 rounded-full flex items-center justify-center p-20 relative overflow-hidden border border-[#b0936b]/10">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-[1px] border-dashed border-[#b0936b]/30 rounded-full"
                ></motion.div>
                <div className="text-center relative z-10">
                  <div className="text-6xl md:text-8xl font-serif italic text-[#b0936b] mb-6">100%</div>
                  <div className="text-[10px] md:text-[12px] uppercase tracking-[0.3em] font-bold max-w-[150px] mx-auto text-[#11100F]/80 leading-relaxed">Kusursuz Müşteri Odaklılık</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Banner Feature */}
      <section className="py-20 px-8 md:px-20 relative z-10 bg-[#11100F] border-b border-[#F5F2EB]/5">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-[#1A1817] to-[#11100F] border border-[#C9A87C]/20 rounded-[3xl] p-10 md:p-16 text-center relative overflow-hidden shadow-[0_20px_50px_rgba(201,168,124,0.05)] rounded-[3rem]">
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-[-50%] right-[-10%] w-[500px] h-[500px] bg-[#C9A87C] blur-[150px] rounded-full"></div>
          </div>
          
          <div className="relative z-10">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#C9A87C] mb-6 block">
              {language === 'tr' ? 'Kararsız Mısınız?' : 'Undecided?'}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-[#F5F2EB] mb-8">
              {language === 'tr' ? 'Hangi Tarzın Size Uygun Olduğunu Keşfedin.' : 'Find Out Which Style Suits You Best.'}
            </h2>
            <p className="text-[#F5F2EB]/50 max-w-2xl mx-auto mb-10 font-light">
              {language === 'tr' ? 'Sadece 3 kısa görsel soru ile hayalinizdeki konsepti analiz edip, size ve mekanınıza en uygun şaheseri önerelim.' : 'With just 3 quick visual questions, we analyze your dream concept and recommend the perfect masterpiece for you and your venue.'}
            </p>
            <button 
              onClick={() => setIsQuizOpen(true)}
              className="group px-12 py-5 bg-[#C9A87C] text-[#11100F] text-[11px] uppercase tracking-[0.3em] font-bold rounded-full hover:bg-[#F5F2EB] transition-all duration-500 shadow-[0_10px_30px_rgba(201,168,124,0.2)] focus:outline-none"
            >
              {language === 'tr' ? 'Testi Başlat' : 'Start The Quiz'}
            </button>
          </div>
        </div>
      </section>

      {/* Collections - Horizontal Scroll Style */}
      <section id="collections" className="py-40 px-8 md:px-20 relative z-10">
        <div className="max-w-7xl mx-auto mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#C9A87C] mb-6 block">The Collection</span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif italic tracking-tight font-light">Sınırlı Sayıda <br /> <span className="text-[#C9A87C]">Başyapıtlar.</span></h2>
          </div>
          <button className="px-10 py-4 mb-4 border border-[#F5F2EB]/10 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold text-[#F5F2EB] hover:bg-[#F5F2EB]/5 transition-all">
            Tümünü Keşfet
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-[100rem] mx-auto">
          {concepts.map((concept, idx) => (
            <motion.div
              key={concept.id}
              whileHover={{ y: -15 }}
              className="group cursor-pointer"
              onClick={() => onSelect(concept.id as any)}
            >
              <div className="relative aspect-[3/4] mb-8 overflow-hidden rounded-[3rem] border border-[#F5F2EB]/5 bg-[#1A1817] shadow-xl">
                <img 
                  src={concept.image} 
                  alt={concept.title} 
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 opacity-80 group-hover:opacity-100 sepia-[0.2]"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${concept.id}/800/1000`;
                  }}
                />
                <div className="absolute top-6 right-6 px-5 py-2 bg-[#11100F]/60 backdrop-blur-md border border-[#F5F2EB]/10 rounded-full text-[9px] uppercase tracking-[0.3em] font-bold text-[#C9A87C]">
                  {concept.tag}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#11100F] via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-10 left-10 right-10">
                  <h3 className="text-3xl lg:text-4xl font-serif italic mb-4 text-[#F5F2EB]">{concept.title}</h3>
                  <div className="w-12 h-12 rounded-full bg-[#F5F2EB] flex items-center justify-center text-[#11100F] text-xl translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    →
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-40 px-8 md:px-20 bg-[#11100F] relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 relative">
            
            {/* Competitor Price Anchor Image background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] md:w-[800px] h-[500px] md:h-full pointer-events-none z-0 rotate-[-1deg] opacity-10 blur-sm mix-blend-screen scale-110">
              <img 
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000&h=600" 
                alt="Competitor Prices" 
                className="w-full h-full object-cover sepia-[0.4]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#11100F] via-transparent to-[#11100F]"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#11100F] via-transparent to-[#11100F]"></div>
            </div>

            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#C9A87C] mb-6 block relative z-10">{t.packagesTitle}</span>
            <h2 className="text-5xl md:text-7xl font-serif italic tracking-tight mb-8 relative z-10 font-light text-[#F5F2EB]">{t.packagesSubtitle}</h2>
            <div className="max-w-3xl mx-auto bg-[#1A1817]/90 border border-[#F5F2EB]/5 rounded-[2rem] p-8 md:p-10 backdrop-blur-xl relative z-10 shadow-2xl">
              <p className="text-[#F5F2EB]/80 text-sm md:text-base leading-relaxed font-light">
                {t.anchorText}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {t.packages.map((pkg, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className={`relative p-8 md:p-10 rounded-[3rem] border ${pkg.popular ? 'border-[#C9A87C] bg-gradient-to-b from-[#C9A87C]/5 to-transparent shadow-[0_0_40px_rgba(201,168,124,0.1)]' : 'border-[#F5F2EB]/5 bg-[#1A1817]'} flex flex-col transition-all duration-500`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-[#C9A87C] text-[#11100F] text-[10px] uppercase tracking-[0.3em] font-bold rounded-full shadow-[0_0_20px_rgba(201,168,124,0.3)] whitespace-nowrap">
                    En Çok Tercih Edilen
                  </div>
                )}
                <div className="mb-6">
                  <h3 className={`text-3xl font-serif italic mb-4 ${pkg.popular ? 'text-[#C9A87C]' : 'text-[#F5F2EB]'}`}>{pkg.name}</h3>
                  <div className="flex flex-col mb-6">
                    <span className="text-[#F5F2EB]/20 text-5xl md:text-6xl font-serif italic line-through decoration-[#8c3a3a]/40 mb-2">{pkg.originalPrice}</span>
                    <div className="flex items-baseline gap-3">
                      <span className={`text-2xl md:text-3xl font-serif italic font-medium ${pkg.popular ? 'text-[#C9A87C]' : 'text-[#F5F2EB]'}`}>{pkg.price}</span>
                      <span className="text-[#F5F2EB]/40 text-[10px] uppercase tracking-[0.2em] leading-none">{pkg.priceNote}</span>
                    </div>
                  </div>
                  <p className="text-[#F5F2EB]/50 text-[13px] leading-relaxed font-light">{pkg.desc}</p>
                </div>
                
                <div className="flex-grow space-y-5 mb-12 border-t border-[#F5F2EB]/5 pt-8">
                  {pkg.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3">
                      <div className="mt-1 text-[#C9A87C]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <span className="text-[13px] text-[#F5F2EB]/70 font-light leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={onOrderModalOpen}
                  className={`w-full py-4 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-500 ${pkg.popular ? 'bg-[#C9A87C] text-[#11100F] hover:bg-[#F5F2EB]' : 'bg-[#F5F2EB]/5 text-[#F5F2EB] border border-[#F5F2EB]/10 hover:bg-[#F5F2EB]/10'}`}
                >
                  {t.orderFormBtn}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="pricing" className="py-40 px-8 md:px-20 bg-[#161413]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#C9A87C] mb-6 block">{t.pricingTitle}</span>
            <h2 className="text-5xl md:text-7xl font-serif italic tracking-tight mb-8 font-light text-[#F5F2EB]">{t.pricingSubtitle}</h2>
            <div className="flex items-center justify-center gap-4 text-[#C9A87C]">
              <span className="h-px w-8 bg-[#C9A87C]/50"></span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#C9A87C]/80">
                {language === 'tr' ? 'Hayatınızı Kolaylaştıran Prestijli Detaylar' : 'Prestigious Details That Make Your Life Easier'}
              </span>
              <span className="h-px w-8 bg-[#C9A87C]/50"></span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { tr: "Özel Tasarımlar", en: "Custom Designs", icon: "✨" },
              { tr: "AI Mesaj", en: "AI Message", icon: "🤖" },
              { tr: "Müzik", en: "Music", icon: "🎵" },
              { tr: "Etkinlik Konumu ve Yol Tarifi", en: "Event Location & Directions", icon: "📍" },
              { tr: "Hava Durumu Bilgisi", en: "Weather Information", icon: "⛅" },
              { tr: "Takvime ve Hatırlatıcılara Ekle", en: "Add to Calendar & Reminders", icon: "📅" },
              { tr: "Online Davet Takip Paneli", en: "Online RSVP Tracking Panel", icon: "📊" },
              { tr: "Fotoğraf Galerisi", en: "Photo Gallery", icon: "📸" },
              { tr: "Dijital Anı Kutusu (Davetli Albümü)", en: "Digital Memory Box (Guest Album)", icon: "🎞️" },
              { tr: "Mekan & Konaklama Rehberi", en: "Venue & Accommodation Guide", icon: "🏨" },
              { tr: "Çoklu Dil Desteği ile Uluslararası Konuk Deneyimi", en: "Multi-language Support for International Guests", icon: "🌍" }
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="p-8 rounded-[2.5rem] border border-[#F5F2EB]/5 bg-[#1A1817] hover:border-[#C9A87C]/30 hover:bg-[#F5F2EB]/5 transition-all duration-500 flex items-start gap-6 group"
              >
                <div className="text-3xl grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100 transition-all duration-500">{feature.icon}</div>
                <div>
                  <h4 className="text-[15px] font-medium text-[#F5F2EB]/90 group-hover:text-[#C9A87C] transition-colors">{language === 'tr' ? feature.tr : feature.en}</h4>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-24 text-center flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => window.open(`https://wa.me/?text=Merhaba, dijital davetiye özellikleri hakkında bilgi almak istiyorum.`, '_blank')}
              className="px-12 py-5 bg-[#C9A87C] text-[#11100F] text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-[#F5F2EB] transition-all duration-500 rounded-full w-full sm:w-auto shadow-xl"
            >
              {language === 'tr' ? 'Bizimle İletişime Geçin' : 'Contact Us'}
            </button>
            <button 
              onClick={onOrderModalOpen}
              className="px-12 py-5 border border-[#C9A87C]/40 text-[#C9A87C] text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-[#C9A87C] hover:text-[#11100F] transition-all duration-500 rounded-full w-full sm:w-auto"
            >
              {t.orderFormBtn}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 px-8 md:px-20 border-t border-[#F5F2EB]/5 text-center relative z-10 bg-[#11100F]">
        <div className="mb-16">
          <div className="font-serif italic text-5xl mb-6 text-[#C9A87C]">Davetiye Atölyesi</div>
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#F5F2EB]/30">Crafting Digital Legacies Since 2026</p>
        </div>
        <div className="flex justify-center flex-wrap gap-10 md:gap-16 mb-20 text-[10px] uppercase tracking-[0.3em] font-bold text-[#F5F2EB]/40">
          <span className="hover:text-[#C9A87C] transition-colors cursor-pointer">Instagram</span>
          <span className="hover:text-[#C9A87C] transition-colors cursor-pointer">WhatsApp</span>
          <span className="hover:text-[#C9A87C] transition-colors cursor-pointer">Pinterest</span>
        </div>
        <div className="text-[9px] uppercase tracking-[0.3em] font-medium text-[#F5F2EB]/20">
          © 2026 Davetiye Atölyesi | All Rights Reserved
        </div>
      </footer>
      <BackgroundMusic url="https://www.chosic.com/wp-content/uploads/2021/04/Rain-and-Pianos-Relaxing-Piano-Music.mp3" />
      <Chatbot language={language} />
      <StyleQuizModal 
        isOpen={isQuizOpen} 
        onClose={() => setIsQuizOpen(false)} 
        language={language}
        onSelectTemplate={(tid) => onSelect(tid as any)}
        onOrder={() => onOrderModalOpen()}
      />
    </div>
  );
};

export default LandingPage;
