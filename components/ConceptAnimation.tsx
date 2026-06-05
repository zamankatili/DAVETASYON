import React from 'react';
import { motion } from 'framer-motion';

interface ConceptAnimationProps {
  type: 'birthday' | 'engagement' | 'babyshower' | 'wedding' | 'sunnet' | 'graduation';
}

const ConceptAnimation: React.FC<ConceptAnimationProps> = ({ type }) => {
  if (type === 'graduation') {
    const confettiColors = ['#ffd700', '#c0c0c0', '#ffffff', '#1e90ff', '#000080'];
    return (
      <div className="fixed inset-0 pointer-events-none z-[150] overflow-hidden">
        {/* Confetti */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`confetti-${i}`}
            initial={{ y: '-10vh', x: `${Math.random() * 100}vw`, rotate: 0 }}
            animate={{ 
              y: '110vh',
              x: `${(Math.random() * 100) + (Math.sin(i) * 20)}vw`,
              rotate: 720
            }}
            transition={{ 
              duration: 3 + Math.random() * 4, 
              delay: Math.random() * 5,
              ease: "linear",
              repeat: Infinity
            }}
            className="absolute w-2 h-2"
            style={{ backgroundColor: confettiColors[i % confettiColors.length] }}
          />
        ))}
        {/* Flying Caps */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`cap-${i}`}
            initial={{ y: '110vh', x: `${10 + Math.random() * 80}vw`, rotate: -20 }}
            animate={{ 
              y: '-20vh',
              x: `${(Math.random() * 100)}vw`,
              rotate: 360
            }}
            transition={{ 
              duration: 5 + Math.random() * 3, 
              delay: 1 + Math.random() * 4,
              ease: "easeOut"
            }}
            className="absolute text-5xl filter drop-shadow-lg"
          >
            🎓
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === 'birthday') {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    return (
      <div className="fixed inset-0 pointer-events-none z-[150] overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: '110vh', x: `${Math.random() * 100}vw`, scale: 0.5 + Math.random() }}
            animate={{ 
              y: '-20vh',
              x: `${(Math.random() * 100) + (Math.sin(i) * 10)}vw`,
            }}
            transition={{ 
              duration: 4 + Math.random() * 4, 
              delay: Math.random() * 2,
              ease: "easeOut"
            }}
            className="absolute w-12 h-16 rounded-t-full rounded-b-[60%] shadow-lg"
            style={{ backgroundColor: colors[i % colors.length] }}
          >
            <div className="absolute bottom-[-10px] left-1/2 w-[1px] h-10 bg-white/30 -translate-x-1/2" />
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === 'engagement') {
    return (
      <div className="fixed inset-0 pointer-events-none z-[150] overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="absolute" style={{ left: `${Math.random() * 100}vw`, top: `${Math.random() * 100}vh` }}>
            {[...Array(12)].map((_, j) => (
              <motion.div
                key={j}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ 
                  x: Math.cos((j * 30) * (Math.PI / 180)) * 150,
                  y: Math.sin((j * 30) * (Math.PI / 180)) * 150,
                  scale: 1,
                  opacity: 0
                }}
                transition={{ 
                  duration: 1.5, 
                  delay: i * 0.4,
                  ease: "easeOut"
                }}
                className="absolute w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_10px_#facc15]"
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (type === 'babyshower') {
    return (
      <div className="fixed inset-0 pointer-events-none z-[150] overflow-hidden">
        <motion.div
          initial={{ x: '-20vw', y: '30vh', scale: 0.8 }}
          animate={{ x: '120vw', y: '20vh' }}
          transition={{ duration: 8, ease: "linear" }}
          className="absolute text-8xl"
        >
          🦢
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-10 left-10 text-4xl"
          >
            👶
          </motion.div>
        </motion.div>
      </div>
    );
  }

  if (type === 'wedding') {
    return (
      <div className="fixed inset-0 pointer-events-none z-[150] overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: '-10vh', x: `${Math.random() * 100}vw`, rotate: 0 }}
            animate={{ 
              y: '110vh',
              x: `${(Math.random() * 100) + (Math.sin(i) * 20)}vw`,
              rotate: 360
            }}
            transition={{ 
              duration: 5 + Math.random() * 5, 
              delay: Math.random() * 3,
              ease: "linear",
              repeat: Infinity
            }}
            className="absolute w-4 h-4 bg-red-500/60 rounded-full"
            style={{ borderRadius: '50% 0 50% 50%' }}
          />
        ))}
      </div>
    );
  }

  if (type === 'sunnet') {
    return (
      <div className="fixed inset-0 pointer-events-none z-[150] overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0, x: '50vw', y: '50vh' }}
            animate={{ 
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              x: `${Math.random() * 100}vw`,
              y: `${Math.random() * 100}vh`,
            }}
            transition={{ 
              duration: 2 + Math.random() * 2, 
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
            className="absolute text-yellow-400 text-2xl"
          >
            {i % 2 === 0 ? '⭐' : '🌙'}
          </motion.div>
        ))}
      </div>
    );
  }

  return null;
};

export default ConceptAnimation;
