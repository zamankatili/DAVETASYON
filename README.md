# 🌟 Osman Emir & Ömer Asaf Sünnet Davetiyesi

Bu proje, Osman Emir ve Ömer Asaf'ın sünnet merasimi için hazırlanmış, **Google Gemini AI** destekli, interaktif ve modern bir dijital davetiyedir.

## 🚀 Özellikler
- **Yapay Zeka (Gemini AI):** Misafirlere özel isimle manevi tebrik mesajları oluşturur.
- **WhatsApp Entegrasyonu:** Oluşturulan mesajları aileye tek tıkla gönderir.
- **Geri Sayım Sayacı:** Etkinlik anına kadar canlı sayaç.
- **Interaktif Harita:** Konvoy ve Salon konumlarına doğrudan navigasyon butonları.
- **Dinamik İçerik:** Her açılışta değişen 50+ hadis ve hikmetli söz.

---

## 🛠️ Kurulum ve Yayına Alma (GitHub & Vercel)

Davetiyenizi internette yayınlamak için şu adımları izleyin:

### 1. Hazırlık
`App.tsx` dosyası içindeki `HOST_PHONE` değişkenine kendi WhatsApp numaranızı (ülke koduyla birlikte, örn: `90532...`) yazdığınızdan emin olun.

### 2. GitHub'a Yükleme
Eğer bilgisayarınızda Git yüklü ise:
1. GitHub üzerinde yeni bir **Public** depo (repository) oluşturun.
2. Terminali açın ve projenin olduğu klasöre gidin:
   ```bash
   git init
   git add .
   git commit -m "İlk sürüm: Sünnet Davetiyesi"
   git branch -M main
   git remote add origin https://github.com/KULLANICI_ADINIZ/REPO_ADINIZ.git
   git push -u origin main
   ```

### 3. Vercel ile Canlıya Alma (En Kolay Yol)
1. [Vercel.com](https://vercel.com) adresine gidin ve GitHub hesabınızla giriş yapın.
2. **"Add New Project"** butonuna basın ve oluşturduğunuz depoyu seçin.
3. **Environment Variables** (Ortam Değişkenleri) kısmına şunları ekleyin:
   - `API_KEY`: Google AI Studio'dan aldığınız Gemini API anahtarı.
4. **Deploy** butonuna basın. Birkaç saniye içinde linkiniz hazır!

---

## ⚠️ Önemli Notlar
- **API Key:** Gemini AI özelliklerinin (Özel Tebrik Oluşturma) çalışması için geçerli bir API anahtarı gereklidir. Bu anahtarı [Google AI Studio](https://aistudio.google.com/) üzerinden ücretsiz alabilirsiniz.
- **Mobil Uyumluluk:** Tasarım tamamen responsive (mobil uyumlu) olarak hazırlanmıştır.

---

## 💍 Aileler
- **Hacer & Mehmet AYBEY**
- **Kadriye & İbrahim DULAN**

*Bu mutlu günümüzde sizleri de aramızda görmekten mutluluk duyarız.*
