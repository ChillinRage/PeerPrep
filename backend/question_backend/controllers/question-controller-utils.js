import { Storage } from '@google-cloud/storage';
import dotenv from 'dotenv';

dotenv.config();

const { IMAGE_BUCKET } = process.env;
const storage = new Storage();
const bucket = storage.bucket(IMAGE_BUCKET);

export const uploadImage = async (questionId, image) => {
    try {
        const imageFileName = `${questionId}-${Date.now()}.${image.originalname.split('.').pop()}`;
        const file = bucket.file(imageFileName);
        const stream = file.createWriteStream({
            metadata: {
                contentType: image.mimetype,
            },
        });

        stream.on('error', (error) => {
            console.error('Error uploading image: ', error);
            throw error;
        });

        stream.on('finish', async () => {
            await file.makePublic();
            const publicUrl = `https://storage.googleapis.com/${IMAGE_BUCKET}/${imageFileName}`;
            console.log('Image uploaded successfully: ', publicUrl);
            return publicUrl;
        });

        stream.end(image.buffer);
    } catch (error) {
        console.error('Error: ', error);
        throw error;
    }
};

export const deleteImage = async (questionId, imageUrl) => {
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
            // Add renaming logic here if needed
        }
    } catch (error) {
        console.error('Error deleting image: ', error);
        throw error;
    }
};