const randomstring = require('randomstring-yt');
const jsonwebtoken = require('jsonwebtoken');

const { User } = require('../models/user');
const { UserStatus } = require('../models/user/status');
const { Level } = require('../models/user/level');
const { Gold } = require('../models/user/gold');
const { Activity } = require('../models/user/activity');

const createNewGuestUser = function (nickName, tokenSecretKey, tokenDuration) {

    const uid = randomstring({
        lowersCount: 5,
        numbersCount: 5,
    });

    let newUser = new User({
        nickName: nickName,
        uid: uid,
        status: UserStatus(),
        level: Level(),
        gold: Gold(),
        activity: Activity(),
    });

    // identiconGenerator(uid);

    const jwtToken = jsonwebtoken.sign(
        { userId: newUser._id, nickName: nickName },
        tokenSecretKey,
        { expiresIn: tokenDuration });

    newUser.token = jwtToken;

    try {
        await newUser.save();
        return {
            isCreated: true,
            token: jwtToken,
            message: `New Guest User created. User id: ${newUser._id}. Request ip: + ${req.ip}`
        };
    } catch (e) {
        return {
            isCreated: false,
            message: 'error: ' + e
        };
    }
};

module.exports = createNewGuestUser;