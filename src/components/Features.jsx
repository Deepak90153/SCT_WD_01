import React from 'react';
import { motion } from 'framer-motion';
import { FiMap, FiCompass, FiAward, FiGift, FiShield, FiClock, FiPhone, FiStar } from 'react-icons/fi';

const featuresData = [
  {
    icon: <FiMap />,
    title: 'State-wise Itineraries',
    description: 'Handcrafted day-by-day plans for every Indian state — from Himalayan passes to tropical islands.',
    color: '#d97706',
    stat: '38 States',
  },
  {
    icon: <FiCompass />,
    title: 'Expert Local Guides',
    description: 'Certified multilingual guides with deep local knowledge, safety training, and cultural expertise.',
    color: '#0f5132',
    stat: '85+ Guides',
  },
  {
    icon: <FiShield />,
    title: 'Safe & Verified Stays',
    description: 'Every hotel and homestay is personally verified for quality, safety, and authentic experience.',
    color: '#7c3aed',
    stat: '500+ Stays',
  },
  {
    icon: <FiAward />,
    title: 'Best Price in INR',
    description: 'All prices are in Indian Rupees with zero hidden charges. Compare, book, and go stress-free.',
    color: '#0369a1',
    stat: '₹0 Hidden Fees',
  },
  {
    icon: <FiClock />,
    title: '24/7 Travel Support',
    description: 'Our travel coordinators are available round the clock to assist you during your entire journey.',
    color: '#db2777',
    stat: '24/7 Available',
  },
  {
    icon: <FiGift />,
    title: 'Seasonal Deals',
    description: 'Exclusive seasonal packages and last-minute deals curated for every travel style and budget.',
    color: '#d97706',
    stat: '200+ Deals',
  },
];

const Features = () => (
  <section id="features" className="section features-section">
    <div className="container">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <div className="badge">Why YatraVista</div>
        <h2>Everything You Need for the Perfect India Trip</h2>
        <p>From planning to booking to travelling — we make every step seamless, safe, and memorable.</p>
      </motion.div>

      <motion.div
        className="features-grid-pro"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
      >
        {featuresData.map((f, i) => (
          <motion.div
            key={i}
            className="feature-card-pro"
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 18 } } }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="fcp-icon" style={{ background: `${f.color}14`, color: f.color }}>
              {f.icon}
            </div>
            <div className="fcp-body">
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </div>
            <div className="fcp-stat" style={{ color: f.color }}>
              {f.stat}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom CTA strip */}
      <motion.div
        className="features-cta-strip"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className="fcs-left">
          <div className="fcs-avatars">
            {['R', 'S', 'A', 'P'].map((l, i) => (
              <div key={i} className="fcs-avatar" style={{ zIndex: 4 - i }}>{l}</div>
            ))}
          </div>
          <div>
            <div className="fcs-review-text">Trusted by 50,000+ travellers across India</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
              {[1,2,3,4,5].map(i => <FiStar key={i} size={13} style={{ fill: '#f59e0b', color: '#f59e0b' }} />)}
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '4px' }}>4.9 average rating</span>
            </div>
          </div>
        </div>
        <div className="fcs-right">
          <div className="fcs-contact">
            <FiPhone size={14} />
            <span>Need help? <strong>+91 98765 43210</strong></span>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Features;
