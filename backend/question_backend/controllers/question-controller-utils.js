import { Storage } from "@google-cloud/storage";
require("dotenv").config();
const { IMAGE_PROJECT_ID, IMAGE_BUCKET } = process.env;

const storage = new Storage({projectId: IMAGE_PROJECT_ID});
const bucket = storage.bucket(IMAGE_BUCKET);

module.exports.uploadImage = async (question, image) => {
    try {
        const imageExtension = image.split('.').pop();
        const [files] = await bucket.getFiles({ prefix: question._id });
        const existingImagesCount = files.length;
        const destinationPath = `${question._id}-${existingImagesCount + 1}.${imageExtension}`;

        
    } catch (error) {
        console.error('Error: ', error);
    }
}

module.exports.deleteImage = async (req, res) => {
    try {

    } catch (error) {
        console.error('Error: ', error);
    }
}