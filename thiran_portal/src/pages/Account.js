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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
    setError(''); // Clear any errors when switching modes
    navigate(isRegisterMode ? '/account' : '/account?register=true', { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isRegisterMode) {
        await checkRegister();
      } else {
        await checkLogin();
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const checkLogin = async () => {
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/login', {
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
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred while trying to log in. Please try again.');
    }
  };

  const checkRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        // Switch to login mode after successful registration
        setIsRegisterMode(false);
        navigate('/account', { replace: true });
        // Show success message
        alert('Registration successful! Please sign in with your new account.');
      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('An error occurred while trying to register. Please try again.');
    }
  };

  return (
    <div className="account-container">
      <h1>{isRegisterMode ? 'Create Account' : 'Sign In'}</h1>

      <div className="auth-simple">
        <form className="auth-form" onSubmit={handleSubmit}>
          {!isRegisterMode && (
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                className="auth-input"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
            </div>
          )}

          {isRegisterMode && (
            <>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  className="auth-input"
                  placeholder="Enter your name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="auth-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="auth-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={isRegisterMode ? "new-password" : "current-password"}
            />
          </div>

          {isRegisterMode && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="auth-input"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
          )}

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <button
            className="auth-button"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : (isRegisterMode ? 'Create Account' : 'Sign In')}
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