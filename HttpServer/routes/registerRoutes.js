const express = require('express');
const asGuest = require('./register/asGuest');
//
const router = express.Router();

router.post('/guest', asGuest);
// router.post('/facebook', asFacebook);

module.exports = router;