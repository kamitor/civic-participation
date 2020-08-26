#include <eosio/eosio.hpp>

using namespace std;
using namespace eosio;

// STILL A DRAFT
// WE WILL IMPLEMENT PAGE BY PAGE, AND THEREFORE VOTING STRUCTURES MAY NOT BE PRESENT TILL THE END

enum ProposalCategory { Green, Kids, Road }
enum ProposalType { Create, Remove, Update }
enum ProposalStatus { Proposed, Reviewing, Approved, Rejected, VotePassed, VoteFailed, Actioned, Closed }

CONTRACT civic : public contract {
  public:
    using contract::contract;

    static constexpr uint32_t vote_period_seconds = 30 * 24 * 60 * 60; // 30 days
    static constexpr uint32_t vote_pass_count = 5; // 5 yes votes

    ACTION proposalcreate(name creator, string title, string description, ProposalCategory category, float budget, ProposalType type, vector<bytes[]> photos, string location);

    ACTION proposalupdate(name updater, uint32_t proposal_id, string title, string description, ProposalCategory category, float budget, ProposalType type, vector<bytes[]> photos, string location, ProposalStatus new_status, string regulations, string comment);

    ACTION proposalvote(name voter, uint32_t proposal_id, bool vote);

    ACTION updatefailedproposals(name authorizer);

  private:
    TABLE proposal {
      uint32_t            proposal_id;
      string              title;
      string              description;
      ProposalCategory    category;
      float               budget;
      ProposalType        type;
      vector<bytes[]>     photos;
      string              location;
      ProposalStatus      status;
      string              regulations;

      uint32_t            created_time;
      uint32_t            approved_time;
      vector<eosio::name> voted;
      uint8_t             yes_vote_count;

      auto primary_key() const { return proposal_id; }
    }
    typedef multi_index<name("proposals"), proposals> proposals_table;

    // TABLE messages {
    //   name    user;
    //   string  text;
    //   auto primary_key() const { return user.value; }
    // };
    // typedef multi_index<name("messages"), messages> messages_table;
};
