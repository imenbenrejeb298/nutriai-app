const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const router = express.Router(); // Use a router

router.use(cors());
router.use(bodyParser.json());

// --- Routes are defined on the router ---
router.post('/auth/login', (req, res) => {
  res.json({ message: 'Login endpoint on Netlify hit' });
});

router.post('/auth/register', (req, res) => {
  res.json({ message: 'Register endpoint on Netlify hit' });
});

router.get('/', (req, res) => {
  res.json({ message: 'API is alive on Netlify' });
});

// The router is mounted on the /api path, which matches the redirect
app.use('/api', router);

// For local development with standalone.js, we also need to handle the prefix
const standaloneApp = express();
standaloneApp.use('/.netlify/functions/api', app);

module.exports.handler = serverless(standaloneApp);
