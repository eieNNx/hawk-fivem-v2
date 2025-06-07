const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const config = require("../config.js");
let mongourl = config.mongourl
mongoose.connect(`${mongourl}`, { useNewUrlParser: true, useUnifiedTopology: true });

const gunlukkayitSchema = new Schema({
  userID: { type: String, required: true },
  gunlukkayits: { type: Number, default: 0 },
});

module.exports = model('GunlukKayit', gunlukkayitSchema);
