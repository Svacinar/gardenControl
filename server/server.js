require('dotenv').config({ path: `${__dirname}/.env` });
const cors = require('cors');
const app = require('./src/app');

const port = process.env.PORT;

app.use(cors());

app.listen(port, () => console.log(`The app is listening on the port ${port}, development stage ${process.env.DEVELOPMENT} `));
