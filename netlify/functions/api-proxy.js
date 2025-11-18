// Netlify function to proxy API requests
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const { httpMethod, body, headers, queryStringParameters, path } = event;
  
  // Extract the API path (remove /api/ prefix)
  const apiPath = path.replace('/.netlify/functions/api-proxy', '');
  
  // Backend API URL (you'll need to update this to your actual backend)
  const backendUrl = `https://your-backend-url.com${apiPath}`;
  
  try {
    const response = await fetch(backendUrl, {
      method: httpMethod,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: httpMethod !== 'GET' && httpMethod !== 'HEAD' ? body : undefined,
    });
    
    const data = await response.json();
    
    return {
      statusCode: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch from backend' }),
    };
  }
};