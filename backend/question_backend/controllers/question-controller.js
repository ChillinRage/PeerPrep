const mongoose = require('mongoose');
const Question = require('../models/question-model');
const { uploadImage, deleteImage } = require('./question-controller-utils');

async function handleImageUploads(questionId, images) {
    const uploadedImages = [];
    for (const image of images) {
        if (image.startsWith('http')) {
            uploadedImages.push(image);
        } else {
            const imageUrl = await uploadImage(questionId, image);
            uploadedImages.push(imageUrl);
        }
    }
    return uploadedImages;
}

// Create a new question
module.exports.createQuestion = async (req, res) => {
    let { title, description, topic, difficulty, input, expected_output, images, leetcode_link } = req.body;
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
    const uploadedImages = (images && images.length > 0) ? await handleImageUploads(questionId, images) : [];
    
    const newQuestion = new Question({
        _id: questionId,
        title,
        description,
        topic,
        difficulty,
        input,
        expected_output,
        images: uploadedImages,
        leetcode_link: leetcode_link || ""
    });

    try {
        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Delete a question
module.exports.deleteQuestion = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedQuestion = await Question.findByIdAndDelete(id);
        if (!deletedQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }

        // Delete images from Google Cloud Storage
        for (const imageUrl of deletedQuestion.images) {
            if (imageUrl.includes('storage.googleapis.com')) {
                await deleteImage(id, imageUrl);
            }
        }

        res.status(200).json(deletedQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Update a question
module.exports.updateQuestion = async (req, res) => {
    const { id } = req.params;
    const { images } = req.body;

    try {
        const question = await Question.findById(id);
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        // Handle image uploads
        const uploadedImages = (images && images.length > 0) ? await handleImageUploads(id, images) : [];

        // Delete old images that are no longer needed from Google Cloud Storage
        const oldImages = question.images.filter(image => !uploadedImages.includes(image));
        for (const imageUrl of oldImages) {
            if (imageUrl.includes('storage.googleapis.com')) {
                await deleteImage(id, imageUrl);
            }
        }

        // Update the question
        const updatedQuestion = await Question.findByIdAndUpdate(id, { $set: { ...req.body, images: uploadedImages } }, { new: true });
        if (!updatedQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }

        res.status(200).json(updatedQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get all questions (with filters)
module.exports.getAllQuestions = async (req, res) => {
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
module.exports.getQuestionById = async (req, res) => {
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