import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

const ADMIN_EMAIL = 'admin@yatravista.in';
const ADMIN_PASSWORD = 'Admin@123';
const USERS_KEY = 'yatravista_users';
const SESSION_KEY = 'yatravista_session';
const BOOKINGS_KEY = 'yatravista_bookings';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(SESSION_KEY);
      if (saved) setCurrentUser(JSON.parse(saved));
    } catch { localStorage.removeItem(SESSION_KEY); }
    setIsAuthLoading(false);
  }, []);

  const getUsers = () => {
    try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); }
    catch { return []; }
  };

  const getBookings = () => {
    try { return JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]'); }
    catch { return []; }
  };

  const saveSession = (user) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    setCurrentUser(user);
  };

  // ── Register ────────────────────────────────────────────────────────────
  const registerTraveller = useCallback(({ name, phone, email, password }) => {
    const users = getUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase()))
      return { success: false, error: 'An account with this email already exists.' };

    const newUser = {
      id: Date.now().toString(), role: 'traveller',
      name: name.trim(), phone: phone.trim(),
      email: email.toLowerCase().trim(), password,
      avatar: name.trim()[0].toUpperCase(),
      joinedAt: new Date().toISOString(), bookings: []
    };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    const session = { ...newUser }; delete session.password;
    saveSession(session);
    return { success: true, user: session };
  }, []);

  // ── Traveller Login ──────────────────────────────────────────────────────
  const loginTraveller = useCallback(({ email, password }) => {
    const user = getUsers().find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password && u.role === 'traveller'
    );
    if (!user) return { success: false, error: 'Invalid email or password.' };
    const session = { ...user }; delete session.password;
    saveSession(session);
    return { success: true, user: session };
  }, []);

  // ── Admin Login ──────────────────────────────────────────────────────────
  const loginAdmin = useCallback(({ email, password }) => {
    if (email.toLowerCase().trim() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser = { id: 'admin-001', role: 'admin', name: 'Admin', email: ADMIN_EMAIL, avatar: 'A', joinedAt: new Date().toISOString() };
      saveSession(adminUser);
      return { success: true, user: adminUser };
    }
    return { success: false, error: 'Invalid admin credentials.' };
  }, []);

  // ── Google Login ─────────────────────────────────────────────────────────
  const loginWithGoogle = useCallback(() => {
    const profiles = [
      { name: 'Rahul Verma', email: 'rahul.verma@gmail.com', phone: '+91 98765 43210', avatar: 'R' },
      { name: 'Sneha Patel', email: 'sneha.patel@gmail.com', phone: '+91 87654 32109', avatar: 'S' },
      { name: 'Aakash Singh', email: 'aakash.s@gmail.com', phone: '+91 76543 21098', avatar: 'A' }
    ];
    const p = profiles[Math.floor(Math.random() * profiles.length)];
    const googleUser = { id: `google-${Date.now()}`, role: 'traveller', loginMethod: 'google', ...p, joinedAt: new Date().toISOString() };
    const users = getUsers();
    if (!users.find(u => u.email === googleUser.email)) {
      users.push({ ...googleUser, password: null });
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
    saveSession(googleUser);
    return { success: true, user: googleUser };
  }, []);

  // ── BOOKING: Create ──────────────────────────────────────────────────────
  const createBooking = useCallback((bookingData) => {
    if (!currentUser) return { success: false, error: 'Not logged in.' };

    const booking = {
      id: `BK${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userPhone: currentUser.phone || '',
      createdAt: new Date().toISOString(),
      status: 'confirmed',
      paymentStatus: 'paid',
      ...bookingData
    };

    // Save to global bookings list
    const bookings = getBookings();
    bookings.unshift(booking);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));

    // Also update user record
    const users = getUsers();
    const idx = users.findIndex(u => u.id === currentUser.id);
    if (idx !== -1) {
      users[idx].bookings = users[idx].bookings || [];
      users[idx].bookings.unshift(booking.id);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }

    return { success: true, booking };
  }, [currentUser]);

  // ── BOOKING: Get user's bookings ──────────────────────────────────────────
  const getUserBookings = useCallback(() => {
    if (!currentUser) return [];
    return getBookings().filter(b => b.userId === currentUser.id);
  }, [currentUser]);

  // ── BOOKING: Update Booking ───────────────────────────────────────────────
  const updateBooking = useCallback((bookingId, updates) => {
    const bookings = getBookings();
    const idx = bookings.findIndex(b => b.id === bookingId);
    if (idx !== -1) {
      bookings[idx] = { ...bookings[idx], ...updates };
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
      return { success: true, booking: bookings[idx] };
    }
    return { success: false, error: 'Booking not found' };
  }, []);

  // ── Admin: Get ALL bookings ───────────────────────────────────────────────
  const getAllBookings = useCallback(() => getBookings(), []);

  // ── Admin: Get ALL travellers ─────────────────────────────────────────────
  const getAllTravellers = useCallback(() => getUsers().filter(u => u.role === 'traveller'), []);

  // ── Logout ────────────────────────────────────────────────────────────────
  const logout = useCallback(() => { localStorage.removeItem(SESSION_KEY); setCurrentUser(null); }, []);

  return (
    <AuthContext.Provider value={{
      currentUser, isLoggedIn: !!currentUser,
      isAdmin: currentUser?.role === 'admin',
      isTraveller: currentUser?.role === 'traveller',
      isAuthLoading,
      registerTraveller, loginTraveller, loginAdmin, loginWithGoogle, logout,
      createBooking, getUserBookings, updateBooking, getAllBookings, getAllTravellers
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export default AuthContext;
