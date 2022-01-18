const tokenGenerator = require('common/utils/tokenGenerator');
const { User } = require('common/database/models/user');
const config = require('../../config');

const refreshToken = async function (req, res) {
    const { id, uid } = req.body;
    if (!(id && uid)) {
        res.status(400).json({ 'error': 'Please fill in all required fields' });
        return;
    }

    try {
        const token = tokenGenerator(id, config.tokenScreetKey, config.tokenDuration);
        await User.findByIdAndUpdate(id, { 'token': token });
        res.status(200).json({ 'token': token });
    } catch (e) {
        res.status(500).json({ 'error': e });
    }
};

module.exports = refreshToken;