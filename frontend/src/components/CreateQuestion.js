import * as React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@mui/material';
import '../styles/CreateQuestion.css'; // Ensure this CSS file is imported

const difficulty_lvl = [
  {
    value: 'Easy',
    label: 'Easy',
  },
  {
    value: 'Medium',
    label: 'Medium',
  },
  {
    value: 'Hard',
    label: 'Hard',
  }
];


const CreateQuestion = ({ open, handleClose }) => {
    const [difficulty, setDifficulty] = React.useState('Easy'); // Default difficulty

    const handleDifficultyChange = (level) => {
        setDifficulty(level);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        handleClose(); // Close the dialog after submission
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle className="dialog-title">
              Add New Question
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent className="dialog-content">
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
                        id="topics"
                        name="topics"
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
                        id="expectedOutput"
                        name="expectedOutput"
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