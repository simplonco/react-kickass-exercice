import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../../variables.js';
import '../../CSS/Form.css';
import Input from './Input.jsx';
import Button from '../Button.jsx';

class FormUser extends Component {
  constructor(props) {
     super(props);
     this.state= {
       name: '',
       age: '',
       type: '',
       redirect: false,
     };
     this.handleFormSubmit = this.handleFormSubmit.bind(this);
     this.handleFormUpdate = this.handleFormUpdate.bind(this);
   }

   showForm = () => {
     this.setState({showUpdateForm: this.showUpdateForm =! this.showUpdateForm})
   }

  handleFormChange = (event) => {
     this.setState({
         [event.target.name]: event.target.value
       });
   }

  handleFormSubmit(event) {
    event.preventDefault();
    if (window.confirm(`Êtes-vous sur de vouloir créer l'utilisateur ${this.state.name} ?`)) {
      fetch(`${API}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept' : 'application/json',
        },
        body: JSON.stringify({
          age: this.state.age,
          name: this.state.name,
          type: this.state.type
        })
      })
      .then( (result) => {
        console.log(`L'utilisateur ${this.state.name} a été créé`)
        this.setState({redirect: true});
      })
      .catch( (err) => console.log(`L'utilisateur n' a pas été créé ${err}`));
    }
  }

  handleFormUpdate(e) {
    e.preventDefault();
    if (window.confirm(`Êtes-vous sur de vouloir mettre à jour le profil ?`)) {
      fetch(`${API}/user/${this.props.userId}`, {
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
        console.log(`L'utilisateur a bien été mis à jour`);
      }
    )
    .catch ( err => console.log(`Une erreur s'est produite, ${err}`))
    }
  }

  render() {
    let { name, age, type, redirect } = this.state
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
              nameLabel="Prénom"
              type="text"
              name="name"
              value={name}
              required="required"
              maxLength="15"
              onChange={this.handleFormChange}
            />

            <Input forLabel="age"
                nameLabel="Âge"
                type="text"
                name="age"
                value={age}
                required="required"
                maxLength="3"
                onChange={this.handleFormChange}
              />

              <Input forLabel="type"
                nameLabel="Type"
                type="text"
                name="type"
                value={type}
                required="required"
                maxLength="10"
                onChange={this.handleFormChange}
              />

              <div className="container-btn">
                <Button type="submit"
                  value="Valider"
                  />
                {(method === 'update') ?
                    <Button value="close"
                      backgroundColor=" #009688" onClick={this.props.showForm}
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
