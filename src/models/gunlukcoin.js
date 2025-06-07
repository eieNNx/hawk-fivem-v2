
const config = require("../config.js");

let mongourl = config.mongourl

const mongoose = require('mongoose');
mongoose.connect(`${mongourl}`, { useNewUrlParser: true, useUnifiedTopology: true });

const { Schema, model } = require('mongoose');

const gunlukcoinSchema = new Schema({
  userID: { type: String, required: true },
  gunlukcoins: { type: Number, default: 0 },
});

module.exports = model('GunlukCoin', gunlukcoinSchema);