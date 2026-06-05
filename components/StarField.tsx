
import React, { useEffect, useState } from 'react';

interface StarFieldProps {
  color?: string;
  opacity?: number;
  backgroundColor?: string;
}

const StarField: React.FC<StarFieldProps> = ({ 
  color = "white", 
  opacity = 1, 
  backgroundColor = "#020617" 
}) => {
  const [stars, setStars] = useState<{ id: number, top: string, left: string, size: string, duration: string, delay: string }[]>([]);

  useEffect(() => {
    const starCount = window.innerWidth < 768 ? 100 : 200;
    const newStars = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}vh`,
      left: `${Math.random() * 100}vw`,
      size: `${Math.random() * 3 + (window.innerWidth < 768 ? 2 : 1.5)}px`,
      duration: `${Math.random() * 3 + 2}s`,
      delay: `${Math.random() * 5}s`,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ backgroundColor }}>
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full opacity-0 animate-twinkle"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            backgroundColor: color,
            boxShadow: `0 0 ${parseInt(star.size) * 2}px ${color}`,
            opacity: opacity,
            animationDuration: star.duration,
            animationDelay: star.delay,
            animationIterationCount: 'infinite',
          } as React.CSSProperties}
        />
      ))}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(0.8); }
          50% { opacity: 0.9; transform: scale(1.2); }
        }
        .animate-twinkle {
          animation-name: twinkle;
          animation-timing-function: ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default StarField;
