const Accountability = require('../../services/Accountability');
const accountability = new Accountability();
const accountController = require('../../controllers/accounts.controller');
const ecc = require('eosjs-ecc');

/* GET acounts listing. */
module.exports = async function(req, res) {
    const { accountName, permission, pubKey, signature, signedData } = req.query;
    try {
        await checkAuthorized(accountName, permission, pubKey, signature, signedData);
    } catch (err) {
        return res.status(401).send(err.message);
    }

    const transactionRes = req.blockchainRes;

    let newTransactionSet = [];
    if (transactionRes.transactions && transactionRes.transactions.length > 0) {
        const transactionSet = transactionRes.transactions.map(val => val.lifecycle);
        // newTransactionSet = transactionSet.filter(trx => trx.transaction_status === "executed" && trx.pub_keys);
        newTransactionSet = transactionSet;

        await Promise.all(newTransactionSet.map(getAuth));
    }

    const retObj = req.addBlockchainRes(newTransactionSet);
    res.send(retObj);
};

async function checkAuthorized(accountName, permission, pubKey, signature, signatureData) {
    const blockchainAccount = await accountability.getAccount(accountName);

    if (!blockchainAccount) {
        throw new Error('Authorizing account not found');
    }

    const blockchainActivePermission = blockchainAccount.permissions.find(element => element.perm_name === permission);

    if (!blockchainActivePermission) {
        throw new Error('Authorizing account permission not found');
    }

    const signDate = new Date(signatureData);
    const now = new Date();
    if (now.getTime() - signDate.getTime() > 15 * 1000) {
        throw new Error("Signature has expired");
    }
    console.log(signatureData, signDate)
    console.log('ecc.verify', signature, signatureData, pubKey);
    if (!ecc.verify(signature, signatureData, pubKey)) throw new Error("Invalid signature")
}

// adds 'auth' property to the tx based on the signing key
async function getAuth(trx) {
    // TODO should check ALL public keys, not only first one
    const pubKey = trx.pub_keys[0];
    const blockNum = trx.execution_trace.action_traces[0].block_num;

    if (!pubKey) throw new Error("No public key found on trx" + trx.id);

    const keyRes = await accountability.dfuseClient.stateKeyAccounts(pubKey, { block_num: blockNum });
    if (!keyRes || !keyRes.account_names) throw new Error(`Accounts for public key ${pubKey} could not be found at block height ${blockNum}`)
    trx.account_authorizers = keyRes.account_names;

    const accountName = keyRes.account_names[0]
    const accountDoc = await accountController.findOne({ accountName });
    trx.account_authorizers_common_names = [accountDoc.commonName];
}