import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const EditModal = ({ isOpen, onClose, eventData, handleUpdate }) => {
  const [updatedData, setUpdatedData] = useState({
    title: eventData.title,
    description: eventData.description,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <Typography id="modal-title" variant="h6" component="h2">
          Edit Event
        </Typography>
        <form onSubmit={(e) => handleUpdate(e, eventData, updatedData)}>
        <TextField
          label="Title"
          name="title"
          value={updatedData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={updatedData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" type='submit'>
          Update
        </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default EditModal;
