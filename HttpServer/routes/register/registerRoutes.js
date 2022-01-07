const express = require('express');
const asGuest = require('./asGuest');
//
const router = express.Router();

router.get('/guest', asGuest);
// router.post('/facebook', asFacebook);

module.exports = router;