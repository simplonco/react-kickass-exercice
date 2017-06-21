import React, { Component } from 'react';
import API from '../variables.js';
import '../CSS/Form.css';
import Button from '../components/Button.jsx';

class UsersForm extends Component {
  constructor(props) {
     super(props);
     this.state= {
       name: '',
       age: '',
       type: '',
     };

     this.handleFormSubmit = this.handleFormSubmit.bind(this);
   }

  handleFormChange = (event) => {
     this.setState({
         [event.target.name]: event.target.value
       });
   }

  handleFormSubmit(e) {
    e.preventDefault();
    if (window.confirm(`Êtes-vous sur de vouloir créer l'utilisateur ${this.state.name}`)) {
      console.log(this.state);
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
      .then( (result) => console.log(`L'utilisateur ${this.state.name} a été créé ${result}`))
      .catch( (err) => console.log(`L'utilisateur n' a pas été créé ${err}`));
    }
  }

  render() {
    let { name, age, type } = this.state;

    return (
      <div className="container-form">
        <form onSubmit={this.handleFormSubmit}>
          <legend>Créer un nouvel utilisateur : </legend>

          <div className="container-input">
            <label for="name">
              <input className="test" type="text" id="name" name="name" placeholder="Tapez votre nom..." onChange={this.handleFormChange} value={name} required />
            </label>
          </div>

          <div className="container-input">
            <label for="age">
              <input type="text" id="age" name="age" placeholder="Tapez votre âge..." onChange={this.handleFormChange} value={age} required/>
            </label>
          </div>
          <div className="container-input">
            <label for="type">
              <input type="text" id="type" name="type" placeholder="Tapez votre type..." onChange={this.handleFormChange} value={type} required/>
            </label>
          </div>
          <div className="container-btn">
            <Button type="submit" value="Valider" backgroundColor="#03A9F4" color="white" />
          </div>
        </form>
      </div>
    )
  }
}

export default UsersForm;
