import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Home, Notifications } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import AddPost from './AddPost';

function NavBar({ authenticated }) {
  return (
    <div>
      <AppBar>
        <Toolbar className="nav-container">
          {authenticated ? (
            <>
              <AddPost />
              <IconButton component={Link} to="/home">
                <Home />
              </IconButton>
              <IconButton>
                <Notifications />
              </IconButton>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(NavBar);
