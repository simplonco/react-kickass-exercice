import React from 'react'
import '../CSS/Profile.css'
import FormUser from '../components/Forms/FormUser.jsx'
import Button from '../components/Button.jsx'
import { Link, Redirect } from 'react-router-dom'

class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      likes: '',
      id: this.props.match.params.id,
      showUpdateForm: false,
      redirect: false
    }

    this.handleDeleteUser = this.handleDeleteUser.bind(this)
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

  handleDeleteUser() {
    if (window.confirm(`Êtes-vous sur de vouloir supprimer ce profil?`)) {
      fetch(`/api/users/${this.state.id}`, { method: 'DELETE'})
      .then( res => console.log('user deleted!'))
      .catch( err => console.log('err', err))
    }
    this.setState({redirect: true})
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
      } else {
        return(
          <h2>{this.state.user}</h2>
        )
      }
    }

  render() {
    console.log(this.state.user)

    let classShowUpdateForm = this.state.showUpdateForm === true ? 'show-form' : ''

    // const { from } = this.props.location.state || '/'
    const { redirect } = this.state

    return(
      <section>

        {redirect && (
          <Redirect to='/users' />
        )}

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
                <Button value="Supp Profil" backgroundColor="#f44336" onClick={this.handleDeleteUser}/>
              </div>
              {this.renderUser()}
            </div>
          </div>
        </div>

          <FormUser method="update"
            classContainerForm="update-info"
            classForm={classShowUpdateForm}
            userId={this.state.id}
            onClick={this.showForm}
          />
      </section>
    )
  }
}

export default UserProfile
