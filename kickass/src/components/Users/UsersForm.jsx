import React from 'react';
import Input from '../Forms/Input.jsx';
import API from './../../variables.js';

class UsersForm extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state=
    {
      name: '',
      age: '',
      type: ''
    }
  }

  handleChange = (event) =>
  {
    this.setState(
      {
        [event.target.name]: event.target.value
      }
    );
    console.log(this.state.name);
  }

  handleSubmit()
  {
    fetch(`${API}/user`,
      {
        method: 'POST',
        headers:
        {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify
        ({
            name: this.state.name,
            age: this.state.age,
            type: this.state.type
        })
      })
      .then (res => res.json())
      .then (() => console.log("New User created"));
  }

  render()
  {
    let { name, age, type } = this.state;
    return (
      <form onSubmit={ () => {this.handleSubmit()}}>
        <Input label="Nom   :" type="text" name="name" placeholder="firstname" onchange={this.handleChange} value={name}/>
        <Input label="Âge   :" type="text" name="age" placeholder="25" onchange={this.handleChange} value={age}/>
        <Input label="Type   :" type="text" name="type" placeholder="humain" onchange={this.handleChange} value={type}/>
        <Input type="submit" value="Valider" />
      </form>
    )
  }
}

export default UsersForm;
