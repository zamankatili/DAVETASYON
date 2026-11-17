// Vercel Edge Function — Gemini'yi sunucuda çağırır, API anahtarı tarayıcıya sızmaz.
// Anahtar tanımlı değilse, özellik kırılmasın diye dürüst yerel fallback'ler döner.
//
// Ortam değişkeni: GEMINI_API_KEY (Vercel Dashboard → Settings → Environment Variables)
// Anahtar: https://aistudio.google.com/apikey (ücretsiz)

export const config = { runtime: 'edge' };

// Vercel Edge runtime: process.env kullanılabilir (Node tipleri eklenmeden bildirilir)
declare const process: { env: Record<string, string | undefined> };

const MODEL = 'gemini-3-flash-preview';

type ChatTurn = { role: 'user' | 'model'; text: string };

type RequestBody =
  | { mode: 'chat'; language: 'tr' | 'en'; eventContext?: { title?: string; venue?: { name?: string; address?: string }; aiContext?: string }; history: ChatTurn[] }
  | { mode: 'blessing'; language: 'tr' | 'en'; name: string; eventNames: string; eventType: string }
  | { mode: 'graduation'; language: 'tr' | 'en'; category: string; name: string };

const buildSystemPrompt = (body: Extract<RequestBody, { mode: 'chat' }>): string => {
  const isEventGuest = !!body.eventContext;
  if (isEventGuest) {
    const ctx = body.eventContext!;
    if (body.language === 'en') {
      return `You are the exclusive Guest Concierge for '${ctx.title || 'this event'}' (Davetasyon). Venue: ${ctx.venue?.name || 'Unknown'}, ${ctx.venue?.address || 'Unknown'}. Special rules/notes (must respect): ${ctx.aiContext || 'No special notes.'} RULES: 1. You represent the host of the event. 2. Keep answers VERY SHORT and CLEAR. 3. Politely redirect off-topic questions back to the event. 4. Parking, kids, dress code → answer from the notes; if unknown say 'I don't have that information; please add it as a note in the RSVP form.'`;
    }
    return `Sen '${ctx.title || 'Bu Harika Etkinlik'}' için özel bir Davet / Misafir Karşılama Asistanısın (Concierge). Mekan: ${ctx.venue?.name || 'Bilinmiyor'}, ${ctx.venue?.address || 'Bilinmiyor'}. Özel Kurallar/Notlar (Bunu dikkate al!): ${ctx.aiContext || 'Ek kural yok.'} Kurallar: 1. Sen etkinlik sahibini temsil ediyorsun. 2. Çok KISA ve NET cevaplar ver. 3. Etkinlik dışı soru sorulursa kibarca davete odaklan. 4. Otopark, çocuk, kıyafet kodu sorularını 'Özel Kurallar'a göre cevapla; orada yoksa 'Bu konuda bilgim yok, LCV formuna not bırakabilirsiniz' de.`;
  }
  if (body.language === 'en') {
    return `You are the luxury, friendly, professional digital assistant of 'Davetasyon' (digital invitation studio). RULES: 1. VERY SHORT answers (1-2 sentences). 2. End every answer with an open-ended question to keep the conversation. 3. Products: Premium — Aeterna (time-capsule masterpiece), Digital Memory Box, Dark Luxury, Aurora, Classic Envelope; Ceremonies — Wedding, Engagement, Henna Night; Special Days — Circumcision Ceremony, Baby Shower, Birthday, Graduation). Features: Dynamic RSVP, AI assistant, Host dashboard, music integration. Packages: Classic Elegance $99, Signature Experience $149 (Most Popular), Haute Couture $490, Digital Memory Box $79 (standalone) / $49 (add-on). 4. End with WhatsApp guidance for details. 5. Only digital-invitation topics.`;
  }
  return `Sen 'Davetasyon'un lüks, samimi ve profesyonel dijital asistanısın. Kurallar: 1. Mümkün olduğunca KISA cevap ver (1-2 cümle). 2. Her cevabın sonuna sohbeti sürdüren açık uçlu bir soru ekle. 3. Ürünlerimiz: Premium: Aeterna (Başyapıt - Zaman Kapsüllü), Dijital Anı Kutusu, Kurumsal Gala (Dark Luxury), Kuzey Işıkları (Aurora), Klasik Zarflı; Tören: Düğün & Nişan & Kına; Özel Günler: Sünnet, Baby Shower, Doğum Günü, Mezuniyet. Temel Sistem: Dinamik LCV, Yapay Zeka Asistanı, Yönetim Paneli, Müzik. Paketler: Zarif Başlangıç 2.450₺, İmza Deneyimi 3.450₺, Haute Couture 14.900₺, Dijital Anı Kutusu 2.250₺ (Davetiyeye ek: 1.450₺). 4. Detaylar için WhatsApp yönlendir. 5. Sadece dijital davetiye konuları.`;
};

