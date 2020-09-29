#include <eosio/system.hpp>
#include <eosio/time.hpp>

#include <civic.hpp>

ACTION civic::propcreate(name creator, string title, string description, uint8_t category, float budget, uint8_t type, string location)
{
    require_auth(creator);
    // Init the _message table
    proposals_table _proposals(get_self(), get_self().value);

    // time point
    time_point now = current_time_point();

    // Create a proposal with proposal id.
    _proposals.emplace(creator, [&](auto &proposal) {
        proposal.proposal_id = _proposals.available_primary_key();
        proposal.title = title;
        proposal.description = description;
        proposal.category = category;
        proposal.budget = budget;
        proposal.type = type;
        proposal.location = location;
        proposal.created = now;
    });
}

ACTION civic::propupdate(name updater, uint64_t proposal_id, string title, string description, uint8_t category,
                         float budget, uint8_t type, string location, uint8_t new_status, string regulations, string comment)
{
    require_auth(updater);

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

    auto msg_itr = _proposals.get(proposal_id); // will throw error if not found

    _proposals.modify(msg_itr, updater, [&](auto &proposal) {
        proposal.title = title;
        proposal.description = description;
        proposal.category = category;
        proposal.budget = budget;
        proposal.type = type;
        proposal.location = location;
        proposal.status = new_status;
        proposal.regulations = regulations;
        proposal.updated = now;

        // if (new_status == civic::ProposalStatus.Approved)
        //     proposal.approved = now;
    });
}
// Default Action hi
// ACTION civic::hi(name from, string message)
// {
//     require_auth(from);

//     // Init the _message table
//     messages_table _messages(get_self(), get_self().value);

//     // Find the record from _messages table
//     auto msg_itr = _messages.find(from.value);
//     if (msg_itr == _messages.end())
//     {
//         // Create a message record if it does not exist
//         _messages.emplace(from, [&](auto &msg) {
//             msg.user = from;
//             msg.text = message;
//         });
//     }
//     else
//     {
//         // Modify a message record if it exists
//         _messages.modify(msg_itr, from, [&](auto &msg) {
//             msg.text = message;
//         });
//     }
// }

// Default Action clear
// ACTION civic::clear()
// {
//     require_auth(get_self());

//     messages_table _messages(get_self(), get_self().value);

//     // Delete all records in _messages table
//     auto msg_itr = _messages.begin();
//     while (msg_itr != _messages.end())
//     {
//         msg_itr = _messages.erase(msg_itr);
//     }
// }

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
}