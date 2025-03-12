import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Home() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Retrieve username from local storage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <header className="App-header">
      <div className="hero-section">
        {username ? (
          <h1>Welcome <span className="gradient-text">{username}</span></h1>
        ) : (
          <h1>Analytics for <span className="gradient-text">Modern Teams</span></h1>
        )}
        <p>Track performance, analyze trends, and make data-driven decisions with Thiran's powerful analytics platform.</p>
        <button className="button primary">Get Started</button>
      </div>

      <div className="App-dashboard">
        <div className="App-card">
          <h2>Performance Metrics</h2>
          <p>Monitor key performance indicators and track progress toward your goals.</p>
          <button className="button">View Dashboard</button>
        </div>
        
        <div className="App-card">
          <h2>Team Analytics</h2>
          <p>Gain insights into team performance and identify opportunities for growth.</p>
          <button className="button">Explore Analytics</button>
        </div>
        
        <div className="App-card">
          <h2>Custom Reports</h2>
          <p>Create and share custom reports tailored to your specific needs.</p>
          <button className="button">Generate Reports</button>
        </div>
      </div>
    </header>
  );
}

export default Home; 