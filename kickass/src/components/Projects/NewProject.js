import React, {Component} from 'react';

export default class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: ""
    }
  }

  handleSubmit = () => {
    fetch('https://kickass-sdw-3a.herokuapp.com/api/project', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description
      })
    })
    .then((res) => res.json())
    .catch(err => console.log('err', err))
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  render(){
    return(
      <div>
        <form>
          <p>Title : </p>
          <input type='text' name='title' value={this.state.title} onChange={this.handleChange}></input>
          <p>Description : </p>
          <input type='text' name='description' value={this.state.description} onChange={this.handleChange}></input>
          <p>Type :</p>
          <button type='submit' onClick={() => this.handleSubmit()}>Submit</button>
        </form>
      </div>
    )
  }
}
