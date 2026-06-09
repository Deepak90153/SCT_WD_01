import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiCompass, FiGlobe, FiAnchor, FiCamera, FiArrowRight, FiStar } from 'react-icons/fi';

const packagesData = [
  {
    icon: <FiCompass />,
    tag: 'Most Popular',
    tagColor: '#d97706',
    title: 'Mountain & Trek Escapes',
    subtitle: 'Himalayas · Ghats · Vindhyas',
    description: 'Hike high-altitude passes, camp beside alpine lakes, and witness India\'s greatest mountain panoramas with certified expedition leaders.',
    price: '₹8,500',
    priceNote: 'per person, all-inclusive',
    deliverables: [
      'Certified Trek Leader & Safety Team',
      'High-Altitude Medical Backup',
      'Premium Four-Season Tents',
      'All Permits & Park Fees Included',
      'Airport Transfers & Transport',
    ],
    destinations: ['Manali', 'Spiti', 'Sikkim', 'Kedarnath'],
  },
  {
    icon: <FiGlobe />,
    tag: 'Heritage Special',
    tagColor: '#7c3aed',
    title: 'Heritage & Culture Tours',
    subtitle: 'Rajasthan · Tamil Nadu · Odisha',
    description: 'Explore UNESCO World Heritage Sites, royal palace complexes, and ancient temple circuits with local historian guides.',
    price: '₹6,200',
    priceNote: 'per person, all-inclusive',
    deliverables: [
      'Historian & Cultural Expert Guides',
      'Heritage Hotel Accommodation',
      'Artisan Workshop Entry Tickets',
      'Curated Regional Cuisine Experiences',
      'Photography Walk Sessions',
    ],
    destinations: ['Jaipur', 'Hampi', 'Varanasi', 'Madurai'],
  },
  {
    icon: <FiAnchor />,
    tag: 'Island & Beach',
    tagColor: '#0369a1',
    title: 'Coastal & Island Getaways',
    subtitle: 'Goa · Kerala · Andaman · Lakshadweep',
    description: 'Pristine beaches, scuba diving in coral reefs, houseboat backwaters, and tropical island escapes that feel like another world.',
    price: '₹12,000',
    priceNote: 'per person, all-inclusive',
    deliverables: [
      'PADI-Certified Dive Instructor',
      'Beachfront Resort Accommodation',
      'Boat Transfers & Island Hopping',
      'Water Sports Equipment Included',
      'Marine Wildlife Guide',
    ],
    destinations: ['Goa', 'Alleppey', 'Andaman', 'Lakshadweep'],
  },
  {
    icon: <FiCamera />,
    tag: 'Wildlife Safari',
    tagColor: '#0f5132',
    title: 'Wildlife Safari Expeditions',
    subtitle: 'Corbett · Ranthambore · Kaziranga',
    description: 'Track tigers, spot rhinos, and witness India\'s spectacular wildlife in their natural habitat with expert naturalists.',
    price: '₹9,800',
    priceNote: 'per person, all-inclusive',
    deliverables: [
      'Expert Wildlife Naturalist Guide',
      'Jeep & Elephant Safari Rides',
      'Jungle Lodge / Camp Stay',
      'Photography Equipment Support',
      'All Park Entry & Safari Fees',
    ],
    destinations: ['Jim Corbett', 'Kaziranga', 'Ranthambore', 'Kanha'],
  },
];

const Services = ({ onBookNow }) => {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="services" className="section services-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="badge">Travel Packages</div>
          <h2>Choose Your Perfect India Experience</h2>
          <p>Fully managed travel packages across every terrain and travel style — with zero logistics headaches.</p>
        </motion.div>

        <motion.div
          className="services-grid-pro"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {packagesData.map((pkg, i) => (
            <motion.div
              key={i}
              className={`service-card-pro ${hovered === i ? 'service-card-pro--hover' : ''}`}
              variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 16 } } }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Tag */}
              <div className="scp-tag" style={{ background: `${pkg.tagColor}18`, color: pkg.tagColor, borderColor: `${pkg.tagColor}30` }}>
                {pkg.tag}
              </div>

              {/* Icon + Title */}
              <div className="scp-header">
                <div className="scp-icon" style={{ background: `${pkg.tagColor}14`, color: pkg.tagColor }}>
                  {pkg.icon}
                </div>
                <div>
                  <h3 className="scp-title">{pkg.title}</h3>
                  <p className="scp-subtitle">{pkg.subtitle}</p>
                </div>
              </div>

              <p className="scp-desc">{pkg.description}</p>

              {/* Destination pills */}
              <div className="scp-destinations">
                {pkg.destinations.map((d, di) => (
                  <span key={di} className="scp-dest-pill">📍 {d}</span>
                ))}
              </div>

              {/* Deliverables */}
              <ul className="scp-list">
                {pkg.deliverables.map((item, li) => (
                  <li key={li} className="scp-item">
                    <span className="scp-check" style={{ background: `${pkg.tagColor}18`, color: pkg.tagColor }}>
                      <FiCheck size={11} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Price + CTA */}
              <div className="scp-footer">
                <div className="scp-price-block">
                  <span className="scp-price">{pkg.price}</span>
                  <span className="scp-price-note">{pkg.priceNote}</span>
                </div>
                <button
                  className="scp-cta"
                  style={{ background: pkg.tagColor }}
                  onClick={() => onBookNow && onBookNow()}
                >
                  Book Now <FiArrowRight size={13} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom guarantee strip */}
        <motion.div
          className="services-guarantee"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {['✅ No Hidden Charges', '🔒 Secure Booking', '↩️ Free Cancellation within 48h', '📞 24/7 Support', '🏅 Best Price Guarantee'].map((g, i) => (
            <span key={i} className="sg-item">{g}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
