import React from 'react';
import '../CSS/Profile.css';
import API from './../variables.js';

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
      <section>
        <h2 className="main-title">Profile</h2>
        <div className="profile-container">
          <div className="profile-content">
            <div>
              <img className="profile-img" src={'https://s-media-cache-ak0.pinimg.com/736x/28/da/d0/28dad0354b0fe720de843f9acf9c8710.jpg'} alt="#"/>
            </div>
            <div className="profile-data">
              <p>Nom: {this.state.user.name}</p>
              <p>Age: {this.state.user.age}</p>
              <p>Type: {this.state.user.type}</p>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default UserProfile;
