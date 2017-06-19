import React, { Component } from 'react';
import HomeView from './components/HomeView';
import UsersList from './components/UsersList';
import EditProjects from './components/EditProjects';
import AddUsers from './components/AddUsers';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';



const Wrapper = styled.section`
	    background: papayawhip;
      margin: 0 auto;
      `;

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
        users: [],
        }
    }

    componentDidMount() {
    fetch("https://kickass-sdw-3a.herokuapp.com/api/users")
        .then((response) => {
            return response.json();
        }).then( json => {
            this.setState({users : json});
        });
    }



    render() {

      
      return(
        <Router>
          <Wrapper>
            <NavBar />
            <Route exact path="/" component={HomeView}/>
            <Route path="/userslist" render={() => 
              <UsersList users={this.state.users} />
            }/>
            <Route path="/addusers" component={AddUsers} />
            <Route path="/editprojects" component={EditProjects} />
          </Wrapper>
        </Router>
    )
}

}


export default App;
