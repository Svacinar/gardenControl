const express = require('express');
const app = express();
const path = require('path');

const ValveState = require('./state.js');
const setValveTimer = require('./setValveTimer');    
const setValveState = require('./setValveState');

app.use(express.static(path.join(__dirname, '../../frontend/build')));

const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {   
    res.sendFile(path.join(__dirname, '../../frontend/build/', 'index.html'));
})

app.get('/api', (req, res) => {
    res.send(ValveState.state);
})

app.get('/valve1', (req, res) => {
    setValveState('valve1', ValveState);
    setValveTimer('valve1', ValveState);
    res.redirect('/');
})
app.get('/valve2', (req, res) => {
    setValveState('valve2', ValveState);
    setValveTimer('valve2', ValveState);
    res.redirect('/');
})

module.exports = app;
