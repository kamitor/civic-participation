import Accountability from './Accountability'
import Api from './Api'
import Contract from './Contract';
import { ProposalStatus } from '../types/civic'
import ecc from 'eosjs-ecc';
import crypto from 'crypto'
import { wait } from './objects';

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
     * Login to account
     * Initializes the civicContract
     * @param {string} accountName - username
     * @param {string} password - password
     * @returns {AccountExtended}
     */
    async accountLogin(accountName, password) {
        const privKey = ecc.seedPrivate(crypto.createHash("sha256").update(accountName + password).digest("hex"))
        const pubKey = ecc.privateToPublic(privKey)

        const response = await Api.post('login', {
            accountName,
            pubKey
        })

        this.account = {
            accountName: accountName,
            commonName: response.data.commonName,
            privateKey: privKey
        }

        await this.accountability.login({ accountName, permission: 'active', privKey })
        await this.civicContract.initializeContract()

        return {
            ...response.data,
            common_name: response.data.commonName,
            type: response.data.type
        }
    };

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

        this.account = {
            accountName: accountName,
            commonName: response.data.commonName,
            privateKey: privKey
        }

        await this.accountability.login({ accountName, permission: 'active', privKey })
        await this.civicContract.initializeContract()

        return {
            ...response.data,
            common_name: response.data.commonName,
            type: response.data.type
        }
    };

    /** 
     * Get information about an account
     * @param {string} accountName - username
     * @returns {AccountExtended}
     */
    async accountGet(accountName) {
        return await this.accountability.get_account(accountName);
    };

    /** 
     * Creates a new proposal as the logged in user
     * @param {Proposal} proposal
     * @returns {ProposalDetailed}
     */
    async proposalCreate(proposal) {

        const tx = await this.civicContract.propcreate(this.account.accountName, proposal.title, proposal.description, proposal.category, proposal.budget, proposal.type, proposal.location);

        await wait(1000);
        const txDetailed = await this.accountability.dfuseClient.fetchTransaction(tx.transaction_id);
        const primaryKey = Number(txDetailed.execution_trace.action_traces[0].console);
        // Better way to do this:
        // txDetailed.dbops[0].new.hex; // can convert this to get primary key in http://localhost:8080/v0/state/abi/bin_to_json
        // this.accountability.dfuseClient.stateAbiBinToJson()

        const proposalDetailed = {
            title: proposal.title,
            description: proposal.description,
            category: proposal.category,
            type: proposal.type,
            location: proposal.location,
            proposalId: primaryKey,
            status: ProposalStatus.Proposed,
            created_time: tx.processed.action_traces[0].block_time,
        }
        if (proposal.budget) { proposalDetailed.budget = proposal.budget }
        if (proposal.photos) { proposalDetailed.photos = proposal.photos }
        return proposalDetailed;
    }

    /** 
     * Updates a proposal as the logged in user
     * @param {ProposalExtended} proposal
     * @returns {ProposalDetailed}
     */
    async proposalUpdate(proposal) { }

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
    async proposalList(status) { }

    /** 
     * Returns a proposals 
     * @param {number} proposalId
     * @returns {ProposalDetailed}
     */
    async proposalGet(proposalId) { }

    /** 
     * Returns a proposals history of who has done what actions
     * @param {number} proposalId
     * @returns {ProposalHistory}
     */
    async proposalHistory(proposalId) { }
}