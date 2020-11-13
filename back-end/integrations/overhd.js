const categoriesParser = require("../types/proposals/categories");
const typeParser = require("../types/proposals/type");
const { hashToBase64 } = require('../utils/base64Utils');

async function notifyNewProposal(blockchainRes) {
  const data = blockchainRes.processed?.action_traces[0]?.act?.data
  const photo = await hashToBase64(data.photo)

  console.log({
    proposal_id: blockchainRes.processed.id,
    creator: data.creator,
    title: data.title,
    description: data.description,
    category: await categoriesParser.toLabel(data.category),
    type: await typeParser.toLabel(data.type),
    budget: data.budget,
    location: data.location,
    status: 'Proposed',
    photo
  });
}

module.exports = {
  notifyNewProposal,
};
