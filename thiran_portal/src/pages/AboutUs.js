import React from 'react';

function AboutUs() {
  return (
    <div className="about-us-container">
      <header className="App-header">
        <div className="hero-section">
          <h1>About Thiran</h1>
          <p>Building the future of team collaboration</p>
        </div>
      </header>
      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            At Thiran, we believe that great teams need great tools. Our mission is to empower teams of all sizes with a
            seamless platform that makes collaboration effortless, transparent, and productive.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Founded in 2023, Thiran was born out of the frustration with existing team management solutions. We set out to create
            a platform that combines powerful features with an intuitive interface, allowing teams to focus on what matters most:
            doing great work together.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="team-photo-placeholder">
                <img src="/team-member1.png" alt="Team Member" onError={(e) => e.target.src = "https://via.placeholder.com/150?text=Team+Member"} />
              </div>
              <h3>Alex Johnson</h3>
              <p>Founder & CEO</p>
            </div>
            <div className="team-member">
              <div className="team-photo-placeholder">
                <img src="/team-member2.png" alt="Team Member" onError={(e) => e.target.src = "https://via.placeholder.com/150?text=Team+Member"} />
              </div>
              <h3>Sarah Chen</h3>
              <p>CTO</p>
            </div>
            <div className="team-member">
              <div className="team-photo-placeholder">
                <img src="/team-member3.png" alt="Team Member" onError={(e) => e.target.src = "https://via.placeholder.com/150?text=Team+Member"} />
              </div>
              <h3>Michael Rodriguez</h3>
              <p>Head of Design</p>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <h2>Join us on our journey</h2>
          <p>Experience the Thiran difference today.</p>
          <button className="cta-button" onClick={() => window.location.href = '/account?register=true'}>Get Started</button>
        </section>
      </div>
    </div>
  );
}

export default AboutUs;
