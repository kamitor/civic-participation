const { hashToBase64 } = require('../../utils/base64Utils');

/* GET acounts listing. */
module.exports = async function(req, res) {
    // intercept the blockchain request
    const blockchainRes = req.blockchainRes;
    // check if the table is proposal table
    // based on proposal information, check sha256 hash
    // read the image and convert to base64 based on sha256
    // add the base64 string to blockchain response
    // send it.

    const imageStringPromises = blockchainRes.rows.map(row => hashToBase64(row.json.photo));

    const startFetch = (new Date()).getTime();
    const images = await Promise.all(imageStringPromises);
    const endFetch = (new Date()).getTime();
    const rows = images.map((image, index) => {
        const row = blockchainRes.rows[index];
        if (row.json.photo) {
            return {...row, json: {...row.json, photo: image } };
        }
        return row;
    });
    const blockchainResponseWithPhotoString = {
        ...blockchainRes,
        rows
    };

    const end = (new Date()).getTime();
    blockchainRes.timer.images = endFetch - startFetch;
    blockchainRes.timer.total = end - blockchainRes.timer.start;
    delete blockchainRes.timer.start;
    console.log('Get rows timer', blockchainRes.timer);

    res.send(blockchainResponseWithPhotoString);
};