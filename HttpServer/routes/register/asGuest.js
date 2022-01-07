const asGuest = function (req, res) {
    res.status(200).json({ 'message': 'asGuest' });
};

module.exports = asGuest;