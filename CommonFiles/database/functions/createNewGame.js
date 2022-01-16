const mongoose = require('mongoose');
const { Game } = require('../models/game');
const { GameArea } = require('../models/game/area');
const { Player } = require('../models/game/player');
const { PlayerTurn } = require('../models/game/playerTurn');

const createNewGame = async function (userId, playCount, gold, isPrivate) {

    let side = Math.floor(Math.random() * 100) > 49 ? 1 : 0;
    let newPlayer = Player({
        side: side,
        user: mongoose.Types.ObjectId(userId),
        playerTurn: PlayerTurn(),
    });

    let newGame = new Game({
        playCount: playCount,
        gold: gold,
        isPrivate: isPrivate,
        area: GameArea(),
        players: [newPlayer]
    });
    try {
        await newGame.save();
        return {
            isCreated: true,
            game: await newGame.populate({
                path: 'players',
                populate: { path: 'user' }
            }),
            message: 'Successfully created new game.'
        };
    } catch (e) {
        return {
            isCreated: false,
            message: 'Error: ' + e
        };
    }
};

module.exports = createNewGame;