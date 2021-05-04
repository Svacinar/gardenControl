const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const timeout = require('connect-timeout');

const verifyToken = require('./Services/verifyToken').verify;
const authenticateRouter = require('./Routes/authenticateRouter');
const apiRouter = require('./Routes/apiRouter');

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
app.use(cookieParser())
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(bodyParser.json());

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

app.use('/', authenticateRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/build/', 'index.html'));
});

app.use('/api', verifyToken, apiRouter);

app.get('*', (req, res) => {
  res.redirect(404, '/');
});
app.use(haltOnTimedout);

function haltOnTimedout(req, res, next) {
  if (!req.timedout) next()
}

module.exports = app;
