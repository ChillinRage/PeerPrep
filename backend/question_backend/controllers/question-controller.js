const mongoose = require('mongoose');
const Question = require('../models/question-model');

// Create a new question
module.exports.createQuestion = async (req, res) => {
    let { title, description, topic, difficulty } = req.body;
    title = title.trim();
    description = description.trim();
    difficulty = difficulty.trim();
    
    // Check if topic is an array and trim each element
    if (Array.isArray(topic)) {
        topic = topic.map(t => t.trim());
    } else if (typeof topic === 'string') {
        topic = [topic.trim()];
    } else {
        return res.status(400).json({ message: "Topic must be an array of strings or a single string" });
    }

    // Check if all required fields are provided
    if (!title || !description || !topic.length || !difficulty) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the question already exists
    const existingQuestion = await Question.findOne({ title });
    if (existingQuestion) {
        return res.status(400).json({ message: "A question with this title already exists" });
    }
    
    const newQuestion = new Question({
        _id: new mongoose.Types.ObjectId(),
        title,
        description,
        topic,
        difficulty
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

        res.status(200).json(deletedQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Update a question
module.exports.updateQuestion = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedQuestion = await Question.findByIdAndUpdate(id, { $set: req.body }, { new: true });
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