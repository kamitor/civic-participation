const { Api, JsonRpc, RpcError, Serialize } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');
const ecc = require('eosjs-ecc');
const { copyObj } = require('./objects');
const { createDfuseClient } = require('@dfuse/client');
// const { DfuseClient } = require('@dfuse/client/types/client');
const fs = require('fs');
const path = require('path');
const { wait } = require('./objects');

// Only needed for nodejs execution for eosjs and @dfuse/client
const fetch = require('node-fetch');
const { TextEncoder, TextDecoder } = require('util');
const ws = require('ws');

const settings = require('../settings');

class Accountability {
    rpc; // read from blockchain with eosjs
    api; // interact with blockchain with eosjs
    dfuseClient; // use enhanced blockchain api
    account; // { name, permission, pubkey}

    constructor(network = { nodeos: settings.eosio.nodeos, dfuseOptions: settings.dfuseOptions }) {
        this.rpc = fetch ? new JsonRpc(network.nodeos, { fetch }) : new JsonRpc(network.nodeos);
        if (settings.isLiveEnvironment()) settings.secure = true;
        if (fetch) {
            dfuseOptions.httpClientOptions = {
                fetch: fetch
            }
        }
        if (ws) {
            dfuseOptions.graphqlStreamClientOptions = {
                socketOptions: {
                    webSocketFactory: (url) => ws(url, ["graphql-ws"])
                }
            }
            dfuseOptions.streamClientOptions = {
                socketOptions: {
                    webSocketFactory: (url) => ws(url)
                }
            }
        }
        this.dfuseClient = createDfuseClient(dfuseOptions);
    }

    /*
     * @param privKey
     * @param name
     * @param permission
     */
    login(account) {
        let accountCopy = copyObj(account);

        const signatureProvider = new JsSignatureProvider([accountCopy.privKey]);
        accountCopy.pubKey = ecc.privateToPublic(accountCopy.privKey);

        delete accountCopy.privKey;
        this.account = accountCopy;

        const rpc = this.rpc;
        this.api = TextEncoder ?
            new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() }) :
            new Api({ rpc, signatureProvider });
    }

    async transact(receiver, action, data, options) {
        try {
            const tx = await this.api.transact({
                actions: [{
                    account: receiver,
                    name: action,
                    authorization: [{
                        actor: this.account.name,
                        permission: this.account.permission,
                    }],
                    data: data,
                }]
            }, {
                blocksBehind: 3,
                expireSeconds: 30,
            })
            if (options) {
                if (tx.processed.error_code) throw Error("Failed with error code: " + tx.processed.error_code);
                if (options.status && tx.processed.receipt.status !== options.status) throw Error("Tx status is " + tx.processed.receipt.status);
            }
            return tx;
        } catch (e) {
            console.log('\nCaught exception: ' + e);
            if (e instanceof RpcError)
                console.error(JSON.stringify(e.json, null, 2));
            else {
                console.error(e)
                throw Error(e);
            }
        }
    }

    async deploy(contractAccount, contractDir, options) {
        const { wasmPath, abiPath } = getDeployableFilesFromDir(contractDir)

        const wasm = fs.readFileSync(wasmPath).toString(`hex`);
        const buffer = new Serialize.SerialBuffer({
            textEncoder: this.api.textEncoder,
            textDecoder: this.api.textDecoder,
        })

        let abi = JSON.parse(fs.readFileSync(abiPath, `utf8`))
        const abiDefinition = this.api.abiTypes.get(`abi_def`)
        abi = abiDefinition.fields.reduce((acc, { name: fieldName }) =>
            Object.assign(acc, {
                [fieldName]: acc[fieldName] || []
            }),
            abi
        )
        abiDefinition.serialize(buffer, abi)

        try {
            const tx = await this.api.transact({
                actions: [{
                    account: "eosio",
                    name: "setcode",
                    authorization: [{
                        actor: this.account.name,
                        permission: this.account.permission,
                    }],
                    data: {
                        account: contractAccount,
                        vmtype: 0,
                        vmversion: 0,
                        code: wasm
                    },
                }, {
                    account: "eosio",
                    name: "setabi",
                    authorization: [{
                        actor: this.account.name,
                        permission: this.account.permission,
                    }],
                    data: {
                        account: contractAccount,
                        abi: Buffer.from(buffer.asUint8Array()).toString(`hex`)
                    },
                }]
            }, {
                blocksBehind: 3,
                expireSeconds: 30,
            })
            if (options) {
                if (tx.processed.error_code) throw Error("Failed with error code: " + tx.processed.error_code);
                if (options.status && tx.processed.receipt.status !== options.status) throw Error("Tx status is " + tx.processed.receipt.status);
            }

            await wait(1000)
            return tx;
        } catch (e) {
            console.log('\nCaught exception: ' + e);
            if (e instanceof RpcError)
                console.error(JSON.stringify(e.json, null, 2));
            else
                throw Error(e);
        }
    }

}

function getDeployableFilesFromDir(dir) {
    const dirCont = fs.readdirSync(dir)
    const wasmFileName = dirCont.find(filePath => filePath.match(/.*\.(wasm)$/gi))
    const abiFileName = dirCont.find(filePath => filePath.match(/.*\.(abi)$/gi))
    if (!wasmFileName) throw new Error(`Cannot find a ".wasm file" in ${dir}`)
    if (!abiFileName) throw new Error(`Cannot find an ".abi file" in ${dir}`)
    return {
        wasmPath: path.join(dir, wasmFileName),
        abiPath: path.join(dir, abiFileName),
    }
}


module.exports = Accountability