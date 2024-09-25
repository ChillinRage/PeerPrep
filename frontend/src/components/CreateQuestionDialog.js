import * as React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@mui/material';
import questionService from '../services/question-service';
import '../styles/create-question-dialog.css';


const difficulty_lvl = [
  { value: 'Easy', label: 'Easy' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Hard', label: 'Hard' }
];

const CreateQuestion = ({ open, handleClose }) => {
    const [difficulty, setDifficulty] = React.useState('Easy'); // Default difficulty

    const handleDifficultyChange = (event) => {
        setDifficulty(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = new FormData(event.currentTarget);
        const question = {
            title: formData.get('title'),
            description: formData.get('description'),
            topic: formData.get('topic').split(',').map(topic => topic.trim()), // Convert to array
            difficulty: difficulty,
            input: formData.get('input'),
            expected_output: formData.get('expected_output'),
            images: formData.get('images'),
            leetcode_link: formData.get('leetcode_link'),
        };

        try {
            await questionService.createQuestion(question); // Call the createQuestion function
            window.location.reload();
            handleClose(); // Close the dialog after submission
        } catch (error) {
            console.error('Error creating question:', error); // Handle the error appropriately
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle className="dialog-title">
              Add New Question
            </DialogTitle>
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
                        className="text-field"
                    />
                    <TextField
                        margin="dense"
                        fullWidth
                        id="difficulty"
                        select
                        label="Difficulty Level"
                        defaultValue="Easy"
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
                        className="text-field"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} className="dialog-actions">Cancel</Button>
                    <Button type="submit" className="dialog-actions">Add Question</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default CreateQuestion;