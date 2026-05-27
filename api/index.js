const express = require('express');
  const cors = require('cors');

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Root - API info
  app.get('/', (req, res) => {
    res.json({
      name: 'Faisal Orakzai API Server',
      status: 'running',
      version: '1.0.0',
      endpoints: ['/api/healthz']
    });
  });

  // Health check
  app.get('/api/healthz', (req, res) => {
    res.json({ status: 'ok' });
  });

  // 404 fallback
  app.use((req, res) => {
    res.status(404).json({ error: 'Not found', path: req.path });
  });

  module.exports = app;
  