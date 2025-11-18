// This file allows us to run the Netlify function as a standalone server for local development

const { handler } = require('./api');

const app = require('express')();

// All requests to this server will be handled by our Netlify function
app.use(handler);

const PORT = 9999;
app.listen(PORT, () => {
  console.log(`◈ Standalone API server running on http://localhost:${PORT}`);
});
