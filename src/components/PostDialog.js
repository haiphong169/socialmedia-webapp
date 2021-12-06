import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { withStyles } from '@mui/styles';
import {
  IconButton,
  Grid,
  Typography,
  Dialog,
  DialogContent,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPost } from '../redux/actions/dataActions';
import { UnfoldMore, Close } from '@mui/icons-material';
import LikeButton from './LikeButton';
import { Chat } from '@mui/icons-material';
import Comments from './Comments';
import CommentForm from './CommentForm';
import { useNavigate } from 'react-router';

const styles = {
  invisibleSeparator: {
    border: 'none',
    margin: 4,
  },
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover',
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
  },
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0,1)',
    marginBottom: 20,
  },
};
function PostDialog(props) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (props.openDialog) {
      handleOpen();
    }
  }, []);
  const handleOpen = () => {
    setOpen(true);
    props.getPost(props.postId);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const {
    classes,
    post: {
      postId,
      content,
      createdAt,
      likeCount,
      commentCount,
      userImage,
      username,
      comments,
    },
  } = props;

  return (
    <>
      <IconButton onClick={handleOpen} className={classes.expandButton}>
        <UnfoldMore />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <IconButton onClick={handleClose} className={classes.closeButton}>
          <Close />
        </IconButton>
        <DialogContent className={classes.dialogContent}>
          <Grid container>
            <Grid item sm={5}>
              <img
                src={userImage}
                alt="Profile"
                className={classes.profileImage}
              />
            </Grid>
            <Grid item sm={7}>
              <Typography
                component={Link}
                variant="h5"
                to={`/user/${username}`}
              >
                {username}
              </Typography>
              <hr className={classes.invisibleSeparator} />
              <Typography variant="body2">
                {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
              </Typography>
              <hr className={classes.invisibleSeparator} />
              <Typography variant="body1">{content}</Typography>
              <LikeButton postId={postId} />
              <span>{likeCount} likes</span>
              <IconButton>
                <Chat />
              </IconButton>
              <span>{commentCount} Comments</span>
            </Grid>
            <hr className={classes.visibleSeparator} />
            <CommentForm postId={postId} />
            {comments ? <Comments comments={comments} /> : <p>Loading...</p>}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}

const mapStateToProps = (state) => ({
  post: state.data.post,
});

export default connect(mapStateToProps, { getPost })(
  withStyles(styles)(PostDialog)
);
