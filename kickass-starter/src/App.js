import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './component/Header/Header';
import Home from './scenes/Home/Home';
import NewUser from './scenes/NewUser/NewUser';
import User from './scenes/User/User';
import CreateProject from './scenes/CreateProject/CreateProject';
import Project from './scenes/Project/Project';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/newuser" component={NewUser} />
          <Route path="/user/:userId" component={User} />
          <Route path="/newproject" component={CreateProject} />
          <Route path="/project/:projectId" component={Project} />
        </div>
      </Router>
    );
  }
}

export default App;
