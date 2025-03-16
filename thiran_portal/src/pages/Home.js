import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Home() {
  const [username, setUsername] = useState('');
  const [activeTeam, setActiveTeam] = useState(null);

  useEffect(() => {
    // Retrieve username from local storage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    
    // Retrieve active team from local storage
    const storedActiveTeam = localStorage.getItem('activeTeam');
    if (storedActiveTeam) {
      try {
        setActiveTeam(JSON.parse(storedActiveTeam));
        // Removed window.location.reload() - this was causing infinite refresh!
      } catch (error) {
        console.error('Error parsing active team:', error);
      }
    }
  }, []);

  return (
    <header className="App-header">
      <div className="hero-section">
        {username ? (
          <>
            <h1 className="large-heading">
              Welcome <span className="gradient-text">{username}</span>
              {activeTeam && (
                <span> to <span className="gradient-text team-name">{activeTeam.name}</span></span>
              )}
            </h1>
            {/* Buttons removed for signed-in users */}
          </>
        ) : (
          <>
            <h1 className="large-heading">Analytics for <span className="gradient-text">Modern Teams</span></h1>
            <div className="centered-button-group">
              <button className="button primary large-button" onClick={() => window.location.href = '/account'}>Get Started</button>
              <button className="button secondary large-button" onClick={() => window.location.href = '/demo'}>View Demo</button>
            </div>
          </>
        )}
      </div>

      <div className="App-dashboard">
        {username ? (
          // Dashboard cards for logged-in users
          <>
            <div className="App-card">
              <h2>Performance Metrics</h2>
              <p>Monitor key performance indicators and track progress toward your goals.</p>
              <button className="button" onClick={() => window.location.href = '/analytics'}>View Dashboard</button>
            </div>
            
            <div className="App-card">
              <h2>Team Analytics</h2>
              <p>Gain insights into team performance and identify opportunities for growth.</p>
              <button className="button" onClick={() => window.location.href = '/analytics'}>Explore Analytics</button>
            </div>
            
            <div className="App-card">
              <h2>Custom Reports</h2>
              <p>Create and share custom reports tailored to your specific needs.</p>
              <button className="button" onClick={() => window.location.href = '/reports'}>Generate Reports</button>
            </div>
          </>
        ) : (
          // Marketing cards for non-logged-in users
          <>
            <div className="App-card">
              <h2>Team Collaboration</h2>
              <p>Work together seamlessly with your team members, no matter where they are located.</p>
              <button className="button" onClick={() => window.location.href = '/demo'}>Learn More</button>
            </div>
            
            <div className="App-card">
              <h2>Data Visualization</h2>
              <p>Transform complex data into clear, actionable insights with our visualization tools.</p>
              <button className="button" onClick={() => window.location.href = '/demo'}>See Examples</button>
            </div>
            
            <div className="App-card">
              <h2>Secure Platform</h2>
              <p>Your data is protected with enterprise-grade security and compliance measures.</p>
              <button className="button" onClick={() => window.location.href = '/about-us'}>Our Commitment</button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Home;