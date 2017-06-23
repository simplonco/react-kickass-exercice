import React from 'react'
import API from '../variables.js'
import Button from '../components/Button.jsx'

class ProjectsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (e) => {
    let target = e.target.name
    let value = e.target.value
    this.setState({[target]: value})
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch(`${API}/project`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept' : 'application/json',
        },
        body: JSON.stringify({
            title: this.state.title,
            description: this.state.description,
        })
      })
      .then( (result) => console.log(`Le projet ${this.state.title} a été créé ${result}`))
      .catch( (err) => console.log(`Le projet ${this.state.title} n'a pas été créé ${err}`))
  }

  render() {
    console.log(this.state);
    return (
      <div className="container-form">
        <form onSubmit={this.handleSubmit}>
          <legend>Ajouter un projet : </legend>
          <div className="field">
            <label className="field-label" for="title">Titre</label>
              <input className="field-input" type="text" id="title" name="title" onChange={this.handleChange} value={this.state.title}/>
          </div>
          <div className="field">>
            <label className="field-label" for="description">Description</label>
              <input className="field-input" type="text" id="description" name="description" placeholder="description d'un projet super cool qui consiste à..." onChange={this.handleChange} value={this.state.description}/>
          </div>
          {/*<div>
            <label for="creator">
              <input type="text" id="creator" name="creator" placeholder="Auteur" onChange={this.handleChange} value={this.state.creator}/>
            </label>
          </div>*/}
          <div className="container-btn">
            <Button type="submit" value="Valider" color="white"/>
          </div>
        </form>
      </div>
    )
  }
}

export default ProjectsForm;
