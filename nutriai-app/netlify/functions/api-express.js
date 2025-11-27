const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Simuler une base de données en mémoire
let users = [];
let profiles = [];
let mealPlans = [];
let entries = [];

// --- Routes d'authentification ---
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  // Simulation d'authentification
  const user = users.find(u => u.email === email);
  if (user) {
    res.json({ 
      token: 'fake-jwt-token', 
      profile_id: user.id,
      message: 'Login successful' 
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.post('/auth/register', (req, res) => {
  const { email, password, name } = req.body;
  // Vérifier si l'utilisateur existe déjà
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }
  
  // Créer un nouvel utilisateur
  const newUser = {
    id: Date.now().toString(),
    email,
    name
  };
  
  users.push(newUser);
  res.json({ 
    token: 'fake-jwt-token', 
    profile_id: newUser.id,
    message: 'Registration successful' 
  });
});

// --- Routes de profil ---
app.get('/user/profile/:id', (req, res) => {
  const profile = profiles.find(p => p.id === req.params.id);
  if (profile) {
    res.json(profile);
  } else {
    res.status(404).json({ error: 'Profile not found' });
  }
});

app.post('/user/profile/:id', (req, res) => {
  const { id } = req.params;
  const profileData = req.body;
  
  // Mettre à jour ou créer le profil
  const existingProfileIndex = profiles.findIndex(p => p.id === id);
  if (existingProfileIndex >= 0) {
    profiles[existingProfileIndex] = { id, ...profileData };
  } else {
    profiles.push({ id, ...profileData });
  }
  
  res.json({ message: 'Profile saved successfully' });
});

// --- Routes de plans de repas ---
app.post('/generate-meal-plan', (req, res) => {
  const { profile } = req.body;
  
  // Générer un plan de repas simulé
  const mockMealPlan = {
    summary_key: "summary_base",
    summary_params: { name: profile.name || "User" },
    meals: [
      {
        name_key: "meal_grilled_chicken_salad",
        ingredients: [
          { key: "ing_chicken_breast", params: { amount: "150g" } },
          { key: "ing_mixed_greens", params: {} },
          { key: "ing_light_vinaigrette", params: {} }
        ]
      }
    ],
    exercises: [
      {
        name_key: "ex_brisk_walking",
        calories_burned: 200
      }
    ]
  };
  
  res.json(mockMealPlan);
});

// --- Routes de suivi ---
app.get('/entries/:profileId', (req, res) => {
  const userEntries = entries.filter(e => e.profileId === req.params.profileId);
  res.json(userEntries);
});

app.post('/entries', (req, res) => {
  const newEntry = {
    id: Date.now().toString(),
    ...req.body
  };
  
  entries.push(newEntry);
  res.json({ message: 'Entry saved successfully', id: newEntry.id });
});

// Add a root handler for debugging
app.get('/', (req, res) => {
    res.json({ message: 'API is alive' });
});

module.exports.handler = serverless(app);