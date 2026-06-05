import React from 'react';

interface LocationMapProps {
  language: 'tr' | 'en';
  themeColor: string;
  venueName: string;
  address: string;
  googleMapsUrl: string;
  darkTheme?: boolean;
  theme?: 'light' | 'dark';
}

const LocationMap: React.FC<LocationMapProps> = ({ language, themeColor, venueName, address, googleMapsUrl, darkTheme = false, theme = 'dark' }) => {
  const t = {
    tr: {
      title: "Konum & Navigasyon",
      directions: "Yol Tarifi Al",
      openMap: "Google Haritalar'da Aç"
    },
    en: {
      title: "Location & Navigation",
      directions: "Get Directions",
      openMap: "Open in Google Maps"
    }
  }[language];

  const isLight = theme === 'light';

  return (
    <div className={`w-full max-w-2xl mx-auto p-10 rounded-3xl border ${isLight ? 'border-black/10 bg-black/5' : 'border-white/10 bg-white/5'} backdrop-blur-md shadow-xl text-center`}>
      <div className={`inline-flex items-center gap-3 px-4 py-2 ${isLight ? 'bg-black/5 border-black/10' : 'bg-white/5 border-white/10'} rounded-full mb-8`}>
        <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: themeColor }}></span>
        <span className="text-[10px] uppercase tracking-[4px] font-bold" style={{ color: themeColor }}>{t.title}</span>
      </div>

      <h3 className={`text-3xl font-serif italic mb-4 ${isLight ? 'text-black' : 'text-white'}`}>{venueName}</h3>
      <p className={`${isLight ? 'text-black/50' : 'text-white/50'} text-sm mb-10 leading-relaxed max-w-md mx-auto`}>{address}</p>

      <div className={`relative aspect-video rounded-2xl overflow-hidden border ${isLight ? 'border-black/10' : 'border-white/10'} mb-10 group`}>
        <iframe
          title="Google Maps Location"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(venueName + ' ' + address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
          width="100%"
          height="100%"
          style={{ border: 0, filter: darkTheme ? 'grayscale(100%) invert(90%) contrast(80%)' : 'grayscale(50%) contrast(90%)' }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 z-0"
        ></iframe>
        <div className="absolute inset-0 bg-black/20 pointer-events-none z-10"></div>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        <button 
          onClick={() => window.open(googleMapsUrl, '_blank')}
          className="px-12 py-5 rounded-full text-[10px] font-black uppercase tracking-[4px] transition-all hover:scale-105 shadow-xl"
          style={{ backgroundColor: themeColor, color: '#000' }}
        >
          {t.directions}
        </button>
        <button 
          onClick={() => window.open(googleMapsUrl, '_blank')}
          className={`px-12 py-5 rounded-full text-[10px] font-black uppercase tracking-[4px] transition-all border ${isLight ? 'border-black/20 text-black hover:bg-black/10' : 'border-white/20 text-white hover:bg-white/10'}`}
        >
          {t.openMap}
        </button>
      </div>
    </div>
  );
};

export default LocationMap;
