import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api/questions';

// Create question
const createQuestion = async (question) => {
    const response = await axios.post(BASE_URL, question);
    return response.data;
}

// Update question
const updateQuestion = async (id, question) => {
    const response = await axios.put(`${BASE_URL}/${id}`, question);
    return response.data;
}

// Delete question
const deleteQuestion = async (id) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
}

// Get question by id
const getQuestionById = async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
};

// Filter questions by specific category (topic / difficulty)
const filterQuestions = async (category, filter) => {
    const response = await axios.get(`${BASE_URL}?${category}=${filter}`);
    return response.data;
};

// Get all questions
const getAllQuestions = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
};

export default { createQuestion, updateQuestion, deleteQuestion, getQuestionById, filterQuestions, getAllQuestions };