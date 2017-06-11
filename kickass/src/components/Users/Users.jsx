import React from 'react';
import { Link } from 'react-router-dom';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    fetch('https://kickass-sdw-3a.herokuapp.com/api/users')
    .then( (res) => res.json())
    .then( json => {
      this.setState({users: json});
    });
  }

  renderUsers = () => {
    return this.state.users.map( (user) => {
      if (user.name)
      {
        return (
          <Link to={`/users/${user._id}`}>
            <li className="list-group-item" >{user.name}</li>
          </Link>
        );
      }
    })
  }

  render() {

    return (
      <div>
        <div className="title jumbotron">
          <h1>Users</h1>
        </div>
        <ul className="list list-group">{this.renderUsers()}</ul>
      </div>
    )
  }
}

export default Users;
