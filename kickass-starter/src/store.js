import { combineReducers, createStore } from "redux";
import users from './reducers/users_reducer';
import projects from './reducers/projects_reducers';


let reducer = combineReducers({ users, projects });

let store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;