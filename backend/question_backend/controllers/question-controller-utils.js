import { Storage } from "@google-cloud/storage";
require("dotenv").config();
const { IMAGE_PROJECT_ID, IMAGE_BUCKET } = process.env;

const storage = new Storage({projectId: IMAGE_PROJECT_ID});
const bucket = storage.bucket(IMAGE_BUCKET);

module.exports.uploadImage = async (questionId, image) => {
    try {
        const imageExtension = image.split('.').pop();
        const [files] = await bucket.getFiles({ prefix: questionId });
        const existingImagesCount = files.length;
        const imageFileName = `${questionId}-${existingImagesCount + 1}.${imageExtension}`;

        // Upload image to Google Cloud Storage
        const file = bucket.file(imageFileName);
        await file.save(image, { contentType: `image/${imageExtension}` });

        // Make image public
        await file.makePublic();
        const publicUrl = `https://storage.googleapis.com/${IMAGE_BUCKET}/${imageFileName}`;

        console.log('Image uploaded successfully: ', publicUrl);
        return publicUrl;
    } catch (error) {
        console.error('Error: ', error);
        throw error;
    }
}

module.exports.deleteImage = async (questionId, imageUrl) => {
    try {
        // Extract image name from URL
        const imageFileName = imageUrl.split('/').pop();

        // Delete image from Google Cloud Storage
        const fileToDelete = bucket.file(imageFileName);
        await fileToDelete.delete();
        console.log('Image deleted successfully: ', imageUrl);

        // Get all images of the question
        const [files] = await bucket.getFiles({ prefix: questionId });

        // Rename the remaining images
        for (let i = 0; i < files.length; i++) {
            const oldFileName = files[i].name;
            const newFileName = `${questionId}-${i + 1}.${oldFileName.split('.').pop()}`;

            if (oldFileName !== newFileName) {
                const oldFile = bucket.file(oldFileName);
                await oldFile.move(newFileName);
                console.log('Image renamed successfully: ', oldFileName, '->', newFileName);
            }
        }

        console.log('All images renamed successfully');
    } catch (error) {
        console.error('Error: ', error);
        throw error;
    }
}