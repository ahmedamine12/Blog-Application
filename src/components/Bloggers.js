import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../redux/actions';
import { Typography, Button, Container, Avatar, Paper, Grid, Box } from '@mui/material';

const Bloggers = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);


  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>Bloggers</Typography>
      <Grid container spacing={2}>
        {users.map(user => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Paper sx={{ p: 2 }} elevation={3}>
              <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: getRandomColor(), marginRight: 2 }}>{user.username[0]}</Avatar>
                <Box>
                  <Typography variant="h6">{user.username}</Typography>
                  <Typography variant="body2" color="textSecondary">{user.email}</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <div>
        <Link to="/create-user" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>Create New Blogger</Button>
        </Link>
      </div>
    </Container>
  );
};

export default Bloggers;
