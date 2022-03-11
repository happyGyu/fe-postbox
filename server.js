const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const randomRangeInfo = require('./randomRangeInfo.json');

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get('/info/randomRange', (req, res) => {
  res.json(randomRangeInfo);
});

app.listen(port, () => {
  console.log(`Exapmle app listening on port ${port}`);
});
