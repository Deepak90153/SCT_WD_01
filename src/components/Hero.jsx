import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiCompass, FiMapPin, FiCalendar, FiUsers, FiSearch, FiStar, FiTrendingUp } from 'react-icons/fi';

const STATS = [
  { value: '38+', label: 'States Covered' },
  { value: '50k+', label: 'Happy Travellers' },
  { value: '₹0', label: 'Hidden Fees' },
  { value: '4.9★', label: 'Avg. Rating' },
];

const TRENDING = [
  { name: 'Ladakh', tag: '🏔️ High Passes', price: '₹7,200/n' },
  { name: 'Kerala Backwaters', tag: '🌴 Houseboats', price: '₹11,000/n' },
  { name: 'Hampi', tag: '🏛️ UNESCO Ruins', price: '₹22,000/n' },
  { name: 'Rann of Kutch', tag: '🌕 White Desert', price: '₹8,000/n' },
];

const Hero = ({ activeHub, setActiveHub }) => {
  const [searchData, setSearchData] = useState({ destination: activeHub || 'general', month: 'october', guests: '2' });
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState('');
  const [activeTrend, setActiveTrend] = useState(0);

  useEffect(() => { if (activeHub) setSearchData(p => ({ ...p, destination: activeHub })); }, [activeHub]);

  // Cycle trending destinations
  useEffect(() => {
    const t = setInterval(() => setActiveTrend(p => (p + 1) % TRENDING.length), 3000);
    return () => clearInterval(t);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    setSearchResults('');
    setTimeout(() => {
      setIsSearching(false);
      setActiveHub(searchData.destination);
      setSearchResults('✓ Results updated! Scroll down to see destinations.');
      setTimeout(() => scrollTo('portfolio'), 900);
    }, 1200);
  };

  const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } } };
  const itemV = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 18 } } };

  return (
    <section id="hero" className="hero">
      {/* Layered background */}
      <div className="hero-bg-layer hero-bg-layer--1" />
      <div className="hero-bg-layer hero-bg-layer--2" />
      <div className="hero-bg-orb hero-bg-orb--1" />
      <div className="hero-bg-orb hero-bg-orb--2" />

      <div className="container hero-grid">
        {/* ── LEFT: Text content ─────────────────────────────────────────── */}
        <motion.div className="hero-content" variants={containerV} initial="hidden" animate="visible">
          {/* Badge */}
          <motion.div variants={itemV} className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            <FiCompass size={13} /> YatraVista — India's #1 Travel Guide
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={itemV} className="hero-title">
            Discover India's
            <span className="hero-title-accent"> Most Incredible</span>
            <br />Destinations — State by State
          </motion.h1>

          {/* Subtext */}
          <motion.p variants={itemV} className="hero-subtitle">
            Expert guides, curated stays, and real-time recommendations near you — all priced in INR. From the Himalayas to the Andamans, your next journey starts here.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemV} className="hero-ctas">
            <button onClick={() => scrollTo('portfolio')} className="hero-btn-primary">
              Explore Destinations <FiArrowRight />
            </button>
            <button onClick={() => scrollTo('services')} className="hero-btn-secondary">
              Our Packages
            </button>
          </motion.div>

          {/* Stats Strip */}
          <motion.div variants={itemV} className="hero-stats-strip">
            {STATS.map((s, i) => (
              <div key={i} className="hero-stat">
                <span className="hero-stat-val">{s.value}</span>
                <span className="hero-stat-label">{s.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Trending ticker */}
          <motion.div variants={itemV} className="hero-trending">
            <span className="hero-trending-label"><FiTrendingUp size={12} /> Trending Now:</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={activeTrend}
                className="hero-trending-item"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <strong>{TRENDING[activeTrend].name}</strong>
                <span className="hero-trending-tag">{TRENDING[activeTrend].tag}</span>
                <span className="hero-trending-price">{TRENDING[activeTrend].price}</span>
              </motion.span>
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Search card ─────────────────────────────────────────── */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 70, damping: 18, delay: 0.4 }}
        >
          <div className="hero-search-card">
            {/* Card header */}
            <div className="hsc-header">
              <div className="hsc-header-icon"><FiCompass size={20} /></div>
              <div>
                <div className="hsc-title">Plan Your Trip</div>
                <div className="hsc-sub">Get personalized recommendations</div>
              </div>
            </div>

            <form onSubmit={handleSearch} className="hsc-form">
              {/* Destination */}
              <div className="hsc-field">
                <label className="hsc-label"><FiMapPin size={12} /> Your Region</label>
                <select className="hsc-select" value={searchData.destination}
                  onChange={e => setSearchData(p => ({ ...p, destination: e.target.value }))}>
                  <option value="delhi">🌆 Delhi — North India</option>
                  <option value="mumbai">🌊 Mumbai — West India</option>
                  <option value="bangalore">☕ Bangalore — South India</option>
                  <option value="general">🗺️ All India Escapes</option>
                </select>
              </div>

              {/* Month */}
              <div className="hsc-field">
                <label className="hsc-label"><FiCalendar size={12} /> Travel Month</label>
                <select className="hsc-select" value={searchData.month}
                  onChange={e => setSearchData(p => ({ ...p, month: e.target.value }))}>
                  <option value="january">January — Winter</option>
                  <option value="march">March — Spring</option>
                  <option value="june">June — Monsoon</option>
                  <option value="october">October — Autumn</option>
                  <option value="december">December — Peak Season</option>
                </select>
              </div>

              {/* Travellers */}
              <div className="hsc-field">
                <label className="hsc-label"><FiUsers size={12} /> Travellers</label>
                <select className="hsc-select" value={searchData.guests}
                  onChange={e => setSearchData(p => ({ ...p, guests: e.target.value }))}>
                  <option value="1">Solo Traveller</option>
                  <option value="2">Couple (2 people)</option>
                  <option value="4">Family / Group (3–6)</option>
                  <option value="8">Large Group (7+)</option>
                </select>
              </div>

              <button type="submit" className="hsc-submit" disabled={isSearching}>
                {isSearching
                  ? <><span className="hsc-spinner" /> Finding Destinations…</>
                  : <><FiSearch size={15} /> Search Destinations</>
                }
              </button>
            </form>

            <AnimatePresence>
              {searchResults && (
                <motion.div
                  className="hsc-result"
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                >
                  {searchResults}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Rating strip */}
            <div className="hsc-footer">
              <div className="hsc-rating">
                {[1,2,3,4,5].map(i => <FiStar key={i} size={12} style={{ fill: '#f59e0b', color: '#f59e0b' }} />)}
                <span>4.9 · 12,000+ reviews</span>
              </div>
              <span className="hsc-badge-free">Free to Use</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
