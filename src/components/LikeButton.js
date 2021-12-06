import React from 'react';
import { IconButton } from '@mui/material';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { likePost, unlikePost } from '../redux/actions/dataActions';

function LikeButton(props) {
  const likePost = () => {
    props.likePost(props.postId);
  };

  const unlikePost = () => {
    props.unlikePost(props.postId);
  };
  const { authenticated } = props.user;
  return (
    <>
      {!authenticated ? (
        <IconButton>
          <Link to="/login">
            <FavoriteBorder />
          </Link>
        </IconButton>
      ) : props.user.likes &&
        props.user.likes.find((like) => like.postId === props.postId) ? (
        <IconButton onClick={unlikePost}>
          <Favorite />
        </IconButton>
      ) : (
        <IconButton onClick={likePost}>
          <FavoriteBorder />
        </IconButton>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likePost,
  unlikePost,
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
