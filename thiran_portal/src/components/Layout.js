import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Layout({ children }) {
  const location = useLocation();
  const path = location.pathname;
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const toggleAccountDropdown = () => {
    setShowAccountDropdown(!showAccountDropdown);
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem('username'); // Clear username from local storage
    setUsername(''); // Clear username state
    navigate('/account'); // Redirect to account page
    window.location.reload();
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div className="App">
      <nav className="App-navbar">
        <div className="ThiranContainer">
          <img id="ThiranSpiderLogo" src="/custom_purple_bug.png" alt="Thiran Bug"/>
          <h1 id="ThiranTitle">thiran.</h1>
        </div>

        <div className="App-navbar-links">
          <Link to="/" className={path === '/' ? 'active' : ''}>Dashboard</Link>
          <Link to="/analytics" className={path === '/analytics' ? 'active' : ''}>Analytics</Link>
          <Link to="/reports" className={path === '/reports' ? 'active' : ''}>Reports</Link>
          
          <div className="account-dropdown-container">
            <div 
              className="profile-icon" 
              onClick={username ? (toggleUserDropdown) : (toggleAccountDropdown)}
              aria-haspopup="true"
              aria-expanded={showAccountDropdown}
            >
              <img 
                src="https://ui-avatars.com/api/?name=User&background=313244&color=fff&size=32" 
                alt="Profile" 
                className="avatar-img"
              />
            </div>
            
            {showAccountDropdown && (
              <div className="account-dropdown">
                <Link to="/account" className="dropdown-item">
                  Sign In
                </Link>
                <Link to="/account?register=true" className="dropdown-item">
                  Register
                </Link>
              </div>
            )}

            {showUserDropdown && (
              <div className="account-dropdown">
                <p>Hello {username}!</p>
                <button onClick={handleLogout} className="dropdown-item">Log Out</button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="main-content">
        <aside className="sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-title">Teams</h3>
            <ul className="sidebar-list">
              {/* This will be populated with actual teams later */}
              <li className="sidebar-list-item">
                <button className="add-team-button">
                  <span className="add-team-icon">+</span>
                  Add teams to start
                </button>
              </li>
            </ul>
          </div>
          
          <div className="sidebar-section">
            <h3 className="sidebar-title">Personal Account</h3>
            <ul className="sidebar-list">
              <li className={`sidebar-list-item ${path === '/' ? 'active' : ''}`}>
                <Link to="/">
                  <span className="sidebar-icon">◆</span>
                  Overview
                </Link>
              </li>
              <li className={`sidebar-list-item ${path === '/projects' ? 'active' : ''}`}>
                <Link to="/projects">
                  <span className="sidebar-icon">◇</span>
                  Projects
                </Link>
              </li>
              <li className={`sidebar-list-item ${path === '/settings' ? 'active' : ''}`}>
                <Link to="/settings">
                  <span className="sidebar-icon">⚙</span>
                  Settings
                </Link>
              </li>
            </ul>
          </div>
        </aside>

        <div className="content-area">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout; 