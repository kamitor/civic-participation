#include <eosio/eosio.hpp>
#include <algorithm>

using namespace std;
using namespace eosio;

CONTRACT civic : public contract
{
public:
  using contract::contract;

  ACTION propcreate(name creator, string title, string description, uint8_t category, float budget, uint8_t type, string location, eosio::checksum256 photo);

  ACTION propupdate(name updater, uint64_t proposal_id, string title, string description, uint8_t category, float budget,
                    uint8_t type, string location, uint8_t new_status, string regulations, string comment, eosio::checksum256 photo);

  ACTION propupdate2(name updater, uint64_t proposal_id, string title, string description, uint8_t category, float budget,
                     uint8_t type, string location, uint8_t new_status, string regulations, string comment);

  ACTION propvote(name voter, vector<uint64_t> proposal_ids);

  ACTION clear();

private:
  enum ProposalCategory
  {
    Green,
    Kids,
    Road,
    Accessibility,
    Art,
    Safety,
    Health,
    Residential
  };

  enum ProposalType
  {
    Create,
    Remove,
    Update
  };

  enum ProposalStatus
  {
    Proposed,
    Reviewing,
    Approved,
    Rejected,
    VotePassed,
    VoteFailed,
    Actioned,
    Closed
  };

  TABLE proposal
  {
    // primary key automatically added by EOSIO method
    uint64_t proposal_id;
    string title;
    string description;
    uint8_t category;
    float budget;
    // Since the enums are not accepted in eosio we are using uint8_t
    uint8_t type;
    // Since the enums are not accepted in eosio we are using uint8_t
    uint8_t status;
    string regulations;
    string location;

    // Instead of storing image directly on blockchain
    // 1. we convert image to base64 and store it in middleware (NodeJS), calculate sha256 hash of image send that to blockchain
    // 2. we store sha256 hash of the image in blockchain.
    // 3. while retreving also we use sha256 hash as a key and retrive image based on sha256 hash from middelware
    eosio::checksum256 photo;

    // automatically added
    name creator;
    time_point created;
    time_point approved;
    time_point updated;
    uint32_t yes_vote_count;

    auto primary_key() const
    {
      return proposal_id;
    }
  };

  typedef multi_index<name("proposals"), proposal> proposals_table;

  TABLE votes
  {
    name account_name;
    vector<uint64_t> proposals;

    auto primary_key() const
    {
      return account_name.value;
    }
  };

  typedef multi_index<name("votes"), votes> votes_table;

  void proposal_event(uint64_t proposal_id);
};