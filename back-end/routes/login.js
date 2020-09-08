const accountController = require('../controllers/accounts.controller');
const AccountType = require('../models/account.type');
const Accountability = require('../services/Accountability');
const ecc = require('eosjs-ecc');

let accountability = new Accountability();

/**
 * Confirms the user has the correct public key
 * @param {string} accountName
 * @param {string} pubKey
 * @return {AccountExtended}
 */
module.exports = async function(req, res) {
    const accountName = req.body.accountName
    const pubKey = req.body.pubKey

    const blockchainAccount = await accountability.getAccount(accountName);

    if (!blockchainAccount) {
        return res.status(401).send('Account not found');
    }

    const blockchainActivePermission = blockchainAccount.permissions.find(element => element.perm_name === 'active');

    if (!blockchainActivePermission) {
        return res.status(400).send('Active permission not found');
    }

    const blockchainActivePermissionKey = blockchainActivePermission.required_auth.keys[0].key

    if(pubKey !== blockchainActivePermissionKey) {
        return res.status(400).send('Public keys do not match');
    }

    const accountDoc = await accountController.findOne({ accountName: accountName });

    const accountExtendedObject = { ...blockchainAccount, commonName: accountDoc.commonName, type: AccountType.Human }

    res.send(accountExtendedObject);
}