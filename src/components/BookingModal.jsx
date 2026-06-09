import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiX, FiMapPin, FiCalendar, FiUsers, FiSearch, FiArrowRight,
  FiArrowLeft, FiCreditCard, FiLock, FiCheckCircle, FiStar,
  FiAlertCircle, FiInfo, FiTag, FiPercent, FiChevronDown, FiChevronUp, FiShield, FiZap
} from 'react-icons/fi';

// ── Coupon Codes Database ─────────────────────────────────────────────────
const VALID_COUPONS = {
  'YATRA10':  { discount: 10, type: 'percent', label: '10% Off', desc: 'Flat 10% on all bookings' },
  'INDIA20':  { discount: 20, type: 'percent', label: '20% Off', desc: 'India Independence special' },
  'FIRST15':  { discount: 15, type: 'percent', label: '15% Off', desc: 'First booking discount' },
  'SUMMER25': { discount: 25, type: 'percent', label: '25% Off', desc: 'Summer travel season deal' },
  'SAVE5000': { discount: 5000, type: 'flat', label: '₹5,000 Off', desc: 'Flat ₹5,000 cashback' },
};
import { ALL_DESTINATIONS, INDIA_STATES, TRAVEL_TYPES } from '../utils/travelData';
import { useAuth } from '../context/AuthContext';

// ── Step indicator ────────────────────────────────────────────────────────
const STEPS = [
  { label: 'Choose Destination' },
  { label: 'Travel Details' },
  { label: 'Payment' },
  { label: 'Confirmed!' },
];

const StepBar = ({ current }) => (
  <div className="bm-stepbar">
    {STEPS.map((s, i) => (
      <React.Fragment key={i}>
        <div className={`bm-step ${i < current ? 'bm-step--done' : i === current ? 'bm-step--active' : ''}`}>
          <div className="bm-step-circle">
            {i < current ? '✓' : i + 1}
          </div>
          <span className="bm-step-label">{s.label}</span>
        </div>
        {i < STEPS.length - 1 && <div className={`bm-step-line ${i < current ? 'bm-step-line--done' : ''}`} />}
      </React.Fragment>
    ))}
  </div>
);

