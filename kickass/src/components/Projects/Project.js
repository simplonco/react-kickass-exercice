import React, { Component } from 'react';
import {Link} from 'react-router-dom';
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
      id: this.props.match.params.id
    }
  }
  componentDidMount() {
    fetch(`https://kickass-sdw-3a.herokuapp.com/api/project/${this.state.id}`)
    .then( (res) => res.json())
    .then( (json) => {
      this.setState({project: json})
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
        </div>
      </div>
    )
  }
}
