import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './component/Header/Header';
import Home from './scenes/Home/Home';
import NewUser from './scenes/NewUser/NewUser';
import User from './component/User/User';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/newuser" component={NewUser} />
          <Route path="/user/:userId" component={User} />
        </div>
      </Router>
    );
  }
}

export default App;
