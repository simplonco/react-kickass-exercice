import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import '../../CSS/Form.css'
import Input from './Input.jsx'
import Button from '../Button.jsx'

class FormUser extends Component {
  constructor(props) {
     super(props);
     this.state= {
       name: '',
       email: '',
       password: '',
       redirect: false
     };
     this.handleFormSubmit = this.handleFormSubmit.bind(this)
     this.handleFormUpdate = this.handleFormUpdate.bind(this)
   };

  handleFormChange = (event) => {
     this.setState({
         [event.target.name]: event.target.value
      })
  }

  handleFormSubmit(event) {
    event.preventDefault()
    if (window.confirm(`Êtes-vous sur de vouloir créer l'utilisateur ${this.state.name} ?`)) {
      fetch(`/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept' : 'application/json',
        },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        })
      })
      .then( (result) => {
        console.log(`L'utilisateur ${this.state.name} a été créé`)
        this.setState({redirect: true});
      })
      .catch( (err) => console.log(`L'utilisateur n' a pas été créé ${err}`))
    };
  };

  handleFormUpdate(e) {
    e.preventDefault();
    if (window.confirm(`Êtes-vous sur de vouloir mettre à jour le profil ?`)) {
      fetch(`/api/users/${this.props.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        })
      })
      .then ( res => {
        console.log(`L'utilisateur a bien été mis à jour`);
        this.setState({redirect: true})
      })
      .catch ( err => console.log(`Une erreur s'est produite, ${err}`))
      }
    }

  render() {
    let { name, email, password, redirect, redirectAfterUpdate } = this.state
    const { method } = this.props

        return (
          <div className={this.props.classContainerForm}>

            <form
              onSubmit={(method === 'update') ?
                this.handleFormUpdate
                :
                this.handleFormSubmit}
                className={this.props.classForm}
                >
                <legend>{(method === 'update') ?
                  'Mettre à jour l'
                  :
                  'Créer un nouvel '
                } utilisateur :
              </legend>

              <Input forLabel="name"
                nameLabel="Prénom *"
                type="text"
                name="name"
                value={name}
                required="required"
                maxLength="15"
                onChange={this.handleFormChange}
                />

              <Input forLabel="email"
                nameLabel="Email *"
                type="text"
                name="email"
                value={email}
                required="required"
                maxLength="20"
                onChange={this.handleFormChange}
                />

              <Input forLabel="password"
                nameLabel="Mot de passe *"
                type="password"
                name="password"
                value={password}
                required="required"
                maxLength="10"
                onChange={this.handleFormChange}
                />

              <div className="container-btn">
                <Button type="submit"
                  value="Valider"
                  />
                {(method === 'update') ?
                  <Button value="Close"
                    backgroundColor=" #009688" onClick={this.props.onClick}
                    type="button"
                    />
                  :
                  ''
                }
              </div>
            </form>
            {redirect && (
              <Redirect to='/users' />
            )}
          </div>
        )
      }
    }

export default FormUser;
