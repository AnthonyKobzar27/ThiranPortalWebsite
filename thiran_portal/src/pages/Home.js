import React from 'react';

function Home() {
  return (
    <header className="App-header">
      <div className="hero-section">
        <h1>Analytics for <span className="gradient-text">modern teams</span></h1>
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