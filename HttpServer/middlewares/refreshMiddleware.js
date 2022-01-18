const config = require('../config');

const refreshMiddleware = function (req, res, next) {
    if (req.headers['refreshkey'] === config.refreshKey) {
        next();
    }
    else {
        console.log('Unauthorized request. Request ip: ' + req.ip);
        res.status(401).json({ 'error': 'Unauthorized request.' });
    }
};

module.exports = refreshMiddleware;