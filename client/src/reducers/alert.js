import {
  SET_ALERT,
  REMOVE_ALERT

} from '../actions/types';


const initialState = [];


const alertReducer = (state= initialState, action)=>{
  const {type, payload} = action;
  switch(type){
    case SET_ALERT:
      return [...state, payload]
    case REMOVE_ALERT:
      return [];
    default:
      return state
  };
};

export default alertReducer;