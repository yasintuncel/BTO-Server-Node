const { User } = require('common/database/models/user');
const commandTypes = require('../../types/commandTypes');

const onUserConnect = async function (socket, userId) {
    let user = await User.findById(userId);
    if (!user) {
        socket.send(JSON.stringify({
            type: commandTypes.userNotFound
        }));
        socket.terminate();
        console.log('User rejected. Reason is [' + commandTypes.userNotFound + '] - User Id: ' + userId);
        return {
            isValidUser: false,
            user: user,
        };
    }
    else {
        if (user.status.isInBlackList || user.status.isDeleted) {
            socket.send(JSON.stringify({
                type: commandTypes.userBlocked
            }));
            socket.terminate();
            console.log('User rejected. Reason is [' + commandTypes.userBlocked + '] - User Id: ' + userId);
            return {
                isValidUser: false,
                user: user,
            };
        }
    }
    //
    console.log(userId + ' connected. Nickname: ' + user.nickName);
    user.activity.isOnline = true;
    await user.save();
    // TODO check user status for is in game
    return {
        isValidUser: true,
        user: user,
        isIngame: false,
    };
};

module.exports = onUserConnect;