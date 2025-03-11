import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Layout({ children }) {
  const location = useLocation();
  const path = location.pathname;
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

  const toggleAccountDropdown = () => {
    setShowAccountDropdown(!showAccountDropdown);
  };

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
              onClick={toggleAccountDropdown}
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