const express = require('express');
const app = express();

app.use(express.json());

require('@middleware.io/node-apm').start({
    serviceName: 'service1',  // The name of your service as it will appear in Middleware.io
    serverUrl: 'https://vroae.middleware.io:443',  // Replace with Middleware.io's server URL
    secretToken: 'pikghrqkeylgtsrtdavcmpzoslyihcxyrriw',  // Your authentication token from Middleware.io
});

app.get('/error-endpoint', (req, res) => {
  // Simulating an error condition
  const shouldThrowError = Math.random() < 0.5;

  if (shouldThrowError) {
    // Throwing a custom error
    throw new Error('Random error occurred');
  }

  res.status(200).json({ message: 'No error this time' });
});

// New error API endpoint
app.get('/api/error', (req, res) => {
  res.status(400).json({ error: 'Bad Request', message: 'This is a simulated 400 error' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = 5000;
// New error API endpoint for 404 status code
app.get('/api/errorr', (req, res) => {
  res.status(404).json({ error: 'Not Found', message: 'This is a simulated 404 error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
