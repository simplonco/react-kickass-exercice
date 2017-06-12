import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Users.css';

export class Users extends Component {

  constructor(props){
    super(props);
    this.state = {
      users : []
    };
  }

  componentDidMount() {
    fetch('https://kickass-sdw-3a.herokuapp.com/api/users')
    .then( (res) => res.json())
    .then( json => {
      this.setState({users: json});
    });
  }

  listUsers = () => {
    return this.state.users.map( (user) => {
        return (
          <Link to={`/users/${user._id}`}>
            <li>{user.name}</li>
          </Link>
        );
    })
  }

  render() {
    return (
      <div>
        <div>
          <h1>Users</h1>
        </div>
        <div>
          <ul>{this.listUsers()}</ul>
        </div>
      </div>
    )
  }
}

export class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      id: this.props.match.params.id
    }
  }

  componentDidMount = () => {
    fetch(`https://kickass-sdw-3a.herokuapp.com/api/user/${this.state.id}`)
    .then((res) => res.json())
    .then((json) => {
      this.setState({user: json})
    })
  }

  render(){
    return(
      <div>
        <h1>Profile : </h1>
        <div>
          <ul>
            <li>Nom : {this.state.user.name}</li>
            <li>Age : {this.state.user.age}</li>
            <li>Type : {this.state.user.type}</li>
          </ul>
        </div>
      </div>
    )
  }
}
