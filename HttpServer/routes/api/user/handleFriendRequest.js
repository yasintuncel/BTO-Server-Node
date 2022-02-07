const { User } = require("common/database/models/user");
const { Friend } = require("common/database/models/user/friend");
const makeFriend = require("common/database/functions/makeFriend");

const handleFriendRequest = async function (req, res) {

    const userId = req.userId;
    const { isAccepted, friendId } = req.body;

    if (isAccepted === 'true') {
        const status = await makeFriend(userId, friendId);
        if (status.areAdded) {
            res.status(200).json({ message: `Arkadaslik isteginiz kabul edildi.` });
        }
        else {
            res.status(500).json({ message: `Bir hata olustu. Error: ` + status.message });
        }
    }
    else {
        res.status(200).json({ message: `Arkadaslik isteginiz kabul edilmedi.` });
    }
};

module.exports = handleFriendRequest;