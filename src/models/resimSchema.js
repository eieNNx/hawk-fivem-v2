const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const config = require("../config.js");
let mongourl = config.mongourl
mongoose.connect(`${mongourl}`, { useNewUrlParser: true, useUnifiedTopology: true });

const resimSchema = new Schema({
  aktif: [{
    type: String
  }],
  bakım: [{
    type: String
  }],
  restart: [{
    type: String
  }]
});

module.exports = model('Resim', resimSchema);


