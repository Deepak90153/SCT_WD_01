import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPhone, FiMapPin, FiClock, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

const Contact = ({ activeHub }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    destination: 'manali',
    guests: '2',
    date: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync default destination value when activeHub updates
  useEffect(() => {
    if (activeHub === 'delhi') {
      setFormData(prev => ({ ...prev, destination: 'agra' }));
    } else if (activeHub === 'mumbai') {
      setFormData(prev => ({ ...prev, destination: 'lonavala' }));
    } else if (activeHub === 'bangalore') {
      setFormData(prev => ({ ...prev, destination: 'coorg' }));
    } else {
      setFormData(prev => ({ ...prev, destination: 'manali' }));
    }
  }, [activeHub]);

  // Validate single field
  const validateField = (name, val) => {
    let err = '';
    if (name === 'name') {
      if (!val.trim()) err = 'Full name is required.';
      else if (val.trim().length < 2) err = 'Name must be at least 2 characters.';
    } else if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!val.trim()) err = 'Email address is required.';
      else if (!emailRegex.test(val.trim())) err = 'Please enter a valid email address.';
    } else if (name === 'date') {
      if (!val) err = 'Target travel date is required.';
      else {
        const selectedDate = new Date(val);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
          err = 'Travel date cannot be in the past.';
        }
      }
    } else if (name === 'message') {
      if (!val.trim()) err = 'Please specify custom adventure requests.';
      else if (val.trim().length < 10) err = 'Request notes must be at least 10 characters.';
    }
    return err;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const err = validateField(key, formData[key]);
      if (err) newErrors[key] = err;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset form
      setFormData(prev => ({
        ...prev,
        name: '',
        email: '',
        date: '',
        message: ''
      }));
      setErrors({});
    }, 1200);
  };

  const getDestinationOptions = () => {
    switch (activeHub) {
      case 'delhi':
        return (
          <>
            <option value="agra">Agra Heritage Retreat (₹4,900/night)</option>
            <option value="rishikesh">Rishikesh River Expedition (₹3,500/night)</option>
            <option value="jaipur">Jaipur Palace Voyage (₹6,800/night)</option>
          </>
        );
      case 'mumbai':
        return (
          <>
            <option value="lonavala">Lonavala Valley Trek (₹5,800/night)</option>
            <option value="mahabaleshwar">Mahabaleshwar Forest Sanctuary (₹7,200/night)</option>
            <option value="alibaug">Alibaug Lagoon Escape (₹6,500/night)</option>
          </>
        );
      case 'bangalore':
        return (
          <>
            <option value="coorg">Coorg Coffee Trails (₹8,200/night)</option>
            <option value="mysore">Mysore Heritage Tour (₹4,200/night)</option>
            <option value="wayanad">Wayanad Forest Treehouses (₹9,500/night)</option>
          </>
        );
      default:
        return (
          <>
            <option value="manali">Manali Snow Peak Sanctuary (₹5,400/night)</option>
            <option value="goa">Goa Coast Beach Reefs (₹7,800/night)</option>
            <option value="munnar">Munnar Tea Valley Estates (₹6,100/night)</option>
          </>
        );
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-header">
          <div className="badge">Booking Inquiry</div>
          <h2>Let's Map Your Next Journey</h2>
          <p>Secure your slot on an upcoming trek or custom resort stay. Fill out the booking request form below and a curator will contact you.</p>
        </div>

        <div className="contact-grid">
          {/* Left Side: Contact Information Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ type: 'spring', stiffness: 80, damping: 15 }}
            className="contact-info"
          >
            <div className="contact-info-card">
              <div className="contact-info-icon"><FiPhone /></div>
              <div className="contact-info-text">
                <h4>Call Our Curators</h4>
                <p>+91 (800) 555-ROAM</p>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon"><FiMapPin /></div>
              <div className="contact-info-text">
                <h4>Headquarters</h4>
                <p>Andheri West, Mumbai, 400053, India</p>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon"><FiClock /></div>
              <div className="contact-info-text">
                <h4>Planning Hours</h4>
                <p>Monday - Saturday, 8:00 AM - 5:00 PM IST</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ type: 'spring', stiffness: 80, damping: 15 }}
            className="contact-form-card"
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="form-success-msg"
                  style={{ background: 'rgba(217, 119, 6, 0.1)', borderColor: 'rgba(217, 119, 6, 0.2)', color: 'var(--color-primary)' }}
                >
                  <div className="form-success-icon"><FiCheckCircle /></div>
                  <h3 style={{ color: 'var(--text-primary)' }}>Request Submitted!</h3>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>Thank you. A YatraVista travel coordinator will check room availability and contact you shortly.</p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="btn btn-secondary"
                    style={{ marginTop: '20px' }}
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form key="form" onSubmit={handleSubmit} noValidate>
                  {/* Name field */}
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`form-control ${errors.name ? 'input-error' : ''}`}
                      placeholder="Jane Doe"
                      disabled={isSubmitting}
                    />
                    {errors.name && (
                      <div className="form-error">
                        <FiAlertCircle /> <span>{errors.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`form-control ${errors.email ? 'input-error' : ''}`}
                      placeholder="jane@company.com"
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <div className="form-error">
                        <FiAlertCircle /> <span>{errors.email}</span>
                      </div>
                    )}
                  </div>

                  {/* Row grid for destination and date */}
                  <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    {/* Destination selector */}
                    <div className="form-group" style={{ flex: '1 1 200px' }}>
                      <label htmlFor="destination" className="form-label">Destination</label>
                      <select
                        id="destination"
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        className="form-control"
                        disabled={isSubmitting}
                        style={{ cursor: 'pointer' }}
                      >
                        {getDestinationOptions()}
                      </select>
                    </div>

                    {/* Date picker */}
                    <div className="form-group" style={{ flex: '1 1 200px' }}>
                      <label htmlFor="date" className="form-label">Travel Date</label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`form-control ${errors.date ? 'input-error' : ''}`}
                        disabled={isSubmitting}
                        style={{ cursor: 'pointer' }}
                      />
                      {errors.date && (
                        <div className="form-error">
                          <FiAlertCircle /> <span>{errors.date}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Message field */}
                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Adventure Specifications & Requests</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows="4"
                      className={`form-control ${errors.message ? 'input-error' : ''}`}
                      placeholder="Specify custom rooms, diet instructions, or group setups..."
                      disabled={isSubmitting}
                    />
                    {errors.message && (
                      <div className="form-error">
                        <FiAlertCircle /> <span>{errors.message}</span>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending Request...' : 'Submit Booking Inquiry'}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
