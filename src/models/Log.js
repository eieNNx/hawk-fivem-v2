const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const config = require("../config.js");
let mongourl = config.mongourl
mongoose.connect(`${mongourl}`, { useNewUrlParser: true, useUnifiedTopology: true });

const logSchema = new mongoose.Schema({
    ticketLog: {
        type: String,
        required: false
    },
    whitelistCikisLog: {
        type: String,
        required: false
    },
    rolLog: {
        type: String,
        required: false
    },
    kayitLog: {
        type: String,
        required: false
    },
    banLog: {
        type: String,
        required: false
    },
    unbanLog: {
        type: String,
        required: false
    },
    sesLog: {
        type: String,
        required: false
    },
    ekipLog: {
        type: String,
        required: false
    },
    mesajLog: {
        type: String,
        required: false
    },
    girisLog: {
        type: String,
        required: false
    },
    kanalLog: {
        type: String,
        required: false
    },
    basvuruLog: {
        type: String,
        required: false
    },
    reklamLog: {
        type: String,
        required: false
    },
    uyarıLog: {
        type: String,
        required: false
    },
    yetkilibildirimlog: {
        type: String,
        required: false
    },
    ticketKategori: {
        type: String,
        required: false
    },
    botsesgiris: {
        type: String,
        required: false
    }
});

module.exports = model('Log', logSchema);