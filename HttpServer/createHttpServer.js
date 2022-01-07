const express = require('express');
const registerRoutes = require('./routes/register/registerRoutes');
const apiRoutes = require('./routes/api/apiRoutes');

const createHttpServer = function (port) {
    var app = express();

    app.use(express.urlencoded({ extended: true })); // instead of bodyparser

    app.use('/register', registerRoutes);
    app.use('/api', apiRoutes);

    app.listen(port, () => {
        console.log('HTTP Server started: Port: ' + port);
    });
};

module.exports = createHttpServer;