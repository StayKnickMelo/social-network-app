import {
  LOAD_PROFILE,
  LOAD_PROFILES,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  LOG_OUT,
  CREATE_PROFILE,
  UPLOAD_AVATAR,
  ADD_AVATAR,
  DELETE_EDU

} from '../actions/types';

import axios from 'axios';
import { setAlert } from '../actions/alert';
import {loadUser} from '../actions/auth';


// Load logged in user's profile
export const loadCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profiles/me');

    dispatch({
      type: LOAD_PROFILE,
      payload: res.data.data
    });

  } catch (error) {
    console.log(error.response.data.errors);

    dispatch({
      type: PROFILE_ERROR,
      payload: error.response.data.errors
    });
  };
};

// Create Profile
export const createProfile = (profile, history, edit = false) => async dispatch => {
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/profiles', profile, config);

    dispatch({
      type: CREATE_PROFILE,
      payload: res.data.data
    });

    dispatch(loadUser());

    if (edit) {
      dispatch(setAlert('Profile Updated', 'success'));
    } else {
      dispatch(setAlert('Profile Created', 'success'));
    }

    if (!edit) {
      setTimeout(() => {
        history.push('/dashboard');
      }, 3000)
    };

  } catch (error) {
    console.log(error.response.data.erros);

    error.response.data.errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));

  };
};

// Upload an avatar
export const uploadAvatar = (formData) => async dispatch => {
  const config = {
    headers: {
      'Content-type': 'multipart/form-data'
    }
  }

  try {
    const res = await axios.post('/api/uploads', formData, config);

    // dispatch({
    //   type: UPLOAD_AVATAR,
    //   payload: res.data.data.filename
    // });

    console.log(res.data.data)

  } catch (error) {

    console.log(error);

  }
};

// Add Expereience
export const addExperience = (exp, history) => async dispatch => {
  try {
    const res = await axios.put('/api/profiles/experience', exp);

    dispatch({
      type: LOAD_PROFILE,
      payload: res.data.data
    });

    dispatch(setAlert('Experience Added', 'success'));

    setTimeout(() => {
      history.push('/dashboard');

    }, 3000);


  } catch (error) {
    console.log(error.response.data.errors);

    error.response.data.errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));

  };
};

// Add Education
export const addEducation = (edu, history) => async dispatch => {
  try {
    const res = await axios.put('/api/profiles/education', edu);

    dispatch({
      type: LOAD_PROFILE,
      payload: res.data.data
    });

    dispatch(setAlert('Education Added', 'success'));

    setTimeout(() => {
      history.push('/dashboard')
    }, 3000);

  } catch (error) {
    console.log(error.response.data.errors);

    error.response.data.errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));

  };
};

// Add avatar bool
export const hasAvatar = ()=> async dispatch => {
  try {
    await axios.put('/api/profiles/avatar');

    await axios.put('/api/users/avatar');

    dispatch({
      type: ADD_AVATAR
    });
    
  } catch (error) {

    console.log(error.response.data.errors);
    
  }
}

// Get profile by id 
export const getProfileById = (userId)=> async dispatch => {
  try {
    const res = await axios.get(`/api/profiles/user/${userId}`);

    dispatch({
      type: LOAD_PROFILE,
      payload: res.data.data
    })
  } catch (error) {
    console.log(error.response.data.errors);

    error.response.data.errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    
  }
};


// Get all Profiles
export const getProfiles = () => async dispatch => {
  try {
    const res = await axios.get('/api/profiles');

    dispatch({
      type: LOAD_PROFILES,
      payload: res.data.data
    })
  } catch (error) {

    console.log(error.response.data.errors);
    error.response.data.errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    
  }
}

// Delete User Profile
export const deleteProfile = () => async dispatch => {
  try {
    await axios.delete('/api/profiles');

    dispatch({
      type: CLEAR_PROFILE
    });

    dispatch({
      type: LOG_OUT
    });

    dispatch(setAlert('Profile Has Been Deleted', 'success'));

  } catch (error) {
    console.log(error.response.data.errors);
  }
}

// Delete Education
export const deleteEdu = (id)=> async dispatch => {
  try {
    const res = await axios.delete(`/api/profiles/education/${id}`);

    dispatch({
      type: LOAD_PROFILE,
      payload: res.data.data
    });

    dispatch(setAlert('Succesfully Removed', 'success'));
    
  } catch (error) {
    console.log(error.response.data.errors);

    error.response.data.errors.forEach(err => dispatch(setAlert(err.msg, 'danger')))
  }
};


// Delete Exp
export const deleteExp = (id)=> async dispatch => {
  try {
    const res = await axios.delete(`api/profiles/experience/${id}`);

    dispatch({
      type: LOAD_PROFILE,
      payload: res.data.data
    });


    dispatch(setAlert('Successfully Removed'));
    
  } catch (error) {
    console.log(error.response.data.errors);

    error.response.data.errors.forEach(err => dispatch(setAlert(err.msg, 'danger')))
    
  }
}
