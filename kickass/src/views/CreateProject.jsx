import React from 'react'
import { Redirect } from 'react-router-dom'
import API from '../variables.js'
import Input from '../components/Forms/Input.jsx'
import Button from '../components/Button.jsx'

class ProjectsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      redirect: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleFormChange = (e) => {
    let target = e.target.name
    let value = e.target.value
    this.setState({[target]: value})
  }

  handleSubmit(e) {
    e.preventDefault();
    if (window.confirm(` Êtes-vous de vouloir créer le projet ${this.state.title} ?`)) {
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
      .then( (result) => {
        console.log(`Le projet ${this.state.title} a été créé`)
        this.setState({redirect: true})
      })
      .catch( (err) => console.log(`Le projet ${this.state.title} n'a pas été créé ${err}`))
    }
  }

  render() {

    const { from } = this.props.location.state || '/'
    const { redirect } = this.state

    return (
      <div className="container-form">
        <form onSubmit={this.handleSubmit}>
          <legend>Ajouter un projet : </legend>
          <Input forLabel="title" nameLabel="Titre"
            type="text"
            name="title"
            value={this.state.title}
            required="required"
            onChange={this.handleFormChange}
            />

          <Input forLabel="description" nameLabel="Description"
              type="text"
              name="description"
              value={this.state.description}
              required="required"
              onChange={this.handleFormChange}
              />

          <div className="container-btn">
            <Button type="submit" value="Valider" />
          </div>
        </form>
        {redirect && (
          <Redirect from={from} to='/projects' />
        )}
      </div>
    )
  }
}

export default ProjectsForm;
