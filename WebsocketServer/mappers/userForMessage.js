const userForMessage = function (user) {
    let obj = {};
    let userObj = user.toObject();
    try {
        obj = {
            id: userObj._id.toString(),
            nickName: userObj.nickName,
            isInGame: userObj.activity.isInGame,
            identicon: userObj.identicon,
        };
    }
    catch (e) {
        console.log(e);
    }
    return obj;
};
module.exports = userForMessage;