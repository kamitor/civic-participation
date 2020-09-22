import React, { useEffect } from 'react';
import Civic from '../services/Civic';
import { ProposalCategory, ProposalType, ProposalStatus } from '../types/civic';

function Home() {

    useEffect(() => {
        async function main() {
            let civic = new Civic(); // put this in context API, or use singleton

            try {
                const accountLoginRes = await civic.accountLogin('jack', 'Password1234!');
                console.log('accountLogin() - jack', accountLoginRes);
            } catch (e) {
                const accountCreateRes = await civic.accountCreate('jack', 'Password1234!', 'Jack Tanner');
                console.log('accountCreate()', accountCreateRes);
            }
            let accountLoginRes = await civic.accountLogin('jack', 'Password1234!');
            console.log('accountLogin() - jack 2', accountLoginRes);

            const proposal = {
                title: 'Build a flowerbed next to John\'s tacos',
                description: 'A BIG DESCRIPTION',
                category: ProposalCategory.Green,
                budget: 0,
                type: ProposalType.Create,
                photos: [],
                location: '52.1135031,4.2829047'
            }
            const proposalData = await civic.proposalCreate(proposal);
            console.log('proposalCreate()', proposalData)
            const proposalId = proposalData.proposalId;

            accountLoginRes = await civic.accountLogin('yvo', 'Password2345!');
            console.log('accountLogin() - yvo', accountLoginRes);
            proposal.proposalId = proposalId;
            proposal.staus = ProposalStatus.Reviewing;
            let proposalUpdateRes = await civic.proposalUpdate(proposal);
            console.log('proposalUpdate()', proposalUpdateRes);

            proposal.regulation = 'RM 3212';
            proposal.budget = 2300.00;
            proposal.comment = 'Regulations checked and budget added'
            proposal.staus = ProposalStatus.Approved;
            proposalUpdateRes = await civic.proposalUpdate(proposal);
            console.log('proposalUpdate()', proposalUpdateRes);

            accountLoginRes = await civic.accountLogin('jack', 'Password1234!');
            console.log('accountLogin() - jack 3', accountLoginRes);
            const proposalVoteRes = await civic.proposalVote(proposalId, true);
            console.log('proposalVote', proposalVoteRes);

            let proposals = await civic.proposalList();
            console.log('proposalList() - 1', proposals);
            proposals = await civic.proposalList(ProposalStatus.Approved);
            console.log('proposalList() - 2', proposals);

            const proposalDetails = await civic.proposalGet(proposalId);
            console.log('proposalGet()', proposalDetails);
            const proposalHistory = await civic.proposalHistory(proposalId);
            console.log('proposalHistory()', proposalHistory);
        }

        main();
    })
    return (
        <div>
            Here is the app!
        </div>
    )
}

export default Home;