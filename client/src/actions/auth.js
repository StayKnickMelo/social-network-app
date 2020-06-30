import { USER_LOADED, AUTH_ERROR, LOG_IN_SUCCESS, LOG_IN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, LOG_OUT, CLEAR_PROFILE } from './types';

import axios from 'axios';
import setAuthToken from '../utils/auth';
import { setAlert } from '../actions/alert';

// Register User
export const register = (user) => async (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/users/register', user, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data.token
    });


    dispatch(loadUser());

  } catch (error) {
    console.log(error.response.data.errors);

    error.response.data.errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));

    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.errors
    })

  }
}

// Login User
export const loginUser = (user) => async (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  }

  try {
    const res = await axios.post('/api/users/login', user, config);

    dispatch({
      type: LOG_IN_SUCCESS,
      payload: res.data.token
    });

    dispatch(loadUser());


  } catch (error) {
    console.log(error.response.data.errors);

    error.response.data.errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    dispatch({
      type: LOG_IN_FAIL,
      payload: error.response.data.errors
    });
  };
};

// Load User
export const loadUser = () => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthToken(localStorage.getItem('token'))
  }

  try {
    const res = await axios.get('/api/users/me');

    dispatch({
      type: USER_LOADED,
      payload: res.data.data
    })

  } catch (error) {
    console.log(error.response.data.errors);

    dispatch({
      type: AUTH_ERROR
    });
  };
};


export const logOut = () => dispatch =>{

  dispatch({
    type: CLEAR_PROFILE
  })

  dispatch({
    type: LOG_OUT
  })
}


