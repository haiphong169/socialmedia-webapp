import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { withStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../redux/actions/dataActions';
import Chat from '@mui/icons-material/Chat';
import PostDialog from './PostDialog';
import LikeButton from './LikeButton';

const styles = {
  card: {
    display: 'flex',
    marginBottom: 20,
    maxHeight: 300,
  },
  // need to be cropped to the correct size
  image: {
    minWidth: 150,
    maxWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: 'cover',
  },
};

function Post(props) {
  dayjs.extend(relativeTime);
  const {
    classes,
    post: {
      content,
      createdAt,
      userImage,
      username,
      postId,
      likeCount,
      commentCount,
    },
  } = props;
  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        title="Profile image"
        component="img"
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography variant="h5" component={Link} to={`/user/${username}`}>
          {username}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{content}</Typography>
        <LikeButton postId={postId} />
        <span>{likeCount} Likes</span>
        <IconButton>
          <Chat />
        </IconButton>
        <span>{commentCount} Comments</span>
        <PostDialog
          postId={postId}
          username={username}
          openDialog={props.openDialog}
        />
      </CardContent>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likePost,
  unlikePost,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Post));
