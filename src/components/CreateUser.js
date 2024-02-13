import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../redux/actions';
import { Typography, TextField, Button, Container } from '@mui/material';

const CreateUser = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser({ username, email, password }));
    setUsername('');
    setEmail('');
    setPassword('');
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h2" gutterBottom>Create User</Typography>
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
