import React from 'react';
import '../CSS/Profile.css';
import API from './../variables.js';
import Button from '../components/Button.jsx';
import Input from '../components/Forms/Input.jsx';
import { Redirect } from 'react-router-dom';


class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUpdateForm: false,
      user: '',
      id: this.props.match.params.id,
      name: '',
      age: '',
      type: '',
      // redirect: false
    }

    this.submitUpdate = this.submitUpdate.bind(this);
  }

  componentDidMount = () => {
      fetch(`${API}/user/${this.state.id}`)
      .then( res => res.json())
      .then( (json) => {
        this.setState({user: json})
      })
  }

  handleFormChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitUpdate(e) {
    e.preventDefault();
    if (window.confirm(`Êtes-vous sur de vouloir mettre le profil ${this.state.user.name} à jour?`))
    fetch(`${API}/user/${this.state.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        age: this.state.age,
        type: this.state.type
      })
    })
    .then ( res => {
      console.log(`L'utilisateur ${this.state.user.name} a bien été mis à jour`);
      // this.setState({redirect: true});
      }
    )
    .catch ( err => console.log(`Une erreur s'est produite, ${err}`))
  }

  showForm = () => {
    this.setState({showUpdateForm: this.showUpdateForm =! this.showUpdateForm})
  }

  render() {
    console.log(this.state.showUpdateForm);

    const classShowUpdateForm = this.state.showUpdateForm === true ? 'show-form' : '';

    let { name, age, type } = this.state.user;

    // const { from } = this.props.location.state || '/'
    // const { redirect, id } = this.state
    //
    return(
      <section>
        <h2 className="main-title">Profile</h2>
        <div className="profile-container">
          <div className="profile-content">
            <div>
              <img className="profile-img" src={'https://s-media-cache-ak0.pinimg.com/736x/28/da/d0/28dad0354b0fe720de843f9acf9c8710.jpg'} alt="#"/>
            </div>
            <div className="profile-data">
              <p>Nom: {name}</p>
              <p>Age: {age}</p>
              <p>Type: {type}</p>
              <p>
                <Button value="Modif Info" onClick={this.showForm}
                />
                </p>
            </div>
          </div>
        </div>

        <div className="update-info">
          <form onSubmit={this.submitUpdate} className={classShowUpdateForm}>
            <legend>Créer un nouvel utilisateur : </legend>
              <Input forLabel="name" nameLabel={name}
                type="text"
                name="name"
                value={this.state.name}
                required="required"
                onChange={this.handleFormChange}
             />

           <Input forLabel="age" nameLabel={age}
                  type="text"
                  name="age"
                  value={this.state.age}
                  required="required"
                  onChange={this.handleFormChange}
                 />

               <Input forLabel="type" nameLabel={type}
                  type="text"
                  name="type"
                  value={this.state.type}
                  required="required"
                  onChange={this.handleFormChange}
                   />

                <div className="container-btn">
                  <Button type="submit"
                    value="Valider"
                    />
                  <Button value="close" backgroundColor=" #009688" onClick={this.showForm}
                    />
                </div>
          </form>
          {/*}{redirect && (
            <Redirect from={from} to={`/users/${id}`} />
           )}*/}
        </div>
      </section>
    )
  }
}

export default UserProfile;
