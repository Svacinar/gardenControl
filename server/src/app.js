const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const scheduleRouter = require('./Routes/scheduleRouter');
const cronRouter = require('./Routes/cronRouter');
const valveRouter = require('./Routes/valveRouter')

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Garden App ",
      description: "NodeJS server for controlling home irrigiation automation",
      contact: {
        name: "Pan Mozek"
      }
    },
    servers: ["hhtp://localhost:9000"]
  },
  apis: ['./src/Routes/cronRouter.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);


const app = express();
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
