import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecentPosts } from '../redux/actions';
import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, Button, Container, Divider } from '@mui/material';

const RecentPosts = () => {
  const dispatch = useDispatch();
  const recentPosts = useSelector(state => state.recentPosts);

  useEffect(() => {
    dispatch(getRecentPosts());
  }, [dispatch]);

  console.log(recentPosts);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h2" gutterBottom>Recent Posts</Typography>
      {recentPosts.map(post => (
        <Card key={post.id} variant="outlined" style={{ marginBottom: '16px' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>{post.title}</Typography>
            <Typography variant="body1" color="textSecondary">{post.content}</Typography>
            <Typography variant="subtitle2" color="textSecondary">Author: {post.author.username}</Typography> 
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

export default RecentPosts;
