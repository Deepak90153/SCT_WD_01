import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';

// Auth
import { AuthProvider, useAuth } from './context/AuthContext';

// Components
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Guides from './components/Guides';
import AuthGate from './components/AuthGate';
import BookingModal from './components/BookingModal';

// ─── Inner App (needs auth context) ─────────────────────────────────────────
const AppContent = () => {
  const { isLoggedIn, isAuthLoading } = useAuth();

  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [userLocation, setUserLocation] = useState({ city: 'India', country: 'IN' });
  const [activeHub, setActiveHub] = useState('general');

  // Global booking modal state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPreset, setBookingPreset] = useState(null); // preselected destination

  // Open booking modal (optionally with a pre-selected destination)
  const openBooking = (destination = null) => {
    setBookingPreset(destination);
    setIsBookingOpen(true);
  };
  const closeBooking = () => { setIsBookingOpen(false); setBookingPreset(null); };

  // Fetch Geolocation — silently ignore any network/CORS errors
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 4000);
        const res = await fetch('https://ipapi.co/json/', { signal: controller.signal });
        clearTimeout(timer);
        if (res.ok) {
          const data = await res.json();
          const city = (data.city || '').toLowerCase();
          setUserLocation({ city: data.city || 'India', country: data.country || 'IN' });
          if (city.includes('delhi') || city.includes('noida') || city.includes('gurugram') || city.includes('gurgaon'))
            setActiveHub('delhi');
          else if (city.includes('mumbai') || city.includes('pune') || city.includes('thane'))
            setActiveHub('mumbai');
          else if (city.includes('bangalore') || city.includes('bengaluru') || city.includes('mysore'))
            setActiveHub('bangalore');
          else setActiveHub('general');
        }
      } catch {
        // Network unavailable or blocked — default to 'general', app still works fine
        setActiveHub('general');
      }
    };
    fetchLocation();
  }, []);

  useEffect(() => { document.body.className = theme; localStorage.setItem('theme', theme); }, [theme]);

  useEffect(() => {
    const h = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const t = setTimeout(() => setIsLoading(false), 1400);
      return () => clearTimeout(t);
    }
  }, [isLoggedIn]);

  const toggleTheme = () => setTheme(p => p === 'dark' ? 'light' : 'dark');
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (isAuthLoading) return (
    <div className="loading-screen">
      <div className="loader-spinner" />
      <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '16px' }}>Checking session…</span>
    </div>
  );

  if (!isLoggedIn) return <AuthGate />;

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div key="loader" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="loading-screen">
            <div className="loader-spinner" />
            <motion.h2
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }}
              style={{ fontFamily: 'Outfit', fontSize: '1.75rem', fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}
            >
              YatraVista<span style={{ color: 'var(--color-primary)' }}> India</span>
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <ScrollProgress />
          <Navbar theme={theme} toggleTheme={toggleTheme} userLocation={userLocation} onBookNow={openBooking} />

          <main>
            <Hero activeHub={activeHub} setActiveHub={setActiveHub} onBookNow={openBooking} />
            <Features onBookNow={openBooking} />
            <Services onBookNow={openBooking} />
            <Portfolio activeHub={activeHub} onBookNow={openBooking} />
            <Guides onBookNow={openBooking} />
            <About />
            <Contact activeHub={activeHub} onBookNow={openBooking} />
          </main>

          <Footer />

          {/* Booking Modal — global */}
          <BookingModal
            isOpen={isBookingOpen}
            onClose={closeBooking}
            preselectedDestination={bookingPreset}
          />

          {/* Floating Book Now button */}
          <motion.button
            className="fab-book-btn"
            onClick={() => openBooking()}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
          >
            🗺️ Book a Trip
          </motion.button>

          <button onClick={scrollToTop} className={`back-to-top ${showScrollTop ? 'visible' : ''}`} aria-label="Scroll to top">
            <FiArrowUp />
          </button>
        </motion.div>
      )}
    </>
  );
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
