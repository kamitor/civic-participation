#include <eosio/eosio.hpp>

using namespace std;
using namespace eosio;

// STILL A DRAFT
// WE WILL IMPLEMENT PAGE BY PAGE, AND THEREFORE VOTING STRUCTURES MAY NOT BE PRESENT TILL THE END

enum ProposalCategory { Green, Kids, Road };
enum ProposalType { Create, Remove, Update };
enum ProposalStatus { Proposed, Reviewing, Approved, Rejected, VotePassed, VoteFailed, Actioned, Closed };

CONTRACT civic : public contract {
  public:
    using contract::contract;

    microseconds vote_period = eosio::days(30);
    static constexpr uint32_t vote_yes_pass_count = 5; // 5 yes votes

    ACTION propcreate(name creator, string title, string description, ProposalCategory category, float budget, ProposalType type, vector<string[]> photos, string location);

    ACTION propupdate(name updater, uint32_t proposal_id, string title, string description, ProposalCategory category, float budget, ProposalType type, vector<string[]> photos, string location, ProposalStatus new_status, string regulations, string comment);

    ACTION propvote(name voter, uint32_t proposal_id, bool vote);

    // Updates votes passed the voting period that have not passed to status = Rejected
    ACTION propupdfailed(name authorizer);

  private:
    TABLE proposal {
      uint32_t                         proposal_id;
      string                             title;
      string                             description;
      ProposalCategory          category;
      float                               budget;
      ProposalType                 type;
      vector<string[]>             photos;
      string                              location;
      ProposalStatus                status;
      string                              regulations;

      time_point                    created;
      time_point                    approved;
      time_point                    last_updated;
      vector<eosio::name>   voted;
      uint8_t                           yes_vote_count;

      auto primary_key() const { return proposal_id; }
    };
    typedef multi_index<name("proposals"), proposal> proposals_table;

    // TABLE messages {
    //   name    user;
    //   string  text;
    //   auto primary_key() const { return user.value; }
    // };
    // typedef multi_index<name("messages"), messages> messages_table;
};