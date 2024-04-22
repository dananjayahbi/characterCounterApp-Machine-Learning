// server.js

const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const port = 8080;

app.use(bodyParser.json());

// Allow cross-origin resource sharing (CORS)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.post('/predict', (req, res) => {
  const { text } = req.body;

  console.log("Prediction is in progress...");

  exec(`python predict.py "${text}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      res.status(500).json({ error: 'An error occurred while processing the request.' });
      return;
    }

    const { lettersCount } = JSON.parse(stdout);
    res.json({ lettersCount });
    console.log("Prediction completed.");
  });
});

app.get('/test', (req, res) => {
  res.json({ test: 'success' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
