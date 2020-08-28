import { Accountability } from './Accountability'

enum ProposalCategory { Green, Kids, Road }
enum ProposalType { Create, Remove, Update }
enum ProposalStatus { Proposed, Reviewing, Approved, Rejected, VotePassed, VoteFailed, Actioned, Closed }

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
    regulations: string
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
}

export class Civic {
    accountability: Accountability;
    account: Account;

    accountLogin(accountName: string): void {};

    proposalCreate(proposal: Proposal): ProposalDetailed {}
    proposalUpdate(proposal: ProposalExtended): ProposalDetailed {}
    proposalVote(proposalId: number, vote: boolean): ProposalDetailed {}
    proposalList(status ? : ProposalStatus): ProposalDetailed[] {}
    proposalHistory(proposalId: number): ProposalHistory[] {}
}