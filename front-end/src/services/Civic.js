import Accountability from './Accountability'
import Contract from './Contract';

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
    async accountLogin(accountName, password, commonName) { };

        /** 
     * Create account with the common name provided
     * Initializes the civicContract
     * @param {string} accountName - username
     * @param {string} password - password
     * @param {string} commonName - common name e.g. 'Jack Tanner'
     * @returns {AccountExtended}
     */
    async accountCreate(accountName, password, commonName) { };

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
    async proposalCreate(proposal) { }
    
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
    async proposalVote(proposalId, vote){ }

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
     * @returns {ProposalHistory[]}
     */
    async proposalHistory(proposalId) { }
}