const getUser = function (req, res) {
    res.status(200).json({ 'message': 'getUser' });
};

module.exports = getUser;