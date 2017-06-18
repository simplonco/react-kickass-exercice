import React from 'react';
import { Link } from 'react-router-dom';
import API from './../variables.js';
import '../CSS/List.css';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    fetch(`${API}/users`)
    .then( (res) => res.json())
    .then( json => {
      this.setState({users: json});
    });
  }

  renderUsers = () => {
    return this.state.users.map( (user, index) =>
    {
      if (user.name)
      {
        return (
          <Link to={`/users/${user._id}`}>
            <li key={index} className="list-element" >
              <h3>{user.name}</h3>
              <div className="container-img">
                <img src={'https://s-media-cache-ak0.pinimg.com/736x/28/da/d0/28dad0354b0fe720de843f9acf9c8710.jpg'} alt="photo-profil"></img>
              </div>
            </li>
          </Link>
        );
      }
    })
  }


  render() {

    return (
      <section>
        <h2>Voici la liste des utilisateurs : </h2>
        <ul className="list">{this.renderUsers()}</ul>
      </section>
    )
  }
}

export default Users;
