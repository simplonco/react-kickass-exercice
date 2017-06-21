import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import './Projects.css';

export class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    }
  }
  componentDidMount() {
    fetch('https://kickass-sdw-3a.herokuapp.com/api/projects')
    .then((res) => res.json())
    .then(json => {
      this.setState({projects: json})
      })
  }
  listProjects = () => {
    return this.state.projects.map( (project) => {
      return <Link to={`/projects/${project._id}`}>
              <li>{project.title}</li>
             </Link>
    })
  }

  render() {
    return (
      <div>
        <div>
          <h1>Projects : </h1>
        </div>
        <div>
          <ul>
            {this.listProjects()}
          </ul>
        </div>
      </div>
    );
  }
}

export class ProjectInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project : "",
      id: this.props.match.params.id,
      title:"",
      description:""
    }
  }
  componentDidMount() {
    fetch(`https://kickass-sdw-3a.herokuapp.com/api/project/${this.state.id}`)
    .then( (res) => res.json())
    .then( (json) => {
      this.setState({project: json})
    })
  }

// Supprimer un projet
  handleDelete() {
    fetch(`https://kickass-sdw-3a.herokuapp.com/api/project/${this.state.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(<Redirect to="/project" />)
    .catch(err => console.log('err', err))
  }

// Update un projet déjà existant
  handleUpdateSubmit() {
    fetch(`https://kickass-sdw-3a.herokuapp.com/api/project/${this.state.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: this.state.name,
        description: this.state.description
      })
    })
    .catch(err => console.log('err', err))
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleUpdate = () => {
    this.setState({
      title: this.state.project.title,
      description: this.state.project.description
    })
  }
  
  render() {
    return(
      <div>
        <h1>Project information : </h1>
        <div>
          <ul>
            <li>Title : {this.state.project.title}</li>
            <li>Description : {this.state.project.description}</li>
          </ul>
          <button onClick={() => this.handleDelete()}>Supprimer OMG WTF</button>
        </div>
        <div>
          <form>
            <p>Title : </p>
            <input type='text' name='title' value={this.state.title} onChange={this.handleChange}></input>
            <p>Description : </p>
            <input type='text' name='description' value={this.state.description} onChange={this.handleChange}></input>
            <button type='submit' onClick={() => this.handleUpdateSubmit()}>Update</button>
          </form>
        </div>
      </div>
    )
  }
}
