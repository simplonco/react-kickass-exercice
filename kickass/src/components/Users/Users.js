import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import './Users.css';

export class Users extends Component {

  constructor(props){
    super(props);
    this.state = {
      users : [],
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
    return this.state.users.map( (user, i) => {
        return (
            <Link to={`/users/${user._id}`}>
            <li className="listNames">{user.name}</li>
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
          <ul className="userList">{this.listUsers()}</ul>
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

  handleDelete = () => {
    fetch(`https://kickass-sdw-3a.herokuapp.com/api/user/${this.state.user._id}`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(<Redirect to="/users" />)
    .catch(err => console.log('err', err))
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
          <button onClick={() => this.handleDelete()}>Supprimer OMG WTF</button>
        </div>
      </div>
    )
  }
}
