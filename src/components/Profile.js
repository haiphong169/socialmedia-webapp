import { withStyles } from '@mui/styles';
import React from 'react';
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { Link as LinkUI, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import {
  Link as LinkIcon,
  CalendarToday,
  LocationOn,
  Edit,
  KeyboardReturn,
} from '@mui/icons-material';
import dayjs from 'dayjs';
import { logOutUser, uploadImage } from '../redux/actions/userActions';
import EditDetails from './EditDetails';

const styles = {
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

const handleEditImage = () => {
  const fileInput = document.getElementById('imageInput');
  fileInput.click();
};

function Profile(props) {
  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    props.uploadImage(formData);
  };

  const handleLogout = () => {
    props.logOutUser();
  };

  const {
    classes,
    user: {
      credentials: { createdAt, username, imageUrl, bio, website, location },
      authenticated,
    },
  } = props;

  return (
    <>
      {authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img
                src={imageUrl}
                alt="Profile picture"
                className="profile-image"
              />
              <input
                type="file"
                id="imageInput"
                onChange={handleImageChange}
                hidden="hidden"
              />
              <IconButton onClick={handleEditImage} className="button">
                <Edit />
              </IconButton>
            </div>
            <hr />
            <div className="profile-details">
              <LinkUI component={Link} to={`/user/${username}`} variant="h5">
                {username}
              </LinkUI>
              <hr />
              {bio && <Typography variant="body2">{bio}</Typography>}
              <hr />
              {location && (
                <>
                  <LocationOn /> <span>{location}</span>
                </>
              )}
              <hr />
              {website && (
                <>
                  <LinkIcon />
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {' '}
                    {website}
                  </a>
                </>
              )}
              <hr />
              <CalendarToday />{' '}
              <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
            </div>
            <IconButton onClick={handleLogout}>
              <KeyboardReturn />
            </IconButton>
            <EditDetails />
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            No profile found, please log in again
          </Typography>
          <div className={classes.buttons}>
            <Button variant="contained" component={Link} to="/login">
              Login
            </Button>
            <Button variant="contained" component={Link} to="/signup">
              Sign Up
            </Button>
          </div>
        </Paper>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = { logOutUser, uploadImage };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));
