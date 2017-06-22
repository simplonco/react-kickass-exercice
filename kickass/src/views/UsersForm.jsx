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

  onFocusInput = (event) => {
    event.target.parentElement.classList.add('is-focused');
    event.target.parentElement.classList.add('has-label');

  }

  onBlurInput = (event) => {
    if (event.target.value.length === 0 ) {
      event.target.parentElement.classList.remove('is-focused')
    }
    event.target.parentElement.classList.remove('has-label')
  }

  render() {
    let { name, age, type } = this.state;

    return (
      <div className="container-form">
        <form onSubmit={this.handleFormSubmit}>
          <legend>Créer un nouvel utilisateur : </legend>
          <div className="field">
            <label className="field-label" for="name">Name</label>
              <input className="field-input" type="text" id="name" name="name"  onChange={this.handleFormChange} value={name} required onFocus={this.onFocusInput} onBlur={this.onBlurInput}/>
          </div>
          <div className="field">
            <label className="field-label" for="age">Âge</label>
              <input className="field-input" type="text" id="age" name="age"  onChange={this.handleFormChange} value={age} required onFocus={this.onFocusInput} onBlur={this.onBlurInput}/>
          </div>
          <div className="field">
            <label className="field-label" for="type">Type</label>
              <input className="field-input" type="text" id="type" name="type"  onChange={this.handleFormChange} value={type} required onFocus={this.onFocusInput} onBlur={this.onBlurInput}/>
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
