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
        throw _reformatAndLogError('Error creating question:', error);
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
        throw _reformatAndLogError('Error updating question:', error);
    }
}

// Delete question
const deleteQuestion = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw _reformatAndLogError('Error deleting question:', error);
    }
}

// Get question by id
const getQuestionById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw _reformatAndLogError('Error getting question by id:', error);
    }
};

// Filter questions by specific category (topic / difficulty)
const filterQuestions = async (category, filter) => {
    try {
        const response = await axios.get(`${BASE_URL}?${category}=${filter}`);
        return response.data;
    } catch (error) {
        throw _reformatAndLogError('Error filtering questions:', error);
    }
};

// Get all questions
const getAllQuestions = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        throw _reformatAndLogError('Error getting all questions:', error);
    }
};

const _reformatAndLogError = (action, error) => {
    // reformat error message to be user friendly
    error.message = error.response
        ? error.response.data.message
        : error.request
        ? "Unable to connect to the network"
        : `AxiosError (${error.message})`;
    console.error(action, error);
    return error;
}

export default { createQuestion, updateQuestion, deleteQuestion, getQuestionById, filterQuestions, getAllQuestions };