const { User } = require('common/database/models/user');
const jwt = require('jsonwebtoken');
const config = require('../config');

const apiMiddleware = async function (req, res, next) {
    const token = req.headers['x-access-token'];

    if (!token) {
        console.log('A token is required for authentication. Request ip: ' + req.ip);
        res.status(403).json({ 'error': 'A token is required for authentication.' });
        return;
    }

    try {
        const decoded = jwt.verify(token, config.tokenScreetKey);
        req.userId = decoded.id;
        next();
    } catch (err) {
        console.log('Invalid Token. Request ip: ' + req.ip);
        res.status(401).json({ 'error': err });
    }
};

module.exports = apiMiddleware;