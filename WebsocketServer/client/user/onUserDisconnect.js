const { User } = require('common/database/models/user');

const onUserDisconnect = async function (userClient, code){
    let user = await User.findById(userClient.userId);
    console.log(userClient.userId + ' disconnected. Nickname: ' + user.nickName + ' Code: ' + code);
    //
    if (user.activity.isInGame) {
        // TODO if is in game
    }
    else {
       // TODO check if is in pre-game
    }
    //
    user.activity.lastActiveAt = Math.floor(Date.now() / 1000);
    user.activity.isOnline = false;
    await user.save();
};

module.exports = onUserDisconnect;