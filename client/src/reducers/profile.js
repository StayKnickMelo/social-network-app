import { LOAD_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, CREATE_PROFILE, LOAD_PROFILES, DELETE_EDU } from '../actions/types';


const initialState = {
  profile: null,
  profiles: [],
  // avatar: null,
  loading: true,
  errors: null
};


const profileReducer = (state = initialState, action)=>{
  const {type, payload} = action;
  switch(type){
    case LOAD_PROFILE:
    case CREATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
        errors: null
      }
    case PROFILE_ERROR:
      return {
        ...state,
        profile: null,
        loading: false,
        errors: payload
      }
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: true
      }
    case LOAD_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
        profile: null
      }
    default:
      return state
  }
}


export default profileReducer;