import React from 'react';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to your analytics dashboard</p>
      </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-widget wide">
          <h2>Performance Overview</h2>
          <div className="chart-placeholder">
            <div className="chart-bar" style={{ height: '60%' }}></div>
            <div className="chart-bar" style={{ height: '80%' }}></div>
            <div className="chart-bar" style={{ height: '40%' }}></div>
            <div className="chart-bar" style={{ height: '70%' }}></div>
            <div className="chart-bar" style={{ height: '90%' }}></div>
            <div className="chart-bar" style={{ height: '50%' }}></div>
          </div>
        </div>
        
        <div className="dashboard-widget">
          <h2>Team Activity</h2>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon">📊</div>
              <div className="activity-content">
                <p className="activity-title">Report Generated</p>
                <p className="activity-time">2 hours ago</p>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">👤</div>
              <div className="activity-content">
                <p className="activity-title">New Team Member</p>
                <p className="activity-time">Yesterday</p>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">🎯</div>
              <div className="activity-content">
                <p className="activity-title">Goal Achieved</p>
                <p className="activity-time">3 days ago</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="dashboard-widget">
          <h2>Key Metrics</h2>
          <div className="metrics-grid">
            <div className="metric-item">
              <p className="metric-value">87%</p>
              <p className="metric-label">Completion</p>
            </div>
            <div className="metric-item">
              <p className="metric-value">24</p>
              <p className="metric-label">Active Tasks</p>
            </div>
            <div className="metric-item">
              <p className="metric-value">7</p>
              <p className="metric-label">Team Members</p>
            </div>
            <div className="metric-item">
              <p className="metric-value">92%</p>
              <p className="metric-label">Efficiency</p>
            </div>
          </div>
        </div>
        
        <div className="dashboard-widget">
          <h2>Upcoming Deadlines</h2>
          <div className="deadline-list">
            <div className="deadline-item">
              <p className="deadline-title">Q2 Report</p>
              <p className="deadline-date">June 30, 2023</p>
            </div>
            <div className="deadline-item">
              <p className="deadline-title">Team Review</p>
              <p className="deadline-date">July 15, 2023</p>
            </div>
            <div className="deadline-item">
              <p className="deadline-title">Project Launch</p>
              <p className="deadline-date">August 1, 2023</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 