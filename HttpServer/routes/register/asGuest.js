const config = require('../../config');

const createNewGuestUser = require('common/database/functions/createNewGuestUser');

const asGuest = async function (req, res) {
    const { nickName } = req.body;
    if (!(nickName)) {
        res.status(400).send("A nick name is required");
        return;
    }

    const newUserStatus = await createNewGuestUser(nickName, config.tokenScreetKey, config.tokenDuration);
    console.log(newUserStatus.message + ` Request ip: + ${req.ip}`);
    if (newUserStatus.isCreated) {
        res.status(200).json({ "token": newUserStatus.token });
    }
    else {
        res.status(500).json(newUserStatus.message);
    }
};

module.exports = asGuest;