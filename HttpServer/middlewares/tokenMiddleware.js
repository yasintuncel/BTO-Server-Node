const config = require('../config');

const tokenMiddleware = function (req, res, next) {
    if (req.headers['tokenkey'] === config.tokenKey) {
        next();
    }
    else {
        console.log('Unauthorized request. Request ip: ' + req.ip);
        res.status(401).json({ 'error': 'Unauthorized request.' });
    }
};

module.exports = tokenMiddleware;