const accountController = require('../controllers/accounts.controller');
const AccountType = require('../models/account.type');
const Accountability = require('../services/Accountability');
const ecc = require('eosjs-ecc');

/**
 * Confirms the user has the correct public key
 * @param accountName: string
 * @param pubKey: string
 */
module.exports = async function(req, res, next) {

    res.send();
}