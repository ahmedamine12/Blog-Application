import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Container, MenuItem, Alert } from '@mui/material';

const CreatePost = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !authorId) {
      setMessage({ type: 'error', text: 'Please fill out all fields.' });
      return;
    }

    try {
       console.log({ title, content, authorId });
       //stop the funttion here
      // return;
      await dispatch(createPost({ title, content, userId: authorId }));
      setTitle('');
      setContent('');
      setAuthorId('');
      setMessage({ type: 'success', text: 'Post created successfully.' });

      // Navigate to single post view of the newly created post
      navigate('/recent-posts'); // Update this to navigate to single post view
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to create post. Please try again later.' });
    }
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h2" gutterBottom>Create Post</Typography>
      {message.text && <Alert severity={message.type}>{message.text}</Alert>}
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
            error={!title}
          />
        </div>
        <div>
          <TextField
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            error={!content}
          />
        </div>
        <div>
          <TextField
            select
            label="Author"
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            fullWidth
            margin="normal"
            error={!authorId}
          >
            {users.map(user => (
              <MenuItem key={user.id} value={user.id}>
                {user.username}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div style={{ marginTop: '16px' }}>
          <Button type="submit" variant="contained" color="primary">Create Post</Button>
        </div>
      </form>
    </Container>
  );
}

export default CreatePost;