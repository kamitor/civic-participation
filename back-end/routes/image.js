import base64ToPNG from '../utils/base64ToPng';


const fs = require('fs');
const crypto = require('crypto')

/**
 * Stores the proposal photo with sha256 as key and returns sha256 of the image.
 * 
 * @param {string} base64 string of an image.
 * @return {sha256} - sha256 hash of the image.
 */
module.exports = async function(req, res) {
    const image = req.body.photoString;
    if(!image){
        res.status(400).send('You should send image data to store get sha256 hash');
    }

    try {
        const imageSha256 = crypto.createHash("sha256").update(image).digest("hex");
        base64ToPNG(image, imageSha256).then(response=>{
            // send sha256 of image
            res.send(imageSha256);
        }).catch(error=>{
            throw new Error(error)
        });        
    } catch(e){
        res.status(400).send(`Error creating image from base64 data, ${e}`);
    }
}
