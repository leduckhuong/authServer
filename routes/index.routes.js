const registerRouter = require('./routers/register.router');
const loginRouter = require('./routers/login.router');
const verifyRouter = require('./routers/verify.router');
const getcodeRouter = require('./routers/getcode.router');
const tokenRouter = require('./routers/token.router');
const dataRouter = require('./routers/data.router');
const logoutRouter = require('./routers/logout.router');
const updateInfoRouter = require('./routers/updateInfo.router');

const { verifyToken } = require('../apps/middlewares/auth');

function routes(app) {
    app.use('/register', registerRouter);
    app.use('/login', loginRouter);
    app.use('/verify', verifyRouter);
    app.use('/getcode', getcodeRouter);
    app.use('/token', tokenRouter);
    app.use('/data', dataRouter);
    app.use('/logout', logoutRouter);
    app.use('/update-info', verifyToken, updateInfoRouter);
    app.get('/', (req, res, next) => {
        res.send('App is running!');
    })
}

module.exports = routes;