const express = require('express');
const refreshToken = require('./token/refreshToken');
//
const router = express.Router();

router.post('/refresh', refreshToken);
// router.post('/facebook', asFacebook);

module.exports = router;