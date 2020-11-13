const { notifyNewProposal } = require('../../integrations/overhd');

module.exports = async function (req, res) {
  // intercept the blockchain request
  const blockchainRes = req.blockchainRes;

  // fireAndForget to send new proposals data to OverHd
  if (blockchainRes.processed?.action_traces[0]?.act?.name === 'propcreate') {
    notifyNewProposal(blockchainRes.transaction_id);
  }

  res.send(blockchainRes);
};

