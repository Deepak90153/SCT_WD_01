import React from 'react';
import { FiInstagram, FiYoutube, FiTwitter, FiFacebook } from 'react-icons/fi';

const Footer = () => {
  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="footer">
      <div className="container footer-grid">
        {/* Brand Column */}
        <div className="footer-brand">
          <h3 className="logo" onClick={() => handleScrollTo('hero')} style={{ cursor: 'pointer' }}>
            YatraVista<span className="logo-dot"></span>
          </h3>
          <p>
            Expert guides, curated itineraries, and handpicked hotel stays across India's finest destinations — all priced in INR.
          </p>
          <div className="footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="Instagram">
              <FiInstagram />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="YouTube">
              <FiYoutube />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="Twitter">
              <FiTwitter />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="Facebook">
              <FiFacebook />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="footer-links-col">
          <h4>Navigation</h4>
          <ul className="footer-links-list">
            <li><span onClick={() => handleScrollTo('hero')} className="footer-link" style={{ cursor: 'pointer' }}>Home</span></li>
            <li><span onClick={() => handleScrollTo('features')} className="footer-link" style={{ cursor: 'pointer' }}>Experience</span></li>
            <li><span onClick={() => handleScrollTo('services')} className="footer-link" style={{ cursor: 'pointer' }}>Expeditions</span></li>
            <li><span onClick={() => handleScrollTo('portfolio')} className="footer-link" style={{ cursor: 'pointer' }}>Destinations</span></li>
            <li><span onClick={() => handleScrollTo('about')} className="footer-link" style={{ cursor: 'pointer' }}>Story</span></li>
            <li><span onClick={() => handleScrollTo('contact')} className="footer-link" style={{ cursor: 'pointer' }}>Book Now</span></li>
          </ul>
        </div>

        {/* Climates Column */}
        <div className="footer-links-col">
          <h4>Explorations</h4>
          <ul className="footer-links-list">
            <li><span className="footer-link">Wilderness Treks</span></li>
            <li><span className="footer-link">Polar & Glacier</span></li>
            <li><span className="footer-link">Tropical Reefs</span></li>
            <li><span className="footer-link">Custom Private Tours</span></li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright Area */}
      <div className="container">
        <div className="footer-bottom">
          <div className="footer-copy">
            &copy; {new Date().getFullYear()} YatraVista. Built for Intern Web Task.
          </div>
          <ul className="footer-legal-links">
            <li><a href="#" className="footer-legal-link">Privacy Policy</a></li>
            <li><a href="#" className="footer-legal-link">Terms of Service</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
