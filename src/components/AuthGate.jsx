import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiUser, FiMail, FiLock, FiPhone, FiEye, FiEyeOff,
  FiAlertCircle, FiCheckCircle, FiShield, FiCompass
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

// ─── Tab constants ──────────────────────────────────────────────────────────
const TABS = { TRAVELLER: 'traveller', ADMIN: 'admin' };
const MODES = { SIGNIN: 'signin', REGISTER: 'register' };

// ─── Google "G" SVG logo ─────────────────────────────────────────────────────
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" style={{ display: 'block' }}>
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.35-8.16 2.35-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    <path fill="none" d="M0 0h48v48H0z"/>
  </svg>
);

// ─── Input Field Component ────────────────────────────────────────────────────
const Field = ({ id, label, type = 'text', name, value, onChange, onBlur, error, placeholder, icon: Icon, disabled, rightEl }) => (
  <div className="ag-field-wrap">
    <label htmlFor={id} className="ag-label">{label}</label>
    <div className="ag-input-wrap">
      {Icon && <span className="ag-input-icon"><Icon size={15} /></span>}
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={`ag-input ${Icon ? 'ag-input--icon' : ''} ${error ? 'ag-input--error' : ''}`}
        autoComplete="off"
      />
      {rightEl}
    </div>
    {error && (
      <span className="ag-field-error">
        <FiAlertCircle size={12} /> {error}
      </span>
    )}
  </div>
);

