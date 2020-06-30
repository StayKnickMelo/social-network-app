import {
  USER_LOADED,
  AUTH_ERROR,
  LOG_IN_SUCCESS,
  LOG_IN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOG_OUT

} from '../actions/types';


const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  errors: null
};


const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
        errors: null
      }
    case LOG_IN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        token: payload,
        errors: null
      }
    case LOG_IN_FAIL:
    case REGISTER_FAIL:
    case AUTH_ERROR:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        errors: payload
      }
    case LOG_OUT:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: null,
        loading: false,
        user: null
      }
    default:
      return state
  }
};



export default authReducer;