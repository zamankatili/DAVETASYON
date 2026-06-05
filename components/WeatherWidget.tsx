import React from 'react';
import { motion } from 'framer-motion';

interface WeatherWidgetProps {
  title: string;
  desc: string;
  themeColor: string;
  theme?: 'light' | 'dark';
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ title, desc, themeColor, theme = 'dark' }) => {
  const isLight = theme === 'light';

  return (
    <div className={`w-full max-w-md mx-auto p-8 rounded-3xl border ${isLight ? 'border-black/10 bg-black/5' : 'border-white/10 bg-white/5'} backdrop-blur-md shadow-xl text-center`}>
      <div className="flex items-center justify-center gap-6 mb-6">
        <motion.div 
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="text-5xl"
        >
          ☀️
        </motion.div>
        <div className="text-left">
          <h4 className="text-xl font-serif italic" style={{ color: themeColor }}>26°C / 18°C</h4>
          <p className={`${isLight ? 'text-black/40' : 'text-white/40'} text-[10px] uppercase tracking-widest`}>{title}</p>
        </div>
      </div>
      <p className={`${isLight ? 'text-black/60' : 'text-white/60'} text-sm font-medium tracking-wide leading-relaxed`}>
        {desc}
      </p>
    </div>
  );
};

export default WeatherWidget;
