const express = require('express');
const refreshToken = require('./token/refreshToken');
//
const router = express.Router();

router.post('/refresh', refreshToken);
// post /token/refresh => new token

module.exports = router;