
import { GoogleGenAI } from "@google/genai";

const SPIRITUAL_QUOTES: Record<string, string[]> = {
  default: [
    "Sünnet-i Seniyye edeptir. Hiçbir meselesi yoktur ki, altında bir nur, bir edep bulunmasın. (Bediüzzaman Said Nursi)",
    "Kim benim sünnetimi ihya ederse beni sevmiş olur. Beni seven de cennette benimle beraber olur. (Hadis-i Şerif)",
    "Sünnet-i Seniyye, saadet-i dâreynin temelidir ve kemalâtın menbaıdır. (Bediüzzaman Said Nursi)",
    "Şeriatın bir meselesine, sünnetin bir edebine riayet etmek; binlerce zikir ve tefekkürden daha üstündür. (İmam-ı Rabbani)",
    "Sünnet-i Seniyye, birer elmas sütun gibidir; her bir edebi birer definenin anahtarıdır.",
    "Çocuk kokusu, cennet kokusudur. (Hadis-i Şerif)",
    "Sünnet-i Seniyye'ye ittiba etmek, doğrudan doğruya Cenab-ı Hakk'ın rızasını kazanmaktır.",
    "İslam'ın kalesi sünnettir; sünneti terk eden kaleyi terk etmiş olur.",
    "Evlatlarımıza bırakacağımız en güzel miras, onları Sünnet-i Seniyye terbiyesiyle yetiştirmektir.",
    "Sünnet-i Seniyye, hayatın her anını ibadete çeviren muazzam bir iksirdir.",
    "Sünnet, ümmetin nişanı, İslam’ın baharıdır.",
    "Bir sünnetin ihyası, sönmekte olan binlerce nurun yeniden parlamasıdır.",
    "Sünnet-i Seniyye yolunda atılan her adım, rıza-i İlahi'ye açılan bir kapıdır."
  ],
  graduation: [
    "İlim rütbesi, rütbelerin en yücesidir. (Hz. Ali)",
    "Bana bir harf öğretenin kırk yıl kölesi olurum. (Hz. Ali)",
    "İlim Çin'de de olsa ona talip olun. (Hadis-i Şerif)",
    "Hayatta en hakiki mürşit ilimdir. (M. Kemal Atatürk)",
    "İlim, amelsiz bir hiçtir; amel ise ihlassız bir yüktür. (İmam Gazali)",
    "Zamanın değerini bilmeyen, başarının tadını alamaz. (Mevlana)",
    "İlim, müminin yitik malıdır; nerede bulursa alsın. (Hadis-i Şerif)",
    "Gayret bizden, tevfik Allah'tandır.",
    "Beşikten mezara kadar ilim öğreniniz. (Hadis-i Şerif)",
    "İlimle geçen bir gece, ibadetle geçen bin geceden hayırlıdır. (Hadis-i Şerif)",
    "Hiç bilenlerle bilmeyenler bir olur mu? (Zümer Suresi, 9)",
    "İnsan için ancak çalıştığının karşılığı vardır. (Necm Suresi, 39)",
    "İlim, kalbin nuru, aklın cilasıdır.",
    "Başarı, azimle yola çıkanların sadık dostudur."
  ],
  marriage: [
    "Sizin en hayırlınız, ailesine karşı en hayırlı olanınızdır. (Hadis-i Şerif)",
    "Evleniniz, çoğalınız; çünkü ben kıyamet gününde diğer ümmetlere karşı sizin çokluğunuzla iftihar edeceğim. (Hadis-i Şerif)",
    "Dünya geçici bir meta’dır. Onun en hayırlı meta’ı ise saliha bir kadındır. (Hadis-i Şerif)",
    "Mümin, hanımına buğzetmesin. Onun bir huyunu beğenmezse, başka bir huyunu beğenir. (Hadis-i Şerif)",
    "Kişi evlendiği zaman dininin yarısını korumuş olur. (Hadis-i Şerif)",
    "Muhabbet, iki ruhun birleşmesidir.",
    "Evlilik, sevgi ve saygı ile örülen kutsal bir bağdır.",
    "Rabbim aranıza sevgi ve merhamet koysun. (Rum Suresi, 21)",
    "Huzur, eşlerin birbirine olan muhabbetinde gizlidir.",
    "Bir yuva, sabırla kurulur, şükürle korunur.",
    "En güzel düğün, takva üzerine kurulan yuvadır.",
    "Eşler, birbirinin örtüsü ve huzurudur.",
    "Evlilik, iki canın bir olması, bir ömür boyu aynı yöne bakmasıdır.",
    "Sevgi, sabır ve sadakat; bir yuvanın üç ana direğidir.",
    "Rabbim kalplerinizi birbirine ısındırsın, yuvanızı bereketli kılsın.",
    "İyi bir eş, dünya hayatının en güzel nimetidir.",
    "Evlilik, sadece bir imza değil, iki gönlün ebedi sözleşmesidir."
  ],
  babyshower: [
    "Çocuk kokusu, cennet kokusudur. (Hadis-i Şerif)",
    "Hiçbir baba, çocuğuna güzel terbiyeden daha üstün bir hediye vermemiştir. (Hadis-i Şerif)",
    "Evlat, dünyada nur, ahirette sürurdur.",
    "Rabbimiz! Bize gözümüzü aydınlatacak eşler ve zürriyetler bağışla. (Furkan Suresi, 74)",
    "Her doğan çocuk, İslam fıtratı üzerine doğar. (Hadis-i Şerif)",
    "Evlat kokusu, cennet çiçeklerinin kokusundandır.",
    "Bir yavru, ailenin en güzel meyvesi, evin en tatlı neşesidir.",
    "Allah'ım, onu salihlerden eyle ve ömrünü bereketli kıl.",
    "Hoş geldin dünyaya, meleklerin duası seninle olsun.",
    "Bir bebeğin gülüşü, yeryüzündeki en masum duadır.",
    "Yavrularımız, kalbimizin dışında atan kalplerimizdir.",
    "Çocuklar, cennetin dünya üzerindeki yansımalarıdır.",
    "Bir çocuğun doğumu, Allah'ın dünyadan henüz umudunu kesmediğinin göstergesidir."
  ]
};

