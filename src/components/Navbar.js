import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
          Blog App
        </Typography>
        <Button color="inherit" component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          Bloggers
        </Button>
        <Button color="inherit" component={Link} to="/recent-posts" style={{ textDecoration: 'none', color: 'inherit' }}>
          Recent Posts
        </Button>
       <Button color="inherit" component={Link} to="/all-post" style={{ textDecoration: 'none', color: 'inherit' }}>
       ALL Posts
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
