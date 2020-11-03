const { hashToBase64 } = require('../../utils/base64Utils');

/* GET acounts listing. */
module.exports = async function (req, res) {
    // intercept the blockchain request
    const blockchainRes = req.blockchainRes;
    const image = await hashToBase64(blockchainRes.row.json.photo); 
    const row = { ...blockchainRes.row, json: { ...blockchainRes.row.json, photo: image } };
    const blockchainResponseWithPhotoString = {
        ...blockchainRes, row
    };
    res.send(blockchainResponseWithPhotoString);
};