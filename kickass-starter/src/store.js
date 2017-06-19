import { combineReducers, createStore } from "redux";
import users from './reducers/users_reducer';

let reducer = combineReducers({ users });

let store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;