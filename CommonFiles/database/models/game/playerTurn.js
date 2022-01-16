const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerTurnSchema = new Schema({
    isKicked: { type: Boolean, default: false },
    autoTurnCount: { type: Number, default: 0 },
    turnDuration: { type: Number, default: 15000 }, // TODO will change for prod
}, { _id: false, autoCreate: false });

const PlayerTurn = mongoose.model('playerTurn', PlayerTurnSchema);

module.exports = { PlayerTurn, PlayerTurnSchema };