import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../redux/actions';
import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, Button, Container, Divider } from '@mui/material';

const AllPosts = () => {
  const dispatch = useDispatch();
  const allPosts = useSelector(state => state.allPosts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h2" gutterBottom style={{ color: '#3f51b5', marginBottom: '16px' }}>All Posts</Typography>
      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" component={Link} to="/create-post">Create New Post</Button>
      </div>
      {allPosts.map(post => (
        <Card key={post.id} variant="outlined" style={{ marginBottom: '16px', backgroundColor: '#e8eaf6' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom style={{ color: '#3f51b5' }}>{post.title}</Typography>
            <Typography variant="body1" color="textSecondary">{post.content}</Typography>
          </CardContent>
          <Divider />
        </Card>
      ))}
    </Container>
  );
};

export default AllPosts;