// ─── AuthGate Main Component ──────────────────────────────────────────────────
const AuthGate = () => {
  const { registerTraveller, loginTraveller, loginAdmin, loginWithGoogle } = useAuth();

  const [tab, setTab] = useState(TABS.TRAVELLER);
  const [mode, setMode] = useState(MODES.SIGNIN);
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [globalError, setGlobalError] = useState('');

  // Form data
  const [form, setForm] = useState({
    name: '', phone: '', email: '', password: '', confirm: ''
  });
  const [errors, setErrors] = useState({});

  const resetForm = () => {
    setForm({ name: '', phone: '', email: '', password: '', confirm: '' });
    setErrors({});
    setGlobalError('');
    setSuccess('');
    setShowPwd(false);
    setShowConfirm(false);
  };

  const switchTab = (t) => { setTab(t); resetForm(); };
  const switchMode = (m) => { setMode(m); resetForm(); };

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (tab === TABS.ADMIN) {
      if (!form.email.trim()) e.email = 'Email is required.';
      if (!form.password) e.password = 'Password is required.';
      return e;
    }
    // Traveller
    if (mode === MODES.REGISTER) {
      if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Full name must be at least 2 characters.';
      if (!form.phone.trim()) e.phone = 'Phone number is required.';
      else if (!/^[+\d\s\-()]{7,15}$/.test(form.phone.trim())) e.phone = 'Enter a valid phone number.';
    }
    if (!form.email.trim()) e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'Enter a valid email address.';
    if (!form.password) e.password = 'Password is required.';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters.';
    if (mode === MODES.REGISTER && form.password !== form.confirm) e.confirm = 'Passwords do not match.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    setGlobalError('');
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setIsLoading(true);
    setGlobalError('');

    await new Promise(r => setTimeout(r, 900)); // Simulated network delay

    let result;
    if (tab === TABS.ADMIN) {
      result = loginAdmin({ email: form.email, password: form.password });
    } else if (mode === MODES.REGISTER) {
      result = registerTraveller({ name: form.name, phone: form.phone, email: form.email, password: form.password });
    } else {
      result = loginTraveller({ email: form.email, password: form.password });
    }

    setIsLoading(false);
    if (result.success) {
      setSuccess(
        tab === TABS.ADMIN ? 'Admin access granted! Loading dashboard...' :
        mode === MODES.REGISTER ? `Welcome aboard, ${result.user.name}! 🎉` :
        `Welcome back, ${result.user.name}!`
      );
    } else {
      setGlobalError(result.error);
    }
  };

  // ── Google Login ────────────────────────────────────────────────────────────
  const handleGoogle = async () => {
    setIsLoading(true);
    setGlobalError('');
    await new Promise(r => setTimeout(r, 1000));
    loginWithGoogle();
    setIsLoading(false);
  };

  // ── Success State ───────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="ag-gate">
        <div className="ag-bg-pattern" />
        <motion.div
          className="ag-card"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        >
          <div className="ag-success">
            <motion.div
              className="ag-success-icon"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.15 }}
            >
              <FiCheckCircle size={48} />
            </motion.div>
            <h2>{success}</h2>
            <p>Preparing your travel dashboard…</p>
            <div className="ag-loader-bar" />
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Main Gate UI ─────────────────────────────────────────────────────────────
  return (
    <div className="ag-gate">
      {/* Animated background */}
      <div className="ag-bg-pattern" />
      <div className="ag-bg-glow ag-bg-glow--1" />
      <div className="ag-bg-glow ag-bg-glow--2" />

      {/* Branding side (desktop) */}
      <motion.div
        className="ag-brand-panel"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="ag-brand-logo">
          <FiCompass size={36} />
          <span>YatraVista <span className="ag-brand-highlight">India</span></span>
        </div>
        <h1 className="ag-brand-headline">
          Your Gateway to <br />India's Most <br />
          <span className="ag-brand-highlight">Incredible Journeys</span>
        </h1>
        <p className="ag-brand-sub">
          Expert guides · Curated destinations · INR pricing · Real-time recommendations near you
        </p>
        <div className="ag-brand-stats">
          <div className="ag-stat"><strong>38+</strong><span>Destinations</span></div>
          <div className="ag-stat"><strong>85</strong><span>Expert Guides</span></div>
          <div className="ag-stat"><strong>10k+</strong><span>Happy Travellers</span></div>
        </div>
      </motion.div>

      {/* Auth Card */}
      <motion.div
        className="ag-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        {/* Card Header */}
        <div className="ag-card-header">
          <div className="ag-card-logo">
            <FiCompass size={22} />
            <span>YatraVista India</span>
          </div>
          <p className="ag-card-tagline">Sign in to explore India</p>
        </div>

        {/* Role Tabs */}
        <div className="ag-tabs" role="tablist">
          <button
            role="tab"
            aria-selected={tab === TABS.TRAVELLER}
            className={`ag-tab ${tab === TABS.TRAVELLER ? 'ag-tab--active' : ''}`}
            onClick={() => switchTab(TABS.TRAVELLER)}
            disabled={isLoading}
          >
            <FiUser size={14} /> Traveller
          </button>
          <button
            role="tab"
            aria-selected={tab === TABS.ADMIN}
            className={`ag-tab ${tab === TABS.ADMIN ? 'ag-tab--active' : ''}`}
            onClick={() => switchTab(TABS.ADMIN)}
            disabled={isLoading}
          >
            <FiShield size={14} /> Admin
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${tab}-${mode}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {/* ── TRAVELLER TAB ── */}
            {tab === TABS.TRAVELLER && (
              <>
                {/* Mode switcher: Sign In / Register */}
                <div className="ag-mode-switch">
                  <button
                    className={`ag-mode-btn ${mode === MODES.SIGNIN ? 'ag-mode-btn--active' : ''}`}
                    onClick={() => switchMode(MODES.SIGNIN)}
                    disabled={isLoading}
                  >Sign In</button>
                  <button
                    className={`ag-mode-btn ${mode === MODES.REGISTER ? 'ag-mode-btn--active' : ''}`}
                    onClick={() => switchMode(MODES.REGISTER)}
                    disabled={isLoading}
                  >Register</button>
                </div>

                {/* Google Button */}
                <button
                  type="button"
                  className="ag-google-btn"
                  onClick={handleGoogle}
                  disabled={isLoading}
                >
                  <GoogleIcon />
                  <span>Continue with Google</span>
                </button>

                <div className="ag-divider"><span>or</span></div>

                <form onSubmit={handleSubmit} noValidate>
                  <AnimatePresence initial={false}>
                    {mode === MODES.REGISTER && (
                      <motion.div
                        key="reg-fields"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <Field
                          id="ag-name" label="Full Name" name="name"
                          value={form.name} onChange={handleChange}
                          placeholder="e.g. Riya Sharma"
                          icon={FiUser} error={errors.name} disabled={isLoading}
                        />
                        <Field
                          id="ag-phone" label="Phone Number" name="phone"
                          value={form.phone} onChange={handleChange}
                          placeholder="+91 98765 43210"
                          icon={FiPhone} error={errors.phone} disabled={isLoading}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Field
                    id="ag-email" label="Email Address" name="email"
                    type="email" value={form.email} onChange={handleChange}
                    placeholder="you@example.com"
                    icon={FiMail} error={errors.email} disabled={isLoading}
                  />
                  <Field
                    id="ag-pwd" label="Password" name="password"
                    type={showPwd ? 'text' : 'password'}
                    value={form.password} onChange={handleChange}
                    placeholder="••••••••"
                    icon={FiLock} error={errors.password} disabled={isLoading}
                    rightEl={
                      <button type="button" className="ag-pwd-toggle"
                        onClick={() => setShowPwd(p => !p)} tabIndex={-1}>
                        {showPwd ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                      </button>
                    }
                  />

                  <AnimatePresence initial={false}>
                    {mode === MODES.REGISTER && (
                      <motion.div
                        key="confirm-field"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <Field
                          id="ag-confirm" label="Confirm Password" name="confirm"
                          type={showConfirm ? 'text' : 'password'}
                          value={form.confirm} onChange={handleChange}
                          placeholder="••••••••"
                          icon={FiLock} error={errors.confirm} disabled={isLoading}
                          rightEl={
                            <button type="button" className="ag-pwd-toggle"
                              onClick={() => setShowConfirm(p => !p)} tabIndex={-1}>
                              {showConfirm ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                            </button>
                          }
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {globalError && (
                    <div className="ag-global-error">
                      <FiAlertCircle size={14} /> {globalError}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="ag-submit-btn"
                    disabled={isLoading}
                  >
                    {isLoading
                      ? <span className="ag-btn-spinner" />
                      : (mode === MODES.SIGNIN ? 'Sign In →' : 'Create Account →')
                    }
                  </button>
                </form>
              </>
            )}

            {/* ── ADMIN TAB ── */}
            {tab === TABS.ADMIN && (
              <>
                <div className="ag-admin-hint">
                  <FiShield size={14} />
                  <span>Admin access only. Use your admin credentials.</span>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  <Field
                    id="ag-admin-email" label="Admin Email" name="email"
                    type="email" value={form.email} onChange={handleChange}
                    placeholder="admin@yatravista.in"
                    icon={FiMail} error={errors.email} disabled={isLoading}
                  />
                  <Field
                    id="ag-admin-pwd" label="Admin Password" name="password"
                    type={showPwd ? 'text' : 'password'}
                    value={form.password} onChange={handleChange}
                    placeholder="••••••••"
                    icon={FiLock} error={errors.password} disabled={isLoading}
                    rightEl={
                      <button type="button" className="ag-pwd-toggle"
                        onClick={() => setShowPwd(p => !p)} tabIndex={-1}>
                        {showPwd ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                      </button>
                    }
                  />

                  {globalError && (
                    <div className="ag-global-error">
                      <FiAlertCircle size={14} /> {globalError}
                    </div>
                  )}

                  <div className="ag-admin-creds-hint">
                    <code>admin@yatravista.in</code> · <code>Admin@123</code>
                  </div>

                  <button type="submit" className="ag-submit-btn ag-submit-btn--admin" disabled={isLoading}>
                    {isLoading
                      ? <span className="ag-btn-spinner" />
                      : '🛡️ Login as Admin →'
                    }
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <p className="ag-footer-text">
          By continuing you agree to YatraVista's Terms & Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
};

export default AuthGate;
