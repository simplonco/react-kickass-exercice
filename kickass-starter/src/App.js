import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './component/Header/Header';
import Home from './scenes/Home';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/about" render={() => <h1>about</h1>} />
        </div>
      </Router>
    );
  }
}

export default App;
