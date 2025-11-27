const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001; // Utiliser le port 3001

// Middleware
app.use(cors());
app.use(express.json());

// Routes d'authentification
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  try {
    // Simulation d'authentification - toujours réussie pour le test
    res.json({ 
      token: 'fake-jwt-token', 
      profile_id: 'test-profile-id',
      message: 'Login successful' 
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  const { email, password, name } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  try {
    // Simulation d'enregistrement - toujours réussie pour le test
    res.json({ 
      token: 'fake-jwt-token', 
      profile_id: 'new-profile-id',
      message: 'Registration successful' 
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route racine
app.get('/api', (req, res) => {
  res.json({ message: 'NutriAI API Server is running', status: 'OK' });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`NutriAI API Server is running on port ${PORT}`);
});