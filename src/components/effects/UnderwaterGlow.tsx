import React from 'react';
import { motion } from 'framer-motion';

export const UnderwaterGlow = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Soft animated light rays */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-[200%] bg-gradient-to-b from-cyan-400/5 via-cyan-300/10 to-transparent blur-3xl"
        animate={{
          rotate: [0, 5, 0, -5, 0],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute top-0 right-1/4 w-96 h-[200%] bg-gradient-to-b from-teal-400/5 via-teal-300/10 to-transparent blur-3xl"
        animate={{
          rotate: [0, -5, 0, 5, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2,
        }}
      />
      
      {/* Bottom glow effect */}
      <div className="absolute bottom-0 w-full h-96 bg-gradient-to-t from-cyan-400/10 to-transparent blur-xl" />
    </div>
  );
};
