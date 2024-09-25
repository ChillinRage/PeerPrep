import * as React from 'react';
import { useState } from 'react';
import { Button } from '@mui/material';
import EditQuestion from './EditQuestionDialog';

const DeleteButton = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button
                variant="contained"
                onClick={handleClickOpen} // Opens the dialog on button click
                sx={{
                    backgroundColor: '#F82929', 
                    fontFamily: 'Poppins', 
                    fontWeight: 400,
                    '&:hover': {
                        backgroundColor: '#B20000',
                    },
                }}
            >
                Delete
            </Button>
            
        </div>
    );
}

export default DeleteButton;