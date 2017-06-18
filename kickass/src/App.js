import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './main.css';
import Home from './views/Home.jsx';
import UsersList from './views/UsersList.jsx';
import Navbar from './components/Navbar/Navbar.jsx'
import ProjectsList from './views/ProjectsList.jsx';
import UserProfile from './components/Users/UserProfile.jsx';
import ProjectPage from './components/Projects/ProjectPage.jsx';
import UsersForm from './components/Users/UsersForm.jsx';
import ProjectsForm from './components/Projects/ProjectsForm.jsx';

class App extends Component
{
  render()
  {
    return (
      <div>
        <Router>
            <div>
              <Navbar />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/users" component={UsersList } />
                <Route path="/users/:id" component={UserProfile} />
                <Route path="/usersForm" component={UsersForm} />
                <Route exact path="/projects" component={ProjectsList} />
                <Route path="/projectsForm" component={ProjectsForm} />
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
