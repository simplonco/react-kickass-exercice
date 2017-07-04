import React from 'react'
import '../CSS/Profile.css'
import FormUser from '../components/Forms/FormUser.jsx'
import Button from '../components/Button.jsx'
import { Link } from 'react-router-dom'

class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      likes: '',
      id: this.props.match.params.id,
      showUpdateForm: false,
      // redirect: false
    }
  }

  componentDidMount = () => {
      fetch(`/api/users/${this.state.id}/projects`, { method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        }
      })
      .then( res => res.json())
      .then( (json) => {
        this.setState({user: json});
      })
  }

  showForm = () => {
    this.setState({showUpdateForm: this.showUpdateForm =! this.showUpdateForm})
  }

  renderUser = () => {
    if ((this.state.user !== undefined) && (this.state.user[0] !== undefined)) {
      return(
        <div>
          <p>Nom: {this.state.user[0].name}</p>
          <p>Email: {this.state.user[0].email}</p>
          <ul>Projets: {this.state.user.map( (projet) => {
              return (
                <Link to={`/projects/${projet.id_project}`}>
                  <li>{projet.title}</li>
                </Link>
              )}
            )}
          </ul>
        </div>
        )
      }
    }

  render() {
    let classShowUpdateForm = this.state.showUpdateForm === true ? 'show-form' : ''
    let { name, email, id_user } = this.state.user

    // const { from } = this.props.location.state || '/'
    // const { redirect, id } = this.state

    return(
      <section>
        <h2 className="main-title">Profil</h2>
        <div className="profile-container">
          <div className="profile-content">
            <div>
              <img className="profile-img" src={'https://s-media-cache-ak0.pinimg.com/736x/28/da/d0/28dad0354b0fe720de843f9acf9c8710.jpg'} alt="#"/>
            </div>
            <div className="profile-data">
              <div>
                <Button value="Modif Info" onClick={this.showForm}
                />
              </div>
              {this.renderUser()}
            </div>
          </div>
        </div>

          <FormUser method="update"
            classContainerForm="update-info"
            classForm={classShowUpdateForm}
            userId={this.state.id}
            showForm={this.showForm}
          />
      </section>
    )
  }
}

export default UserProfile
