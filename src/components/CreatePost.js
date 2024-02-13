import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Container ,MenuItem} from '@mui/material';

const CreatePost = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost({ title, content, userId: authorId }));
    setTitle('');
    setContent('');
    setAuthorId('');
    navigate('/recent-posts');
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h2" gutterBottom>Create Post</Typography>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
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
