const Accountability = require('../../services/Accountability');
const accountability = new Accountability();
const accountController = require('../../controllers/accounts.controller');
const { getAuthorizor } = require('../../services/auth');

/* GET acounts listing. */
module.exports = async function(req, res) {
    try {
        await getAuthorizor(req);
    } catch (err) {
        return res.status(401).send(err.message);
    }

    const transactionRes = req.blockchainRes;

    let newTransactionSet = [];
    const timerObj = { account: 0, keys: 0, counter: 0 }
    if (transactionRes.transactions && transactionRes.transactions.length > 0) {
        const transactionSet = transactionRes.transactions.map(val => val.lifecycle);
        // newTransactionSet = transactionSet.filter(trx => trx.transaction_status === "executed" && trx.pub_keys);
        newTransactionSet = transactionSet;

        await Promise.all(newTransactionSet.map(x => getAuth(x, timerObj)));
    }

    const retObj = req.addBlockchainRes(newTransactionSet);

    const end = (new Date()).getTime();
    req.blockchainRes.timer.accounts = timerObj.account;
    req.blockchainRes.timer.keyLookups = timerObj.keys;
    req.blockchainRes.timer.total = end - req.blockchainRes.timer.start;
    delete req.blockchainRes.timer.start;
    console.log('Txs count', timerObj.count);
    console.log('Search transactions timer', req.blockchainRes.timer);

    res.send(retObj);
};

// adds 'auth' property to the tx based on the signing key
async function getAuth(trx, timerObj) {
    // TODO should check ALL public keys, not only first one
    const pubKey = trx.pub_keys[0];
    const blockNum = trx.execution_trace.action_traces[0].block_num;

    if (!pubKey) throw new Error("No public key found on trx" + trx.id);

    const startKey = (new Date()).getTime();
    const keyRes = await accountability.dfuseClient.stateKeyAccounts(pubKey, { block_num: blockNum });
    const endKey = (new Date()).getTime();
    if (!keyRes || !keyRes.account_names) throw new Error(`Accounts for public key ${pubKey} could not be found at block height ${blockNum}`)
    trx.account_authorizers = keyRes.account_names;

    const accountName = keyRes.account_names[0];
    const startAccount = (new Date()).getTime();
    const accountDoc = await accountController.findOne({ accountName });
    const endAccount = (new Date()).getTime();

    if (accountDoc.deletedAt) {
        trx.account_authorizers_common_names = [`Deleted at ${accountDoc.deletedAt}`];
    } else {
        trx.account_authorizers_common_names = [accountDoc.commonName];
    }
    timerObj.account += endAccount - startAccount;
    timerObj.keys += endKey - startKey;
    timerObj.count++;
}