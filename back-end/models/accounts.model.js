const mongoose = require('mongoose');
const AccountType = require('../models/account.type');

module.exports = mongoose.Schema({
    // eosio account name 1 to 14 chars with 1-5 numbers
    accountName: String,

    // example: 'Jack Tanner', 'Ministry of The Hague', 'Google LLC'
    commonName: String,

    accountType: {
        type: Number,
        enum: [AccountType.Human, AccountType.Org]
    }
}, { timestamps: true });