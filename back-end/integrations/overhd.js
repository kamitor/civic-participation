const axios = require('axios');
// const categoriesParser = require('../types/proposals/categories');
// const typeParser = require('../types/proposals/type');
// const { hashToBase64 } = require('../utils/base64Utils');

async function notifyNewProposal(blockchainRes) {
  if (process.env.REACT_APP_NODE_ENV === 'production') {
    const data = blockchainRes.processed?.action_traces[0]?.act?.data;
    // const photo = await hashToBase64(data.photo);

    const postData = {
      // proposal_id: blockchainRes.processed.id,
      // creator: data.creator,
      // title: data.title,
      // description: data.description,
      // category: await categoriesParser.toLabel(data.category),
      // type: await typeParser.toLabel(data.type),
      // budget: data.budget,
      // location: data.location,
      // status: 'Proposed',
      // photo,
      name: data.title,
      businessTypeName: 'Eerste hulp', // only one type for now
      requestedFunding: Math.floor(+data.budget), // optional, will default to the game cost of the business type
      openVoting: true, // optional, default true
    };

    axios.post('https://kafka-api.odyssy.nl/stake/proposals', postData);
  }
}

module.exports = {
  notifyNewProposal,
};
