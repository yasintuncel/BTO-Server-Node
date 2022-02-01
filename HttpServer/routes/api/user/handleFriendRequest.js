const { User } = require("common/database/models/user");
const { Friend } = require("common/database/models/user/friend");

const handleFriendRequest = async function (req, res) {

    const userId = req.userId;
    const { isAccepted, friendId } = req.body;

    if (isAccepted === 'true') {
        try {
            let user = await User.findById(userId);
            let friend = await User.findById(friendId);
            let fSchema = Friend();
            fSchema.user = friend;
            user.friends.push(fSchema);

            let ffSchema = Friend();
            ffSchema.user = user;
            friend.friends.push(ffSchema);
            await user.save();
            await friend.save();
            res.status(200).json({ message: `${friend.nickName} ile arkadas oldunuz.` });
        }
        catch (e) {
            res.status(500).json({ message: `Bir hata olustu.` });
        }
    }
    else {
        res.status(200).json({ message: `Arkadaslik isteginiz kabul edilmedi.` });
    }
};

module.exports = handleFriendRequest;