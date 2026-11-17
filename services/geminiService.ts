// Davetasyon — Gemini çağrıları SUNUCUDA yapılır (api/gemini.ts).
// Tarayıcı asla API anahtarı görmez; anahtar yoksa sunucu dürüst fallback metni döner.

export const fetchSpiritualMessage = async (eventType?: string): Promise<string> => {
  const SPIRITUAL_QUOTES: Record<string, string[]> = {
    default: [
      "Sünnet-i Seniyye edeptir. Hiçbir meselesi yoktur ki, altında bir nur, bir edep bulunmasın. (Bediüzzaman Said Nursi)",
      "Kim benim sünnetimi ihya ederse beni sevmiş olur. Beni seven de cennette benimle beraber olur. (Hadis-i Şerif)",
      "Sünnet-i Seniyye, saadet-i dâreynin temelidir ve kemalâtın menbaıdır. (Bediüzzaman Said Nursi)",
      "Çocuk kokusu, cennet kokusudur. (Hadis-i Şerif)",
      "Şeriatın bir meselesine, sünnetin bir edebine riayet etmek; binlerce zikir ve tefekkürden daha üstündür. (İmam-ı Rabbani)",
      "Sünnet-i Seniyye'ye ittiba etmek, doğrudan doğruya Cenab-ı Hakk'ın rızasını kazanmaktır.",
      "İslam'ın kalesi sünnettir; sünneti terk eden kaleyi terk etmiş olur.",
      "Sünnet-i Seniyye, hayatın her anını ibadete çeviren muazzam bir iksirdir.",
      "Sünnet, ümmetin nişanı, İslam’ın baharıdır.",
      "Sünnet-i Seniyye yolunda atılan her adım, rıza-i İlahi'ye açılan bir kapıdır."
    ],
    graduation: [
      "İlim rütbesi, rütbelerin en yücesidir. (Hz. Ali)",
      "Bana bir harf öğretenin kırk yıl kölesi olurum. (Hz. Ali)",
      "İlim Çin'de de olsa ona talip olun. (Hadis-i Şerif)",
      "Hayatta en hakiki mürşit ilimdir. (M. Kemal Atatürk)",
      "İlim, müminin yitik malıdır; nerede bulursa alsın. (Hadis-i Şerif)",
      "Beşikten mezara kadar ilim öğreniniz. (Hadis-i Şerif)",
      "İlimle geçen bir gece, ibadetle geçen bin geceden hayırlıdır. (Hadis-i Şerif)",
      "İlim, kalbin nuru, aklın cilasıdır.",
      "Başarı, azimle yola çıkanların sadık dostudur."
    ],
    marriage: [
      "Sizin en hayırlınız, ailesine karşı en hayırlı olanınızdır. (Hadis-i Şerif)",
      "Evleniniz, çoğalınız; çünkü ben kıyamet gününde diğer ümmetlere karşı sizin çokluğunuzla iftihar edeceğim. (Hadis-i Şerif)",
      "Kişi evlendiği zaman dininin yarısını korumuş olur. (Hadis-i Şerif)",
      "Rabbim aranıza sevgi ve merhamet koysun. (Rum Suresi, 21)",
      "En güzel düğün, takva üzerine kurulan yuvadır.",
      "Eşler, birbirinin örtüsü ve huzurudur.",
      "Evlilik, iki canın bir olması, bir ömür boyu aynı yöne bakmasıdır.",
      "Rabbim kalplerinizi birbirine ısındırsın, yuvanızı bereketli kılsın.",
      "Evlilik, sadece bir imza değil, iki gönlün ebedi sözleşmesidir."
    ],
    babyshower: [
      "Çocuk kokusu, cennet kokusudur. (Hadis-i Şerif)",
      "Hiçbir baba, çocuğuna güzel terbiyeden daha üstün bir hediye vermemiştir. (Hadis-i Şerif)",
      "Evlat, dünyada nur, ahirette sürurdur.",
      "Rabbimiz! Bize gözümüzü aydınlatacak eşler ve zürriyetler bağışla. (Furkan Suresi, 74)",
      "Evlat kokusu, cennet çiçeklerinin kokusundandır.",
      "Allah'ım, onu salihlerden eyle ve ömrünü bereketli kıl.",
      "Hoş geldin dünyaya, meleklerin duası seninle olsun.",
      "Yavrularımız, kalbimizin dışında atan kalplerimizdir.",
      "Çocuklar, cennetin dünya üzerindeki yansımalarıdır."
    ]
  };
  const category = (eventType && SPIRITUAL_QUOTES[eventType]) ? eventType : 'default';
  const quotes = SPIRITUAL_QUOTES[category];
  return quotes[Math.floor(Math.random() * quotes.length)];
};

const postToServer = async <T>(body: Record<string, unknown>): Promise<T> => {
  const res = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json() as Promise<T>;
};

export const generateGraduationMessage = async (category: string, name: string): Promise<string> => {
  try {
    const data = await postToServer<{ text: string }>({ mode: 'graduation', language: 'tr', category, name });
    return data.text?.trim() || 'Mezuniyetimiz kutlu olsun, yolumuz açık olsun!';
  } catch (error) {
    console.error('Graduation mesajı alınamadı:', error);
    return 'Yeni başlangıçlara, başarı dolu yarınlara!';
  }
};

export const generateCustomBlessing = async (name: string, eventNames: string, eventType: string): Promise<string> => {
  try {
    const data = await postToServer<{ text: string }>({ mode: 'blessing', language: 'tr', name, eventNames, eventType });
    return data.text?.trim() || `Rabbim ${eventNames} için bu özel günü mübarek eylesin.`;
  } catch (error) {
    console.error('Blessing mesajı alınamadı:', error);
    return `Cenab-ı Hak ${eventNames} için bu adımı hayırlı ve mübarek kılsın.`;
  }
};
