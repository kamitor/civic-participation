import Accountability from './Accountability'
import Api from './Api'
import Contract from './Contract';
import { ProposalStatus } from '../types/civic'
import ecc from 'eosjs-ecc';
import crypto from 'crypto'
import { wait } from './objects';

import encodeImageFileAsURL from '../utils';

export default class Civic {
    // SEE civic AND accounts FOR TYPES!!!
    // import { ProposalCategory, ProposalStatus, ProposalType,
    //     Proposal, ProposalDetailed, ProposalExtended, ProposalHistory } from '../types/civic.ignore';
    // import { AccountExtended } from '../types/accounts.ignore';


    accountability; // {Accountability}
    civicContract; // {Contract}
    account; // {MyAccount}

    constructor() {
        this.accountability = new Accountability();
        this.civicContract = new Contract('civic', this.accountability);
    }


    /** 
     * Login to account using private key
     * Initializes the civicContract
     * @param {string} accountName - username
     * @param {string} commonName - common name e.g. 'Jack Tanner'
     * @param {string} privKey - private key
     */
    async accountLoginWithKey(accountName, commonName, privKey) {
        this.accountability.login({ accountName, permission: 'active', privKey });
        await this.civicContract.initializeContract();

        this.account = {
            accountName: accountName,
            commonName: commonName,
            privateKey: privKey
        }
    }

    /** 
     * Login to account
     * Initializes the civicContract
     * @param {string} accountName - username
     * @param {string} password - password
     * @returns {AccountExtended}
     */
    async accountLogin(accountName, password) {
        const privKey = ecc.seedPrivate(crypto.createHash("sha256").update(accountName + password).digest("hex"))
        const pubKey = ecc.privateToPublic(privKey)

        try {
            const response = await Api.post('login', {
                accountName,
                pubKey
            })

            this.accountability.login({ accountName, permission: 'active', privKey })
            await this.civicContract.initializeContract()

            this.account = {
                accountName: accountName,
                commonName: response.data.commonName,
                privateKey: privKey
            }

            return parseAccountRes(response.data);
        } catch (err) {
            let error

            if (err.response.data.includes('unknown key')) {
                error = new Error('User not found')
                error.status = 400
                throw (error)
            }

            if (err.response.data.includes('Public keys do not match')) {
                error = new Error('Password is incorrect')
                error.status = 401
                throw (error)
            }

            throw (err)
        }
    }


    /** 
     * Create account with the common name provided
     * Initializes the civicContract
     * @param {string} accountName - username
     * @param {string} password - password
     * @param {string} commonName - common name e.g. 'Jack Tanner'
     * @returns {AccountExtended}
     */
    async accountCreate(accountName, password, commonName) {
        const privKey = ecc.seedPrivate(crypto.createHash("sha256").update(accountName + password).digest("hex"))
        const pubKey = ecc.privateToPublic(privKey)

        const response = await Api.post('create-account', {
            commonName,
            accountName,
            pubKey
        })

        await this.accountability.login({ accountName, permission: 'active', privKey })
        await this.civicContract.initializeContract()

        this.account = {
            accountName: accountName,
            commonName: response.data.commonName,
            privateKey: privKey
        }

        return parseAccountRes(response.data);
    };

    /** 
     * Get information about an account
     * @param {string} accountName - username
     * @returns {AccountExtended}
     */
    async accountGet(accountName) {
        const response = await this.accountability.get_account(accountName);
        return parseAccountRes(response.data);
    };

    /** 
     * Creates a new proposal as the logged in user
     * @param {Proposal} proposal
     * @returns {ProposalDetailed}
     */
    async proposalCreate(proposal) {
        if (!proposal.photo) {
            throw new Error('Photo is mandatory while creating proposal');
        }

        let proposalDetails = [
            this.account.accountName,
            proposal.title,
            proposal.description,
            proposal.category,
            proposal.budget,
            proposal.type,
            proposal.location
        ];

        const imageBase64 = await encodeImageFileAsURL(proposal.photo);

        const response = await Api.post('/image', {
            photoString: imageBase64
        });

        proposalDetails.push(response.data.imageSha256);

        const tx = await this.civicContract.propcreate(...proposalDetails);

        await wait(1000);
        const txDetailed = await this.accountability.dfuseClient.fetchTransaction(tx.transaction_id);

        const blockNum = txDetailed.execution_trace.action_traces[0].block_num;
        const decodedRows = await this.accountability.dfuseClient.stateAbiBinToJson('civic', 'proposals', [txDetailed.dbops[0].new.hex], blockNum)
        const decodedRow = decodedRows.rows[0]

        const proposalDetailed = {
            title: proposal.title,
            description: proposal.description,
            category: proposal.category,
            type: proposal.type,
            location: proposal.location,
            proposalId: decodedRow.proposal_id,
            status: ProposalStatus.Proposed,
            created: new Date(decodedRow.created),
        }
        if (proposal.budget) { proposalDetailed.budget = proposal.budget }
        if (proposal.photo) { proposalDetailed.photo = proposal.photo }
        return proposalDetailed;
    }

