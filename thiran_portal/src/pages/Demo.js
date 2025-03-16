import React from 'react';

function Demo() {
  return (
    <div className="demo-container">
      <header className="App-header">
        <div className="hero-section">
          <h1>Thiran Portal Demo</h1>
          <p>Experience the power of Thiran's collaborative team management platform.</p>
        </div>
      </header>
      <div className="demo-content">
        <section className="demo-feature">
          <h2>Team Collaboration</h2>
          <p>See how Thiran makes it easy for teams to collaborate on projects, share resources, and track progress in real-time.</p>
          <div className="demo-image-placeholder">
            <img src="/demo-collaboration.png" alt="Team Collaboration" onError={(e) => e.target.src = "https://via.placeholder.com/400x250?text=Collaboration+Demo"} />
          </div>
        </section>

        <section className="demo-feature">
          <h2>Analytics Dashboard</h2>
          <p>Explore powerful analytics tools that help you visualize team performance and identify opportunities for improvement.</p>
          <div className="demo-image-placeholder">
            <img src="/demo-analytics.png" alt="Analytics Dashboard" onError={(e) => e.target.src = "https://via.placeholder.com/400x250?text=Analytics+Demo"} />
          </div>
        </section>

        <section className="cta-section">
          <h2>Ready to get started?</h2>
          <p>Create an account today and experience the full power of Thiran.</p>
          <button className="cta-button" onClick={() => window.location.href = '/account?register=true'}>Sign Up Now</button>
        </section>
      </div>
    </div>
  );
}

export default Demo;
