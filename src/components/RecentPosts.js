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
      <Typography variant="h4" component="h2" gutterBottom style={{ color: '#3f51b5', marginBottom: '16px' }}>Recent Posts</Typography>
      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" component={Link} to="/create-post">Create New Post</Button>
      </div>
      {recentPosts.map(post => (
        <Card key={post.id} variant="outlined" style={{ marginBottom: '16px', backgroundColor: '#e8eaf6' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom style={{ color: '#3f51b5' }}>{post.title}</Typography>
            <Typography variant="body1" color="textSecondary">{post.content}</Typography>
            <Typography variant="subtitle2" color="textSecondary" style={{ marginTop: '8px' }}>Author: {post.author.username}</Typography> 
          </CardContent>
          <Divider />
        </Card>
      ))}
     
    </Container>
  );
};

export default RecentPosts;