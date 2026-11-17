import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';

// Davetasyon — Yasal metinler (GENEL ŞABLON)
// Köşe parantezli alanlar, işletme kimliği netleştiğinde (unvan, VKN, adres, e-posta)
// satış öncesinde doldurulacaktır. Bu metinler hukuki danışmanlık yerine geçmez.

interface LegalDoc {
  title: string;
  sections: { heading: string; body: string }[];
}

const DOCS: Record<string, LegalDoc> = {
  kvkk: {
    title: 'KVKK Aydınlatma Metni',
    sections: [
      {
        heading: 'Veri Sorumlusu',
        body: 'Davetasyon dijital davetiye hizmeti (bundan böyle “Davetasyon”) kapsamında veri sorumlusu: [Yetkili Unvanı], [Adres], [E-posta]. Bu metin, 6698 sayılı KVKK m. 10 uyarınca aydınlatma yükümlülüğümüzü yerine getirmek amacıyla hazırlanmıştır.',
      },
      {
        heading: 'İşlenen Kişisel Veriler',
        body: 'Etkinlik isimleri, davetli ad-soyadları, iletişim bilgileri (WhatsApp no / e-posta), etkinlik içeriği (mekan, tarih, konsept), LCV yanıtları, notlar ve (Anı Kutusu kullanılıyorsa) yüklenen fotoğraf/video kayıtları.',
      },
      {
        heading: 'İşleme Amaçları',
        body: 'Davetiyenin oluşturulması ve yayına alınması, katılım (LCV) takibinin sunulması, sipariş talebinizin değerlendirilmesi ve size dönüş yapılması, yükümlülüğümüzün yerine getirilmesi ve yasal gerekliliklerden doğan saklama yükümlülükleri.',
      },
      {
        heading: 'Hukuki Sebepler',
        body: 'KVKK m. 5/2 (c) sözleşmenin kurulması ve ifası için gerekli olması, m. 5/2 (f) ilgili kişinin kendisi tarafından alenileştirilme hali ve m. 5/2 (d) veri sorumlusunun hukuki yükümlülüğü sebebiyle veri işleme zorunluluğu.',
      },
      {
        heading: 'Kimler ile / Nerede Paylaşılıyor',
        body: 'Veriler; barındırma altyapımız (Google Firebase/Cloud) ve sipariş sürecinde bizimle paylaştığınız iletişim araçları (WhatsApp) dışında üçüncü kişilerle paylaşılmaz. Verileriniz yurt içinde veya yurt dışında barındırılan sunucularda saklanabilir.',
      },
      {
        heading: 'Saklama Süresi',
        body: 'Davetiye içeriği ve sipariş kayıtları, hizmetten yararlanma süresi + 1 yıl boyunca saklanır; talep üzerine ve hizmet sonunda silinir/anonimleştirilir.',
      },
      {
        heading: 'Haklarınız',
        body: 'KVKK m. 11 kapsamında; işlenen verileriniz hakkında bilgi talep edebilir, düzeltme/silme/anonimleştirme isteyebilir, işlemeye itiraz edebilirsiniz. Talebiniz için: [E-posta].',
      },
    ],
  },
  cerez: {
    title: 'Çerez Politikası',
    sections: [
      {
        heading: 'Hangi Çerezleri Kullanırız',
        body: 'Zorunlu çerezler (oturum, güvenlik, dil tercihi) her zaman kullanılır. Ölçümleme/pazarlama çerezleri (ör. Google Ads, Meta pikseli) yalnızca onayınızla yüklenir; onayınızı reddetmeniz hizmetin kullanımını etkilemez.',
      },
      {
        heading: 'Onayınız',
        body: 'Siteyi ilk ziyaretinizde gösterilen çerez tercihleri bandından onay verebilir, reddedebilir veya kararınızı sayfa altındaki “Çerez Tercihleri” bağlantısından dilediğinizde değiştirebilirsiniz.',
      },
      {
        heading: 'Üçüncü Taraf Çerezleri',
        body: 'Onayınız olursa Google/Meta sunucularına anonim kullanım verileri aktarılabilir. Bu politikayı güncel tutarız; önemli değişikliklerde sizi sayfa üzerinden bilgilendiririz.',
      },
    ],
  },
  'mesafeli-satis': {
    title: 'Mesafeli Satış Sözleşmesi',
    sections: [
      {
        heading: 'Taraflar',
        body: 'SATICI: [Yetkili Unvanı], [Adres], [E-posta], [Telefon]. ALICI: siparişi oluşturan kişi (“Siz”).',
      },
      {
        heading: 'Konu',
        body: 'ALICI’nın SATICI’dan satın aldığı dijital davetiye tasarım ve yayına alma hizmetine ilişkin tarafların hak ve yükümlülüklerinin belirlenmesidir.',
      },
      {
        heading: 'Hizmet ve Teslimat',
        body: 'Hizmet dijitaldir; siparişinizin ardından davetiye linkiniz/ayarlarınız dijital ortamda size iletilir. Fiziksel teslimat yapılmaz; posta/kargo söz konusu değildir.',
      },
      {
        heading: 'Fiyat ve Ödeme',
        body: 'Fiyatlar sitenin “Paketler” bölümünde KDV dahil gösterilir. Ödeme, SATICI tarafından bildirilecek hesaba havale/EFT yoluyla yapılır. Dekont, işleme başlanması için yeterlidir.',
      },
      {
        heading: 'Cayma Hakkı',
        body: 'Mesafeli Sözleşmeler Yönetmeliği m. 15 uyarınca; hizmet ifası başladıktan ve dijital ürün teslim edildikten sonra cayma hakkı kullanılamaz. Henüz davetiye hazırlığına başlanmadıysa siparişi iptal edebilirsiniz.',
      },
      {
        heading: 'Uyuşmazlık',
        body: 'İşbu sözleşmeden doğan uyuşmazlıklarda tüketici hakem heyetlerine ve tüketici mahkemelerine başvurulabilir.',
      },
    ],
  },
  iade: {
    title: 'Teslimat ve İade Şartları',
    sections: [
      {
        heading: 'Teslimat',
        body: 'Tüm ürün ve hizmetler dijitaldir; teslimat, davetiye linkinin ve panel erişiminin size e-posta/WhatsApp üzerinden iletilmesiyle gerçekleşir. İletim süresi paketinize göre 24 saat – 21 iş günü arasındadır.',
      },
      {
        heading: 'İade',
        body: 'Hazırlığa başlanmamış siparişlerde tam iade yapılır. Hazırlığı başlamış, yayına alınmış veya link erişimi sağlanmış çalışmalarda hizmet dijital ifasına başlandığı için iade yapılmaz (cayma hakkı istisnası).',
      },
      {
        heading: 'Verilerin Silinmesi',
        body: 'KVKK/GDPR kapsamında verilerinizin silinmesini her zaman talep edebilirsiniz: [E-posta]. Talebiniz, silinmeyle birlikte Anı Kutusu ve LCV kayıtlarına uygulanır.',
      },
    ],
  },
  'on-bilgilendirme': {
    title: 'Ön Bilgilendirme Formu',
    sections: [
      {
        heading: 'Satıcı Bilgileri',
        body: '[Yetkili Unvanı], [Adres], [E-posta], [Telefon], Vergi No: [VKN].',
      },
      {
        heading: 'Ürün / Hizmet',
        body: 'Dijital davetiye tasarımı, yayına alma, LCV (katılım takibi) paneli ve seçtiğiniz ek özellikler (Anı Kutusu, özel müzik, hızlı teslimat vb.).',
      },
      {
        heading: 'Fiyat ve Ödeme',
        body: 'Fiyatlar KDV dahil sitede belirtilmiştir. Ödeme havale/EFT ile yapılır; sipariş tamamlanmadan ek ücret talep edilmez.',
      },
      {
        heading: 'Teslimat ve Cayma',
        body: 'Ürün dijitaldir; teslimat elektronik ortamda yapılır. Hazırlığa başlandıktan sonra cayma hakkı kullanılamaz (Mesafeli Sözleşmeler Yönetmeliği m. 15).',
      },
      {
        heading: 'Şikayet / Talep',
        body: 'Sorularınız için: [E-posta]. Başvurularınız en geç 24 saat içinde cevaplanır.',
      },
    ],
  },
};

