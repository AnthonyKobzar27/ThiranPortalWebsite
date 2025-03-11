import React from 'react';

function Reports() {
  return (
    <div className="reports-container">
      <div className="reports-header">
        <h1>Reports</h1>
        <p>Generate and manage your analytics reports</p>
      </div>
      
      <div className="reports-actions">
        <button className="button primary">Create New Report</button>
        <button className="button">Import Data</button>
        <button className="button">Export All</button>
      </div>
      
      <div className="reports-section">
        <h2>Recent Reports</h2>
        <div className="reports-list">
          <div className="report-item">
            <div className="report-icon">📊</div>
            <div className="report-details">
              <h3 className="report-title">Q2 Performance Summary</h3>
              <p className="report-meta">Generated on June 15, 2023 • PDF</p>
            </div>
            <div className="report-actions">
              <button className="button small">View</button>
              <button className="button small">Download</button>
            </div>
          </div>
          
          <div className="report-item">
            <div className="report-icon">📈</div>
            <div className="report-details">
              <h3 className="report-title">Team Productivity Analysis</h3>
              <p className="report-meta">Generated on June 10, 2023 • Excel</p>
            </div>
            <div className="report-actions">
              <button className="button small">View</button>
              <button className="button small">Download</button>
            </div>
          </div>
          
          <div className="report-item">
            <div className="report-icon">📋</div>
            <div className="report-details">
              <h3 className="report-title">Project Completion Rates</h3>
              <p className="report-meta">Generated on June 5, 2023 • PDF</p>
            </div>
            <div className="report-actions">
              <button className="button small">View</button>
              <button className="button small">Download</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="reports-section">
        <h2>Scheduled Reports</h2>
        <div className="reports-list">
          <div className="report-item">
            <div className="report-icon">🔄</div>
            <div className="report-details">
              <h3 className="report-title">Weekly Team Performance</h3>
              <p className="report-meta">Every Monday • 9:00 AM • PDF</p>
            </div>
            <div className="report-actions">
              <button className="button small">Edit</button>
              <button className="button small">Disable</button>
            </div>
          </div>
          
          <div className="report-item">
            <div className="report-icon">🔄</div>
            <div className="report-details">
              <h3 className="report-title">Monthly Executive Summary</h3>
              <p className="report-meta">1st of every month • 8:00 AM • PDF</p>
            </div>
            <div className="report-actions">
              <button className="button small">Edit</button>
              <button className="button small">Disable</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="reports-section">
        <h2>Report Templates</h2>
        <div className="templates-grid">
          <div className="template-card">
            <h3>Performance Overview</h3>
            <p>A comprehensive overview of team performance metrics.</p>
            <button className="button">Use Template</button>
          </div>
          
          <div className="template-card">
            <h3>Resource Allocation</h3>
            <p>Analyze how resources are distributed across projects.</p>
            <button className="button">Use Template</button>
          </div>
          
          <div className="template-card">
            <h3>Team Comparison</h3>
            <p>Compare performance metrics across different teams.</p>
            <button className="button">Use Template</button>
          </div>
          
          <div className="template-card">
            <h3>Custom Report</h3>
            <p>Build a custom report with your selected metrics.</p>
            <button className="button">Create Custom</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports; 