import mongoose from "mongoose";
import Question from "../models/question-model.js";
import { uploadImage, deleteImage } from "./question-controller-utils.js";
import multer from 'multer';

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

async function handleImageUploads(questionId, imageFiles) {
    const uploadedImages = [];
    // Handle image files
    for (const file of imageFiles) {
        const publicUrl = await uploadImage(questionId, file);
        uploadedImages.push(publicUrl);
    }

    return uploadedImages;
}

// Create a new question
export const createQuestion = [
    upload.array('imageFiles'), // Middleware to handle file uploads
    async (req, res) => {
        let { title, description, topic, difficulty, input, expected_output, images, leetcode_link } = req.body;
        const imageFiles = req.files;

        // Ensure images is an array
        images = images ? (Array.isArray(images) ? images : [images]) : [];

        title = title.trim();
        description = description.trim();
        difficulty = difficulty.trim();
        leetcode_link = leetcode_link ? leetcode_link.trim() : "";
        
        // Check if topic is an array and trim each element
        if (Array.isArray(topic)) {
            topic = topic.map(t => t.trim());
        } else if (typeof topic === 'string') {
            topic = [topic.trim()];
        } else {
            return res.status(400).json({ message: "Topic must be an array of strings or a single string" });
        }

        // Check if all required fields are provided
        if (!title || !description || !topic.length || !difficulty || !input || !expected_output) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the question already exists
        const existingQuestion = await Question.findOne({ title });
        if (existingQuestion) {
            return res.status(400).json({ message: "A question with this title already exists" });
        }

        // Handle image uploads
        const questionId = new mongoose.Types.ObjectId();
        let allImages = [];
        
        if (!imageFiles || imageFiles.length === 0) {
            // If don't have image files, just use image urls
            if (images.length > 0) {
                allImages.push(...images);
            }
        } else {
            // If don't have image urls, just use image files
            if (images.length === 0) {
                const uploadedImages = await handleImageUploads(questionId, imageFiles);
                allImages.push(...uploadedImages);
            } else {
                // If have both image files and image urls, use both
                const uploadedImages = await handleImageUploads(questionId, imageFiles);
                allImages.push(...images, ...uploadedImages);
            }
        }

        allImages = allImages.filter(image => image.trim() !== '');

        const newQuestion = new Question({
            _id: questionId,
            title,
            description,
            topic,
            difficulty,
            input,
            expected_output,
            images: allImages,
            leetcode_link: leetcode_link || ""
        });

        try {
            await newQuestion.save();
            res.status(201).json(newQuestion);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
];

// Delete a question
export const deleteQuestion = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedQuestion = await Question.findByIdAndDelete(id);
        if (!deletedQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }

        // Delete images from Google Cloud Storage
        for (const imageUrl of deletedQuestion.images) {
            if (imageUrl.includes('storage.googleapis.com')) {
                await deleteImage(imageUrl);
            }
        }

        res.status(200).json(deletedQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Update a question
export const updateQuestion = [
    upload.array('imageFiles'), // Middleware to handle file uploads
    async (req, res) => {
        const { id } = req.params;
        let { images } = req.body; // Change const to let
        const imageFiles = req.files;

        try {
            const question = await Question.findById(id);
            if (!question) {
                return res.status(404).json({ message: "Question not found" });
            }

            // Ensure images is an array
            images = images ? (Array.isArray(images) ? images : [images]) : [];

            // Handle image uploads
            let allImages = [];

            if (!imageFiles || imageFiles.length === 0) {
                // If don't have image files, just use image urls
                if (images.length > 0) {
                    allImages.push(...images);
                }
            } else {
                // If don't have image urls, just use image files
                if (images.length === 0) {
                    const uploadedImages = await handleImageUploads(id, imageFiles);
                    allImages.push(...uploadedImages);
                } else {
                    // If have both image files and image urls, use both
                    const uploadedImages = await handleImageUploads(id, imageFiles);
                    allImages.push(...images, ...uploadedImages);
                }
            }

            allImages = allImages.filter(image => image.trim() !== '');

            // Delete old images that are no longer needed from Google Cloud Storage
            const oldImages = question.images.filter(image => !allImages.includes(image));
            for (const imageUrl of oldImages) {
                if (imageUrl.includes('storage.googleapis.com')) {
                    await deleteImage(imageUrl);
                }
            }

            // Update the question
            const updatedQuestion = await Question.findByIdAndUpdate(id, { $set: { ...req.body, images: allImages } }, { new: true });
            if (!updatedQuestion) {
                return res.status(404).json({ message: "Question not found" });
            }

            res.status(200).json(updatedQuestion);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
];

// Get all questions (with filters)
export const getAllQuestions = async (req, res) => {
    try {
        const { topic, difficulty } = req.query;
        const filter = {};

        if (topic) {
            filter.topic = { $in: Array.isArray(topic) ? topic : [topic] };
        }

        if (difficulty) {
            filter.difficulty = difficulty;
        }

        const questions = await Question.find(filter);
        res.status(200).json(questions);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get a question by ID
export const getQuestionById = async (req, res) => {
    const questionId = req.params.id;

    try {
        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        res.status(200).json(question);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}