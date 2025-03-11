import React from 'react';

function Analytics() {
  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h1>Analytics</h1>
        <p>Detailed insights and data analysis</p>
      </div>
      
      <div className="analytics-controls">
        <div className="analytics-filter">
          <label>Time Period:</label>
          <select className="select-control">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Custom Range</option>
          </select>
        </div>
        
        <div className="analytics-filter">
          <label>Team:</label>
          <select className="select-control">
            <option>All Teams</option>
            <option>Engineering</option>
            <option>Marketing</option>
            <option>Sales</option>
          </select>
        </div>
        
        <button className="button">Apply Filters</button>
      </div>
      
      <div className="analytics-grid">
        <div className="analytics-card wide">
          <h2>Performance Trends</h2>
          <div className="chart-placeholder large">
            <div className="line-chart">
              <div className="line-point" style={{ left: '0%', bottom: '20%' }}></div>
              <div className="line-point" style={{ left: '20%', bottom: '40%' }}></div>
              <div className="line-point" style={{ left: '40%', bottom: '30%' }}></div>
              <div className="line-point" style={{ left: '60%', bottom: '60%' }}></div>
              <div className="line-point" style={{ left: '80%', bottom: '50%' }}></div>
              <div className="line-point" style={{ left: '100%', bottom: '70%' }}></div>
            </div>
          </div>
        </div>
        
        <div className="analytics-card">
          <h2>Team Comparison</h2>
          <div className="chart-placeholder">
            <div className="pie-chart">
              <div className="pie-segment" style={{ transform: 'rotate(0deg)', backgroundColor: 'rgba(203, 166, 247, 0.8)' }}></div>
              <div className="pie-segment" style={{ transform: 'rotate(120deg)', backgroundColor: 'rgba(203, 166, 247, 0.5)' }}></div>
              <div className="pie-segment" style={{ transform: 'rotate(240deg)', backgroundColor: 'rgba(203, 166, 247, 0.3)' }}></div>
            </div>
          </div>
          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: 'rgba(203, 166, 247, 0.8)' }}></div>
              <div className="legend-label">Engineering (45%)</div>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: 'rgba(203, 166, 247, 0.5)' }}></div>
              <div className="legend-label">Marketing (30%)</div>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: 'rgba(203, 166, 247, 0.3)' }}></div>
              <div className="legend-label">Sales (25%)</div>
            </div>
          </div>
        </div>
        
        <div className="analytics-card">
          <h2>Key Insights</h2>
          <div className="insights-list">
            <div className="insight-item">
              <div className="insight-icon positive">↑</div>
              <div className="insight-content">
                <p className="insight-title">Productivity increased by 15%</p>
                <p className="insight-description">Compared to previous period</p>
              </div>
            </div>
            <div className="insight-item">
              <div className="insight-icon negative">↓</div>
              <div className="insight-content">
                <p className="insight-title">Task completion time decreased by 8%</p>
                <p className="insight-description">Teams are more efficient</p>
              </div>
            </div>
            <div className="insight-item">
              <div className="insight-icon positive">↑</div>
              <div className="insight-content">
                <p className="insight-title">Team collaboration up 23%</p>
                <p className="insight-description">More cross-team projects</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics; 