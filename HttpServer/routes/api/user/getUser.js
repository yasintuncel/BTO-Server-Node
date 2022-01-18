const { User } = require("common/database/models/user");

const getUser = async function (req, res) {
    try {
        const userId = req.userId;
        let user = await User.findById(userId, '-__v');
        res.status(200).json(user);
    }
    catch (e) {
        res.status(500).json({ 'message': e });
    }
};

module.exports = getUser;