import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiEye, FiEyeOff, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

const LoginModal = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState('signin'); // 'signin' or 'create'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Reset states when modal is opened/closed
  useEffect(() => {
    if (!isOpen) {
      setMode('signin');
      setFormData({ name: '', email: '', password: '' });
      setErrors({});
      setShowPassword(false);
      setIsSuccess(false);
    }
  }, [isOpen]);

  // Escape key handler to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const validateField = (name, val) => {
    let err = '';
    if (name === 'name' && mode === 'create') {
      if (!val.trim()) err = 'Name is required.';
      else if (val.trim().length < 2) err = 'Name must be at least 2 characters.';
    } else if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!val.trim()) err = 'Email address is required.';
      else if (!emailRegex.test(val.trim())) err = 'Please enter a valid email address.';
    } else if (name === 'password') {
      if (!val) err = 'Password is required.';
      else if (val.length < 6) err = 'Password must be at least 6 characters.';
    }
    return err;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    const err = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: err }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const err = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: err }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (key === 'name' && mode === 'signin') return; // skip name validation on signin
      const err = validateField(key, formData[key]);
      if (err) newErrors[key] = err;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulated Authentication Request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    }, 1200);
  };

  const toggleMode = () => {
    setMode(prev => (prev === 'signin' ? 'create' : 'signin'));
    setFormData({ name: '', email: '', password: '' });
    setErrors({});
    setShowPassword(false);
    setIsSuccess(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 1. Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="modal-overlay"
          />

          {/* 2. Modal Centered Panel */}
          <div className="modal-wrapper">
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="modal-card"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="modal-close-btn"
                aria-label="Close modal"
                disabled={isSubmitting}
              >
                <FiX />
              </button>

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="form-success-msg"
                    style={{ background: 'rgba(0, 180, 216, 0.1)', borderColor: 'rgba(0, 180, 216, 0.2)', color: 'var(--color-primary)', padding: '30px 10px', marginBottom: 0 }}
                  >
                    <div className="form-success-icon" style={{ fontSize: '2.5rem', marginBottom: '10px' }}><FiCheckCircle /></div>
                    <h3 style={{ color: 'var(--text-primary)', fontSize: '1.25rem' }}>
                      {mode === 'signin' ? 'Welcome Back!' : 'Account Created!'}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '4px', fontSize: '0.9rem' }}>
                      {mode === 'signin' 
                        ? 'Successfully logged in to your traveler profile.' 
                        : 'Your explorer profile has been successfully set up.'
                      }
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="form">
                    {/* Header */}
                    <div className="modal-header">
                      <h3>{mode === 'signin' ? 'Sign In' : 'Create Explorer Account'}</h3>
                      <p>
                        {mode === 'signin' 
                          ? 'Access your private itineraries and bookings' 
                          : 'Join our explorer club and start tracking routes'
                        }
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate>
                      {/* Name input (only for Create Account mode) */}
                      <AnimatePresence initial={false}>
                        {mode === 'create' && (
                          <motion.div
                            initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                            animate={{ height: 'auto', opacity: 1, marginBottom: '24px' }}
                            exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                            transition={{ duration: 0.25 }}
                            style={{ overflow: 'hidden' }}
                          >
                            <label htmlFor="modal-name" className="form-label">Full Name</label>
                            <input
                              type="text"
                              id="modal-name"
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
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Email input */}
                      <div className="form-group">
                        <label htmlFor="modal-email" className="form-label">Email Address</label>
                        <input
                          type="email"
                          id="modal-email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`form-control ${errors.email ? 'input-error' : ''}`}
                          placeholder="jane@example.com"
                          disabled={isSubmitting}
                        />
                        {errors.email && (
                          <div className="form-error">
                            <FiAlertCircle /> <span>{errors.email}</span>
                          </div>
                        )}
                      </div>

                      {/* Password input */}
                      <div className="form-group">
                        <label htmlFor="modal-password" className="form-label">Password</label>
                        <div style={{ position: 'relative' }}>
                          <input
                            type={showPassword ? 'text' : 'password'}
                            id="modal-password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`form-control ${errors.password ? 'input-error' : ''}`}
                            placeholder="••••••••"
                            disabled={isSubmitting}
                            style={{ paddingRight: '45px' }}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="pwd-toggle-btn"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                            disabled={isSubmitting}
                          >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                          </button>
                        </div>
                        {errors.password && (
                          <div className="form-error">
                            <FiAlertCircle /> <span>{errors.password}</span>
                          </div>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', marginTop: '10px' }}
                        disabled={isSubmitting}
                      >
                        {isSubmitting 
                          ? (mode === 'signin' ? 'Signing In...' : 'Registering...') 
                          : (mode === 'signin' ? 'Sign In' : 'Sign Up')
                        }
                      </button>
                    </form>

                    {/* Mode Toggle Footer */}
                    <div className="modal-toggle-text">
                      {mode === 'signin' 
                        ? "Don't have an explorer account?" 
                        : 'Already have an explorer account?'
                      }
                      <span onClick={toggleMode} className="modal-toggle-action">
                        {mode === 'signin' ? 'Create one' : 'Sign In'}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
