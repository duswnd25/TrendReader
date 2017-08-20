const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../..', 'index.html'));
});

module.exports = app;