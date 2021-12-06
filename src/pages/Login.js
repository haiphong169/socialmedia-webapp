import React, { useState } from 'react';
import { withStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import AppIcon from '../Hornet.png';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

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

function Login(props) {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: email,
      password: password,
    };
    props.loginUser(userData, navigate);
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { classes } = props;
  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} className={classes.image} />
        <Typography variant="h2" className={classes.pageTitle}>
          Login
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
          <Button type="submit" variant="contained" className={classes.button}>
            Login
          </Button>
          <br />
          <small>
            Don't have an account? Sign up <Link to="/signup">here</Link>
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
  loginUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Login));
