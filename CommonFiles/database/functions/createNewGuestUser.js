const randomstring = require('randomstring-yt');
const jsonwebtoken = require('jsonwebtoken');
const identiconGenerator = require('../../utils/identiconGenerator');

const { User } = require('../models/user');
const { UserStatus } = require('../models/user/status');
const { Level } = require('../models/user/level');
const { Gold } = require('../models/user/gold');
const { Activity } = require('../models/user/activity');

const createNewGuestUser = async function (nickName, tokenSecretKey, tokenDuration) {

    const uid = randomstring({
        lowersCount: 5,
        numbersCount: 5,
    });
    const iconFileName = randomstring({
        lowersCount: 5,
        uppersCount: 5,
        numbersCount: 5,
        specialsCount: 4,
        specials: '_-'
    });

    let newUser = new User({
        nickName: nickName,
        uid: uid,
        identicon: iconFileName,
        status: UserStatus(),
        level: Level(),
        gold: Gold(),
        activity: Activity(),
    });

    identiconGenerator(iconFileName);
    const token = tokenGenerator(newUser._id, config.tokenSecretKey, config.tokenDuration);
    newUser.token = token;

    try {
        await newUser.save();
        return {
            isCreated: true,
            token: token,
            message: `New Guest User created. User id: ${newUser._id}.`
        };
    } catch (e) {
        return {
            isCreated: false,
            message: 'error: ' + e
        };
    }
};

module.exports = createNewGuestUser;