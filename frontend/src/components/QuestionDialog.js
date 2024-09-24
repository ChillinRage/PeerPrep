import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

const QuestionDialog = ({ open, question, onClose }) => {
    if (!question) return null;  // If no problem is selected, return null

    return (
        <Dialog open={open} onClose={onClose} scroll="paper" maxWidth="sm" fullWidth>
            <DialogTitle>{question.title}</DialogTitle>
            <DialogContent dividers>
                <p><strong>Topic(s):</strong> {question.topic.join(', ')}</p>
                <p><strong>Difficulty:</strong> {question.difficulty}</p>
                <p>{question.description}</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default QuestionDialog;