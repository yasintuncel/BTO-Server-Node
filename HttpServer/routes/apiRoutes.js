const express = require('express');
const userRoutes = require('./api/userRoutes');
const gameRoutes = require('./api/gameRoutes');
const router = express.Router();

// api/user/x
router.use('/user', userRoutes);
router.use('/game', gameRoutes);

module.exports = router;