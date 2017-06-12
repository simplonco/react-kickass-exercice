import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import {Users, UserProfile} from './components/Users/Users';
import {Projects, ProjectInfo} from './components/Projects/Project';
import AddUser from './components/add';
import './App.css';


const Links = () => (
  <nav>
    <NavLink to="/">Home </NavLink>
    <NavLink to="/users">Users </NavLink>
    <NavLink to='/projects'>Projects</NavLink>
    <NavLink to='/adduser'>New User ?</NavLink>
  </nav>
)
export default class App extends Component {


  render() {
    return (
      <div>
        <Router>
          <div>
            <Links />
            <Route exact path='/' render={() => (<h1>Welcome in hell</h1>)}/>
            <Route exact path='/users' component={Users} />
            <Route path='/users/:id' component={UserProfile} />
            <Route exact path='/projects' component={Projects} />
            <Route path='/projects/:id' component={ProjectInfo} />
            <Route path='/adduser' component={AddUser} />
          </div>
        </Router>
      </div>
    )
  };
}
