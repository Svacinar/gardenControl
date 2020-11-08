require('dotenv').config({ path: `${__dirname}/.env` });
const app = require('./src/app');

const port = process.env.PORT;

app.listen(port, () => console.log(`The app is listening on the port ${port}, development stage ${process.env.DEVELOPMENT} `));
