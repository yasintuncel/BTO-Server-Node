const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { GameAreaSchema } = require('./game/area');
const { PlayerSchema } = require('./game/player');

const GameSchema = new Schema({
    playCount: { type: Number, default: 3 },
    isFull: { type: Boolean, default: false },
    gold: { type: Number, default: 50 },
    isStarted: { type: Boolean, default: false },
    isPrivate: { type: Boolean, default: false },
    currentQueue: { type: Number, default: -1 },
    createdAt: { type: Number, default: Date.now },
    area: GameAreaSchema,
    players: [PlayerSchema],
},
    { versionKey: false }
);

const Game = mongoose.model('game', GameSchema);

module.exports = { Game, GameSchema };