    /** 
     * Updates a proposal as the logged in user
     * @param {ProposalExtended} proposal
     * @returns {ProposalDetailed}
     */
    async proposalUpdate(proposal) {
        const txData = {
            actions: [{
                account: 'civic',
                name: 'propupdate',
                authorization: [{
                    actor: this.account.accountName,
                    permission: this.accountability.account.permission,
                }, {
                    actor: 'gov', // need to sign as gov as well
                    permission: 'active'
                }],
                data: {
                    updater: this.account.accountName,
                    proposal_id: proposal.proposalId,
                    title: proposal.title,
                    description: proposal.description,
                    category: proposal.category,
                    budget: proposal.budget,
                    type: proposal.type,
                    location: proposal.location,
                    new_status: proposal.status,
                    regulations: proposal.regulations,
                    comment: proposal.comment,
                    // sha256 of ''
                    photo: '6f49cdbd80e1b95d5e6427e1501fc217790daee87055fa5b4e71064288bddede'
                },
            }]
        }

        if (proposal.photo) {
            const imageBase64 = await encodeImageFileAsURL(proposal.photo);

            // 1. get sha256 of imageString
            // await Api.post('/image')
            // then we will get SHA256 of base64 string which we can pass to propcreate smart contract.
            // if we have photo in proposal let us push that data as well. But we will only get this data from /image API response.
            // proposal.photoSHA256 we will get from /image API.

            const response = await Api.post('/image', {
                photoString: imageBase64
            });

            txData.actions[0].data.photo = response.data.imageSha256;
        }

        const tx = await this.accountability.transact2(txData);

        await wait(1000);
        const txDetailed = await this.accountability.dfuseClient.fetchTransaction(tx.transaction_id);

        const blockNum = txDetailed.execution_trace.action_traces[0].block_num;
        const decodedRows = await this.accountability.dfuseClient.stateAbiBinToJson('civic', 'proposals', [txDetailed.dbops[0].new.hex], blockNum)
        const decodedRow = decodedRows.rows[0];

        const proposalDetailed = {
            title: proposal.title,
            description: proposal.description,
            category: proposal.category,
            type: proposal.type,
            location: proposal.location,
            proposalId: proposal.proposalId,
            status: ProposalStatus.Proposed,
            created: Accountability.timePointToDate(decodedRow.created),
            updated: Accountability.timePointToDate(decodedRow.updated),
            approved: Accountability.timePointToDate(decodedRow.approved),
            status: proposal.status,
        };
        if (proposal.budget) { proposalDetailed.budget = proposal.budget }
        if (proposal.photo) { proposalDetailed.photo = proposal.photo }
        if (proposal.regulations) { proposalDetailed.regulations = proposal.regulations }
        if (proposal.comment) { proposalDetailed.comment = proposal.comment }

        return proposalDetailed;
    }

    /** 
     * Votes on an open proposal as the logged in user
     * @param {number} proposalId
     * @param {boolean} vote - true = yes, false = no
     * @returns {ProposalDetailed}
     */
    async proposalVote(proposalId, vote) { }

