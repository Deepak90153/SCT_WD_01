import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001
  });

  return (
    <motion.div
      style={{
        scaleX,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-accent) 50%, var(--color-secondary) 100%)',
        transformOrigin: '0%',
        zIndex: 99999,
        boxShadow: '0 0 10px rgba(217, 119, 6, 0.6)',
        borderRadius: '0 2px 2px 0'
      }}
    />
  );
};

export default ScrollProgress;

