const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const config = require("../config.js");
let mongourl = config.mongourl
mongoose.connect(`${mongourl}`, { useNewUrlParser: true, useUnifiedTopology: true });

const roleSchema = new Schema({
  roleID: [{
    type: String
  }],
  userID: [{
    type: String
  }],
  roleName: [{
    type: String
  }]
});

module.exports = model('Role', roleSchema);


