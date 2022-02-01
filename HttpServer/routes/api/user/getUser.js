const { User } = require("common/database/models/user");

const getUser = async function (req, res) {
    try {
        const userId = req.userId;
        let user = await User.findById(userId, '-__v').populate({
            path: 'friends',
            populate: {
                path: 'user',
                select: '_id nickName identicon gold level activity'
            }
        });
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(500).json({ 'message': 'user not found' });
        }
    }
    catch (e) {
        res.status(500).json({ 'message': e });
    }
};

module.exports = getUser;