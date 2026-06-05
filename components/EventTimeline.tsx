import React from 'react';
import { motion } from 'framer-motion';

interface TimelineItem {
  time: string;
  activity: string;
}

interface EventTimelineProps {
  items: TimelineItem[];
  title: string;
  themeColor: string;
  theme?: 'light' | 'dark';
}

const EventTimeline: React.FC<EventTimelineProps> = ({ items, title, themeColor, theme = 'dark' }) => {
  const isLight = theme === 'light';

  return (
    <div className="w-full max-w-lg mx-auto py-12 px-6">
      <h3 className={`text-xs uppercase tracking-[8px] ${isLight ? 'text-black/40' : 'text-white/40'} mb-12 text-center font-black`}>{title}</h3>
      
      <div className="relative">
        {/* Vertical Line */}
        <div className={`absolute left-1/2 top-0 bottom-0 w-px ${isLight ? 'bg-black/10' : 'bg-white/10'} -translate-x-1/2`}></div>
        
        <div className="space-y-12">
          {items.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`relative flex items-center ${idx % 2 === 0 ? 'flex-row-reverse' : ''}`}
            >
              {/* Content */}
              <div className={`w-1/2 ${idx % 2 === 0 ? 'pl-8 text-left' : 'pr-8 text-right'}`}>
                <div className="text-lg font-serif italic" style={{ color: themeColor }}>{item.time}</div>
                <div className={`text-sm ${isLight ? 'text-black/70' : 'text-white/70'} font-medium tracking-wide`}>{item.activity}</div>
              </div>
              
              {/* Dot */}
              <div className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full ${isLight ? 'bg-black border-white' : 'bg-white border-black'} border-4 z-10`} style={{ borderColor: isLight ? '#fff' : '#000', backgroundColor: themeColor }}></div>
              
              {/* Spacer for the other side */}
              <div className="w-1/2"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventTimeline;