    /** 
     * Returns a list of proposals ordered by date with optional filter
     * @param {ProposalStatus} [status] - filter to use on proposals (optional)
     * @returns {ProposalDetailed[]}
     */
    async proposalList(status = null) {
        try {
            const proposalsQuery = await this.civicContract.proposals(this.civicContract.contractAccount)

            // filter per status if not null
            const proposals = status ? proposalsQuery.rows.filter(x => {
                return x.json.status === status
            }) : proposalsQuery.rows;

            // return ProposalDetailed[] type
            const response = proposals.map(x => ({
                proposalId: x.json.proposal_id,
                title: x.json.title,
                description: x.json.description,
                category: x.json.category,
                budget: x.json.budget,
                type: x.json.type,
                location: x.json.location,
                status: x.json.status,
                photo: x.json.photo,
                regulations: x.json.regulations,
                created: Accountability.timePointToDate(x.json.approved),
                approved: Accountability.timePointToDate(x.json.approved),
                updated: Accountability.timePointToDate(x.json.updated),
                voted: x.json.voted,
                yesVoteCount: x.json.yes_vote_count,
            }))

            // sort by created date
            response.sort((a, b) => {
                if (a.created > b.created) { return 1; }
                if (a.created < b.created) { return -1; }
                return 0;
            })

            return response
        } catch (e) {
            console.log(e);
        }
    }

    /** 
     * Returns a proposals 
     * @param {number} proposalId
     * @returns {ProposalDetailed}
     */
    async proposalGet(proposalId) {
        const proposalsQuery = await this.civicContract.proposalsRow(this.civicContract.contractAccount, proposalId, 'uint64')

        const proposal = proposalsQuery.row.json

        return {
            proposalId: proposal.proposal_id,
            title: proposal.title,
            description: proposal.description,
            category: proposal.category,
            budget: proposal.budget,
            type: proposal.type,
            location: proposal.location,
            status: proposal.status,
            photo: proposal.photo,
            regulations: proposal.regulations,
            created: Accountability.timePointToDate(proposal.approved),
            approved: Accountability.timePointToDate(proposal.approved),
            updated: Accountability.timePointToDate(proposal.updated),
            voted: proposal.voted,
            yesVoteCount: proposal.yes_vote_count,
        }
    }

    /** 
     * Returns a proposals history of who has done what actions
     * @param {number} proposalId
     * @returns {ProposalHistory[]}
     */
    async proposalHistory(proposalId) {
        let q = `receiver:${this.civicContract.contractAccount} event.proposal_id:${proposalId}`
        const proposalQuery = await this.accountability.dfuseClient.searchTransactions(q);
        const proposalTxs = proposalQuery.transactions;

        const proposalsActions = [];

        if (proposalTxs && proposalTxs.length > 0) {
            for (let tx of proposalTxs) {
                const data = tx.lifecycle;
                const actionData = data.execution_trace.action_traces[0].act;

                // TODO needs to handle txs with multiple signatures and authorities (also in BE)
                const proposalData = {
                    txId: data.id,
                    action: actionData.name,
                    timestamp: Accountability.timePointToDate(data.execution_trace.block_time),
                    authHuman: data.account_authorizers[0],
                    authHumanCommonName: data.account_authorizers_common_names[0],
                    data: actionData.data,
                    gov: isGovAction(actionData.name),
                    status: mapActionToStatus(actionData.name)
                }
                if (actionData.name === "propupdate") proposalData.status = actionData.data.new_status;
                if (actionData.data.comment) proposalData.comment = actionData.data.comment;

                proposalsActions.push(proposalData);
            }
        }

        proposalsActions.sort((a, b) => {
            if (a.timestamp > b.timestamp) { return 1; }
            if (a.timestamp < b.timestamp) { return -1; }
            return 0;
        })

        return proposalsActions;
    }
}

function parseAccountRes(data) {
    const val = {
        accountName: data.account_name,
        commonName: data.commonName,
        type: data.type,
        created: Accountability.timePointToDate(data.created),
        permissions: data.permissions,
        contractDeployed: data.last_code_update !== "1970-01-01T00:00:00.000",
        isGov: data.isGov
    }
    if (val.contractDeployed) {
        val.lastContractUpdate = Accountability.timePointToDate(data.last_code_update);
    }
    return val;
}

function mapActionToStatus(actionName) {
    switch (actionName) {
        case "propcreate":
            return ProposalStatus.Proposed;
        case "propupdate":
            return ProposalStatus.Reviewing;
        default:
            throw new Error("Invalid action name");
    }
}

function isGovAction(action) {
    switch (action) {
        case "propcreate":
            return false;
        case "propupdate":
            return true;
        case "propvote":
            return false;
        default:
            throw new Error("action not valid");
    }
}

