import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const QuestionDialog = ({ open, question, onClose }) => {
    if (!question) return null;  // If no problem is selected, return null

    return (
        <Dialog open={open} onClose={onClose} scroll="paper" maxWidth="sm" fullWidth>
            <DialogTitle style={{color: 'black', fontSize: 36, fontFamily: 'Poppins', fontWeight: '800', wordWrap: 'break-word'}}>
                {question.title}
                <IconButton aria-label="close" onClick={onClose} style={{position: 'absolute', right: 8, top: 8}}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Typography variant="body1" sx={{ marginBottom: 2, fontWeight: 'bold', fontFamily: 'Poppins' }}>
                    <strong>Topic (s):</strong> {question.topic.join(', ')} &nbsp;&nbsp;&nbsp;
                    <strong>Difficulty:</strong> {question.difficulty}
                </Typography>
                <p>{question.description}</p>
            </DialogContent>
        </Dialog>
    );
};

export default QuestionDialog;