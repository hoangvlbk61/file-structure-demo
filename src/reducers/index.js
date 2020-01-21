import { combineReducers } from "redux";
import post from './post';

const reducers = {
    post
}

const reducer = combineReducers(reducers);

export default (state, action) => {
  return reducer(state, action);
}
