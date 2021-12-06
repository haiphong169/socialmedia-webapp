import {
  SET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  SET_POST,
  POST_POST,
  SUBMIT_COMMENT,
} from '../type';
import axios from 'axios';

export const getPosts = () => (dispatch) => {
  axios
    .get('/post')
    .then((res) => {
      dispatch({
        type: SET_POSTS,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: SET_POSTS,
        payload: [],
      });
    });
};

export const likePost = (postId) => (dispatch) => {
  axios
    .get(`/post/${postId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_POST,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

export const unlikePost = (postId) => (dispatch) => {
  axios
    .get(`/post/${postId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_POST,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getPost = (postId) => (dispatch) => {
  axios
    .get(`/post/${postId}`)
    .then((res) => {
      dispatch({
        type: SET_POST,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const postPost = (newPost) => (dispatch) => {
  axios
    .post('/post', newPost)
    .then((res) => {
      dispatch({
        type: POST_POST,
        payload: res.data,
      });
    })
    .catch((error) => console.error(error));
};

export const submitComment = (postId, commentData) => (dispatch) => {
  axios
    .post(`/post/${postId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getUserData = (username) => (dispatch) => {
  axios
    .get(`/user/${username}`)
    .then((res) => {
      dispatch({
        type: SET_POSTS,
        payload: res.data.posts,
      });
    })
    .catch((error) => {
      console.error(error);
    });
};
