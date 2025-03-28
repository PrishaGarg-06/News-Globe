import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const styles = {
  navbar: {
    backgroundColor: '#fff',
    padding: '15px 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 99,
    transition: 'all 0.3s ease',
    width: '100vw'
  },

  navbarHome: {
    backgroundColor: 'rgba(33, 33, 33, 0.9)',
    backdropFilter: 'blur(8px)',
    color: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
  },

  navbarDark: {
    backgroundColor: '#1a1a1a',
    color: '#fff'
  },

  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '0 80px 0 30px',
    maxWidth: '1400px',
    margin: '0 auto'
  },

  navList: {
    display: 'flex',
    alignItems: 'center',
    gap: '30px',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    flex: 1
  },

  navLinks: {
    display: 'flex',
    gap: '30px',
    marginLeft: '20px'
  },

  navLink: {
    textDecoration: 'none',
    color: '#333',
    fontSize: '16px',
    fontWeight: 500,
    padding: '8px 16px',
    borderRadius: '20px',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#f0f0f0',
      color: '#007bff'
    }
  },

  navLinkDark: {
    color: '#fff',
    '&:hover': {
      backgroundColor: '#333',
      color: '#007bff'
    }
  },

  navLinkHome: {
    color: '#fff',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: '#007bff'
    }
  },

  activeLink: {
    backgroundColor: '#007bff',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#0056b3',
      color: '#fff'
    }
  },

  userInfo: {
    fontSize: '14px',
    padding: '8px 16px',
    borderRadius: '20px',
    backgroundColor: '#f8f9fa',
    color: '#666',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    whiteSpace: 'nowrap'
  },

  userInfoDark: {
    backgroundColor: '#333',
    color: '#fff'
  },

  userInfoHome: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#fff'
  }
};

const Navbar = ({ dark = false }) => {
  const location = useLocation();
  const { isAuthenticated, username } = useContext(AuthContext);
  const isHome = location.pathname === '/';

  const getActiveClass = (path) => {
    return location.pathname === path;
  };

  return (
    <div style={{
      ...styles.navbar,
      ...(isHome && styles.navbarHome),
      ...(dark && !isHome && styles.navbarDark)
    }}>
      <nav style={styles.nav}>
        <div style={styles.navLinks}>
          <Link 
            to="/" 
            style={{
              ...styles.navLink,
              ...(isHome && styles.navLinkHome),
              ...(dark && !isHome && styles.navLinkDark),
              ...(getActiveClass('/') && styles.activeLink)
            }}
          >
            Home
          </Link>
          <Link 
            to="/news" 
            style={{
              ...styles.navLink,
              ...(isHome && styles.navLinkHome),
              ...(dark && !isHome && styles.navLinkDark),
              ...(getActiveClass('/news') && styles.activeLink)
            }}
          >
            News
          </Link>
          <Link 
            to="/topreads" 
            style={{
              ...styles.navLink,
              ...(isHome && styles.navLinkHome),
              ...(dark && !isHome && styles.navLinkDark),
              ...(getActiveClass('/topreads') && styles.activeLink)
            }}
          >
            Top Reads
          </Link>
        </div>

        <div style={{
          ...styles.userInfo,
          ...(isHome && styles.userInfoHome),
          ...(dark && !isHome && styles.userInfoDark)
        }}>
          {isAuthenticated && username ? (
            <span>Hello, {username}</span>
          ) : (
            <span>Welcome, Guest</span>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
