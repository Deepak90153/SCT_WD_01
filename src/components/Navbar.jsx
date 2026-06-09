import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX, FiUser, FiLogOut, FiMapPin, FiCalendar, FiHeart, FiShield } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from './AdminDashboard';

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'features', label: 'Experience' },
  { id: 'services', label: 'Expeditions' },
  { id: 'portfolio', label: 'Destinations' },
  { id: 'guides', label: 'Guides' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Book Now' }
];

const Navbar = ({ theme, toggleTheme, userLocation }) => {
  const { currentUser, logout, isAdmin, isTraveller } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [adminDashOpen, setAdminDashOpen] = useState(false);
  const profileRef = useRef(null);

  // Handle Scroll state (transparency to glassmorphism)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Intersection Observer for Active Section Scroll Spy
  useEffect(() => {
    const sections = navItems.map(item => document.getElementById(item.id));
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const offsetPosition = elementRect - bodyRect - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    setProfileOpen(false);
    setMobileMenuOpen(false);
    logout();
  };

  // Avatar: initials circle
  const AvatarCircle = ({ size = 34 }) => (
    <div
      className="nav-avatar-circle"
      style={{
        width: size, height: size, fontSize: size * 0.4,
        background: isAdmin
          ? 'linear-gradient(135deg, #ef4444, #b91c1c)'
          : 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))'
      }}
    >
      {currentUser?.avatar || currentUser?.name?.[0]?.toUpperCase() || '?'}
    </div>
  );

  return (
    <>
      <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-container">
          {/* Logo */}
          <a href="#hero" onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }} className="logo">
            YatraVista<span className="logo-dot"></span>
          </a>

          {/* Desktop Nav Links */}
          <nav>
            <ul className="nav-menu">
              {navItems.map((item) => (
                <li key={item.id} className="nav-item">
                  <span
                    onClick={() => handleNavClick(item.id)}
                    className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                  >
                    {item.label}
                  </span>
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="nav-link-underline"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions */}
          <div className="nav-actions">
            {/* Location badge */}
            {userLocation?.city && (
              <div className="badge" style={{
                margin: 0, padding: '6px 12px', fontSize: '0.72rem',
                display: 'flex', gap: '4px', textTransform: 'none',
                background: 'rgba(var(--color-primary-rgb), 0.08)',
                borderColor: 'rgba(var(--color-primary-rgb), 0.15)',
                color: 'var(--color-primary)', borderRadius: '100px'
              }}>
                📍 {userLocation.city}
              </div>
            )}

            {/* Admin Panel Button */}
            {isAdmin && (
              <button
                onClick={() => setAdminDashOpen(true)}
                className="btn btn-secondary"
                style={{ padding: '7px 14px', fontSize: '0.8rem', height: '36px', gap: '6px', display: 'flex', alignItems: 'center' }}
              >
                <FiShield size={13} /> Admin Panel
              </button>
            )}

            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle theme">
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {theme === 'dark' ? <FiSun /> : <FiMoon />}
              </motion.div>
            </button>

            {/* Profile Dropdown */}
            <div className="nav-profile-wrap" ref={profileRef}>
              <button
                className="nav-avatar-btn"
                onClick={() => setProfileOpen(p => !p)}
                aria-label="User profile menu"
              >
                <AvatarCircle />
                <div className="nav-avatar-info">
                  <span className="nav-avatar-name">
                    {currentUser?.name?.split(' ')[0] || 'User'}
                  </span>
                  {isAdmin && <span className="nav-avatar-role admin">Admin</span>}
                  {isTraveller && <span className="nav-avatar-role traveller">Traveller</span>}
                </div>
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    className="nav-profile-dropdown"
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                  >
                    {/* User Info */}
                    <div className="npd-user-info">
                      <AvatarCircle size={44} />
                      <div>
                        <div className="npd-name">{currentUser?.name}</div>
                        <div className="npd-email">{currentUser?.email}</div>
                        {currentUser?.phone && (
                          <div className="npd-phone">📱 {currentUser.phone}</div>
                        )}
                      </div>
                    </div>

                    <div className="npd-divider" />

                    {/* Traveller Menu */}
                    {isTraveller && (
                      <div className="npd-menu">
                        <button className="npd-item" onClick={() => { setProfileOpen(false); handleNavClick('portfolio'); }}>
                          <FiMapPin size={14} /> Explore Destinations
                        </button>
                        <button className="npd-item" onClick={() => { setProfileOpen(false); handleNavClick('contact'); }}>
                          <FiCalendar size={14} /> Book a Trip
                        </button>
                        <button className="npd-item" onClick={() => { setProfileOpen(false); handleNavClick('guides'); }}>
                          <FiHeart size={14} /> Find a Guide
                        </button>
                      </div>
                    )}

                    {/* Admin Menu */}
                    {isAdmin && (
                      <div className="npd-menu">
                        <button className="npd-item" onClick={() => { setProfileOpen(false); setAdminDashOpen(true); }}>
                          <FiShield size={14} /> Open Admin Dashboard
                        </button>
                      </div>
                    )}

                    <div className="npd-divider" />

                    <button className="npd-logout" onClick={handleLogout}>
                      <FiLogOut size={14} /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="hamburger-btn"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay & Slide-In Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-nav-overlay"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="mobile-nav"
            >
              {/* Mobile user info */}
              <div className="mobile-nav-user">
                <AvatarCircle size={42} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{currentUser?.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>{currentUser?.email}</div>
                </div>
              </div>

              <ul className="mobile-nav-menu">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <span
                      onClick={() => handleNavClick(item.id)}
                      className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
                    >
                      {item.label}
                    </span>
                  </li>
                ))}
                {isAdmin && (
                  <li>
                    <span
                      onClick={() => { setMobileMenuOpen(false); setAdminDashOpen(true); }}
                      className="mobile-nav-link"
                      style={{ color: '#ef4444' }}
                    >
                      🛡️ Admin Panel
                    </span>
                  </li>
                )}
                <li style={{ marginTop: '20px' }}>
                  <button
                    onClick={handleLogout}
                    className="btn btn-secondary"
                    style={{ width: '100%', padding: '12px', gap: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <FiLogOut size={14} /> Sign Out
                  </button>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Admin Dashboard Panel */}
      <AdminDashboard isOpen={adminDashOpen} onClose={() => setAdminDashOpen(false)} />
    </>
  );
};

export default Navbar;
