const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const valveManager = require('./valveManager');
const cronManager = require('./cronManager');
const { handleCron } = require('./cronManager');

app.use(express.static(path.join(__dirname, '../../frontend/build')));

app.use(cors());

app.use(bodyParser.json());

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

app.post('/setcron', (req, res) => {
  const { state } = req.body;
  const { strategy } = req.body;
  const { strategyID } = req.body;
  cronManager.handleCron(state, strategy, strategyID);
  res.redirect('/');
});

app.get('/cronAPI', (req, res) => {
  res.send(cronManager.cronAPI());
});

module.exports = app;
