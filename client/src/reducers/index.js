import {combineReducers} from 'redux';

// reducers
import auth from '../reducers/auth';
import alert from '../reducers/alert';
import profile from '../reducers/profile';
import post from '../reducers/post';



export default combineReducers({
  auth,
  alert,
  profile,
  post

});