// API anahtarı yokken: dürüst, kısa ve yönlendirici yerel cevaplar
const fallbackChat = (body: Extract<RequestBody, { mode: 'chat' }>): string => {
  const lastUser = [...(body.history || [])].reverse().find((t) => t.role === 'user')?.text?.toLowerCase() || '';
  const tr = body.language !== 'en';
  if (/fiyat|paket|kaç (lira|tl)|ne kadar|price|cost/.test(lastUser)) {
    return tr
      ? 'Fiyatlarımız: Zarif Başlangıç 2.450₺, İmza Deneyimi 3.450₺, Haute Couture 14.900₺, Dijital Anı Kutusu 2.250₺. Detaylar için bize yazın. Etkinliğiniz ne zaman?'
      : 'Pricing: Classic Elegance $99, Signature Experience $149, Haute Couture $490, Digital Memory Box $79. Send us a message for details. When is your event?';
  }
  if (/lcv|rsvp|katıl/.test(lastUser)) {
    return tr
      ? 'LCV formu her davetiyede canlıdır: misafirleriniz "Katılıyorum/Katılmıyorum" der, siz panelde anında görürsünüz. Etkinliğiniz hangi tarihte?'
      : 'Every invitation includes a live RSVP: guests tap Attending/Declining, you see it in the panel instantly. When is your event?';
  }
  if (/müzik|music/.test(lastUser)) {
    return tr
      ? 'Her şablon kendi atmosferik müzik temasıyla gelir; özel isteğinizi de ekleyebiliriz. Hangi konsept ilginizi çekiyor?'
      : 'Every template ships with its own atmospheric track; custom requests are possible too. Which concept resonates with you?';
  }
  if (/sipariş|order|nasıl al|satın/.test(lastUser)) {
    return tr
      ? 'Sipariş için "Size Özel Tasarlayalım" butonu (sağ üst) ya da bu sayfadaki formu doldurun; 24 saat içinde dönüş yaparız. Etkinliğiniz nedir?'
      : 'To order, use the "Design For You" button (top-right) or the form on this page; we reply within 24h. What is your event?';
  }
  return tr
    ? 'Davetasyon — sinematik dijital davetiyeler (düğün, kına, sünnet, kurumsal etkinlik). Size nasıl yardımcı olabilirim? Etkinliğiniz ne zaman?'
    : 'Davetasyon — cinematic digital invitations (weddings, henna, circumcision, corporate). How can I help? When is your event?';
};

const fallbackBlessing = (language: 'tr' | 'en', eventNames: string): string =>
  language === 'en'
    ? `May ${eventNames} be blessed, may this beautiful day overflow with joy and serenity. Amen.`
    : `Rabbim ${eventNames} için bu özel günü, yuvanızı bereketle, hayırlısıyla mühürle kılsın. Amin.`;

const fallbackGraduation = (language: 'tr' | 'en', name: string): string =>
  language === 'en'
    ? `Congratulations ${name}! May your diploma be the beginning of your brightest chapters.`
    : `${name}, mezuniyetin hayırlı olsun! Diploman, en parlak bölümlerin başlangıcı olsun.`;

