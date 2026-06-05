import React from 'react';

// ARTIK KULLANILMIYOR: Tüm müzikler global olarak App.tsx'teki ambientAudioRef üzerinden yönetiliyor.
// Bu bileşen, şablonlardaki içe aktarmaları bozmamak için geçici olarak boş bırakılmıştır.
interface BackgroundMusicProps {
  url: string;
}

const BackgroundMusic: React.FC<BackgroundMusicProps> = () => {
  return null;
};

export default BackgroundMusic;
