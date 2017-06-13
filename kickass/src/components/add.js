import React, {Component} from 'react';

export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:"",
      age:"",
      type:""
    }
  }
  handleSubmit = () => {
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
    .then(res => {res.json()})
    .catch(err => console.log('error ', err));
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    console.log('age ' + this.state.age)
    console.log('name '+ this.state.name)
    return(
      <div>
        <form>
        <p>Nom : </p>
        <input type='text' name='name' value={this.state.name} onChange={this.handleChange}></input>
        <p>Age : </p>
        <input type='text' name='age' value={this.state.age} onChange={this.handleChange}></input>
        <p>Type :</p>
        <input type='text' name='type' value={this.state.type} onChange={this.handleChange}></input>
        <button type='submit' onClick={() => this.handleSubmit()}>Submit</button>
      </form>
      </div>
    )
  }
}
