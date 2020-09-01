const accountController = require('../controllers/accounts.controller');
const AccountType = require('../models/account.type');
const Accountability = require('../services/Accountability');
const ecc = require('eosjs-ecc');

/**
 * Creates an account with the commonName
 * @param accountName: string
 * @param pubKey: string
 * @param commonName: string
 */
module.exports = async function(req, res, next) {

    const accountability = new Accountability();
    accountability.login({
        name: 'yvo',
        permission: 'active',
        privKey: keyFromName('yvo').privKey,
    })

    await createNewPerson(req.accountName, req.commonName, req.pubKey);

    res.send();
}

module.exports.createNewPerson = createNewPerson;
module.exports.keyFromName = keyFromName;

async function createNewPerson(accountability, accountName, commonName, key) {
    const data = newPersonData("eosio", accountName, key);

    await accountability.transact("eosio", "newperson", data);
    await accountController.insert({
        accountName: accountName,
        commonName: commonName,
        accountType: AccountType.Human,
    });
    console.log("Person ", accountName, " created");
}

function newPersonData(creator, name, key, owner = "gov") {
    const data = {
        creator: creator,
        name: name,
        owner: {
            threshold: 1,
            keys: [],
            accounts: [{
                permission: {
                    actor: "gov",
                    permission: "active"
                },
                weight: 1
            }],
            waits: []
        },
        active: {
            threshold: 1,
            keys: [{
                key: key,
                weight: 1
            }],
            accounts: [],
            waits: []
        }
    }
    if (owner !== "gov") {
        data.owner.accounts = []
        data.owner.keys = [{
            key: owner,
            weight: 1
        }]
    }
    return data;
}

function keyFromName(name) {
    const privKey = ecc.seedPrivate(name);
    return {
        privKey,
        pubKey: ecc.privateToPublic(privKey)
    }
}