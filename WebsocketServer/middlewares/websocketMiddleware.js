const jwt = require("jsonwebtoken");
const config = require("../config");
//
const websocketMiddleware = function (info, cb) {
    var token = info.req.headers['x-access-token'];
    if (!token) {
        console.log('A token is required for authentication. Request ip: ' + info.req.ip);
        cb(false, 403, "A token is required for authentication");
    }
    else {
        jwt.verify(token, config.tokenScreetKey, (err, decoded) => {
            if (err) {
                console.log('Invalid Token. Request ip: ' + info.req.ip);
                cb(false, 401, 'Invalid Token');
            } else {
                info.req.user = decoded;
                cb(true);
            }
        });
    }
};

module.exports = websocketMiddleware;