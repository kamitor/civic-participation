import React, { useEffect } from 'react';
import Civic, { ProposalCategory, ProposalType, ProposalStatus } from '../services/Civic';

function Home() {

    useEffect(() => {
        async function main() {
            let civic = new Civic(); // put this in context API, or use singleton

            try {
                await civic.accountLogin('jack', 'Password1234!');
            } catch (e) {
                // account did not exis, so ask for common name and send back so it is created
                await civic.accountLogin('jack', 'Password1234!', 'Jack Tanner');
            }

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
            const proposalId = proposalData.proposalId;

            await civic.accountLogin('yvo', 'Password2345!');
            proposal.proposalId = proposalId;
            proposal.staus = ProposalStatus.Reviewing;
            await civic.proposalUpdate(proposal);

            proposal.regulation = 'RM 3212';
            proposal.budget = 2300.00;
            proposal.comment = 'Regulations checked and budget added'
            proposal.staus = ProposalStatus.Approved;
            await civic.proposalUpdate(proposal);

            await civic.accountLogin('jack', 'Password1234!');
            await civic.proposalVote(proposalId, true);

            let proposals = await civic.proposalList();
            proposals = await civic.proposalList(ProposalStatus.Approved);
            await civic.proposalVote(proposalId, true);

            const proposalDetails = await civic.proposalGet(proposalId);
            const proposalHistory = await civic.proposalHistory(proposalId);
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