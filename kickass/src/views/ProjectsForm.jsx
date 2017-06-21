import React from 'react'
import API from '../variables.js'
import Button from '../components/Button.jsx'

class ProjectsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      creator: ""
    }

    this.handelSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (e) => {
    let target = e.target.name
    let value = e.target.value
    this.setState({[target]: value})
    console.log(this.state);
  }

  handleSubmit(e) {
    console.log(this.state);
    e.preventDefault();
    fetch(`${API}/project`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: this.state.title,
            description: this.state.description,
            creator: this.state.creator
        })
      })
      .then( (result) => console.log(result))
      .catch( (err) => console.log(err))
  }

  render() {
    return (
      <div className="container-form">
        <form onSubmit={this.handleSubmit}>
          <legend>Ajouter un projet : </legend>
          <p>
            <label for="title">
              <input type="text" id="title" name="title" placeholder="Nom de projet cool" onChange={this.handleChange} value={this.state.title}/>
            </label>
          </p>
          <p>
            <label for="description">
              <input type="text" id="description" name="description" placeholder="description d'un projet super cool qui consiste à..." onChange={this.handleChange} value={this.state.description}/>
            </label>
          </p>
          <p>
            <label for="creator">
              <input type="text" id="creator" name="creator" placeholder="Auteur" onChange={this.handleChange} value={this.state.creator}/>
            </label>
          </p>
          <p className="container-btn">
            <Button type="submit" value="Valider" color="white"/>
          </p>
        </form>
      </div>
    )
  }
}

export default ProjectsForm;
