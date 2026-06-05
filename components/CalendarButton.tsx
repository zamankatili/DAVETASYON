import React from 'react';

interface CalendarButtonProps {
  label: string;
  themeColor: string;
  event: {
    title: string;
    date: string;
    location: string;
    description: string;
  };
  theme?: 'light' | 'dark';
}

const CalendarButton: React.FC<CalendarButtonProps> = ({ label, themeColor, event, theme = 'dark' }) => {
  const handleCalendar = () => {
    // Basic Google Calendar link generator
    const start = event.date.replace(/-/g, '') + 'T190000Z';
    const end = event.date.replace(/-/g, '') + 'T220000Z';
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${start}/${end}&location=${encodeURIComponent(event.location)}&details=${encodeURIComponent(event.description)}`;
    window.open(url, '_blank');
  };

  const isLight = theme === 'light';

  return (
    <button 
      onClick={handleCalendar}
      className={`group relative px-8 py-4 overflow-hidden rounded-full transition-all active:scale-95 border ${isLight ? 'border-black/20 hover:border-black/40' : 'border-white/20 hover:border-white/40'}`}
    >
      <span className={`relative z-10 ${isLight ? 'text-black group-hover:text-white' : 'text-white group-hover:text-black'} font-sans font-bold tracking-[4px] uppercase text-[10px] transition-colors duration-300`}>
        {label}
      </span>
      <span className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300" style={{ backgroundColor: themeColor }}></span>
    </button>
  );
};

export default CalendarButton;
