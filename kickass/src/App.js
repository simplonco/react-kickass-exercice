import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {Users, UserProfile} from './components/Users/Users';
// import Project from './components/Project';
import './App.css';


class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path='/' render={() => (<h1>Welcome in hell</h1>)}/>
            <Route exact path='/users' component={Users} />
            <Route path='/users/:id' component={UserProfile} />
          </div>
        </Router>
      </div>
    )
  };
}

export default App;
