const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameAreaSchema = new Schema({

}, { _id: false, autoCreate: false });

const GameArea = mongoose.model('gameArea', GameAreaSchema);

module.exports = { GameArea, GameAreaSchema };