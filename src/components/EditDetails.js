import { withStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/userActions';
import IconButton from '@mui/material/IconButton';

//dialog
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
//dialog
import Edit from '@mui/icons-material/Edit';

const styles = {
  typography: {
    useNextVariants: true,
  },
  form: {
    textAlign: 'center',
  },
  image: {
    margin: '20px auto 20px auto',
  },
  pageTitle: {
    margin: '10px auto 10px auto',
  },
  textField: {
    margin: '10px auto 10px auto',
  },
  button: {
    marginTop: 20,
    position: 'relative',
    float: 'right',
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10,
  },
  progress: {
    position: 'absolute',
  },
  invisibleSeparator: {
    border: 'none',
    margin: 4,
  },
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    marginBottom: 20,
  },
  paper: {
    padding: 20,
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%',
      },
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%',
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle',
      },
      '& a': {
        color: '#00bcd4',
      },
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0',
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px',
    },
  },
};

function EditDetails(props) {
  const { classes } = props;
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const { credentials } = props;
    mapUserDetailsToState(credentials);
  }, []);
  const handleOpen = () => {
    setOpen(true);
    mapUserDetailsToState(props.credentials);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const mapUserDetailsToState = (credentials) => {
    setBio(credentials.bio ? credentials.bio : '');
    setLocation(credentials.location ? credentials.location : '');
    setWebsite(credentials.website ? credentials.website : '');
  };

  const handleSubmit = () => {
    const userDetails = {
      bio: bio,
      location: location,
      website: website,
    };
    props.editUserDetails(userDetails);
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleOpen} className={classes.button}>
        <Edit />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="A short bio about yourself"
              className={classes.textField}
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              fullWidth
            ></TextField>
            <TextField
              name="location"
              type="text"
              label="Location"
              multiline
              rows="3"
              placeholder="Where you live"
              className={classes.textField}
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              fullWidth
            ></TextField>
            <TextField
              name="website"
              type="text"
              label="Website"
              multiline
              rows="3"
              placeholder="Your personal/professional website"
              className={classes.textField}
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
              fullWidth
            ></TextField>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, { editUserDetails })(
  withStyles(styles)(EditDetails)
);
