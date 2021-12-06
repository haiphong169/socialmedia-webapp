import {
  MARK_NOTIFICATIONS_READ,
  SET_UNAUTHENTICATED,
  SET_USER,
} from '../type';

import axios from 'axios';

export const loginUser = (userData, navigate) => (dispatch) => {
  axios
    .post('/login', userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      navigate('/home');
    })
    .catch((error) => {
      console.error(error);
    });
};

export const signUpUser = (userData, navigate) => (dispatch) => {
  axios
    .post('/signup', userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      navigate('/home');
    })
    .catch((error) => {
      console.error(error);
    });
};

export const logOutUser = () => (dispatch) => {
  localStorage.removeItem('FBToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => (dispatch) => {
  axios
    .get('/user')
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

export const uploadImage = (formData) => (dispatch) => {
  axios
    .post('/user/image', formData)
    .then((res) => {
      dispatch(getUserData());
    })
    .catch((error) => console.error(error));
};

export const editUserDetails = (userDetails) => (dispatch) => {
  axios
    .post('/user', userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((error) => console.error(error));
};

const setAuthorizationHeader = (token) => {
  const FBToken = `Bearer ${token}`;
  localStorage.setItem('FBToken', FBToken);
  axios.defaults.headers.common['Authorization'] = FBToken;
};

export const markNotificationsRead = (notificationsId) => (dispatch) => {
  axios
    .post('/notification', notificationsId)
    .then((res) => {
      dispatch({
        type: MARK_NOTIFICATIONS_READ,
      });
    })
    .catch((error) => console.error(error));
};
