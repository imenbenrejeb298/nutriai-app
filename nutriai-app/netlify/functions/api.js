exports.handler = async (event, context) => {
  // Analyser le chemin de la requête
  const path = event.path.replace('/.netlify/functions/api', '');
  
  // Gérer différentes routes
  if (path === '/' || path === '') {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ message: 'API is alive' })
    };
  }
  
  // Gérer les requêtes OPTIONS (CORS preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: ''
    };
  }
  
  if (path === '/auth/login' && event.httpMethod === 'POST') {
    // Parser le body de la requête
    let body;
    try {
      body = JSON.parse(event.body);
    } catch (e) {
      body = {};
    }
    
    const { email, password } = body;
    
    // Simulation d'authentification - toujours réussie pour le test
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ 
        token: 'fake-jwt-token', 
        profile_id: 'test-profile-id',
        message: 'Login successful' 
      })
    };
  }
  
  if (path === '/auth/register' && event.httpMethod === 'POST') {
    // Parser le body de la requête
    let body;
    try {
      body = JSON.parse(event.body);
    } catch (e) {
      body = {};
    }
    
    const { email, password, name } = body;
    
    // Simulation d'enregistrement - toujours réussie pour le test
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ 
        token: 'fake-jwt-token', 
        profile_id: 'new-profile-id',
        message: 'Registration successful' 
      })
    };
  }
  
  // Route non trouvée
  return {
    statusCode: 404,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ error: 'Route not found' })
  };
};