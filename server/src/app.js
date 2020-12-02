const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const scheduleRouter = require('./Routes/scheduleRouter');
const cronRouter = require('./Routes/cronRouter');
const valveRouter = require('./Routes/valveRouter')

const app = express();
app.use(cors());

mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("DB Connected..."))
  .catch(e => {
    console.log(e)
  });

app.use(express.static(path.join(__dirname, '../../frontend/build')));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/build/', 'index.html'));
});

app.use('/valve', valveRouter);

app.use('/cron', cronRouter);

app.use('/schedule', scheduleRouter);

app.get('*', (req, res) => {
  res.redirect(404, '/');
});

module.exports = app;
