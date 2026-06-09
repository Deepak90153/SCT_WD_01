import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiMapPin, FiUser, FiMessageCircle } from 'react-icons/fi';

const guidesData = [
  {
    id: 1,
    name: 'Arjun Kapoor',
    role: 'Himalayan Trek Specialist',
    experience: '12 years',
    rating: 4.9,
    reviews: 312,
    locations: ['Manali', 'Spiti Valley', 'Leh-Ladakh'],
    specialties: ['High Altitude Treks', 'Mountain Photography', 'Survival Skills'],
    bio: 'Former Indian Army mountaineer with 12+ years of Himalayan expedition experience. Expert in high-altitude acclimatization, glacier crossings, and remote mountain photography.',
    avatar: '🧗',
    color: '#d97706'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Cultural Heritage Guide',
    experience: '9 years',
    rating: 4.8,
    reviews: 267,
    locations: ['Rajasthan', 'Varanasi', 'Hampi'],
    specialties: ['Historical Architecture', 'Local Cuisine', 'Folk Art & Crafts'],
    bio: 'PhD in Indian History from Delhi University. Priya brings ancient temples, royal palaces, and hidden village traditions to life through immersive storytelling and local connections.',
    avatar: '🏛️',
    color: '#0f5132'
  },
  {
    id: 3,
    name: 'Ravi Menon',
    role: 'Coastal & Wildlife Expert',
    experience: '8 years',
    rating: 4.7,
    reviews: 198,
    locations: ['Kerala Backwaters', 'Goa', 'Andaman Islands'],
    specialties: ['Marine Diving', 'Wildlife Photography', 'Birdwatching'],
    bio: 'Certified PADI Dive Master and wildlife naturalist. Ravi specializes in coastal ecosystems, mangrove safaris, and underwater photography along India\'s southwest coast.',
    avatar: '🌊',
    color: '#0369a1'
  },
  {
    id: 4,
    name: 'Ananya Reddy',
    role: 'Forest & Wildlife Guide',
    experience: '7 years',
    rating: 4.9,
    reviews: 241,
    locations: ['Jim Corbett', 'Bandipur', 'Sundarbans'],
    specialties: ['Tiger Safari', 'Jungle Camping', 'Eco Tourism'],
    bio: 'Wildlife biologist and certified jungle guide. Ananya has tracked tigers and leopards across 14 national parks and is passionate about responsible eco-tourism and conservation.',
    avatar: '🐯',
    color: '#7c3aed'
  }
];

const Guides = () => {
  const [activeGuide, setActiveGuide] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 18 }
    }
  };

  return (
    <section id="guides" className="section guides-section">
      <div className="container">
        <div className="section-header">
          <div className="badge">Expert Travel Guides</div>
          <h2>Meet Your Journey Companions</h2>
          <p>Our certified expert guides bring decades of on-the-ground experience. Each guide is handpicked for their regional knowledge, safety training, and passion for authentic travel.</p>
        </div>

        <motion.div
          className="guides-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {guidesData.map((guide) => (
            <motion.div
              key={guide.id}
              className={`guide-card card ${activeGuide === guide.id ? 'guide-card--active' : ''}`}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              onClick={() => setActiveGuide(activeGuide === guide.id ? null : guide.id)}
              style={{ cursor: 'pointer' }}
            >
              {/* Guide Avatar */}
              <div className="guide-avatar" style={{ background: `${guide.color}22`, border: `2px solid ${guide.color}44` }}>
                <span className="guide-emoji">{guide.avatar}</span>
              </div>

              {/* Guide Info */}
              <div className="guide-header">
                <h3 className="guide-name">{guide.name}</h3>
                <p className="guide-role" style={{ color: guide.color }}>{guide.role}</p>
                <div className="guide-exp-badge">
                  <FiUser size={11} />
                  <span>{guide.experience} experience</span>
                </div>
              </div>

              {/* Rating */}
              <div className="guide-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      size={13}
                      style={{
                        color: i < Math.floor(guide.rating) ? '#f59e0b' : 'var(--text-muted)',
                        fill: i < Math.floor(guide.rating) ? '#f59e0b' : 'none'
                      }}
                    />
                  ))}
                </div>
                <span className="guide-rating-text">{guide.rating} ({guide.reviews} reviews)</span>
              </div>

              {/* Locations */}
              <div className="guide-locations">
                {guide.locations.map((loc) => (
                  <span key={loc} className="guide-location-tag">
                    <FiMapPin size={10} /> {loc}
                  </span>
                ))}
              </div>

              {/* Specialties */}
              <div className="guide-specialties">
                {guide.specialties.map((spec) => (
                  <span key={spec} className="guide-spec-tag">{spec}</span>
                ))}
              </div>

              {/* Expandable Bio */}
              <AnimatePresence>
                {activeGuide === guide.id && (
                  <motion.div
                    className="guide-bio"
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{guide.bio}</p>
                    <button
                      className="btn btn-primary"
                      style={{ marginTop: '12px', padding: '8px 20px', fontSize: '0.82rem', width: '100%' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                    >
                      <FiMessageCircle style={{ marginRight: 6 }} />
                      Book This Guide
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Expand Hint */}
              <div className="guide-expand-hint" style={{ color: guide.color }}>
                {activeGuide === guide.id ? '▲ Less Info' : '▼ View Profile'}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          className="guides-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 80 }}
        >
          <h3>Need a Custom Guide?</h3>
          <p>Tell us your dream destination and we'll match you with the perfect expert guide for your journey.</p>
          <button
            className="btn btn-primary"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          >
            Find My Guide →
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Guides;
