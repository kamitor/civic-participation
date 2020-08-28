import { DfuseClient, createDfuseClient } from '@dfuse/client';
import { SearchTransactionsResponse, SearchTransactionRow, SearchSortType } from '@dfuse/client/dist/types/types/search';
import { StateKeyType, StateResponse } from '@dfuse/client/dist/types/types/state';
import { TransactionLifecycle } from '@dfuse/client/dist/types/types/transaction';
import { Api, JsonRpc } from' eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import ecc from 'eosjs-ecc';

// STILL A DRAFT
// WE WILL IMPLEMENT PAGE BY PAGE, AND THEREFORE VOTING STRUCTURES MAY NOT BE PRESENT TILL THE END

interface SearchTransactionsResponseExtended extends SearchTransactionsResponse {
    transactions? :SearchTransactionRowExtended[];
}

interface SearchTransactionRowExtended extends SearchTransactionRow {
    lifecycle: TransactionLifecycleExtended;
}

interface TransactionLifecycleExtended extends TransactionLifecycle {
    account_authorizers?: string[]
}

interface AccountExtended {
    accountName: string;
    commonName: string;
    type: AccountType;
    permissions: any;
}

class Account {
    accountName: string;
    commonName: string;
    type: AccountType;
    privateKey: string; // ??
}

enum AccountType { Human, Org }


export class Accountability {
    dfuseClient: DfuseClient;
    api: Api;
    rpc: JsonRpc;

    constructor(privateKeys: string[]) {}
    // use api.transact
    // transact();

    // use dfuseClient.stateTable
    // stateTable();

    async searchTransactions(q: string, options?: {
        startBlock?: number;
        sort?: SearchSortType;
        blockCount?: number;
        limit?: number;
        cursor?: string;
        withReversible?: boolean;
    }): Promise<SearchTransactionsResponseExtended> {}

    async get_account(accountName: string): Promise<AccountExtended> {
        return await this.rpc.get_account(accountName);
    }
}