// ── Step 1: Destination Picker ────────────────────────────────────────────
const DestinationStep = ({ selected, onSelect }) => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [stateFilter, setStateFilter] = useState('all');

  const filtered = useMemo(() => {
    return ALL_DESTINATIONS.filter(d => {
      const matchSearch = !search || d.title.toLowerCase().includes(search.toLowerCase()) ||
        d.stateName.toLowerCase().includes(search.toLowerCase()) ||
        d.nearbyPlaces?.some(p => p.toLowerCase().includes(search.toLowerCase()));
      const matchType = typeFilter === 'all' || d.type === typeFilter;
      const matchState = stateFilter === 'all' || d.state === stateFilter;
      return matchSearch && matchType && matchState;
    }).slice(0, 12);
  }, [search, typeFilter, stateFilter]);

  return (
    <div className="bm-step1">
      {/* Search bar */}
      <div className="bm-search-wrap">
        <FiSearch size={15} />
        <input
          className="bm-search"
          placeholder="Search destination, state, or attraction…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          autoFocus
        />
      </div>

      {/* Filters row */}
      <div className="bm-filters-row">
        <select className="bm-filter-sel" value={stateFilter} onChange={e => setStateFilter(e.target.value)}>
          <option value="all">All States</option>
          {INDIA_STATES.map(s => (
            <option key={s.id} value={s.id}>{s.emoji} {s.label}</option>
          ))}
        </select>
        <select className="bm-filter-sel" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
          <option value="all">All Types</option>
          {TRAVEL_TYPES.slice(1).map(t => (
            <option key={t.id} value={t.id}>{t.label}</option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <div className="bm-results-count">
        {filtered.length} destination{filtered.length !== 1 ? 's' : ''} found
      </div>

      {/* Destination grid */}
      <div className="bm-dest-grid">
        {filtered.length === 0 ? (
          <div className="bm-empty">
            <FiMapPin size={28} />
            <p>No destinations match your search. Try different keywords.</p>
          </div>
        ) : (
          filtered.map(dest => (
            <motion.button
              key={dest.id}
              className={`bm-dest-card ${selected?.id === dest.id ? 'bm-dest-card--selected' : ''}`}
              onClick={() => onSelect(dest)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="bm-dest-top">
                <div className="bm-dest-type-badge">{dest.type}</div>
                <div className="bm-dest-rating">
                  <FiStar size={10} style={{ fill: '#f59e0b', color: '#f59e0b' }} />
                  {dest.rating}
                </div>
              </div>
              <div className="bm-dest-title">{dest.title}</div>
              <div className="bm-dest-state">📍 {dest.stateName}</div>
              <div className="bm-dest-nearby">
                {dest.nearbyPlaces?.slice(0, 2).join(' · ')}
              </div>
              <div className="bm-dest-price">₹{dest.price?.toLocaleString('en-IN')}/night</div>
              {selected?.id === dest.id && (
                <div className="bm-dest-selected-badge">✓ Selected</div>
              )}
            </motion.button>
          ))
        )}
      </div>
    </div>
  );
};

// ── Step 2: Travel Details ────────────────────────────────────────────────
const TravelDetailsStep = ({ destination, details, setDetails, errors }) => {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bm-step2">
      {/* Selected destination summary */}
      <div className="bm-selected-dest">
        <div>
          <div className="bm-sd-title">{destination.title}</div>
          <div className="bm-sd-state">📍 {destination.stateName} · {destination.type}</div>
          <div className="bm-sd-highlights">
            {destination.highlights?.slice(0, 3).join(' · ')}
          </div>
        </div>
        <div className="bm-sd-price-block">
          <div className="bm-sd-price">₹{destination.price?.toLocaleString('en-IN')}</div>
          <div className="bm-sd-price-note">per night</div>
        </div>
      </div>

      <div className="bm-form-grid">
        {/* Check-in */}
        <div className="bm-form-field">
          <label className="bm-label"><FiCalendar size={12} /> Check-in Date *</label>
          <input
            type="date"
            className={`bm-input ${errors.checkIn ? 'bm-input--error' : ''}`}
            value={details.checkIn}
            min={today}
            onChange={e => setDetails(p => ({ ...p, checkIn: e.target.value }))}
          />
          {errors.checkIn && <span className="bm-field-error"><FiAlertCircle size={11} /> {errors.checkIn}</span>}
        </div>

        {/* Check-out */}
        <div className="bm-form-field">
          <label className="bm-label"><FiCalendar size={12} /> Check-out Date *</label>
          <input
            type="date"
            className={`bm-input ${errors.checkOut ? 'bm-input--error' : ''}`}
            value={details.checkOut}
            min={details.checkIn || today}
            onChange={e => setDetails(p => ({ ...p, checkOut: e.target.value }))}
          />
          {errors.checkOut && <span className="bm-field-error"><FiAlertCircle size={11} /> {errors.checkOut}</span>}
        </div>

        {/* Travellers */}
        <div className="bm-form-field">
          <label className="bm-label"><FiUsers size={12} /> Number of Travellers *</label>
          <select
            className="bm-input"
            value={details.travellers}
            onChange={e => setDetails(p => ({ ...p, travellers: e.target.value }))}
          >
            {[1,2,3,4,5,6,8,10].map(n => (
              <option key={n} value={n}>{n} {n === 1 ? 'Traveller' : 'Travellers'}</option>
            ))}
          </select>
        </div>

        {/* Package type */}
        <div className="bm-form-field">
          <label className="bm-label">Package Type</label>
          <select
            className="bm-input"
            value={details.packageType}
            onChange={e => setDetails(p => ({ ...p, packageType: e.target.value }))}
          >
            <option value="standard">Standard (Hotel + Sightseeing)</option>
            <option value="premium">Premium (Luxury Stay + Guide)</option>
            <option value="adventure">Adventure (Camp + Trek)</option>
            <option value="custom">Custom Package</option>
          </select>
        </div>

        {/* Full-width fields */}
        <div className="bm-form-field bm-form-field--full">
          <label className="bm-label">Pickup City / Location</label>
          <input
            type="text"
            className="bm-input"
            placeholder="e.g. Delhi Airport, Mumbai Central…"
            value={details.pickup}
            onChange={e => setDetails(p => ({ ...p, pickup: e.target.value }))}
          />
        </div>

        <div className="bm-form-field bm-form-field--full">
          <label className="bm-label">Special Requests / Notes</label>
          <textarea
            className="bm-input bm-textarea"
            placeholder="Dietary requirements, accessibility needs, specific activities…"
            value={details.notes}
            onChange={e => setDetails(p => ({ ...p, notes: e.target.value }))}
            rows={3}
          />
        </div>
      </div>

      {/* Price breakdown */}
      {details.checkIn && details.checkOut && (
        <PriceBreakdown destination={destination} details={details} />
      )}

      {/* Nearby places info */}
      <div className="bm-nearby-info">
        <FiInfo size={13} />
        <span>
          <strong>Nearby attractions:</strong> {destination.nearbyPlaces?.join(', ')}
        </span>
      </div>

      {/* Best season */}
      <div className="bm-season-tag">
        🌤️ Best season to visit: <strong>{destination.season}</strong>
      </div>
    </div>
  );
};

// ── Price Breakdown Calculator ─────────────────────────────────────────────
const PriceBreakdown = ({ destination, details, couponDiscount = 0, couponCode = '' }) => {
  const nights = Math.max(1, Math.round(
    (new Date(details.checkOut) - new Date(details.checkIn)) / (1000 * 60 * 60 * 24)
  ));
  const travellers = parseInt(details.travellers) || 1;
  const pkgMultiplier = details.packageType === 'premium' ? 1.4 : details.packageType === 'adventure' ? 1.2 : details.packageType === 'custom' ? 1.6 : 1;
  const basePerNight = destination.price;
  const basePrice = Math.round(basePerNight * nights * pkgMultiplier);
  const travellersSurcharge = travellers > 2 ? Math.round(basePrice * 0.08 * (travellers - 2)) : 0;
  const subtotal = basePrice + travellersSurcharge;
  const gst = Math.round(subtotal * 0.18);
  const platformFee = Math.round(subtotal * 0.03);
  const totalBeforeDiscount = subtotal + gst + platformFee;
  const discountAmt = couponDiscount > 0 ? Math.min(couponDiscount, totalBeforeDiscount) : 0;
  const finalTotal = totalBeforeDiscount - discountAmt;

  return (
    <div className="bm-price-breakdown">
      <div className="bm-pb-title">💰 Price Breakdown</div>
      <div className="bm-pb-row">
        <span>₹{basePerNight.toLocaleString('en-IN')} × {nights} night{nights > 1 ? 's' : ''}
          {pkgMultiplier > 1 && <span className="bm-pb-pkg-tag">{details.packageType}</span>}
        </span>
        <span>₹{basePrice.toLocaleString('en-IN')}</span>
      </div>
      {travellers > 2 && (
        <div className="bm-pb-row">
          <span>Extra travellers ({travellers - 2} × 8%)</span>
          <span>₹{travellersSurcharge.toLocaleString('en-IN')}</span>
        </div>
      )}
      <div className="bm-pb-divider" />
      <div className="bm-pb-row bm-pb-row--muted">
        <span>Subtotal</span>
        <span>₹{subtotal.toLocaleString('en-IN')}</span>
      </div>
      <div className="bm-pb-row">
        <span>GST (18%)</span>
        <span>₹{gst.toLocaleString('en-IN')}</span>
      </div>
      <div className="bm-pb-row">
        <span>Platform Fee (3%)</span>
        <span>₹{platformFee.toLocaleString('en-IN')}</span>
      </div>
      {discountAmt > 0 && (
        <div className="bm-pb-row bm-pb-row--discount">
          <span>🎟️ Coupon ({couponCode})</span>
          <span>− ₹{discountAmt.toLocaleString('en-IN')}</span>
        </div>
      )}
      <div className="bm-pb-divider" />
      <div className="bm-pb-row bm-pb-total">
        <strong>Total Payable</strong>
        <strong style={{ color: 'var(--color-primary)', fontSize: '1.05rem' }}>₹{finalTotal.toLocaleString('en-IN')}</strong>
      </div>
      {discountAmt > 0 && (
        <div className="bm-pb-saved">🎉 You saved ₹{discountAmt.toLocaleString('en-IN')} on this booking!</div>
      )}
    </div>
  );
};

// ── Coupon Box ─────────────────────────────────────────────────────────────
const CouponBox = ({ onApply, appliedCoupon, onRemove }) => {
  const [code, setCode] = useState(appliedCoupon?.code || '');
  const [status, setStatus] = useState(appliedCoupon ? 'applied' : 'idle'); // idle | loading | applied | error
  const [errorMsg, setErrorMsg] = useState('');
  const [showHints, setShowHints] = useState(false);

  const handleApply = () => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return;
    setStatus('loading');
    setErrorMsg('');
    setTimeout(() => {
      const coupon = VALID_COUPONS[trimmed];
      if (coupon) {
        setStatus('applied');
        onApply({ code: trimmed, ...coupon });
      } else {
        setStatus('error');
        setErrorMsg('Invalid coupon code. Try YATRA10 or INDIA20.');
      }
    }, 900);
  };

  const handleRemove = () => {
    setCode('');
    setStatus('idle');
    setErrorMsg('');
    onRemove();
  };

  return (
    <div className="bm-coupon-box">
      <div className="bm-coupon-header" onClick={() => setShowHints(h => !h)}>
        <div className="bm-coupon-label"><FiTag size={14} /> Have a coupon code?</div>
        {showHints ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
      </div>

      <AnimatePresence>
        {showHints && (
          <motion.div className="bm-coupon-hints"
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
            <div className="bm-ch-label">🎁 Available Offers:</div>
            <div className="bm-ch-list">
              {Object.entries(VALID_COUPONS).map(([c, v]) => (
                <button key={c} className="bm-ch-pill" onClick={() => { setCode(c); setShowHints(false); }}>
                  <strong>{c}</strong> — {v.desc}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {status !== 'applied' ? (
        <div className="bm-coupon-row">
          <input
            className={`bm-input bm-coupon-input ${status === 'error' ? 'bm-input--error' : ''}`}
            placeholder="Enter coupon code"
            value={code}
            onChange={e => { setCode(e.target.value.toUpperCase()); setStatus('idle'); setErrorMsg(''); }}
            onKeyDown={e => e.key === 'Enter' && handleApply()}
          />
          <button
            className="bm-coupon-apply-btn"
            onClick={handleApply}
            disabled={!code.trim() || status === 'loading'}
          >
            {status === 'loading' ? <span className="bm-spinner" /> : 'Apply'}
          </button>
        </div>
      ) : (
        <motion.div className="bm-coupon-applied"
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="bm-ca-left">
            <FiCheckCircle size={16} />
            <div>
              <div className="bm-ca-code">{appliedCoupon.code}</div>
              <div className="bm-ca-desc">{appliedCoupon.label} applied · {appliedCoupon.desc}</div>
            </div>
          </div>
          <button className="bm-ca-remove" onClick={handleRemove}>✕</button>
        </motion.div>
      )}

      {status === 'error' && (
        <motion.div className="bm-coupon-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <FiAlertCircle size={12} /> {errorMsg}
        </motion.div>
      )}
    </div>
  );
};

// ── Step 3: Payment ────────────────────────────────────────────────────────
const PaymentStep = ({ destination, details, payment, setPayment, payErrors, coupon, setCoupon }) => {
  const [payMode, setPayMode] = useState('card');
  const [showBill, setShowBill] = useState(true);

  const nights = Math.max(1, Math.round(
    (new Date(details.checkOut) - new Date(details.checkIn)) / (1000 * 60 * 60 * 24)
  ));
  const pkgMultiplier = details.packageType === 'premium' ? 1.4 : details.packageType === 'adventure' ? 1.2 : details.packageType === 'custom' ? 1.6 : 1;
  const basePrice = Math.round(destination.price * nights * pkgMultiplier);
  const travellersSurcharge = parseInt(details.travellers) > 2 ? Math.round(basePrice * 0.08 * (parseInt(details.travellers) - 2)) : 0;
  const subtotal = basePrice + travellersSurcharge;
  const gst = Math.round(subtotal * 0.18);
  const platformFee = Math.round(subtotal * 0.03);
  const totalBeforeDiscount = subtotal + gst + platformFee;
  const discountAmt = coupon ? (coupon.type === 'percent' ? Math.round(totalBeforeDiscount * coupon.discount / 100) : Math.min(coupon.discount, totalBeforeDiscount)) : 0;
  const finalTotal = totalBeforeDiscount - discountAmt;

  // Detect card type from number
  const cardNum = (payment.cardNumber || '').replace(/\s/g, '');
  const cardType = cardNum.startsWith('4') ? 'VISA' : cardNum.startsWith('5') ? 'Mastercard' : cardNum.startsWith('6') ? 'RuPay' : cardNum.startsWith('37') || cardNum.startsWith('34') ? 'AMEX' : null;

  const formatCard = (val) => val.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
  const formatExpiry = (val) => val.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5);

  return (
    <div className="bm-step3">

      {/* ── Bill Summary Panel ─────────────────────────── */}
      <div className="bm-bill-panel">
        <button className="bm-bill-toggle" onClick={() => setShowBill(s => !s)}>
          <div className="bm-bill-toggle-left">
            <span className="bm-bill-dest">{destination.title}</span>
            <span className="bm-bill-meta">{nights} night{nights > 1 ? 's' : ''} · {details.travellers} traveller{details.travellers > 1 ? 's' : ''}</span>
          </div>
          <div className="bm-bill-toggle-right">
            {coupon && <span className="bm-bill-saving">🎟️ −₹{discountAmt.toLocaleString('en-IN')}</span>}
            <span className="bm-bill-total">₹{finalTotal.toLocaleString('en-IN')}</span>
            {showBill ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
          </div>
        </button>

        <AnimatePresence>
          {showBill && (
            <motion.div
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <div className="bm-bill-rows">
                <div className="bm-bill-row">
                  <span>₹{destination.price.toLocaleString('en-IN')} × {nights} nights{pkgMultiplier > 1 ? ` (${details.packageType})` : ''}</span>
                  <span>₹{basePrice.toLocaleString('en-IN')}</span>
                </div>
                {travellersSurcharge > 0 && (
                  <div className="bm-bill-row">
                    <span>Extra travellers surcharge</span>
                    <span>₹{travellersSurcharge.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="bm-bill-row bm-bill-row--muted">
                  <span>GST (18%)</span>
                  <span>₹{gst.toLocaleString('en-IN')}</span>
                </div>
                <div className="bm-bill-row bm-bill-row--muted">
                  <span>Platform Fee (3%)</span>
                  <span>₹{platformFee.toLocaleString('en-IN')}</span>
                </div>
                {discountAmt > 0 && (
                  <div className="bm-bill-row bm-bill-row--discount">
                    <span>🎟️ Coupon ({coupon.code})</span>
                    <span>−₹{discountAmt.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="bm-bill-row bm-bill-total-row">
                  <strong>Total Payable</strong>
                  <strong style={{ color: 'var(--color-primary)' }}>₹{finalTotal.toLocaleString('en-IN')}</strong>
                </div>
              </div>
              {discountAmt > 0 && (
                <div className="bm-bill-saved">🎉 You're saving ₹{discountAmt.toLocaleString('en-IN')} with coupon <strong>{coupon.code}</strong>!</div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Coupon Box ─────────────────────────────────── */}
      <CouponBox
        onApply={setCoupon}
        appliedCoupon={coupon}
        onRemove={() => setCoupon(null)}
      />

      {/* ── Payment Mode Tabs ──────────────────────────── */}
      <div className="bm-pay-section-label">💳 Select Payment Method</div>
      <div className="bm-pay-modes">
        {[
          { id: 'card', label: '💳 Debit / Credit Card' },
          { id: 'upi', label: '📱 UPI' },
          { id: 'netbanking', label: '🏦 Net Banking' },
        ].map(m => (
          <button
            key={m.id}
            className={`bm-pay-mode-btn ${payMode === m.id ? 'bm-pay-mode-btn--active' : ''}`}
            onClick={() => setPayMode(m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Card Payment */}
        {payMode === 'card' && (
          <motion.div key="card" className="bm-pay-form"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>

            {/* Card brand indicator */}
            {cardType && (
              <motion.div className="bm-card-type-badge" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <FiZap size={11} /> {cardType} card detected
              </motion.div>
            )}

            <div className="bm-form-field bm-form-field--full">
              <label className="bm-label">Cardholder Name *</label>
              <input className={`bm-input ${payErrors.cardName ? 'bm-input--error' : ''}`}
                placeholder="As printed on card"
                value={payment.cardName}
                onChange={e => setPayment(p => ({ ...p, cardName: e.target.value }))}
              />
              {payErrors.cardName && <span className="bm-field-error"><FiAlertCircle size={11} /> {payErrors.cardName}</span>}
            </div>

            <div className="bm-form-field bm-form-field--full">
              <label className="bm-label">Card Number *</label>
              <div className="bm-card-input-wrap">
                <FiCreditCard size={15} className="bm-card-icon" />
                <input className={`bm-input bm-input--padded ${payErrors.cardNumber ? 'bm-input--error' : ''}`}
                  placeholder="1234 5678 9012 3456"
                  value={payment.cardNumber}
                  maxLength={19}
                  onChange={e => setPayment(p => ({ ...p, cardNumber: formatCard(e.target.value) }))}
                />
                {cardType && <span className="bm-card-type-chip">{cardType}</span>}
              </div>
              {payErrors.cardNumber && <span className="bm-field-error"><FiAlertCircle size={11} /> {payErrors.cardNumber}</span>}
            </div>

            <div className="bm-form-grid-2">
              <div className="bm-form-field">
                <label className="bm-label">Expiry Date *</label>
                <input className={`bm-input ${payErrors.expiry ? 'bm-input--error' : ''}`}
                  placeholder="MM / YY"
                  value={payment.expiry}
                  maxLength={5}
                  onChange={e => setPayment(p => ({ ...p, expiry: formatExpiry(e.target.value) }))}
                />
                {payErrors.expiry && <span className="bm-field-error"><FiAlertCircle size={11} /> {payErrors.expiry}</span>}
              </div>
              <div className="bm-form-field">
                <label className="bm-label">CVV / CVC *  <span className="bm-cvv-hint">3-4 digits on back</span></label>
                <input className={`bm-input ${payErrors.cvv ? 'bm-input--error' : ''}`}
                  placeholder="• • • •"
                  type="password"
                  maxLength={4}
                  value={payment.cvv}
                  onChange={e => setPayment(p => ({ ...p, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                />
                {payErrors.cvv && <span className="bm-field-error"><FiAlertCircle size={11} /> {payErrors.cvv}</span>}
              </div>
            </div>

            <div className="bm-secure-note">
              <FiShield size={12} /> 256-bit SSL encrypted &nbsp;·&nbsp; PCI DSS Level 1 &nbsp;·&nbsp; 3D Secure enabled
            </div>
          </motion.div>
        )}

        {/* UPI Payment */}
        {payMode === 'upi' && (
          <motion.div key="upi" className="bm-pay-form"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            <div className="bm-form-field bm-form-field--full">
              <label className="bm-label">UPI ID *</label>
              <input className={`bm-input ${payErrors.upiId ? 'bm-input--error' : ''}`}
                placeholder="yourname@okaxis / @ybl / @paytm"
                value={payment.upiId || ''}
                onChange={e => setPayment(p => ({ ...p, upiId: e.target.value }))}
              />
              {payErrors.upiId && <span className="bm-field-error"><FiAlertCircle size={11} /> {payErrors.upiId}</span>}
            </div>
            <div className="bm-upi-label">Or pay with:</div>
            <div className="bm-upi-apps">
              {[
                { label: 'GPay', emoji: '📱', color: '#4285F4' },
                { label: 'PhonePe', emoji: '🟣', color: '#5f259f' },
                { label: 'Paytm', emoji: '💙', color: '#00b9f1' },
                { label: 'BHIM', emoji: '🔵', color: '#1a237e' },
              ].map(app => (
                <button key={app.label}
                  className="bm-upi-app-btn"
                  style={{ '--app-color': app.color }}
                  type="button"
                  onClick={() => setPayment(p => ({ ...p, upiId: p.upiId || `yourname@${app.label.toLowerCase()}` }))}>
                  {app.emoji} {app.label}
                </button>
              ))}
            </div>
            <div className="bm-secure-note">
              <FiShield size={12} /> Secured by NPCI · Instant bank transfer · Zero charges
            </div>
          </motion.div>
        )}

        {/* Net Banking */}
        {payMode === 'netbanking' && (
          <motion.div key="nb" className="bm-pay-form"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            <div className="bm-form-field bm-form-field--full">
              <label className="bm-label">Select Bank *</label>
              <select className="bm-input"
                value={payment.bank || ''}
                onChange={e => setPayment(p => ({ ...p, bank: e.target.value }))}>
                <option value="">-- Select your bank --</option>
                <optgroup label="Popular Banks">
                  <option value="sbi">🏦 State Bank of India (SBI)</option>
                  <option value="hdfc">🏦 HDFC Bank</option>
                  <option value="icici">🏦 ICICI Bank</option>
                  <option value="axis">🏦 Axis Bank</option>
                  <option value="kotak">🏦 Kotak Mahindra Bank</option>
                </optgroup>
                <optgroup label="Other Banks">
                  <option value="pnb">Punjab National Bank</option>
                  <option value="bob">Bank of Baroda</option>
                  <option value="canara">Canara Bank</option>
                  <option value="idbi">IDBI Bank</option>
                  <option value="ubi">Union Bank of India</option>
                </optgroup>
              </select>
            </div>
            <div className="bm-secure-note">
              <FiShield size={12} /> You will be redirected to your bank's secure portal
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trust badges */}
      <div className="bm-trust-row">
        <div className="bm-trust-item"><FiLock size={12} /> 100% Secure</div>
        <div className="bm-trust-item"><FiShield size={12} /> PCI Compliant</div>
        <div className="bm-trust-item"><FiCheckCircle size={12} /> Instant Confirm</div>
        <div className="bm-trust-item"><FiZap size={12} /> No Hidden Fees</div>
      </div>

      {/* Accepted methods */}
      <div className="bm-accepted-methods">
        <span className="bm-am-label">We accept:</span>
        {['VISA', 'Mastercard', 'RuPay', 'UPI', 'AMEX', 'Diners'].map(m => (
          <span key={m} className="bm-am-badge">{m}</span>
        ))}
      </div>

      {/* Pay button hint */}
      <div className="bm-pay-hint">
        <FiInfo size={12} /> Click <strong>Pay & Confirm</strong> to complete your booking. Amount charged: <strong style={{ color: 'var(--color-primary)' }}>₹{finalTotal.toLocaleString('en-IN')}</strong>
      </div>
    </div>
  );
};

// ── Step 4: Confirmation ──────────────────────────────────────────────────
const ConfirmationStep = ({ booking, onClose }) => (
  <div className="bm-step4">
    <motion.div
      className="bm-confirm-icon"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
    >
      <FiCheckCircle size={56} />
    </motion.div>
    <h2 className="bm-confirm-title">Booking Confirmed! 🎉</h2>
    <p className="bm-confirm-sub">Your trip has been successfully booked. Check your email for details.</p>

    <div className="bm-booking-details">
      <div className="bm-bd-row">
        <span>Booking ID</span>
        <strong style={{ fontFamily: 'monospace', color: 'var(--color-primary)' }}>{booking?.id}</strong>
      </div>
      <div className="bm-bd-row">
        <span>Destination</span>
        <strong>{booking?.destinationTitle}</strong>
      </div>
      <div className="bm-bd-row">
        <span>State</span>
        <strong>{booking?.stateName}</strong>
      </div>
      <div className="bm-bd-row">
        <span>Check-in</span>
        <strong>{booking?.checkIn}</strong>
      </div>
      <div className="bm-bd-row">
        <span>Check-out</span>
        <strong>{booking?.checkOut}</strong>
      </div>
      <div className="bm-bd-row">
        <span>Travellers</span>
        <strong>{booking?.travellers}</strong>
      </div>
      <div className="bm-bd-row">
        <span>Package</span>
        <strong style={{ textTransform: 'capitalize' }}>{booking?.packageType}</strong>
      </div>
      <div className="bm-bd-row">
        <span>Status</span>
        <strong style={{ color: '#10b981' }}>✅ Confirmed & Paid</strong>
      </div>
      <div className="bm-bd-divider" />
      <div className="bm-bd-row bm-bd-total">
        <strong>Total Paid</strong>
        <strong style={{ color: 'var(--color-primary)', fontSize: '1.1rem' }}>
          ₹{booking?.totalAmount?.toLocaleString('en-IN')}
        </strong>
      </div>
    </div>

    <div className="bm-confirm-actions">
      <button className="bm-confirm-close" onClick={onClose}>
        Continue Exploring <FiArrowRight size={14} />
      </button>
    </div>

    <div className="bm-confirm-note">
      📧 Booking confirmation sent to <strong>{booking?.userEmail}</strong>
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════════════════════
//  MAIN BOOKING MODAL
// ══════════════════════════════════════════════════════════════════════════
const BookingModal = ({ isOpen, onClose, preselectedDestination = null }) => {
  const { createBooking, currentUser } = useAuth();

  const [step, setStep] = useState(0);
  const [selectedDest, setSelectedDest] = useState(preselectedDestination);
  const [details, setDetails] = useState({ checkIn: '', checkOut: '', travellers: '2', packageType: 'standard', pickup: '', notes: '' });
  const [payment, setPayment] = useState({ cardName: '', cardNumber: '', expiry: '', cvv: '', upiId: '', bank: '' });
  const [detailErrors, setDetailErrors] = useState({});
  const [payErrors, setPayErrors] = useState({});
  const [coupon, setCoupon] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Reset on close
  const handleClose = () => {
    setStep(0);
    setSelectedDest(preselectedDestination);
    setDetails({ checkIn: '', checkOut: '', travellers: '2', packageType: 'standard', pickup: '', notes: '' });
    setPayment({ cardName: '', cardNumber: '', expiry: '', cvv: '', upiId: '', bank: '' });
    setCoupon(null);
    setDetailErrors({});
    setPayErrors({});
    setConfirmedBooking(null);
    onClose();
  };

  // ── Navigation ──────────────────────────────────────────────────────────
  const goNext = () => {
    if (step === 0) {
      if (!selectedDest) return alert('Please select a destination first.');
      setStep(1);
    } else if (step === 1) {
      const e = {};
      if (!details.checkIn) e.checkIn = 'Required';
      if (!details.checkOut) e.checkOut = 'Required';
      else if (new Date(details.checkOut) <= new Date(details.checkIn)) e.checkOut = 'Must be after check-in';
      setDetailErrors(e);
      if (!Object.keys(e).length) setStep(2);
    } else if (step === 2) {
      handlePayment();
    }
  };

  const goBack = () => step > 0 && step < 3 && setStep(s => s - 1);

  // ── Payment processing ──────────────────────────────────────────────────
  const handlePayment = async () => {
    const e = {};
    if (!payment.upiId && !payment.bank) {
      if (!payment.cardName.trim()) e.cardName = 'Required';
      if (!payment.cardNumber || payment.cardNumber.replace(/\s/g, '').length < 16) e.cardNumber = 'Enter a valid 16-digit card number';
      if (!payment.expiry || !/^\d{2}\/\d{2}$/.test(payment.expiry)) e.expiry = 'Format: MM/YY';
      if (!payment.cvv || payment.cvv.length < 3) e.cvv = 'Enter 3-4 digit CVV';
    }
    setPayErrors(e);
    if (Object.keys(e).length) return;

    setIsProcessing(true);
    await new Promise(r => setTimeout(r, 2200)); // Simulate payment processing

    // Calculate realistic final total
    const nights = Math.max(1, Math.round((new Date(details.checkOut) - new Date(details.checkIn)) / 86400000));
    const pkgMultiplier = details.packageType === 'premium' ? 1.4 : details.packageType === 'adventure' ? 1.2 : details.packageType === 'custom' ? 1.6 : 1;
    const basePrice = Math.round(selectedDest.price * nights * pkgMultiplier);
    const travellersSurcharge = parseInt(details.travellers) > 2 ? Math.round(basePrice * 0.08 * (parseInt(details.travellers) - 2)) : 0;
    const subtotal = basePrice + travellersSurcharge;
    const gst = Math.round(subtotal * 0.18);
    const platformFee = Math.round(subtotal * 0.03);
    const totalBeforeDiscount = subtotal + gst + platformFee;
    const discountAmt = coupon ? (coupon.type === 'percent' ? Math.round(totalBeforeDiscount * coupon.discount / 100) : Math.min(coupon.discount, totalBeforeDiscount)) : 0;
    const finalTotal = totalBeforeDiscount - discountAmt;

    const result = createBooking({
      destinationId: selectedDest.id,
      destinationTitle: selectedDest.title,
      stateName: selectedDest.stateName,
      stateId: selectedDest.state,
      type: selectedDest.type,
      hotelName: selectedDest.hotelName,
      checkIn: details.checkIn,
      checkOut: details.checkOut,
      nights,
      travellers: details.travellers,
      packageType: details.packageType,
      pickup: details.pickup,
      notes: details.notes,
      totalAmount: finalTotal,
      basePrice: basePrice,
      couponApplied: coupon ? coupon.code : null,
      discountAmt,
    });

    setIsProcessing(false);
    if (result.success) {
      setConfirmedBooking(result.booking);
      setStep(3);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="bm-backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={step < 3 ? handleClose : undefined}
          />

          {/* Modal wrapper — fixed centering via flexbox (avoids Framer transform conflict) */}
          <div className="bm-modal-wrapper">
          <motion.div
            className="bm-modal"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="bm-header">
              <div className="bm-header-left">
                <div className="bm-header-icon">🗺️</div>
                <div>
                  <div className="bm-header-title">
                    {step === 0 ? 'Choose Your Destination' :
                     step === 1 ? 'Travel Details' :
                     step === 2 ? 'Secure Payment' :
                     'Booking Confirmed'}
                  </div>
                  <div className="bm-header-sub">
                    {currentUser?.name ? `Booking for ${currentUser.name}` : 'YatraVista Booking'}
                  </div>
                </div>
              </div>
              {step < 3 && (
                <button className="bm-close-btn" onClick={handleClose} aria-label="Close booking">
                  <FiX size={18} />
                </button>
              )}
            </div>

            {/* Step Bar */}
            <StepBar current={step} />

            {/* Body */}
            <div className="bm-body">
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <DestinationStep selected={selectedDest} onSelect={setSelectedDest} />
                  </motion.div>
                )}
                {step === 1 && (
                  <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <TravelDetailsStep destination={selectedDest} details={details} setDetails={setDetails} errors={detailErrors} />
                    <PriceBreakdown destination={selectedDest} details={details} />
                  </motion.div>
                )}
                {step === 2 && (
                  <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <PaymentStep destination={selectedDest} details={details} payment={payment} setPayment={setPayment} payErrors={payErrors} coupon={coupon} setCoupon={setCoupon} />
                  </motion.div>
                )}
                {step === 3 && (
                  <motion.div key="s3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                    <ConfirmationStep booking={confirmedBooking} onClose={handleClose} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer Nav */}
            {step < 3 && (
              <div className="bm-footer">
                <button
                  className="bm-btn-back"
                  onClick={goBack}
                  disabled={step === 0}
                >
                  <FiArrowLeft size={14} /> Back
                </button>
                <div className="bm-footer-mid">
                  Step {step + 1} of 3
                </div>
                <button
                  className="bm-btn-next"
                  onClick={goNext}
                  disabled={isProcessing || (step === 0 && !selectedDest)}
                >
                  {isProcessing ? (
                    <><span className="bm-spinner" /> Processing Payment…</>
                  ) : step === 2 ? (
                    <><FiLock size={13} /> Pay & Confirm</>
                  ) : (
                    <>Continue <FiArrowRight size={14} /></>
                  )}
                </button>
              </div>
            )}
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
