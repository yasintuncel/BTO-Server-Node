const randomstring = require('randomstring-yt');
const { User } = require('common/database/models/user');
const { UserStatus } = require('common/database/models/user/status');
const { Level } = require('common/database/models/user/level');
const { Gold } = require('common/database/models/user/gold');
const { Activity } = require('common/database/models/user/activity');

const asGuest = function (req, res) {
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
    identiconManager.create(uid);
    const jwtToken = getJwtToken(newUser._id, nickName);
    newUser.jwt = jwtToken;

    newUser.save().then((doc) => {
        console.log(`New Guest User created. User id: ${newUser._id}. Request ip: + ${req.ip}`);
        res.status(200).json({ "token": jwtToken });
    });
};

module.exports = asGuest;