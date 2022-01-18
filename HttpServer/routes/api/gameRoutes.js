const express = require('express');
const createGame = require('./game/createGame');
const router = express.Router();

router.post('/', createGame);

module.exports = router;