const geminiGenerate = async (apiKey: string, systemInstruction: string, prompt: string): Promise<string> => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: systemInstruction }] },
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.8, maxOutputTokens: 256 },
    }),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini ${res.status}: ${errText.slice(0, 200)}`);
  }
  const data = await res.json();
  const text: string | undefined = data?.candidates?.[0]?.content?.parts?.map((p: any) => p?.text || '').join('').trim();
  if (!text) throw new Error('Gemini boş yanıt döndürdü');
  return text;
};

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'GET') {
    return Response.json({ ok: true, configured: !!process.env.GEMINI_API_KEY });
  }
  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  let body: RequestBody;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Geçersiz JSON gövdesi' }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  try {
    if (body.mode === 'chat') {
      const { language, history = [] } = body;
      const systemInstruction = buildSystemPrompt(body);
      if (!apiKey) {
        return Response.json({ text: fallbackChat(body), fallback: true });
      }
      // Sohbet geçmişini Gemini formatına çevir
      const contents = history.map((t) => ({ role: t.role, parts: [{ text: t.text }] }));
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemInstruction }] },
          contents,
          generationConfig: { temperature: 0.8, maxOutputTokens: 300 },
        }),
      });
      if (!res.ok) {
        console.error('Gemini chat HTTP', res.status);
        return Response.json({ text: fallbackChat(body), fallback: true });
      }
      const data = await res.json();
      const text: string = data?.candidates?.[0]?.content?.parts?.map((p: any) => p?.text || '').join('').trim() || '';
      if (!text) return Response.json({ text: fallbackChat(body), fallback: true });
      return Response.json({ text });
    }

    if (body.mode === 'blessing') {
      if (!apiKey) return Response.json({ text: fallbackBlessing(body.language, body.eventNames), fallback: true });
      const isGraduation = /mezuniyet|graduation/i.test(body.eventType || '');
      const prompt = isGraduation
        ? `Misafir ismi: ${body.name}. ${body.eventNames} (Mezuniyet Grubu) için toplu bir tebrik ve dua mesajı. Dostluğun daim olması, gelecek için hayır duaları, 'Amin' ve 'Maşallah' barındıran, 1-2 cümlelik samimi metin.`
        : `Misafir ismi: ${body.name}. ${body.eventNames} kişilerin ${body.eventType} merasimi için misafire özel dua/tebrik. Etkinliğin ruhuna uygun, 'Amin'/'Maşallah' barındıran, vakur 1-2 cümlelik metin.`;
      const systemInstruction = "Sen edebi ve manevi yönü güçlü, samimi bir asistansın. Sadece misafirin ağzından dökülen veya misafire hitaben yazılmış o vakur/samimi cümleyi yaz. Gereksiz giriş-çıkış cümlesi kullanma.";
      return Response.json({ text: await geminiGenerate(apiKey, systemInstruction, prompt) });
    }

    if (body.mode === 'graduation') {
      if (!apiKey) return Response.json({ text: fallbackGraduation(body.language, body.name), fallback: true });
      const categoryPrompts: Record<string, string> = {
        friends: 'Sınıf arkadaşları için veda ve umut dolu bir mezuniyet mesajı. Sınav stresleri, kantin sohbetleri ve kurulan bağlardan bahseden samimi metin.',
        family: 'Aile için teşekkür ve minnet dolu bir mezuniyet mesajı. Sabırları ve destekleri için teşekkür eden duygusal metin.',
        teachers: "Öğretmenler için saygı ve takdir dolu bir mezuniyet mesajı. Öğrettikleri vizyon ve emekleri için teşekkür eden vakur metin.",
        social: 'Sosyal medya paylaşımı için kısa, öz ve enerjik mezuniyet mesajı. Emoji ve hashtag önerisi içersin.',
      };
      const prompt = `Kullanıcı İsmi: ${body.name}. Kategori: ${body.category}. ${categoryPrompts[body.category] || 'Mezuniyet tebrik mesajı.'} 2026 mezuniyet ruhuna uygun, 2-3 cümlelik etkileyici metin yaz.`;
      const systemInstruction = "Sen ilham verici ve duygusal bir yazarsın. Sadece istenen mesajı yaz, tırnak işareti veya giriş cümlesi kullanma.";
      return Response.json({ text: await geminiGenerate(apiKey, systemInstruction, prompt) });
    }

    return Response.json({ error: 'Bilinmeyen mode' }, { status: 400 });
  } catch (err: any) {
    console.error('Gemini proxy hatası:', err?.message || err);
    // Hata durumunda da özellik kırılmasın
    if (body.mode === 'chat') return Response.json({ text: fallbackChat(body), fallback: true });
    if (body.mode === 'blessing') return Response.json({ text: fallbackBlessing(body.language, body.eventNames), fallback: true });
    return Response.json({ text: fallbackGraduation(body.language, body.name), fallback: true });
  }
}
