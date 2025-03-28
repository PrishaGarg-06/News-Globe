import React, { useContext, useState } from 'react';
import Enquiry from './Enquiry';
import Login from './LoginForm';
import Signup from './Signup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserEdit, faEnvelope, faBookmark, faSignOutAlt, faHeart, faNewspaper } from '@fortawesome/free-solid-svg-icons'; // Add faBookmark, faSignOutAlt icons
import { Link, useHref , useNavigate, useLocation} from 'react-router-dom'; // Import Link for navigation
import { AuthContext } from '../context/authContext';

const styles = {
  sidebarToggle: {
    position: 'fixed',
    top: '12px',
    right: '30px',
    zIndex: 101,
    padding: '8px 12px',
    fontSize: '20px',
    backgroundColor: 'transparent',
    color: '#fff',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      transform: 'scale(1.05)'
    }
  },

  sidebar: {
    position: 'fixed',
    top: 0,
    right: '-300px',
    width: '300px',
    height: '100vh',
    backgroundColor: '#fff',
    boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
    transition: 'right 0.3s ease',
    zIndex: 1000,
    padding: '60px 0 20px',
    display: 'flex',
    flexDirection: 'column'
  },

  sidebarActive: {
    right: 0
  },

  closeButton: {
    position: 'absolute',
    top: '15px',
    right: '20px',
    background: 'none',
    border: 'none',
    fontSize: '24px',
    color: '#666',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#dc3545'
    }
  },

  sidebarList: {
    listStyle: 'none',
    padding: '0',
    margin: '40px 0 0 0'
  },

  sidebarItem: {
    padding: '15px 25px',
    borderBottom: '1px solid #eee',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#f8f9fa'
    }
  },

  sidebarButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    width: '100%',
    padding: '10px',
    background: 'none',
    border: 'none',
    color: '#333',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      color: '#007bff'
    }
  },

  icon: {
    width: '20px',
    color: '#007bff'
  }
};

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const { isAuthenticated, setIsAuthenticated, userId, setUserId } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isDarkPage = location.pathname === '/news' || location.pathname === '/topreads';

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleBookmarksClick = () => {
    navigate('/bookmarks'); // Navigate to the Bookmarks page
  };

  const handleLikeClick =() =>{
    navigate('/like');
  }

  const handleFormToggle = (form) => {
    if (form === 'login') {
      setShowLogin(true);
      setShowEnquiry(false);
      setShowSignup(false);
    } else if (form === 'signup') {
      setShowSignup(true);
      setShowLogin(false);
      setShowEnquiry(false);
    } else if (form === 'enquiry') {
      setShowEnquiry(true);
      setShowLogin(false);
      setShowSignup(false);
    } else if (form === 'logout') {
      setUserId(null);
      setIsAuthenticated(false);
      localStorage.removeItem('token');
    }
    setShowSidebar(false);
  };

  return (
    <div>
      <button 
        style={styles.sidebarToggle}
        onClick={toggleSidebar}
      >
        ☰
      </button>

      <div style={{
        ...styles.sidebar,
        ...(showSidebar && styles.sidebarActive)
      }}>
        <button 
          style={styles.closeButton}
          onClick={toggleSidebar}
        >
          ×
        </button>

        <ul style={styles.sidebarList}>
          {!isAuthenticated && (
            <>
              <li style={styles.sidebarItem}>
                <button 
                  style={styles.sidebarButton}
                  onClick={() => handleFormToggle('login')}
                >
                  <FontAwesomeIcon icon={faUser} style={styles.icon} />
                  <span>Login</span>
                </button>
              </li>
              <li style={styles.sidebarItem}>
                <button 
                  style={styles.sidebarButton}
                  onClick={() => handleFormToggle('signup')}
                >
                  <FontAwesomeIcon icon={faUserEdit} style={styles.icon} />
                  <span>Signup</span>
                </button>
              </li>
            </>
          )}
          
          {isAuthenticated && (
            <>
              <li style={styles.sidebarItem}>
                <button 
                  style={styles.sidebarButton}
                  onClick={handleBookmarksClick}
                >
                  <FontAwesomeIcon icon={faBookmark} style={styles.icon} />
                  <span>Bookmarks</span>
                </button>
              </li>
              <li style={styles.sidebarItem}>
                <button 
                  style={styles.sidebarButton}
                  onClick={() => handleFormToggle('logout')}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} style={styles.icon} />
                  <span>Logout</span>
                </button>
              </li>
            </>
          )}
          
          <li style={styles.sidebarItem}>
            <button 
              style={styles.sidebarButton}
              onClick={() => handleFormToggle('enquiry')}
            >
              <FontAwesomeIcon icon={faEnvelope} style={styles.icon} />
              <span>Enquiry</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Conditional rendering of modals */}
      {showEnquiry && <Enquiry closeForm={() => setShowEnquiry(false)} />}
      {showLogin && <Login closeForm={() => setShowLogin(false)} />}
      {showSignup && <Signup closeForm={() => setShowSignup(false)} />}
    </div>
  );
};

export default Sidebar;
