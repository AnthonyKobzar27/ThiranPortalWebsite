import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


function Account() {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const fullName = document.getElementById("name");
  const enterButton = document.getElementById("enterButton");
  
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
    setIsRegisterMode(!isRegisterMode);
    navigate(isRegisterMode ? '/account' : '/account?register=true', { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegisterMode) {
      await checkRegister();
    } else {
      await checkLogin();
    }
  };

  const checkLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Store username in local storage
        localStorage.setItem('username', data.userData.username);
        // Redirect to home
        navigate('/');
        window.location.reload();
      } else {
        console.log("oops");
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred while trying to log in. Please try again.');
    }
  };

  const checkRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();

  };

  return (
    <div className="account-container">
      <h1>{isRegisterMode ? 'Create Account' : 'Sign In'}</h1>
      
      <div className="auth-simple">
        <form className="auth-form" onSubmit={handleSubmit}>
          {!isRegisterMode && ( // Show username field only in sign-in mode
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" className="auth-input" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
          )}
          {isRegisterMode && (
            <>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" className="auth-input" placeholder="Enter your name" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" className="auth-input" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </>
          )}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" className="auth-input" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {isRegisterMode && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" className="auth-input" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
          )}
          <button className="auth-button" type="submit">
            {isRegisterMode ? 'Create Account' : 'Sign In'}
          </button>
        </form>
        
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