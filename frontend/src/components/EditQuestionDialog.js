import * as React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@mui/material';
import questionService from '../services/question-service';
import '../styles/create-question-dialog.css';

const difficulty_lvl = [
  { value: 'Easy', label: 'Easy' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Hard', label: 'Hard' }
];

const EditQuestion = ({ open, handleClose, questionId }) => {
  const [questionData, setQuestionData] = React.useState({
    title: '',
    description: '',
    topic: '',
    difficulty: 'Easy',
    input: '',
    expected_output: '',
    images: '',
    leetcode_link: ''
  });

  React.useEffect(() => {
    if (questionId) {
      const fetchQuestionData = async () => {
        try {
          const response = await questionService.getQuestionById(questionId);
          setQuestionData(response.data);
        } catch (error) {
          console.error('Error fetching question data:', error);
        }
      };
      fetchQuestionData();
    }
  }, [questionId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setQuestionData({ ...questionData, [name]: value });
  };

  const handleDifficultyChange = (event) => {
    setQuestionData({ ...questionData, difficulty: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await questionService.updateQuestion(questionId, questionData); // Assuming updateQuestion handles the API request for updating
      window.location.reload(); // Refresh the page after the update
      handleClose();
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle className="dialog-title">Edit Question</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            multiline
            value={questionData.title}
            onChange={handleInputChange}
            className="text-field"
          />
          <TextField
            margin="dense"
            required
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={questionData.description}
            onChange={handleInputChange}
            className="text-field"
          />
          <TextField
            margin="dense"
            required
            id="topic"
            name="topic"
            label="Topics (comma separated)"
            type="text"
            fullWidth
            multiline
            value={questionData.topic}
            onChange={handleInputChange}
            className="text-field"
          />
          <TextField
            margin="dense"
            fullWidth
            id="difficulty"
            select
            label="Difficulty Level"
            value={questionData.difficulty}
            onChange={handleDifficultyChange}
            helperText="Select the difficulty level"
            className="text-field"
          >
            {difficulty_lvl.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            required
            id="input"
            name="input"
            label="Input"
            type="text"
            fullWidth
            multiline
            value={questionData.input}
            onChange={handleInputChange}
            className="text-field"
          />
          <TextField
            margin="dense"
            required
            id="expected_output"
            name="expected_output"
            label="Expected Output"
            type="text"
            fullWidth
            multiline
            value={questionData.expected_output}
            onChange={handleInputChange}
            className="text-field"
          />
          <TextField
            margin="dense"
            id="images"
            name="images"
            label="Images (URLs)"
            type="text"
            fullWidth
            multiline
            value={questionData.images}
            onChange={handleInputChange}
            className="text-field"
          />
          <TextField
            margin="dense"
            id="leetcode_link"
            name="leetcode_link"
            label="Leetcode Link"
            type="text"
            fullWidth
            multiline
            value={questionData.leetcode_link}
            onChange={handleInputChange}
            className="text-field"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="dialog-actions">Cancel</Button>
          <Button type="submit" className="dialog-actions">Update Question</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditQuestion;
