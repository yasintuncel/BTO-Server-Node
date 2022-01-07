const express = require('express');
const router = express.Router();
const getUser = require('./getUser');

router.get('/', getUser);
// router.post('/', createUser);
// router.put('/', updateUser);
// router.delete('/', deleteUser);

module.exports = router;