const express = require('express');
//
const registerRoutes = require('./routes/registerRoutes');
const tokenRoutes = require('./routes/tokenRoutes');
const apiRoutes = require('./routes/apiRoutes');
//
const undefinedRoutes = require('./routes/undefinedRoutes');
//
const registerMiddleware = require('./middlewares/registerMiddleware');
const apiMiddleware = require('./middlewares/apiMiddleware');
const refreshMiddleware = require('./middlewares/refreshMiddleware');

const createHttpServer = function (port) {
    var app = express();

    app.use(express.urlencoded({ extended: true })); // instead of bodyparser

    app.use('/register', registerMiddleware, registerRoutes); //key
    app.use('/token', refreshMiddleware, tokenRoutes); //key
    app.use('/api', apiMiddleware, apiRoutes); // token

    app.use('*', undefinedRoutes);

    app.listen(port, () => {
        console.log('HTTP Server started: Port: ' + port);
    });
};

module.exports = createHttpServer;