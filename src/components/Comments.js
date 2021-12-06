import React, { Fragment, useEffect } from 'react';
import { withStyles } from '@mui/styles';
import { Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const styles = {
  invisibleSeparator: {
    visibleSeparator: {
      width: '100%',
      borderBottom: '1px solid rgba(0,0,0,0,1)',
      marginBottom: 20,
    },
  },
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0,1)',
    marginBottom: 20,
  },
  commentImage: {
    maxWidth: '100%',
    height: 100,
    objectFit: 'cover',
    borderRadius: '50%',
  },
  commentData: {
    marginLeft: 20,
  },
};

function Comments(props) {
  const { classes } = props;

  return (
    <Grid container>
      {props.comments.map((comment, index) => {
        const { content, createdAt, userImage, username } = comment;
        return (
          <Fragment key={createdAt}>
            <Grid item sm={12}>
              <Grid container>
                <Grid item sm={2}>
                  <img
                    src={userImage}
                    alt="comment"
                    className={classes.commentImage}
                  />
                </Grid>
                <Grid item sm={9}>
                  <div className={classes.commentData}>
                    <Typography
                      variant="h5"
                      component={Link}
                      to={`/user/${username}`}
                    >
                      {username}
                    </Typography>
                    <Typography variant="body2">
                      {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body1">{content}</Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            {index !== props.comments.length - 1 && (
              <hr className={classes.visibleSeparator} />
            )}
          </Fragment>
        );
      })}
    </Grid>
  );
}

export default withStyles(styles)(Comments);
