import { Accountability } from './Accountability'
import { AccountExtended } from '../types/accounts';

export enum ProposalCategory { Green, Kids, Road }
export enum ProposalType { Create, Remove, Update }
export enum ProposalStatus { Proposed, Reviewing, Approved, Rejected, VotePassed, VoteFailed, Actioned, Closed }

class Proposal {
    title: string;
    description: string;
    category: ProposalCategory;
    budget: number;
    type: ProposalType;
    photos: Blob[];
    location: string;
}

class ProposalExtended extends Proposal {
    proposalId: number;
    status: ProposalStatus; // also used for new status when updating
    regulations: string;
    comment: string;
}

class ProposalDetailed extends ProposalExtended {
    created_time: Date;
    approved_time: Date;
    voted: string[];
    yes_vote_count: number;
}

class ProposalHistory {
    timestamp: Date;
    authorizer: string;
    authorizerCommonName: string;
    humanAuthorizer: string;
    humanAuthorizerCommonName: string;
    status: ProposalStatus;
    comment: string;
    txId?: string;
}

class MyAccount {
    accountName: string;
    commonName: string;
    privateKey: string;
}

export default class Civic {
    accountability: Accountability;
    account: MyAccount;

    async accountLogin(accountName: string, commonName?: string): Promise<AccountExtended> { };
    async accountGet(accountName: string): Promise<AccountExtended> {
        return await this.accountability.get_account(accountName);
    };

    async proposalCreate(proposal: Proposal): Promise<ProposalDetailed> { }
    async proposalUpdate(proposal: ProposalExtended): Promise<ProposalDetailed> { }
    async proposalVote(proposalId: number, vote: boolean): Promise<ProposalDetailed> { }

    async proposalList(status?: ProposalStatus): Promise<ProposalDetailed[]> { }
    async proposalGet(proposalId: number): Promise<ProposalDetailed> { }
    async proposalHistory(proposalId: number): Promise<ProposalHistory[]> { }
}