import React, {Component} from 'react';
import {Links} from 'react-router-dom';

export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:"",
      age:"",
      type:""
    }
  }
  Submit = () => {
    fetch('https://kickass-sdw-3a.herokuapp.com/api/user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        age: this.state.age,
        type: this.state.type
      })
    })
    .then((res) => res.json())
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name] : value})
  }
  render() {
    console.log(this.Submit)
    return(
      <div>
        <form>
        <p>Nom : </p>
        <input type='text' name='name' value={this.name} onChange={this.handleChange}></input>
        <p>Age : </p>
        <input type='text' name='age' value={this.age} onChange={this.handleChange}></input>
        <p>Type :</p>
        <input type='text' name='type' value={this.type} onChange={this.handleChange}></input>
        <button type='submit' onClick={this.Submit}>Submit</button>
      </form>
      </div>
    )
  }
}
