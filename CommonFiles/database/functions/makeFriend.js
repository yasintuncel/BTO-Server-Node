const { User } = require("../models/user");
const { Friend } = require("../models/user/friend");

const makeFriend = async function (userId, otherUserId) {

    try {
        let user = await User.findById(userId);
        let otherUser = await User.findById(otherUserId);

        let firstFriendSchema = Friend();
        firstFriendSchema.user = otherUser;
        user.friends.push(firstFriendSchema);

        let secondFriendSchema = Friend();
        secondFriendSchema.user = user;
        otherUser.friends.push(secondFriendSchema);

        await user.save();
        await otherUser.save();

        return {
            areAdded: true,
        };
    }
    catch (e) {
        return {
            message: e,
            areAdded: false,
        };
    }
};
module.exports = makeFriend;