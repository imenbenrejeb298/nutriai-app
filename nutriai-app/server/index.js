const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { addEntry, listEntries, createUser, findUserByEmail, getUserById } = require('./db');
const { generateMockPlan } = require('./mock-ai');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret_in_production';

// Middleware d'authentification
function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return next();
  const parts = auth.split(' ');
  if (parts.length !== 2) return next();
  const token = parts[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
  } catch (err) {}
  return next();
}
app.use(authenticate);

// Routes d'authentification
app.post('/api/auth/register', async (req, res) => {
  const { email, password, name } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  try {
    const existing = await findUserByEmail(email);
    if (existing) return res.status(409).json({ error: 'User already exists' });

    // For now, skip profile creation and use null profile_id
    const profileResult = { id: null };

    const pwHash = await bcrypt.hash(password, 10);
    const user = await createUser(email, pwHash, profileResult.id);
    const token = jwt.sign({ sub: user.id, profile_id: profileResult.id }, JWT_SECRET, { expiresIn: '30d' });
    res.json({ token, profile_id: profileResult.id });
  } catch (err) {
    console.error('Register error', err);
    res.status(500).json({ error: 'register failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(401).json({ error: 'invalid credentials' });
    const ok = await bcrypt.compare(password, user.password_hash || '');
    if (!ok) return res.status(401).json({ error: 'invalid credentials' });
    const token = jwt.sign({ sub: user.id, profile_id: user.profile_id }, JWT_SECRET, { expiresIn: '30d' });
    res.json({ token, profile_id: user.profile_id });
  } catch (err) {
    console.error('Login error', err);
    res.status(500).json({ error: 'login failed' });
  }
});

// Route pour générer un plan de repas
app.post('/api/generate-meal-plan', async (req, res) => {
  const profile = req.body || {};
  try {
    const plan = generateMockPlan(profile);
    return res.json(plan);
  } catch (err) {
    console.error('Error during mock generation flow:', err);
    return res.status(500).json({ error: 'Mock AI backend error' });
  }
});

// Routes pour les entrées
app.post('/api/entries', async (req, res) => {
  const entry = req.body || {};
  if (!entry.date) entry.date = new Date().toISOString().slice(0, 10);
  try {
    if (req.user && req.user.profile_id) entry.profile_id = req.user.profile_id;
    const result = await addEntry(entry);
    res.json({ success: true, id: result.id });
  } catch (err) {
    console.error('Failed to save entry', err);
    res.status(500).json({ error: 'Failed to save entry' });
  }
});

app.get('/api/entries', async (req, res) => {
  const profile_id = req.query.profile_id || null;
  try {
    const rows = await listEntries(profile_id);
    res.json(rows);
  } catch (err) {
    console.error('Failed to list entries', err);
    res.status(500).json({ error: 'Failed to list entries' });
  }
});

// Routes pour les recettes
app.get('/api/recipes', (req, res) => {
  // Données simulées de recettes
  const recipes = [
    {
      id: 1,
      name: 'Salade de poulet grillé',
      ingredients: ['Poitrine de poulet (150g)', 'Légumes verts variés', 'Vinaigrette légère'],
      calories: 350,
      protein: 35,
      prep_time: 20,
      difficulty: 'Facile'
    },
    {
      id: 2,
      name: 'Soupe de lentilles et légumes',
      ingredients: ['Lentilles (100g)', 'Bouillon de légumes', 'Carottes, céleri, oignons'],
      calories: 280,
      protein: 18,
      prep_time: 45,
      difficulty: 'Moyen'
    },
    {
      id: 3,
      name: 'Saumon au four avec brocolis',
      ingredients: ['Filet de saumon (150g)', 'Brocolis à la vapeur', 'Huile d\'olive et citron'],
      calories: 420,
      protein: 38,
      prep_time: 25,
      difficulty: 'Facile'
    }
  ];
  
  res.json(recipes);
});

app.get('/api/recipes/favorites', (req, res) => {
  // Données simulées de recettes favorites
  const favorites = [];
  res.json(favorites);
});

// Routes pour les défis
app.get('/api/challenges', (req, res) => {
  // Données simulées de défis
  const challenges = [
    {
      id: 1,
      title: '7 jours d\'hydratation',
      description: 'Buvez au moins 8 verres d\'eau par jour pendant 7 jours consécutifs',
      duration: 7,
      reward: '50 points',
      difficulty: 'Facile',
      category: 'Hydratation'
    },
    {
      id: 2,
      title: '30 jours d\'exercice',
      description: 'Faites au moins 30 minutes d\'exercice modéré chaque jour pendant 30 jours',
      duration: 30,
      reward: '200 points',
      difficulty: 'Moyen',
      category: 'Exercice'
    }
  ];
  
  res.json(challenges);
});

app.get('/api/challenges/user', (req, res) => {
  // Données simulées des défis de l'utilisateur
  const userChallenges = [];
  res.json(userChallenges);
});

app.post('/api/challenges/start', (req, res) => {
  const { challengeId } = req.body;
  // Logique pour démarrer un défi
  res.json({ success: true, message: 'Défi démarré avec succès' });
});

app.post('/api/challenges/complete', (req, res) => {
  const { challengeId } = req.body;
  // Logique pour terminer un défi
  res.json({ success: true, message: 'Défi terminé avec succès', points: 50 });
});

// Routes pour la liste de courses
app.get('/api/shopping-list', (req, res) => {
  // Données simulées de la liste de courses
  const shoppingList = [
    { id: 1, name: 'Poulet grillé', category: 'Protéines', checked: false },
    { id: 2, name: 'Brocoli', category: 'Fruits & Légumes', checked: true }
  ];
  
  res.json(shoppingList);
});

app.post('/api/shopping-list', (req, res) => {
  const { item } = req.body;
  // Logique pour ajouter un article à la liste de courses
  res.json({ success: true, message: 'Article ajouté avec succès', item: { id: Date.now(), ...item } });
});

// Route pour l'assistant chef
app.post('/api/chef-assistant', (req, res) => {
  const { question } = req.body;
  
  // Réponses simulées de l'assistant chef
  const responses = [
    'En fonction de votre profil, je recommande de privilégier les protéines maigres comme le poulet grillé ou le poisson.',
    'Pour une personne de votre âge, je suggère de cuisiner à la vapeur ou au four pour préserver les nutriments.',
    'Les légumes colorés sont excellents pour votre santé. Essayez de les inclure dans chaque repas.',
    'Pour gérer votre diabète, privilégiez les glucides complexes et combinez-les avec des protéines.',
    'Une alimentation équilibrée inclut des aliments de chaque groupe : fruits, légumes, céréales complètes, etc.'
  ];
  
  const response = responses[Math.floor(Math.random() * responses.length)];
  res.json({ response });
});

// Route racine
app.get('/', (req, res) => {
  res.json({ message: 'NutriAI API Server is running', status: 'OK' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`NutriAI server listening on port ${PORT}`);
});