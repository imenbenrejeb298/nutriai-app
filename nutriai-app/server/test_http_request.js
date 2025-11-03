const http = require('http');

const data = JSON.stringify({ name: 'TestUser', weight: 72, height: 175, conditions: { diabetes: false } });

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/generate-meal-plan',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = http.request(options, (res) => {
  let raw = '';
  res.setEncoding('utf8');
  res.on('data', (chunk) => { raw += chunk; });
  res.on('end', () => {
    console.log('=== RESPONSE START ===');
    console.log(raw);
    console.log('=== RESPONSE END ===');
  });
});

req.on('error', (e) => {
  console.error('REQUEST FAILED:', e.message);
  process.exit(1);
});

req.write(data);
req.end();

