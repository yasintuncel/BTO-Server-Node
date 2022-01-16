const createNewGame = require('common/database/functions/createNewGame');

const createGame = async function (req, res) {

    var { playCount, gold, isPrivate } = req.body;

    if (!(playCount && gold && isPrivate)) {//&& email
        res.status(400).send("All fields are required");
    }
    else {
        const gameStatus = await createNewGame(req.userId, playCount, gold, isPrivate);

        if (gameStatus.isCreated) {
            // change user activity for in-game
            res.status(200).json({ game: gameStatus.game.toObject() });
        }
        else {
            res.status(500).json(gameStatus.message);
        }
    }
};

module.exports = createGame;