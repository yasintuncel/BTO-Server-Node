const randomstring = require('../../randomstring');
const jsonwebtoken = require('jsonwebtoken');
const config = require('../../config');

const identiconGenerator = require('common/utils/identiconGenerator');
const { User } = require('common/database/models/user');
const { UserStatus } = require('common/database/models/user/status');
const { Level } = require('common/database/models/user/level');
const { Gold } = require('common/database/models/user/gold');
const { Activity } = require('common/database/models/user/activity');

const asGuest = async function (req, res) {
    const { nickName } = req.body;
    if (!(nickName)) {
        res.status(400).send("A nick name is required");
        return;
    }

    const uid = randomstring();
    let newUser = new User({
        nickName: nickName,
        uid: uid,
        status: UserStatus(),
        level: Level(),
        gold: Gold(),
        activity: Activity(),
    });
    identiconGenerator(uid);
    
    const jwtToken = jsonwebtoken.sign(
        { userId: newUser._id, nickName: nickName },
        config.apiScreetKey,
        { expiresIn: '10d' });

    newUser.token = jwtToken;

    try {
        await newUser.save();
        console.log(`New Guest User created. User id: ${newUser._id}. Request ip: + ${req.ip}`);
        res.status(200).json({ "token": jwtToken });
    } catch (e) {
        console.log('error: ' + e);
        res.status(500).json({ 'error': e });
    }
};

module.exports = asGuest;