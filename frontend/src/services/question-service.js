import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api/questions';

// Create question
const createQuestion = async (formData) => {
    try {
        const response = await axios.post(BASE_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating question:', error);
        throw error;
    }
}

// Update question
const updateQuestion = async (id, formData) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating question:', error);
        throw error;
    }
}

// Delete question
const deleteQuestion = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting question:', error);
        throw error;
    }
}

// Get question by id
const getQuestionById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error getting question by id:', error);
        throw error;
    }
};

// Filter questions by specific category (topic / difficulty)
const filterQuestions = async (category, filter) => {
    try {
        const response = await axios.get(`${BASE_URL}?${category}=${filter}`);
        return response.data;
    } catch (error) {
        console.error('Error filtering questions:', error);
        throw error;
    }
};

// Get all questions
const getAllQuestions = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error getting all questions:', error);
        throw error;
    }
};

export default { createQuestion, updateQuestion, deleteQuestion, getQuestionById, filterQuestions, getAllQuestions };