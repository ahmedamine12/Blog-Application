import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../redux/actions';
import { Typography, TextField, Button, Container, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const CreateUser = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setMessage({ type: 'error', text: 'Please fill in all fields.' });
      return;
    }

    // Add more specific validation here if needed

    await dispatch(createUser({ username, email, password }));
    setUsername('');
    setEmail('');
    setPassword('');
    setMessage({ type: 'success', text: 'User created successfully.' });

    // Navigate to bloggers view
    navigate("/");
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h2" gutterBottom>Create User</Typography>
      {message.text && <Alert severity={message.type}>{message.text}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginBottom: '16px' }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: '16px' }}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: '16px' }}
        />
        <Button type="submit" variant="contained" color="primary">Create User</Button>
      </form>
    </Container>
  );
}

export default CreateUser;