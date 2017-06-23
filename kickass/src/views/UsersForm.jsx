import React, { Component } from 'react';
import API from '../variables.js';
import '../CSS/Form.css';
import Input from '../components/Forms/Input.jsx';
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

  handleFormSubmit(event) {
    event.preventDefault();
    if (window.confirm(`Êtes-vous sur de vouloir créer l'utilisateur ${this.state.name}`)) {
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
            <Input forLabel="name" nameLabel="Prénom"
              type="text"
              name="name"
              value={name}
              required="required"
              onChange={this.handleFormChange}
           />

            <Input forLabel="age" nameLabel="Âge"
                type="text"
                name="age"
                value={age}
                required="required"
                onChange={this.handleFormChange}
               />

              <Input forLabel="type" nameLabel="Type"
                type="text"
                name="type"
                value={type}
                required="required"
                onChange={this.handleFormChange}
                 />

              <div className="container-btn">
                <Button type="submit"
                  value="Valider"
                  backgroundColor="#03A9F4"
                  color="white" />
              </div>
        </form>
      </div>
    )
  }
}

export default UsersForm;
