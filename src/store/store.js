import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import taskReducer from "./reducers/task";
import authReducer from "./reducers/auth";
import userReducer from "./reducers/user";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  task: taskReducer,
  user: userReducer,
});

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
