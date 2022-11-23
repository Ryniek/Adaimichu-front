import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import taskReducer from "./reducers/task";
import authReducer from "./reducers/auth";
import userReducer from "./reducers/user";
import thunk from "redux-thunk";
import * as actionTypes from './actions/actionTypes';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const allReducers = combineReducers({
  auth: authReducer,
  task: taskReducer,
  user: userReducer,
});

const rootReducer = (state, action) => {
  if (action.type === actionTypes.LOGOUT) {
    state = undefined;
  }

  return allReducers(state, action);
}


export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
