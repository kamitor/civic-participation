
// STILL A DRAFT
// WE WILL IMPLEMENT PAGE BY PAGE, AND THEREFORE VOTING STRUCTURES MAY NOT BE PRESENT TILL THE END

class Account {
    accountName: string;
    commonName: string;
    type: AccountType;
    privateKey: string; // ??
}

enum AccountType { Human, Org }

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

class Civic {
    accountability: Accountability;
    account: Account;

    accountLogin(accountName: string): void {};

    proposalCreate(proposal: Proposal): ProposalDetailed {}
    proposalUpdate(proposal: ProposalExtended): ProposalDetailed {}
    proposalVote(proposalId: number, vote: boolean): ProposalDetailed {}
    proposalList(status?: ProposalStatus): ProposalDetailed[] {}
    proposalHistory(proposalId: number): ProposalHistory[] {}
}

class Accountability {
    dfuseClient: DfuseClient;

    push_transaction(... args) {}

    get_table_rows(... args) {}

    get_actions(... args) {} // extended dfuse response with authorized (human) accountName for each tx

    get_account(... args) {} // extended dfuse response with commonName
}