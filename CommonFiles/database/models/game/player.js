const mongoose = require('mongoose');
const { PlayerTurnSchema } = require('./playerTurn');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    side: { type: Number, default: -1 }, // 0 left, 1 right
    playerTurn: PlayerTurnSchema,
    user: {
        type: Schema.ObjectId,
        ref: 'user',
        default: null,
    },
}, { _id: false, autoCreate: false });

const Player = mongoose.model('player', PlayerSchema);

module.exports = { Player, PlayerSchema };