const settings = require('../settings');
const fs = require('fs');
const path = require('path');
const base64Img = require('base64-img');
const localPath = settings.imageUploadDirectory;

/**
 * Takes base64 string of image, filename and store in '../uploads' directory
 * @param {*} baseImage - base64 string of image
 * @param {*} fileName - filename of the image
 */
async function base64ToImage(base64String, fileName) {
    return new Promise((resolve, reject) => {
        //Check that if directory is present or not.
        if (!fs.existsSync(localPath)) {
            fs.mkdirSync(localPath);
        }
        // eslint-disable-next-line no-undef
        base64Img.img(base64String, path.resolve(__dirname, localPath), fileName, function (err, filepath) {
            if (err) {
                reject(err);
            }
            resolve(filepath);
        });
    });
}

/**
 * This function takes SHA256 hash as a key and parses the file with the name and
 * returns base64 string of the parsed image.
 * 
 * @param {string} imageSha256 - SHA256 hash of the image.
 * @returns {string} - Base64 string data of image.
 */
async function hashToBase64(imageSha256) {
    return new Promise((resolve, reject) => {
        if (!imageSha256) {
            resolve('');
        }
        // eslint-disable-next-line no-undef
        fs.readdir(path.resolve(__dirname, localPath), (err, files) => {
            const fileIndex = files.findIndex(file => file.includes(imageSha256));
            if (fileIndex > -1) {
                const fileName = files[fileIndex];
                // eslint-disable-next-line no-undef
                const fileLocation = path.resolve(__dirname, `${localPath}${fileName}`);
                base64Img.base64(fileLocation, function (err, data) {
                    if (err) {
                        console.log(`not able to read file ${fileLocation}, ${err}`);
                        resolve('');
                    }
                    resolve(data);
                });
            } else {
                reject('file not found', imageSha256);
            }

        })
    });
}

module.exports = {
    base64ToImage,
    hashToBase64
}