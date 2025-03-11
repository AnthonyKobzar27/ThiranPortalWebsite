import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import Layout
import Layout from './components/Layout';

// Import Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import Account from './pages/Account';
import Projects from './pages/Projects';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout>
            <Home />
          </Layout>
        } />
        <Route path="/dashboard" element={
          <Layout>
            <Dashboard />
          </Layout>
        } />
        <Route path="/analytics" element={
          <Layout>
            <Analytics />
          </Layout>
        } />
        <Route path="/reports" element={
          <Layout>
            <Reports />
          </Layout>
        } />
        <Route path="/account" element={
          <Layout>
            <Account />
          </Layout>
        } />
        <Route path="/projects" element={
          <Layout>
            <Projects />
          </Layout>
        } />
        <Route path="/settings" element={
          <Layout>
            <Settings />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
