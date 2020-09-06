const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

const valveManager = require('./valveManager');

app.use(express.static(path.join(__dirname, '../../frontend/build')));

app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/build/', 'index.html'));
});

app.get('/api', (req, res) => {
  res.send(valveManager.getValveState());
});

app.get('/run/:valve', (req, res) => {
  const valveToRun = req.params.valve;
  valveManager.handleValveChange(valveToRun);
  res.redirect('/');
});

app.get('/cycle', (req, res) => {
  valveManager.handleValveCycling();
  res.redirect('/');
});

app.get('/setTimer/:timerValue', (req, res) => {
  const timerValue = parseInt(req.params.timerValue);
  valveManager.setTimerValue(timerValue);
  res.redirect('/');
});

module.exports = app;
