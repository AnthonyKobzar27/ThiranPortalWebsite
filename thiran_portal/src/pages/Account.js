import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Account() {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if the URL has a register parameter
    const params = new URLSearchParams(location.search);
    if (params.get('register') === 'true') {
      setIsRegisterMode(true);
    } else {
      setIsRegisterMode(false);
    }
  }, [location]);
  
  const toggleMode = () => {
    const newMode = !isRegisterMode;
    setIsRegisterMode(newMode);
    
    // Update the URL to match the current mode
    if (newMode) {
      navigate('/account?register=true', { replace: true });
    } else {
      navigate('/account', { replace: true });
    }
  };

  return (
    <div className="account-container">
      <h1>{isRegisterMode ? 'Create Account' : 'Sign In'}</h1>
      
      <div className="auth-simple">
        <div className="auth-form">
          {isRegisterMode ? (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" className="auth-input" placeholder="Enter your name" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" className="auth-input" placeholder="Enter your email" />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" className="auth-input" placeholder="Enter your password" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input type="password" id="confirmPassword" className="auth-input" placeholder="Confirm your password" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" className="auth-input" placeholder="Enter your email" />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" className="auth-input" placeholder="Enter your password" />
              </div>
            </>
          )}
          
          <button className="auth-button">
            {isRegisterMode ? 'Create Account' : 'Sign In'}
          </button>
        </div>
        
        <div className="auth-toggle">
          {isRegisterMode ? (
            <p>Already have an account? <button onClick={toggleMode} className="toggle-button">Sign In</button></p>
          ) : (
            <p>Don't have an account? <button onClick={toggleMode} className="toggle-button">Register</button></p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Account; 