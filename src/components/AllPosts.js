import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../redux/actions';
import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, Container, Divider } from '@mui/material';
import Button from '@mui/material/Button';
const AllPosts = () => {
  const dispatch = useDispatch();
  const allPosts = useSelector(state => state.allPosts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h2" gutterBottom>All Posts</Typography>
      {allPosts.map(post => (
        <Card key={post.id} variant="outlined" style={{ marginBottom: '16px' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>{post.title}</Typography>
            <Typography variant="body1" color="textSecondary">{post.content}</Typography>
          </CardContent>
          <Divider />
        </Card>
      ))}
      <div style={{ marginTop: '16px' }}>
        <Button variant="contained" color="primary" component={Link} to="/create-post">Create New Post</Button>
      </div>
    </Container>
  );
};

export default AllPosts;
