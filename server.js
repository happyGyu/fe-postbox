const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const randomInfo = require('./randomInfo.json');

app.use(express.static(path.resolve(__dirname)));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});
app.get('/info/random', (req, res) => {
  res.json(randomInfo);
});
app.listen(port, () => {
  console.log(`hearing on http://localhost:${port}/`);
});
