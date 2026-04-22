const express = require('express');
const os = require('os');
const app = express();

let requestCount = 0;
const startTime = new Date();

// HOME PAGE
app.get('/', (req, res) => {
  requestCount++;
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>DevOps-Deployment-Practice</title>
      <style>
        body { font-family: Arial; margin: 40px; background: #f0f0f0; }
        .container { background: white; padding: 20px; border-radius: 8px; }
        h1 { color: #4CAF50; }
        .status { background: #e8f5e9; padding: 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🎉 Hello from DevOps!</h1>
        <p>Your app is running successfully!</p>
        <div class="status">
          <h3>Status: ✅ Running</h3>
          <p>Total Requests: ${requestCount}</p>
          <p>Uptime: ${Math.floor((new Date() - startTime) / 1000)}s</p>
        </div>
      </div>
    </body>
    </html>
  `);
});

// HEALTH CHECK (Very important!)
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
});
