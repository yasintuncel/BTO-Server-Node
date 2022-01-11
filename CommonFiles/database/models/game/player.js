const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    side: { type: Number, default: 0 }, // 0 left, 1 right
    playerTurn: PlayerTurnSchema,
    user: {
        type: Schema.ObjectId,
        ref: 'user',
        default: null,
    },
}, { _id: false });

const Player = mongoose.model('activity', PlayerSchema);

module.exports = { Player, PlayerSchema };