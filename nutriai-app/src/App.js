import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import './i18n';

import Welcome from './components/Welcome';

// A simple placeholder for the Auth Page
function AuthPagePlaceholder() {
  return (
    <div style={{ padding: '50px', textAlign: 'center', color: 'white' }}>
      <h1>Page de Connexion</h1>
      <p>Cette page s'affichera correctement à la prochaine étape.</p>
    </div>
  );
}

// A wrapper for the Welcome page to handle navigation
function WelcomeWrapper() {
  const navigate = useNavigate();
  return <Welcome onStart={() => navigate('/auth')} />;
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<WelcomeWrapper />} />
          <Route path="/auth" element={<AuthPagePlaceholder />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
