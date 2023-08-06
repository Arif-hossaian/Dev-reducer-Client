import React, { useEffect, useState } from 'react';
import { useReducerContext } from '../context/ContextProvider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import EditModal from './EditModal';
import useForm from '../hooks/useForm';
import { validate } from '../validation/validateForm';

const Home = () => {
  const {state, dispatch} = useReducerContext();
  const [data, setData] = useState({
    title: '',
    description: '',
  });


  const [myData, setMyData] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedEventData, setSelectedEventData] = useState(null);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  const getData = async () => {
    await axios
      .get('http://localhost:8000/events')
      .then((res) => {
        //setMyData(res.data.data);
        dispatch({ type: 'GET_EVENTS', payload: res.data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  

  const submitForm = async (values) => {
    //e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/crt', values);
      if (res.data.error == true) {
        console.log('Error creating event:', res.data.error);
      } else {
        dispatch({ type: 'CREATE_EVENT', payload: res.data.data });
        //setMyData((prevData) => [...prevData, res.data.data]);
        //setMyData(state);
        // setData({
        //   title: '',
        //   description: '',
        // });
        resetForm()
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    resetForm
  } = useForm({title:'', description:''}, validate, submitForm);

  const handleEditClick = (event) => {
    setSelectedEventData(event);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleUpdate = async (e, eventData, updatedData) => {
    e.preventDefault();
    //console.log(updatedData);
    //console.log(eventData._id);
    await axios
      .post(`http://localhost:8000/updt/${eventData._id}`, updatedData)
      .then((res) => {
        if (res.data.error == false) {
          dispatch({
            type: 'UPDATE_EVENT',
            payload: { id: eventData._id, data: updatedData },
          });
          handleEditModalClose();
          // setMyData((prevData) =>
          //   prevData.map((event) =>
          //     event._id === eventData._id ? { ...event, ...updatedData } : event
          //   )
          // );
        } else {
          console.log(res.data.error);
        }
      });
  };

  const handleDelete = async(eventId) => {
    dispatch({ type: 'DELETE_EVENT', payload: eventId });
    try {
        const res = await axios.get(`http://localhost:8000/event/dlt/${eventId}`);

        if (res.data.error) {
            console.log('Error deleting event:', res.data.error);
        }
    } catch (err) {
        console.log(err);
    }
}


useEffect(() => {
  getData();
}, []);
  //console.log(state)

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4">Create Event</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
         error={!!errors.title}
          type="text"
          label="Title"
          name="title"
          //value={data.title}
          value={values.title}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          helperText={errors.title}
          required
        />
        <TextField
        error={!!errors.description}
          type="text"
          label="Description"
          //value={data.description}
          value={values.description}
          name="description"
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          helperText={errors.description}
        />
        {isSubmitting ? (<p>Loading...</p>) : ( <Button type="submit" variant="contained" color="primary">
          Create
        </Button>)}
       
      </form>
      <Typography variant="h4" sx={{ mt: 5 }}>
        Event List
      </Typography>
      {state.length === 0 ? (
        <Typography variant="body1">No data found</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>edit</TableCell>
              <TableCell>delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.title}</TableCell>
                <TableCell>{event.description}</TableCell>
                <TableCell>
                  <button onClick={() => handleEditClick(event)}>Edit</button>
                </TableCell>
                <TableCell>
                <button onClick={() => handleDelete(event._id)}>Delete</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {selectedEventData && (
        <EditModal
          isOpen={editModalOpen}
          onClose={handleEditModalClose}
          eventData={selectedEventData}
          handleUpdate={handleUpdate}
        />
      )}
    </Container>
  );
};

export default Home;
