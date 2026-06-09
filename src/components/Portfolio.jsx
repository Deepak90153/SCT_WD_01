import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCompass, FiStar, FiMapPin, FiCalendar, FiArrowRight } from 'react-icons/fi';
import { destinationsData } from '../utils/travelData';

const filterCategories = [
  { id: 'all', label: 'All Destinations' },
  { id: 'heritage', label: '🏛️ Heritage' },
  { id: 'adventure', label: '🧗 Adventure' },
  { id: 'beach', label: '🏖️ Beach' },
  { id: 'wildlife', label: '🐯 Wildlife' },
  { id: 'hill', label: '🏔️ Hill Station' },
  { id: 'spiritual', label: '🕉️ Spiritual' },
];

const TYPE_COLORS = {
  heritage:  { bg: 'rgba(124,58,237,0.12)',  color: '#7c3aed' },
  adventure: { bg: 'rgba(217,119,6,0.12)',   color: '#d97706' },
  beach:     { bg: 'rgba(3,105,161,0.12)',   color: '#0369a1' },
  wildlife:  { bg: 'rgba(15,81,50,0.12)',    color: '#0f5132' },
  hill:      { bg: 'rgba(6,78,59,0.12)',     color: '#065f46' },
  spiritual: { bg: 'rgba(180,83,9,0.12)',    color: '#b45309' },
  luxury:    { bg: 'rgba(120,53,15,0.12)',   color: '#78350f' },
  default:   { bg: 'rgba(217,119,6,0.12)',   color: '#d97706' },
};

const DestinationCard = ({ dest, onBookNow }) => {
  const tc = TYPE_COLORS[dest.type] || TYPE_COLORS.default;

  return (
    <motion.article
      className="port-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      {/* Card Visual — gradient background with highlights */}
      <div className="port-card-visual" style={{ background: `linear-gradient(135deg, ${tc.bg.replace('0.12', '0.25')}, ${tc.bg})` }}>
        <div className="port-card-type-badge" style={{ background: tc.bg, color: tc.color }}>
          {dest.type}
        </div>
        <div className="port-card-price">
          ₹{dest.price?.toLocaleString('en-IN')}<span>/night</span>
        </div>

        {/* Highlights pills */}
        <div className="port-card-highlights">
          {(dest.highlights || dest.nearbyPlaces || []).slice(0, 3).map((h, i) => (
            <span key={i} className="port-highlight-pill">{h}</span>
          ))}
        </div>

        {/* Book overlay */}
        <div className="port-card-overlay">
          <button className="port-book-btn" onClick={() => onBookNow && onBookNow()} style={{ background: tc.color }}>
            <FiCalendar size={13} /> Book This Stay
          </button>
        </div>
      </div>

      {/* Card Info */}
      <div className="port-card-info">
        <div className="port-card-top">
          <h3 className="port-card-title">{dest.title}</h3>
          <div className="port-card-rating">
            <FiStar size={12} style={{ fill: '#f59e0b', color: '#f59e0b' }} />
            {dest.rating}
          </div>
        </div>

        <div className="port-card-location">
          <FiMapPin size={11} /> {dest.stateName} · {dest.distance}
        </div>

        <p className="port-card-desc">{dest.description}</p>

        <div className="port-card-footer">
          <div>
            <div className="port-card-hotel-label">Recommended Stay</div>
            <div className="port-card-hotel">{dest.hotelName}</div>
          </div>
          <button
            className="port-card-action"
            style={{ color: tc.color, borderColor: tc.color }}
            onClick={() => onBookNow && onBookNow()}
          >
            Book <FiArrowRight size={12} />
          </button>
        </div>

        {/* Season tag */}
        <div className="port-card-season">🌤️ Best: {dest.season}</div>
      </div>
    </motion.article>
  );
};

const Portfolio = ({ activeHub, onBookNow }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const data = (activeHub && destinationsData[activeHub]) ? destinationsData[activeHub] : destinationsData.general;
    setDestinations(Array.isArray(data) ? data : []);
  }, [activeHub]);

  const filtered = activeFilter === 'all'
    ? destinations
    : destinations.filter(d => d.type === activeFilter);

  return (
    <section id="portfolio" className="section portfolio-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="badge">Curated Getaways</div>
          <h2>Recommended Destinations Near You</h2>
          <p>
            Handpicked stays and sightseeing gems personalized for your travel hub — updated in real time.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="portfolio-filters">
          {filterCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`filter-btn ${activeFilter === cat.id ? 'active' : ''}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="portfolio-empty">
            <FiCompass size={36} />
            <p>No destinations match this filter. Try "All Destinations".</p>
          </div>
        ) : (
          <motion.div layout className="portfolio-grid-pro">
            <AnimatePresence mode="popLayout">
              {filtered.map(dest => (
                <DestinationCard key={dest.id} dest={dest} onBookNow={onBookNow} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* CTA Strip */}
        <motion.div
          className="portfolio-cta-strip"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <span>Explore all 100+ destinations across India</span>
          <button className="portfolio-cta-btn" onClick={() => onBookNow && onBookNow()}>
            Plan My Trip <FiArrowRight size={13} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
