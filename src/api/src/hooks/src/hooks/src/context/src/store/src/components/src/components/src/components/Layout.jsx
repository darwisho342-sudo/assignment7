import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useCartStore } from '../store/cartStore';

export function Layout() {
  const { user, logoutUser } = useAuth();
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  // Primitive selector to avoid unnecessary re-renders
  const itemCount = useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0)
  );

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const appStyle = {
    backgroundColor: theme === 'light' ? '#ffffff' : '#1e1e1e',
    color: theme === 'light' ? '#000000' : '#f5f5f5',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'sans-serif',
  };

  const navStyle = {
    display: 'flex',
    gap: '1rem',
    padding: '1rem',
    borderBottom: '1px solid #ccc',
    alignItems: 'center',
  };

  return (
    <div style={appStyle}>
      <header>
        <nav style={navStyle}>
          <NavLink to="/" end style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal', color: 'inherit' })}>
            Home
          </NavLink>
          <NavLink to="/products" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal', color: 'inherit' })}>
            Products
          </NavLink>
          <NavLink to="/cart" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal', color: 'inherit' })}>
            Cart ({itemCount})
          </NavLink>

          <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button onClick={toggleTheme}>
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
            {user ? (
              <>
                <span>Welcome, {user.username}</span>
                <button onClick={logoutUser}>Logout</button>
              </>
            ) : (
              <NavLink to="/login" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal', color: 'inherit' })}>
                Login
              </NavLink>
            )}
          </div>
        </nav>
      </header>

      <main style={{ flex: 1, padding: '1rem' }}>
        <Outlet />
      </main>

      <footer style={{ padding: '1rem', borderTop: '1px solid #ccc', textAlign: 'center' }}>
        <p>&copy; 2026 Online Shop - Web Programming Assignment 7</p>
      </footer>
    </div>
  );
}