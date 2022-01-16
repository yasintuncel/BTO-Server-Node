const config = require('../../config');

const createNewGuestUser = require('common/database/functions/createNewGuestUser');

const asGuest = async function (req, res) {
    const { nickName } = req.body;
    if (!(nickName)) {
        res.status(400).send("A nick name is required");
        return;
    }

    const newUserStatus = createNewGuestUser(nickName, config.apiScreetKey, config.tokenDuration);

    if (newUserStatus.isCreated) {
        res.status(200).json({ "token": jwtToken });
    }
    else {
        res.status(500).json({ 'error': e });
    }
};

module.exports = asGuest;