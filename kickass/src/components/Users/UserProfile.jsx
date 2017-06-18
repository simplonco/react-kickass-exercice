import React from 'react';
import './UserProfile.css';
import API from './../../variables.js';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      id: this.props.match.params.id
    }
  }

  componentDidMount = () => {
      fetch(`${API}/user/${this.state.id}`)
      .then( res => res.json())
      .then( (json) => {
        this.setState({user: json})
      })
  }

  render() {
    return(
      <div>
        <div className="title jumbotron">
          <h1>Profile</h1>
        </div>
        <div className="list-content well">
          <div className="list-label">
            <div>Nom: </div>
            <div>Age: </div>
            <div>Type: </div>
          </div>
          <div className="list-data">
            <div>{this.state.user.name}</div>
            <div>{this.state.user.age}</div>
            <div>{this.state.user.type}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserProfile;
