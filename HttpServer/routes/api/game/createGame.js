const createNewGame = require('common/database/functions/createNewGame');
const { User } = require('common/database//models/user');

const createGame = async function (req, res) {
    let { playCount, gold, isPrivate } = req.body; // 3/5

    if (!(playCount && gold && isPrivate)) {//&& email
        res.status(400).json({ 'error': 'All fields are required' });
    }
    else {
        const userId = req.userId;
        const gameStatus = await createNewGame(userId, playCount, gold, isPrivate);

        if (gameStatus.isCreated) {
            try {
                let user = await User.findByIdAndUpdate(userId, {
                    'activity.isInGame': true,
                    'activity.gameId': gameStatus.game._id.toString(),
                });
                // user.activity.isInGame = true;
                // user.activity.gameId = gameStatus.game._id.toString();
                // await user.save();

                res.status(200).json({ game: gameStatus.game.toObject() }); // Todo create map -> game for users
            }
            catch (e) {
                res.status(503).json({ 'error': e });
            }
        }
        else {
            res.status(500).json(gameStatus.message);
        }
    }
};

module.exports = createGame;