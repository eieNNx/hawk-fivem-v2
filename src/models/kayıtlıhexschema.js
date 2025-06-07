

const mongoose = require('mongoose');
const config = require("../config.js");

let mongourl = config.mongourl
mongoose.connect(`${mongourl}`, { useNewUrlParser: true, useUnifiedTopology: true });

const { Schema, model } = require('mongoose');

const KayıtlıHexSchema  = new Schema({
  discordId: { type: String, unique: true },
  kayıtlıhex: { type: String }
});

module.exports = model('KayıtlıHex', KayıtlıHexSchema);