const jsonwebtoken = require('jsonwebtoken');

const tokenGenerator = function (id, tokenSecretKey, tokenDuration) {
    const token = jsonwebtoken.sign(
        { id: id },
        tokenSecretKey,
        { expiresIn: tokenDuration });
    return token;
};
module.exports = tokenGenerator;