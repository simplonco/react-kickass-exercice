import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import {Users, UserProfile} from './components/Users/Users';
import {Projects, ProjectInfo} from './components/Projects/Project';
import AddUser from './components/Users/NewUser';
import AddProject from './components/Projects/NewProject';
import './App.css';


const Links = () => (
  <nav>
    <NavLink className="navbar" to="/">Home </NavLink>
    <NavLink className="navbar" to="/users">Users </NavLink>
    <NavLink className="navbar" to='/projects'>Projects</NavLink>
    <NavLink className="navbar" to='/adduser'>New User ?</NavLink>
    <NavLink className="navbar" to="/addproject">New Project ?</NavLink>
  </nav>
)
export default class App extends Component {


  render() {
    return (
      <div>
        <Router>
          <div>
            <Links />
            <Route exact path='/' render={() => (<h1 className="welcome">Welcome in hell</h1>)}/>
            <Route exact path='/users' component={Users} />
            <Route path='/users/:id' component={UserProfile} />
            <Route exact path='/projects' component={Projects} />
            <Route path='/projects/:id' component={ProjectInfo} />
            <Route path='/adduser' component={AddUser} />
            <Route path='/addproject' component={AddProject} />
          </div>
        </Router>
      </div>
    )
  };
}
