const settings = require('../settings');
const fs = require('fs');
const path = require('path');

/**
 * Takes base64 string of image, filename and store in '../uploads' directory
 * @param {*} baseImage - base64 string of image
 * @param {*} fileName - filename of the image
 */
module.exports = async function base64ToPNG(base64String, fileName) {
    return new Promise((resolve, reject) => {
        //path of folder where you want to save the image.
        const localPath = settings.imageUploadDirectory;
        //Check that if directory is present or not.
        if (!fs.existsSync(localPath)) {
            fs.mkdirSync(localPath);
        }

        const ext = base64String.substring(base64String.indexOf("/") + 1, base64String.indexOf(";base64"));
        
        const data = base64String.replace(/^data:image\/png;base64,/, '');

        fs.writeFile(path.resolve(__dirname, `${localPath}${fileName}.${ext}`), data, 'base64', function (err) {
            if (err) {
                reject(err);
            };
            resolve('success');
        });
    });
}
