import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './main.css';
import Users from './components/Users/Users.jsx';
import Navbar from './components/Navbar/Navbar.jsx'
import Projects from './components/Projects/Projects.jsx';
import UserProfile from './components/Users/UserProfile.jsx';
import ProjectPage from './components/Projects/ProjectPage.jsx';
import UsersForm from './components/Forms/Form.jsx';

class App extends Component
{
  render()
  {
    return (
      <div className="container">
        <Router>
            <div>
              <Navbar />
              <Switch>
                <Route exact path="/" render={() => (<h1>Bienvenue</h1>)} />
                <Route exact path="/users" component={Users} />
                <Route path="/users/:id" component={UserProfile} />
                <Route path="/usersForm" component={UsersForm} />
                <Route exact path="/projects" component={Projects} />
                <Route path="/projects/:id" component={ProjectPage} />
                <Route render={() =>
                      <h1>Cette page n'existe pas!</h1>
                    } />
              </Switch>
            </div>
        </Router>
      </div>
    );
  }
}

export default App;
