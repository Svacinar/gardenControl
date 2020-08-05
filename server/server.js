const app = require('./src/app');
const port = 9000;

const cors = require('cors');

app.use(cors());

app.listen(port, () => console.log( `The app is listening on the port ${port} `));
