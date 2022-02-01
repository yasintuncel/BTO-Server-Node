const express = require('express');
const router = express.Router();
const getUser = require('./user/getUser');
const handleFriendRequest = require('./user/handleFriendRequest');

router.post('/', getUser);
router.post('/friendRequest', handleFriendRequest);
// router.post('/', createUser);
// router.put('/', updateUser);
// router.delete('/', deleteUser);

module.exports = router;