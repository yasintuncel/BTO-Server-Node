const jwt = require('jsonwebtoken');
const config = require('../config');

const apiMiddleware = function (req, res, next) {
    const token = req.headers['x-access-token'];

    if (!token) {
        console.log('A token is required for authentication. Request ip: ' + req.ip);
        res.status(403).send({ 'message': 'A token is required for authentication.' });
        return;
    }

    try {
        const decoded = jwt.verify(token, config.apiScreetKey); // payload, {}
        req.userId = decoded;
        next();
    } catch (err) {
        // suresi dolanlar buraya dusuyor
        console.log('Invalid Token. Request ip: ' + req.ip);
        res.status(401).send({ 'message': 'Invalid Token' });
    }
};

module.exports = apiMiddleware;