const config = require('../../config');

const createNewGuestUser = require('common/database/functions/createNewGuestUser');
const { User } = require('common/database/models/user');
const tokenGenerator = require('common/utils/tokenGenerator');

const asGuest = async function (req, res) {
    const { nickName } = req.body;
    if (!(nickName)) {
        res.status(400).send("A nick name is required");
        return;
    }
    try {
        let registeredUser = await User.findOne({ 'uid': nickName });
        if (registeredUser) {
            let newToken = tokenGenerator(registeredUser._id, config.tokenScreetKey, config.tokenDuration);
            registeredUser.token = newToken;
            registeredUser.save();
            res.status(200).json({ "token": newToken });
        }
        else {
            const newUserStatus = await createNewGuestUser(nickName, config.tokenScreetKey, config.tokenDuration);
            console.log(newUserStatus.message + ` Request ip: + ${req.ip}`);
            if (newUserStatus.isCreated) {
                res.status(200).json({ "token": newUserStatus.token });
            }
            else {
                res.status(500).json(newUserStatus.message);
            }
        }
    }
    catch (e) {
        res.status(500).json({ 'error': 'an unkown error' });
    }
};

module.exports = asGuest;