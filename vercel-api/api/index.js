// Faisal Orakzai API - Vercel Serverless Function
  module.exports = function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') {
      res.statusCode = 200;
      res.end();
      return;
    }

    const url = (req.url || '/').split('?')[0];

    if (url === '/' || url === '') {
      res.statusCode = 200;
      res.end(JSON.stringify({
        name: 'Faisal Orakzai API Server',
        status: 'running',
        version: '1.0.0',
        endpoints: ['/api/healthz']
      }));
      return;
    }

    if (url.startsWith('/api/healthz')) {
      res.statusCode = 200;
      res.end(JSON.stringify({ status: 'ok' }));
      return;
    }

    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Not found', path: url }));
  };
  