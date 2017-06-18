import React from 'react'
import Input from '../Forms/Input.jsx'
import API from '../../variables.js'

class ProjectsForm extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state =
    {
      title: "",
      description: "",
      creator: ""
    }

    this.handelSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (e) =>
  {
    let target = e.target.name
    let value = e.target.value
    this.setState({[target]: value})
    console.log(this.state);
  }

  handleSubmit(e)
  {
    e.preventDefault()
    fetch(`${API}/project`,
      {
        method: 'POST',
        headers:
        {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
        {
            title: this.state.title,
            description: this.state.description,
            creator: this.state.creator
        })
      })
      .then(function(res){ console.log(res) })
      .then (result => alert(result))
      .catch(function(res){ console.log(res) })
  }

  render()
  {
    return (
      <form onSubmit={ () => {this.handleSubmit.bind(this)}}>
        <input type="text" name="title" placeholder="projet cool" onChange={this.handleChange} value={this.state.title}/>
        <input type="text" name="description" placeholder="c'est projet super cool qui consiste..." onChange={this.handleChange} value={this.state.description}/>
        <input type="text" name="creator" placeholder="Mec cool" onChange={this.handleChange} value={this.state.creator}/>
        <button type="submit">Valider</button>
      </form>
    )
  }
}

export default ProjectsForm
