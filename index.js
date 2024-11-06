const dotenv = require('dotenv');

dotenv.config();

const db = require('./configs/db/index.db');

const app = require('./app');
const routes = require('./routes/index.routes');

const port = process.env.AUTH_SERVER_PORT || 3333;

db.connect();

routes(app);

app.listen(port, () => {
    console.log(`App listen on port:${port}`);
})