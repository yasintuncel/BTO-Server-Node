const express = require('express');
//
const registerRoutes = require('./routes/registerRoutes');
const apiRoutes = require('./routes/apiRoutes');
//
const registerMiddleware = require('./middlewares/registerMiddleware');
const apiMiddleware = require('./middlewares/apiMiddleware');
const undefinedRoutes = require('./routes/undefinedRoutes');

const createHttpServer = function (port) {
    var app = express();

    app.use(express.urlencoded({ extended: true })); // instead of bodyparser

    app.use('/register', registerMiddleware, registerRoutes); //key
    app.use('/api', apiMiddleware, apiRoutes); // token

    app.use('*', undefinedRoutes);

    app.listen(port, () => {
        console.log('HTTP Server started: Port: ' + port);
    });
};

module.exports = createHttpServer;