export const fetchSpiritualMessage = async (eventType?: string): Promise<string> => {
  const category = (eventType && SPIRITUAL_QUOTES[eventType]) ? eventType : 'default';
  const quotes = SPIRITUAL_QUOTES[category];
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

export const generateGraduationMessage = async (category: string, name: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const categoryPrompts: Record<string, string> = {
      friends: "Sınıf arkadaşları için veda ve umut dolu bir mezuniyet mesajı. Sınav stresleri, kantin sohbetleri ve kurulan bağlardan bahseden samimi bir metin olsun.",
      family: "Aile için teşekkür ve minnet dolu bir mezuniyet mesajı. Sabırları ve destekleri için teşekkür eden duygusal bir metin olsun.",
      teachers: "Öğretmenler için saygı ve takdir dolu bir mezuniyet mesajı. Öğrettikleri vizyon ve emekleri için teşekkür eden vakur bir metin olsun.",
      social: "Sosyal medya paylaşımı için kısa, öz ve enerjik bir mezuniyet mesajı. Emoji içeren ve hashtag önerisi olan bir metin olsun."
    };

    const prompt = `Kullanıcı İsmi: ${name}. Kategori: ${category}. ${categoryPrompts[category] || "Mezuniyet tebrik mesajı."} 2026 mezuniyet ruhuna uygun, 2-3 cümlelik etkileyici bir metin yaz.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "Sen ilham verici ve duygusal bir yazarsın. Sadece istenen mesajı yaz, tırnak işareti veya giriş cümlesi kullanma.",
      },
    });
    return response.text?.trim() || "Mezuniyetimiz kutlu olsun, yolumuz açık olsun!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Yeni başlangıçlara, başarı dolu yarınlara!";
  }
};

export const generateCustomBlessing = async (name: string, eventNames: string, eventType: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const isGraduation = eventType.toLowerCase().includes('mezuniyet') || eventType.toLowerCase().includes('graduation');
    
    const prompt = isGraduation 
      ? `Misafir ismi: ${name}. ${eventNames} (Mezuniyet Grubu) için toplu bir tebrik ve dua mesajı hazırla. Mesaj; bir arkadaş grubunun omuz omuza verdiği bu büyük başarıyı kutlayan, dostluklarının daim olmasını dileyen, gelecekleri için hayır duaları içeren, 'Amin' ve 'Maşallah' gibi ifadeler barındıran, hem modern (Level Up ruhuna uygun) hem de manevi derinliği olan 1-2 cümlelik samimi bir metin olsun.`
      : `Misafir ismi: ${name}. ${eventNames} isimli kişilerin ${eventType} merasimi/töreni için bu misafire özel bir dua/tebrik hazırla. Mesaj; etkinliğin ruhuna uygun (sünnetse manevi, düğünse aşk ve huzur dolu, baby shower/bebek ise evlat sevgisi ve bereket dolu, doğum günüyse neşeli), manevi derinliği olan, içinde 'Amin', 'Maşallah' gibi ifadeler geçen, edebi ve vakur bir dille yazılmış 1-2 cümlelik bir tebrik/dua olsun.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "Sen edebi ve manevi yönü güçlü, samimi bir asistanısın. Sadece misafirin ağzından dökülen veya misafire hitaben yazılmış, etkinliğin nurunu ve hayır duaları içeren o vakur/samimi cümleyi yaz. Gereksiz giriş-çıkış cümleleri kullanma.",
      },
    });
    return response.text?.trim() || `Rabbim ${eventNames} için bu özel günü mübarek eylesin.`;
  } catch (error) {
    console.error("Gemini Error:", error);
    return `Cenab-ı Hak ${eventNames} için bu adımı hayırlı ve mübarek kılsın.`;
  }
};
