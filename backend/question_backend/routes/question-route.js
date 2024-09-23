const { createQuestion, deleteQuestion, updateQuestion, getAllQuestions, getQuestionById } = require('../controllers/question-controller');
const router = require('express').Router();

// Create a question
router.post('/', createQuestion);

// Delete a question
router.delete('/:id', deleteQuestion);

// Update a question
router.put('/:id', updateQuestion);

// Get all questions (with filters)
router.get('/', getAllQuestions);

// Get a question by ID
router.get('/:id', getQuestionById);

module.exports = router;