import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Layout({ children }) {
  const location = useLocation();
  const path = location.pathname;
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [username, setUsername] = useState('');
  const [showTeamPanel, setShowTeamPanel] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [passcode, setPasscode] = useState('');
  const [userTeams, setUserTeams] = useState([]);
  const [activeTeam, setActiveTeam] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = React.useRef(null);

  // Simple toggle functions for dropdowns
  const toggleAccountDropdown = () => {
    setShowAccountDropdown(!showAccountDropdown);
    setShowUserDropdown(false);
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
    setShowAccountDropdown(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUsername('');
    navigate('/account');
  };

  const toggleTeamPanel = () => {
    setShowTeamPanel(!showTeamPanel);
  };

  // Simple fetch for user teams
  const fetchUserTeams = async () => {
    if (!username) return;
    
    try {
      const response = await fetch(`http://localhost:5001/api/user-teams/${username}`);
      if (response.ok) {
        const data = await response.json();
        if (data.teams && Array.isArray(data.teams)) {
          setUserTeams(data.teams);
        }
      }
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  // Simple join team function
  const handleJoinTeam = async () => {
    if (!teamName || !passcode) {
      alert('Please enter both team name and passcode.');
      return;
    }

    if (!username) {
      alert('You must be logged in to join a team.');
      return;
    }

    try {
      console.log('Joining team with:', { name: teamName, passcode, username });
      
      const response = await fetch('http://localhost:5001/api/join-team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: teamName, passcode, username }),
      });
      
      const data = await response.json();
      console.log('Join team response:', data);
      
      if (response.ok) {
        // Add the team to state directly
        if (data.team) {
          const newTeam = { teamId: data.team.id, name: data.team.name };
          console.log('Adding new team:', newTeam);
          
          // Check if the team already exists in our state
          if (!userTeams.some(team => team.teamId === newTeam.teamId)) {
            console.log('Team not found in state, adding it now');
            setUserTeams(prev => [...prev, newTeam]);
          } else {
            console.log('Team already exists in state');
          }
        }
        
        // Clear form and close panel
        setTeamName('');
        setPasscode('');
        toggleTeamPanel();
      } else {
        console.error('Error joining team:', data.message);
        alert(data.message || 'Failed to join team');
      }
    } catch (error) {
      console.error('Error joining team:', error);
      alert('Error joining team: ' + error.message);
    }
  };

  // Simple create team function
  const handleCreateTeam = async () => {
    if (!teamName) {
      alert('Please enter a team name.');
      return;
    }

    if (!username) {
      alert('You must be logged in to create a team.');
      return;
    }

    try {
      console.log('Creating team with name:', teamName, 'for user:', username);
      
      const response = await fetch('http://localhost:5001/api/create-team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: teamName, username }),
      });
      
      const data = await response.json();
      console.log('Create team response:', data);
      
      if (response.ok) {
        alert(`Team created! Your passcode is: ${data.passcode}`);
        
        // Add the team to state directly
        if (data.team) {
          const newTeam = { teamId: data.team.id, name: data.team.name };
          console.log('Adding newly created team:', newTeam);
          
          // Check if the team already exists in our state
          if (!userTeams.some(team => team.teamId === newTeam.teamId)) {
            console.log('Team not found in state, adding it now');
            setUserTeams(prev => [...prev, newTeam]);
          } else {
            console.log('Team already exists in state');
          }
        }
        
        // Clear form and close panel
        setTeamName('');
        toggleTeamPanel();
      } else {
        console.error('Error creating team:', data.message);
        alert(data.message || 'Failed to create team');
      }
    } catch (error) {
      console.error('Error creating team:', error);
      alert('Error creating team: ' + error.message);
    }
  };

  // Handle team selection
  const handleTeamSelect = (team) => {
    console.log('Team selected:', team);
    
    // First, check if we're changing to a different team
    const isTeamChange = !activeTeam || activeTeam.teamId !== team.teamId;
    
    // Update state and localStorage
    setActiveTeam(team);
    localStorage.setItem('activeTeam', JSON.stringify(team));
    
    // Navigate to home if not already there
    if (path !== '/') {
      navigate('/');
    } else if (isTeamChange) {
      // If we're already on home and changing teams, refresh the page
      // Use a short timeout to ensure localStorage is updated first
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  };

  // Load username on mount
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Fetch teams when username is available - but only once
  useEffect(() => {
    if (username) {
      fetchUserTeams();
    }
  }, [username]);

  // Effect to load active team from localStorage on mount
  useEffect(() => {
    const storedActiveTeam = localStorage.getItem('activeTeam');
    if (storedActiveTeam) {
      try {
        setActiveTeam(JSON.parse(storedActiveTeam));
      } catch (error) {
        console.error('Error parsing active team from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowAccountDropdown(false);
        setShowUserDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="App">
      <nav className="App-navbar">
        <div className="ThiranContainer">
          <img id="ThiranSpiderLogo" src="/custom_purple_bug.png" alt="Thiran Bug"/>
          <h1 id="ThiranTitle">thiran.</h1>
        </div>

        <div className="App-navbar-links">
          <Link to="/" className={path === '/' ? 'active' : ''}>Dashboard</Link>
          <Link to="/analytics" className={path === '/analytics' ? 'active' : ''}>Analytics</Link>
          <Link to="/reports" className={path === '/reports' ? 'active' : ''}>Reports</Link>
          
          <div className="account-dropdown-container" ref={dropdownRef}>
            <div 
              className="profile-icon" 
              onClick={username ? toggleUserDropdown : toggleAccountDropdown}
              aria-haspopup="true"
              aria-expanded={showAccountDropdown || showUserDropdown}
            >
              <img 
                src="https://ui-avatars.com/api/?name=User&background=313244&color=fff&size=32" 
                alt="Profile" 
                className="avatar-img"
              />
            </div>
            
            {showAccountDropdown && (
              <div className="account-dropdown">
                <Link to="/account" className="dropdown-item">
                  Sign In
                </Link>
                <Link to="/account?register=true" className="dropdown-item">
                  Register
                </Link>
              </div>
            )}

            {showUserDropdown && (
              <div className="account-dropdown">
                <p>Hello {username}!</p>
                <button onClick={handleLogout} className="dropdown-item">Log Out</button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="main-content">
        <aside className="sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-title">Teams</h3>
            <ul className="sidebar-list">
              {userTeams && userTeams.length > 0 ? (
                <>
                  {/* Simple team buttons */}
                  {userTeams.map((team, index) => (
                    <li key={team.teamId || index} className="sidebar-list-item">
                      <button 
                        className={`team-workspace-button ${activeTeam && activeTeam.teamId === team.teamId ? 'active' : ''}`} 
                        onClick={() => handleTeamSelect(team)}
                      >
                        <span className="sidebar-icon">◇</span>
                        {team.name}
                      </button>
                    </li>
                  ))}
                  <li className="sidebar-list-item">
                    <button className="add-another-team-button" onClick={toggleTeamPanel}>
                      + Add another team
                    </button>
                  </li>
                </>
              ) : (
                <li className="sidebar-list-item">
                  <button className="add-team-button" onClick={toggleTeamPanel}>
                    <div className="add-team-icon">+</div>
                    Add teams to start
                  </button>
                </li>
              )}
            </ul>
          </div>
          
          <div className="sidebar-section">
            <h3 className="sidebar-title">Personal Account</h3>
            <ul className="sidebar-list">
              <li className={`sidebar-list-item ${path === '/' ? 'active' : ''}`}>
                <Link to="/">
                  <span className="sidebar-icon">◆</span>
                  Overview
                </Link>
              </li>
              <li className={`sidebar-list-item ${path === '/projects' ? 'active' : ''}`}>
                <Link to="/projects">
                  <span className="sidebar-icon">◇</span>
                  Projects
                </Link>
              </li>
              <li className={`sidebar-list-item ${path === '/settings' ? 'active' : ''}`}>
                <Link to="/settings">
                  <span className="sidebar-icon">⚙</span>
                  Settings
                </Link>
              </li>
            </ul>
          </div>
        </aside>

        <div className="content-area">
          {children}
        </div>
      </div>

      {showTeamPanel && (
        <>
          <div className="team-panel-overlay" onClick={toggleTeamPanel}></div>
          <div className="team-panel">
            <button className="team-panel-close" onClick={toggleTeamPanel}>×</button>
            <h3>Add or Join a Team</h3>
            <input 
              type="text" 
              className="team-panel-input"
              placeholder="Team name" 
              value={teamName} 
              onChange={(e) => setTeamName(e.target.value)} 
            />
            <input 
              type="text" 
              className="team-panel-input"
              placeholder="Passcode (for joining existing teams)" 
              value={passcode} 
              onChange={(e) => setPasscode(e.target.value)} 
            />
            <div className="team-panel-buttons">
              <button className="team-panel-button primary" onClick={handleCreateTeam}>Create Team</button>
              <button className="team-panel-button secondary" onClick={handleJoinTeam}>Join Team</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Layout;