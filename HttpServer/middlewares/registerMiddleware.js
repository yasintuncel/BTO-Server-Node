const config = require('../config');

const registerMiddleware = function (req, res, next) {
    if (req.headers['registerkey'] === config.registerKey) {
        next();
    }
    else {
        console.log('Unauthorized request. Request ip: ' + req.ip);
        res.status(401).json({ error: 'Unauthorized request.' });
    }
};

module.exports = registerMiddleware;