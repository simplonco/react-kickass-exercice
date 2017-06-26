import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import store from './store'; // Redux Store

// Scenes and Components
import Header from './component/Header/Header';
import Home from './scenes/Home/HomeContainer';
import User from './scenes/User/User';
import NewUser from './scenes/NewUser/NewUser';
import Project from './scenes/Project/Project';
import CreateProject from './scenes/CreateProject/CreateProject';

class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <Router>
          <div>
            <Header />
            <Route exact path="/" component={Home} />
            <Route path="/newuser" component={NewUser} />
            <Route path="/newproject" component={CreateProject} />
            <Route path="/user/:userId" component={User} />
            <Route path="/project/:projectId" component={Project} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
