import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CountUp = ({ value, duration = 1.5 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value, 10);
      if (start === end) return;

      const totalMiliseconds = duration * 1000;
      const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 16);

      const timer = setInterval(() => {
        start += Math.ceil(end / (totalMiliseconds / 16));
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        setCount(start);
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
};

const About = () => {
  return (
    <section id="about" className="section" style={{ background: 'rgba(var(--color-secondary-rgb), 0.01)' }}>
      <div className="container about-grid">
        {/* Left Side text content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ type: 'spring', stiffness: 80, damping: 15 }}
          className="about-details"
        >
          <div className="badge">Our Story</div>
          <h3>Choreographing Immersive Wilderness Discoveries</h3>
          <p>
            At YatraVista, we go beyond cookie-cutter resort packages and standard mass tourism. We believe that true travel is an immersive discovery of India — its landscapes, cultures, and hidden gems that only a local expert can reveal.
          </p>
          <p>
            We are a dedicated collective of cartographers, wilderness guides, and local cultural historians. By marrying challenging backcountry routes with luxury eco-camp comfort, we craft expeditions that protect biodiversity and respect local communities.
          </p>
        </motion.div>

        {/* Right Side Stats Counter Grid */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ type: 'spring', stiffness: 80, damping: 15 }}
          className="stats-grid"
        >
          <div className="stat-item">
            <div className="stat-num">
              <CountUp value="38" />
            </div>
            <div className="stat-label">Destinations Explored</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-num">
              <CountUp value="85" />
            </div>
            <div className="stat-label">Expedition Guides</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-num">
              <CountUp value="10" />k+
            </div>
            <div className="stat-label">Happy Travelers</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
