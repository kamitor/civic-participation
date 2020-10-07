const Accountability = require('../../services/Accountability');
const accountability = new Accountability();


/* GET acounts listing. */
module.exports = async function(req, res) {
    const transactionRes = req.blockchainRes;
    const transactionSet = transactionRes.transactions;

    // Find the account name of the account that siged the transaction
    let newTransactionSet = [];
    if (transactionSet) {
        newTransactionSet = transactionSet.filter(trx => trx.transaction_status === "executed" && trx.pub_keys);
    }

    await Promise.all(newTransactionSet.map(getAuth));

    // Add the common name of the account_authorizers that signed the transaction
    // TODO

    const retObj = req.addBlockchainRes(newTransactionSet);
    res.send(retObj);
};

// adds 'auth' property to the tx based on the signing key
async function getAuth(trx, index, transactionArray) {
    const pubKey = trx.pub_keys[0];
    const blockNum = trx.execution_trace.action_traces[0].block_num;

    if (!pubKey) throw new Error("New public key found on trx at index" + index);

    const keyRes = await accountability.dfuseClient.stateKeyAccounts(pubKey, { block_num: blockNum });
    if (!keyRes || !keyRes.account_names) throw new Error(`Accounts for public key ${pubKey} could not be found at block height ${blockNum}`)
    transactionArray[index].account_authorizers = keyRes.account_names;
}