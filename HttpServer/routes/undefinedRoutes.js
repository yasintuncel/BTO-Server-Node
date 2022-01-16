const undefinedRoutes = function (req, res) {
    res.status(404).json({ 'error': 'not found' });
};

module.exports = undefinedRoutes;