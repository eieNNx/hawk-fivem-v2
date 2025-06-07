

const mongoose = require('mongoose');
const config = require("../config.js");

mongoose.connect(`${config.mongourl}`, { useNewUrlParser: true, useUnifiedTopology: true });

const { Schema, model } = require('mongoose');

const HexSchema  = new Schema({
  hex: { type: String, unique: true },
});

module.exports = model('Hex', HexSchema);