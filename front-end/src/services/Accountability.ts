import { DfuseClient, createDfuseClient } from '@dfuse/client';
import { SearchSortType } from '@dfuse/client/dist/types/types/search';
import { Api, JsonRpc } from ' eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import ecc from 'eosjs-ecc';
import { SearchTransactionsResponseExtended, AccountExtended } from '../types/accounts';

// STILL A DRAFT
// WE WILL IMPLEMENT PAGE BY PAGE, AND THEREFORE VOTING STRUCTURES MAY NOT BE PRESENT TILL THE END

export class Accountability {
    dfuseClient: DfuseClient;
    api: Api;
    rpc: JsonRpc;

    constructor(privateKeys: string[]) { }

    // Sends a transaction
    // use api.transact

    // Returns data from the current blockchain state
    // use dfuseClient.stateTable

    // Searches the transaction history
    // Extended response type also includes the human account name and common name
    // that signed the tx
    async searchTransactions(q: string, options?: {
        startBlock?: number;
        sort?: SearchSortType;
        blockCount?: number;
        limit?: number;
        cursor?: string;
        withReversible?: boolean;
    }): Promise<SearchTransactionsResponseExtended> {
        return await this.dfuseClient.searchTransactions(q, options);
    }

    // Get's information about an account, with extended response type with common name
    async get_account(accountName: string): Promise<AccountExtended> {
        return await this.rpc.get_account(accountName);
    }
}