import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './main.css';
import Navbar from './components/Navbar/Navbar.jsx'
import Home from './views/Home.jsx';
import UsersList from './views/UsersList.jsx';
import ProjectsList from './views/ProjectsList.jsx';
import UserProfil from './views/UserProfil.jsx';
import ProjectProfile from './views/ProjectProfile.jsx';
import CreateUser from './views/CreateUser.jsx';
import CreateProject from './views/CreateProject.jsx';

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
                <Route path="/users/:id" component={UserProfil} />
                <Route path="/usersForm" component={CreateUser} />
                <Route exact path="/projects" component={ProjectsList} />
                <Route path="/projectsForm" component={CreateProject} />
                <Route path="/projects/:id" component={ProjectProfile} />
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
