import React, { useState } from 'react';
import { withStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import AppIcon from '../Hornet.png';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUpUser } from '../redux/actions/userActions';

const styles = {
  form: {
    textAlign: 'center',
  },
  image: {
    margin: '10px auto 10px auto',
  },
  pageTitle: {
    margin: '10px',
  },
  textField: {
    margin: '5px',
  },
  button: {
    margin: '10px',
  },
};

function SignUp(props) {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: email,
      password: password,
      username: username,
    };
    props.signUpUser(userData, navigate);
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { classes } = props;
  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} className={classes.image} />
        <Typography variant="h2" className={classes.pageTitle}>
          Sign Up
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textField}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            fullWidth
          ></TextField>
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            className={classes.textField}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            fullWidth
          ></TextField>
          <TextField
            id="username"
            name="username"
            type="text"
            label="Username"
            className={classes.textField}
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            fullWidth
          ></TextField>
          <Button type="submit" variant="contained" className={classes.button}>
            Sign Up
          </Button>
          <br />
          <small>
            Already have an account? Login <Link to="/login">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  signUpUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(SignUp));
