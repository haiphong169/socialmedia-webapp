import React from 'react';
import { withStyles } from '@mui/styles';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { Link as LinkUI, Paper, Typography } from '@mui/material';
import {
  LocationOn,
  Link as LinkIcon,
  CalendarToday,
} from '@mui/icons-material';

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

function StaticProfile(props) {
  const {
    classes,
    profile: { username, createdAt, imageUrl, bio, website, location },
  } = props;
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={imageUrl} alt="Profile picture" className="profile-image" />
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
      </div>
    </Paper>
  );
}

export default withStyles(styles)(StaticProfile);