const ORDER = ['kvkk', 'cerez', 'mesafeli-satis', 'iade', 'on-bilgilendirme'];

export const LegalPages: React.FC = () => {
  const { docId } = useParams<{ docId: string }>();
  const doc = docId ? DOCS[docId] : undefined;

  if (!doc) {
    return <Navigate to="/yasal/kvkk" replace />;
  }

  return (
    <main className="min-h-screen bg-[#11100F] text-[#F5F2EB] px-6 py-16 md:px-12">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="text-[#C9A87C] text-[10px] uppercase tracking-[0.3em] font-bold hover:text-[#F5F2EB] transition-colors">
          ← Ana Sayfaya Dön
        </Link>
        <h1 className="text-4xl md:text-5xl font-serif italic mt-8 mb-4 text-[#C9A87C]">{doc.title}</h1>
        <p className="text-white/40 text-xs uppercase tracking-widest mb-10">Davetasyon — Güncelleme: Kasım 2026</p>
        <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-200/80 text-xs rounded-xl px-4 py-3 mb-10 leading-relaxed">
          Bu metin genel bir şablondur; köşe parantezli alanlar satış öncesinde işletme bilgileriyle doldurulacaktır.
          Hukuki danışmanlık yerine geçmez.
        </div>
        {doc.sections.map((s) => (
          <section key={s.heading} className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-2">{s.heading}</h2>
            <p className="text-white/60 text-sm leading-relaxed">{s.body}</p>
          </section>
        ))}
        <nav className="mt-14 pt-8 border-t border-white/10 flex flex-wrap gap-4 text-[10px] uppercase tracking-[0.2em] font-bold">
          {ORDER.map((key) => (
            <Link key={key} to={`/yasal/${key}`} className={`transition-colors ${key === docId ? 'text-[#C9A87C]' : 'text-white/30 hover:text-white'}`}>
              {DOCS[key].title}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
};

export default LegalPages;
