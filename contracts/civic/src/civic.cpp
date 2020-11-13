#include <eosio/system.hpp>
#include <eosio/time.hpp>

#include <civic.hpp>

ACTION civic::propcreate(name creator, string title, string description, uint8_t category, float budget, uint8_t type, string location, eosio::checksum256 photo)
{
    require_auth(creator);
    // Init the _message table
    proposals_table _proposals(get_self(), get_self().value);

    // time point
    time_point now = current_time_point();

    // Create a proposal with proposal id.
    uint64_t proposal_id = _proposals.available_primary_key();
    _proposals.emplace(creator, [&](auto &proposal) {
        proposal.proposal_id = proposal_id;
        proposal.title = title;
        proposal.description = description;
        proposal.category = category;
        proposal.budget = budget;
        proposal.type = type;
        proposal.location = location;
        proposal.status = ProposalStatus::Proposed;
        proposal.creator = creator;
        proposal.created = now;
        proposal.photo = photo;
    });

    proposal_event(proposal_id);
}

ACTION civic::propupdate(name updater, uint64_t proposal_id, string title, string description, uint8_t category,
                         float budget, uint8_t type, string location, uint8_t new_status, string regulations, string comment, eosio::checksum256 photo)
{
    // check(updater == eosio::name("gov"), "Only government can update proposals"); // do not use, otherwise the human account cannot be used
    require_auth(updater);
    require_auth(eosio::name("gov")); // updater must be authorized as a member of gov

    // Check that it is an appropriate status to update to, else throw error
    switch (new_status)
    {
    case ProposalStatus::Reviewing:
    case ProposalStatus::Approved:
    case ProposalStatus::Rejected:
    case ProposalStatus::Actioned:
    case ProposalStatus::Closed:
        break;
    default:
        eosio::check(false, "You cannot update to this proposal status");
    }

    proposals_table _proposals(get_self(), get_self().value);

    time_point now = current_time_point();

    const auto &proposal_itr = _proposals.get(proposal_id); // will throw error if not found

    _proposals.modify(proposal_itr, updater, [&](auto &proposal) {
        proposal.title = title;
        proposal.description = description;
        proposal.category = category;
        proposal.budget = budget;
        proposal.type = type;
        proposal.location = location;
        proposal.status = new_status;
        proposal.regulations = regulations;
        proposal.updated = now;
        proposal.photo = photo;

        if (new_status == ProposalStatus::Approved)
            proposal.approved = now;
    });

    proposal_event(proposal_id);
}

ACTION civic::propupdate2(name updater, uint64_t proposal_id, string title, string description, uint8_t category,
                          float budget, uint8_t type, string location, uint8_t new_status, string regulations, string comment)
{
    // check(updater == eosio::name("gov"), "Only government can update proposals"); // do not use, otherwise the human account cannot be used
    require_auth(updater);
    require_auth(eosio::name("gov")); // updater must be authorized as a member of gov

    // Check that it is an appropriate status to update to, else throw error
    switch (new_status)
    {
    case ProposalStatus::Reviewing:
    case ProposalStatus::Approved:
    case ProposalStatus::Rejected:
    case ProposalStatus::Actioned:
    case ProposalStatus::Closed:
        break;
    default:
        eosio::check(false, "You cannot update to this proposal status");
    }

    proposals_table _proposals(get_self(), get_self().value);

    time_point now = current_time_point();

    const auto &proposal_itr = _proposals.get(proposal_id); // will throw error if not found

    _proposals.modify(proposal_itr, updater, [&](auto &proposal) {
        proposal.title = title;
        proposal.description = description;
        proposal.category = category;
        proposal.budget = budget;
        proposal.type = type;
        proposal.location = location;
        proposal.status = new_status;
        proposal.regulations = regulations;
        proposal.updated = now;

        if (new_status == ProposalStatus::Approved)
            proposal.approved = now;
    });

    proposal_event(proposal_id);
}

void civic::proposal_event(uint64_t proposal_id)
{
    eosio::action(
        std::vector<permission_level>(),
        "dfuseiohooks"_n,
        "event"_n,
        std::make_tuple(
            // Parameter `auth_key`
            std::string(""),
            // Parameter `data`
            std::string("proposal_id=" + std::to_string(proposal_id))))
        .send_context_free();
}

/**
 * Clear method to clear proposals table.
 */
ACTION civic::clear()
{
    require_auth(get_self());

    proposals_table _proposals(get_self(), get_self().value);

    // Delete all records in _proposals table
    auto msg_itr = _proposals.begin();
    while (msg_itr != _proposals.end())
    {
        msg_itr = _proposals.erase(msg_itr);
    }

    votes_table _votes(get_self(), get_self().value);

    // Delete all records in _proposals table
    auto votes_itr = _votes.begin();
    while (votes_itr != _votes.end())
    {
        votes_itr = _votes.erase(votes_itr);
    }
}

ACTION civic::propvote(name voter, vector<uint64_t> proposal_ids)
{
    require_auth(voter);

    // update previous proposal votes incase user has already voted
    votes_table _votes(get_self(), get_self().value);
    const auto votes_itr = _votes.find(voter.value);

    vector<uint64_t> proposals_voted; // Will be initialized to empty vector
    if (votes_itr != _votes.end())
    {
        // user has already voted => Update the proposals
        proposals_voted = votes_itr->proposals;
        _votes.modify(votes_itr, same_payer, [&](auto &vote) {
            vote.proposals = proposal_ids;
        });
    }
    else
    {
        // user has not yet voted => Create a proposal with proposal id.
        _votes.emplace(voter, [&](auto &vote) {
            vote.account_name = voter;
            vote.proposals = proposal_ids;
        });
    }

    proposals_table _proposals(get_self(), get_self().value);

    float accumulated_budget = 0.0f;
    float approved_budget = 200000.0f;

    for (uint64_t proposal_id : proposal_ids)
    {
        const auto proposal_itr = _proposals.find(proposal_id);
        check(proposal_itr != _proposals.end(), "Proposal not found");
        check(proposal_itr->status == ProposalStatus::Approved, "Proposal not approved for voting");
        accumulated_budget += proposal_itr->budget;

        // See if proposal was previously voted on
        // Find is part of algorithms library
        vector<uint64_t>::iterator previous_vote_itr = find(proposals_voted.begin(), proposals_voted.end(), proposal_itr->proposal_id);
        if (previous_vote_itr != proposals_voted.end())
        {
            // User previously voted for this proposal
            // Remove from vector so that it is not decreased later
            proposals_voted.erase(previous_vote_itr);
        }
        else
        {
            // Did not vote for previously
            _proposals.modify(proposal_itr, same_payer, [&](auto &proposal) {
                proposal.yes_vote_count += 1;
            });
        }
        proposal_event(proposal_id);
    }
    check(accumulated_budget <= approved_budget, "Proposals budget exceeded");

    // For any remaining previous proposals (that were not voted on again) decrease vote count
    if (!proposals_voted.empty())
    {
        for (uint64_t proposal_id : proposals_voted)
        {
            const auto proposal_itr = _proposals.find(proposal_id);
            _proposals.modify(proposal_itr, same_payer, [&](auto &proposal) {
                proposal.yes_vote_count -= 1;
            });
        }
    }
}
