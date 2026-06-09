import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiUsers, FiMapPin, FiCalendar, FiPhone, FiMail, FiSearch,
  FiX, FiTrendingUp, FiStar, FiDownload, FiShield,
  FiCreditCard, FiCheckCircle, FiClock, FiBookOpen, FiEdit2, FiSave
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const TABS = [
  { id: 'overview', label: '📊 Overview', icon: <FiTrendingUp /> },
  { id: 'bookings', label: '🎫 Bookings', icon: <FiBookOpen /> },
  { id: 'travellers', label: '👤 Travellers', icon: <FiUsers /> },
];

const STATUS_COLORS = {
  confirmed: { bg: 'rgba(16,185,129,0.12)', color: '#10b981', label: '✅ Confirmed' },
  pending: { bg: 'rgba(245,158,11,0.12)', color: '#f59e0b', label: '⏳ Pending' },
  cancelled: { bg: 'rgba(239,68,68,0.12)', color: '#ef4444', label: '❌ Cancelled' },
};

const AdminDashboard = ({ isOpen, onClose }) => {
  const { getAllTravellers, getAllBookings, updateBooking, currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [travSearch, setTravSearch] = useState('');
  const [bookSearch, setBookSearch] = useState('');
  
  // Pricing Adjust Modal State
  const [editingBooking, setEditingBooking] = useState(null);
  const [adjPrice, setAdjPrice] = useState('');
  const [adjTax, setAdjTax] = useState('');
  const [refreshSeed, setRefreshSeed] = useState(0);

  const travellers = getAllTravellers();
  const bookings = getAllBookings();

  const totalRevenue = bookings.filter(b => b.paymentStatus === 'paid').reduce((s, b) => s + (b.totalAmount || 0), 0);
  const avgBookingValue = bookings.length ? Math.round(totalRevenue / bookings.length) : 0;

  const filteredTravellers = travellers.filter(t =>
    !travSearch || t.name.toLowerCase().includes(travSearch.toLowerCase()) ||
    t.email.toLowerCase().includes(travSearch.toLowerCase()) ||
    (t.phone || '').includes(travSearch)
  );

  const filteredBookings = bookings.filter(b =>
    !bookSearch || b.destinationTitle?.toLowerCase().includes(bookSearch.toLowerCase()) ||
    b.userName?.toLowerCase().includes(bookSearch.toLowerCase()) ||
    b.id?.toLowerCase().includes(bookSearch.toLowerCase()) ||
    b.stateName?.toLowerCase().includes(bookSearch.toLowerCase())
  );

  const stats = [
    { label: 'Total Travellers', value: travellers.length, icon: <FiUsers />, color: '#d97706' },
    { label: 'Total Bookings', value: bookings.length, icon: <FiCalendar />, color: '#0369a1' },
    { label: 'Revenue Collected', value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: <FiCreditCard />, color: '#10b981' },
    { label: 'Avg. Booking', value: `₹${avgBookingValue.toLocaleString('en-IN')}`, icon: <FiStar />, color: '#7c3aed' },
  ];

  // ── Export CSV ──────────────────────────────────────────────────────────
  const exportTravellersCSV = () => {
    const header = 'Name,Email,Phone,Joined,Login Method\n';
    const rows = travellers.map(t =>
      `"${t.name}","${t.email}","${t.phone || 'N/A'}","${new Date(t.joinedAt).toLocaleDateString('en-IN')}","${t.loginMethod || 'email'}"`
    ).join('\n');
    downloadCSV('yatravista_travellers.csv', header + rows);
  };

  const exportBookingsCSV = () => {
    const header = 'Booking ID,Traveller,Email,Destination,State,Check-in,Check-out,Travellers,Package,Total Amount,Status\n';
    const rows = bookings.map(b =>
      `"${b.id}","${b.userName}","${b.userEmail}","${b.destinationTitle}","${b.stateName}","${b.checkIn}","${b.checkOut}","${b.travellers}","${b.packageType}","₹${(b.totalAmount||0).toLocaleString('en-IN')}","${b.status}"`
    ).join('\n');
    downloadCSV('yatravista_bookings.csv', header + rows);
  };

  const downloadCSV = (filename, content) => {
    const blob = new Blob([content], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  };

  const handleEditClick = (b) => {
    setEditingBooking(b);
    setAdjPrice(b.basePrice || Math.round((b.totalAmount || 0) / 1.23)); // Fallback if basePrice is missing
    setAdjTax(b.serviceTax || Math.round((b.basePrice || Math.round((b.totalAmount || 0) / 1.23)) * 0.18)); // Default 18% GST as fallback
  };

  const savePricingAdjustment = () => {
    if (!editingBooking) return;
    const p = parseFloat(adjPrice) || 0;
    const t = parseFloat(adjTax) || 0;
    const newTotal = p + t;
    updateBooking(editingBooking.id, { basePrice: p, serviceTax: t, totalAmount: newTotal });
    setEditingBooking(null);
    setRefreshSeed(s => s + 1); // trigger re-render
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div className="adm-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div className="adm-panel" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.35 }}>

            {/* Header */}
            <div className="adm-header">
              <div className="adm-header-left">
                <div className="adm-badge-icon"><FiShield size={18} /></div>
                <div>
                  <h2 className="adm-title">Admin Dashboard</h2>
                  <p className="adm-sub">Logged in as <strong>{currentUser?.email}</strong></p>
                </div>
              </div>
              <button className="adm-close" onClick={onClose} aria-label="Close dashboard"><FiX size={20} /></button>
            </div>

            {/* Tab Bar */}
            <div className="adm-tabs">
              {TABS.map(t => (
                <button
                  key={t.id}
                  className={`adm-tab ${activeTab === t.id ? 'adm-tab--active' : ''}`}
                  onClick={() => setActiveTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* ── OVERVIEW TAB ─────────────────────────────────────────────── */}
            {activeTab === 'overview' && (
              <div className="adm-content">
                {/* Stats */}
                <div className="adm-stats">
                  {stats.map((s, i) => (
                    <motion.div key={i} className="adm-stat-card"
                      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                      <div className="adm-stat-icon" style={{ color: s.color, background: `${s.color}18` }}>{s.icon}</div>
                      <div className="adm-stat-val">{s.value}</div>
                      <div className="adm-stat-label">{s.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Recent bookings */}
                <div className="adm-section">
                  <div className="adm-section-header">
                    <h3>Recent Bookings</h3>
                    <button className="adm-tab-link" onClick={() => setActiveTab('bookings')}>View All →</button>
                  </div>
                  {bookings.length === 0 ? (
                    <div className="adm-empty"><FiCalendar size={28} /><p>No bookings yet.</p></div>
                  ) : (
                    <div className="adm-table-wrap">
                      <table className="adm-table">
                        <thead><tr><th>ID</th><th>Traveller</th><th>Destination</th><th>Amount</th><th>Status</th></tr></thead>
                        <tbody>
                          {bookings.slice(0, 5).map((b, i) => {
                            const sc = STATUS_COLORS[b.status] || STATUS_COLORS.confirmed;
                            return (
                              <tr key={b.id}>
                                <td className="adm-td-mono">{b.id?.slice(-8)}</td>
                                <td><div className="adm-user-cell"><div className="adm-avatar" style={{ background: '#d97706' }}>{b.userName?.[0]}</div><span className="adm-user-name">{b.userName}</span></div></td>
                                <td><span style={{ fontSize: '0.8rem' }}>{b.destinationTitle}</span></td>
                                <td style={{ fontWeight: 700, color: '#10b981' }}>₹{(b.totalAmount||0).toLocaleString('en-IN')}</td>
                                <td><span className="adm-method-badge" style={{ background: sc.bg, color: sc.color }}>{sc.label}</span></td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Quick Stats */}
                <div className="adm-actions">
                  <h3 style={{ marginBottom: 12 }}>Quick Actions</h3>
                  <div className="adm-action-grid">
                    {[
                      { icon: <FiDownload />, label: 'Export Travellers CSV', color: '#d97706', action: exportTravellersCSV },
                      { icon: <FiDownload />, label: 'Export Bookings CSV', color: '#0369a1', action: exportBookingsCSV },
                      { icon: <FiBookOpen />, label: 'View All Bookings', color: '#0f5132', action: () => setActiveTab('bookings') },
                      { icon: <FiUsers />, label: 'View All Travellers', color: '#7c3aed', action: () => setActiveTab('travellers') },
                    ].map((a, i) => (
                      <button key={i} className="adm-action-btn" style={{ '--action-color': a.color }} onClick={a.action}>
                        <span style={{ color: a.color }}>{a.icon}</span><span>{a.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── BOOKINGS TAB ──────────────────────────────────────────────── */}
            {activeTab === 'bookings' && (
              <div className="adm-content">
                <div className="adm-section">
                  <div className="adm-section-header">
                    <h3>All Bookings <span className="adm-count-badge">{bookings.length}</span></h3>
                    <div className="adm-section-actions">
                      <div className="adm-search-wrap">
                        <FiSearch size={13} />
                        <input className="adm-search" placeholder="Search bookings…" value={bookSearch} onChange={e => setBookSearch(e.target.value)} />
                      </div>
                      <button className="adm-export-btn" onClick={exportBookingsCSV}>
                        <FiDownload size={12} /> Export
                      </button>
                    </div>
                  </div>

                  {filteredBookings.length === 0 ? (
                    <div className="adm-empty">
                      <FiCalendar size={32} />
                      <p>{bookings.length === 0 ? 'No bookings yet. They will appear here once travellers book trips.' : 'No results match your search.'}</p>
                    </div>
                  ) : (
                    <div className="adm-table-wrap">
                      <table className="adm-table">
                        <thead>
                          <tr>
                            <th>Booking ID</th>
                            <th>Traveller</th>
                            <th>Destination</th>
                            <th>Dates</th>
                            <th>Guests</th>
                            <th>Package</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredBookings.map((b, idx) => {
                            const sc = STATUS_COLORS[b.status] || STATUS_COLORS.confirmed;
                            return (
                              <motion.tr key={b.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.04 }}>
                                <td className="adm-td-mono" title={b.id}>{b.id}</td>
                                <td>
                                  <div className="adm-user-cell">
                                    <div className="adm-avatar" style={{ background: `hsl(${(b.userName?.charCodeAt(0) * 40) % 360}, 60%, 35%)` }}>
                                      {b.userName?.[0]?.toUpperCase()}
                                    </div>
                                    <div>
                                      <div className="adm-user-name">{b.userName}</div>
                                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{b.userEmail}</div>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>{b.destinationTitle}</div>
                                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>📍 {b.stateName}</div>
                                </td>
                                <td>
                                  <div style={{ fontSize: '0.75rem' }}>{b.checkIn}</div>
                                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>→ {b.checkOut} ({b.nights}n)</div>
                                </td>
                                <td style={{ textAlign: 'center', fontSize: '0.82rem' }}>{b.travellers}</td>
                                <td>
                                  <span className="adm-pkg-badge">{b.packageType}</span>
                                </td>
                                <td style={{ fontWeight: 700, color: '#10b981', fontSize: '0.85rem' }}>
                                  ₹{(b.totalAmount || 0).toLocaleString('en-IN')}
                                  {b.serviceTax !== undefined && <div style={{fontSize: '0.65rem', color: 'var(--text-muted)'}}>Incl. ₹{b.serviceTax} tax</div>}
                                </td>
                                <td>
                                  <span className="adm-method-badge" style={{ background: sc.bg, color: sc.color }}>
                                    {sc.label}
                                  </span>
                                </td>
                                <td>
                                  <button className="adm-edit-btn" onClick={() => handleEditClick(b)} title="Adjust Pricing">
                                    <FiEdit2 size={14} />
                                  </button>
                                </td>
                              </motion.tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Revenue total */}
                  {filteredBookings.length > 0 && (
                    <div className="adm-revenue-total">
                      <span>Total Revenue from {filteredBookings.length} booking{filteredBookings.length !== 1 ? 's' : ''}:</span>
                      <strong style={{ color: '#10b981' }}>
                        ₹{filteredBookings.reduce((s, b) => s + (b.totalAmount || 0), 0).toLocaleString('en-IN')}
                      </strong>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── TRAVELLERS TAB ────────────────────────────────────────────── */}
            {activeTab === 'travellers' && (
              <div className="adm-content">
                <div className="adm-section">
                  <div className="adm-section-header">
                    <h3>Registered Travellers <span className="adm-count-badge">{travellers.length}</span></h3>
                    <div className="adm-section-actions">
                      <div className="adm-search-wrap">
                        <FiSearch size={13} />
                        <input className="adm-search" placeholder="Search travellers…" value={travSearch} onChange={e => setTravSearch(e.target.value)} />
                      </div>
                      <button className="adm-export-btn" onClick={exportTravellersCSV}><FiDownload size={12} /> Export</button>
                    </div>
                  </div>

                  {filteredTravellers.length === 0 ? (
                    <div className="adm-empty"><FiUsers size={32} /><p>{travellers.length === 0 ? 'No travellers yet.' : 'No results.'}</p></div>
                  ) : (
                    <div className="adm-table-wrap">
                      <table className="adm-table">
                        <thead>
                          <tr><th>#</th><th>Name</th><th>Contact</th><th>Bookings</th><th>Joined</th><th>Via</th></tr>
                        </thead>
                        <tbody>
                          {filteredTravellers.map((t, idx) => {
                            const userBookings = bookings.filter(b => b.userEmail === t.email);
                            return (
                              <motion.tr key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.04 }}>
                                <td className="adm-td-num">{idx + 1}</td>
                                <td>
                                  <div className="adm-user-cell">
                                    <div className="adm-avatar" style={{ background: `hsl(${(t.name.charCodeAt(0) * 40) % 360}, 60%, 35%)` }}>
                                      {t.avatar || t.name[0].toUpperCase()}
                                    </div>
                                    <span className="adm-user-name">{t.name}</span>
                                  </div>
                                </td>
                                <td>
                                  <div className="adm-contact-cell">
                                    <span><FiMail size={11} /> {t.email}</span>
                                    {t.phone && <span><FiPhone size={11} /> {t.phone}</span>}
                                  </div>
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                  <span className="adm-booking-count">{userBookings.length}</span>
                                </td>
                                <td className="adm-td-date">
                                  {new Date(t.joinedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                </td>
                                <td>
                                  <span className={`adm-method-badge ${t.loginMethod === 'google' ? 'adm-method-badge--google' : 'adm-method-badge--email'}`}>
                                    {t.loginMethod === 'google' ? '🔵 Google' : '📧 Email'}
                                  </span>
                                </td>
                              </motion.tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}
            {/* ── PRICING ADJUSTMENT MODAL ───────────────────────────────────── */}
            <AnimatePresence>
              {editingBooking && (
                <motion.div className="adm-sub-modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <motion.div className="adm-sub-modal" initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }}>
                    <div className="adm-sub-header">
                      <h3>Adjust Pricing - {editingBooking.id}</h3>
                      <button onClick={() => setEditingBooking(null)}><FiX size={18} /></button>
                    </div>
                    <div className="adm-sub-body">
                      <p style={{fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 16}}>
                        Modifying pricing for <strong>{editingBooking.destinationTitle}</strong> (booked by {editingBooking.userName}).
                      </p>
                      <div className="bm-form-field">
                        <label className="bm-label">Base Trip Price (₹)</label>
                        <input type="number" className="bm-input" value={adjPrice} onChange={e => setAdjPrice(e.target.value)} />
                      </div>
                      <div className="bm-form-field">
                        <label className="bm-label">Service Tax (₹)</label>
                        <input type="number" className="bm-input" value={adjTax} onChange={e => setAdjTax(e.target.value)} />
                      </div>
                      
                      <div className="adm-adj-total">
                        New Total: <strong>₹{((parseFloat(adjPrice)||0) + (parseFloat(adjTax)||0)).toLocaleString('en-IN')}</strong>
                      </div>
                    </div>
                    <div className="adm-sub-footer">
                      <button className="bm-btn bm-btn-outline" onClick={() => setEditingBooking(null)}>Cancel</button>
                      <button className="bm-btn bm-btn-primary" onClick={savePricingAdjustment}><FiSave size={14}/> Save Changes</button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AdminDashboard;
