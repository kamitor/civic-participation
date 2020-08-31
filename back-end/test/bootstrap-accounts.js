const mongoose = require('mongoose');

const Accountability = require('../services/Accountability');
const settings = require('../settings');
const accountController = require('../controllers/accounts.controller');
const { createNewPerson, keyFromName } = require('../routes/login');
const AccountType = require('../models/account.type');

let accountability = new Accountability();

async function main() {
    console.log("starting blockchain initialization");

    await mongoose.connect(settings.mongodb.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log("Connected to database");
    // Set up the system contract
    let eosioAccount = {
        privKey: settings.eosio.accounts.eosio.pkey,
        name: "eosio",
        permission: "active"
    }
    await accountability.login(eosioAccount);
    await deploySystemContract();

    // Create some people
    accountability = new Accountability()
    await accountability.login(eosioAccount);
    await createNewPerson("yvo", "Yvo Hunink", keyFromName('yvo').pubKey);
    await createNewPerson("hidde", "Hidde Kamst", keyFromName('yvo').pubKey);
    await createNewPerson("tijn", "Tijn Kyuper", keyFromName('tijn').pubKey);

    // Create some new orgs
    await createNewOrg("gov", "The Ministry of The Hague", ["hidde", "tijn", "yvo"], 0.66);

    // Update the system contract to be controlled by the government
    await updateEosioAuth();

    // TODO Deploy civic contract

    console.log("fin")
    process.exit(0)
}

Promise.resolve(main()).catch(err => {
    console.error(err)
    process.exit(1)
})


async function deploySystemContract() {
    await accountability.deploy("eosio", "../contracts/eosio.bios");
    console.log("eosio.bios contract deployed");
    await accountController.insert({
        accountName: "eosio",
        name: "System governance",
        accountType: AccountType.Org
    });
}

async function updateEosioAuth() {
    eosioAccount = {
        pkey: settings.eosio.accounts.eosio.pkey,
        name: "eosio",
        permission: "active"
    }
    await accountability.login(eosioAccount);
    let data = {
        account: "eosio",
        permission: "active",
        parent: "owner",
        auth: {
            accounts: [{
                permission: { actor: "gov", permission: "active" },
                weight: 1
            }],
            keys: [],
            threshold: 1,
            waits: []
        }
    }
    await accountability.transact("eosio", "updateauth", data);

    eosioAccount = {
        pkey: settings.eosio.accounts.eosio.pkey,
        name: "eosio",
        permission: "owner"
    }
    await accountability.login(eosioAccount);
    data = {
        account: "eosio",
        permission: "owner",
        parent: "",
        auth: {
            accounts: [{
                permission: { actor: "gov", permission: "owner" },
                weight: 1
            }],
            keys: [],
            threshold: 1,
            waits: []
        }
    }
    await accountability.transact("eosio", "updateauth", data);
}

async function createNewOrg(accountName, commonName, owners, thresholdPercent) {
    const data = newOrgData("eosio", accountName, owners, thresholdPercent);
    await accountability.transact("eosio", "neworg", data);
    let updateAccount = {
        accountName: accountName,
        commonName: commonName,
        accountType: "organization",
    }
    await accountController.insert(updateAccount);
    console.log("Organization ", accountName, " created");
}

function newOrgData(creator, commonName, owners, thresholdPercent) {
    let data = {
        creator: creator,
        commonName: commonName,
        owner: {
            threshold: Math.min(Math.floor(owners.length * thresholdPercent) + 1, owners.length),
            keys: [],
            accounts: [],
            waits: []
        },
        active: {
            threshold: 1,
            keys: [],
            accounts: [],
            waits: []
        }
    }

    for (owner of owners) {
        data.owner.accounts.push({
            permission: {
                actor: owner,
                permission: "active"
            },
            weight: 1
        })
        data.active.accounts.push({
            permission: {
                actor: owner,
                permission: "active"
            },
            weight: 1
        })
    }
    return data;
}