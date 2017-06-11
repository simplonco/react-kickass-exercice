import React from 'react';
import { Link } from 'react-router-dom';

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    }
  }

  componentDidMount() {
    fetch("https://kickass-sdw-3a.herokuapp.com/api/projects")
    .then( res => res.json())
    .then( json => {
      this.setState({projects: json});
    });
  }

  renderProjects = () => {
    return this.state.projects.map( (project) => {
      return (
        <Link to={`projects/${project._id}`}>
          <li className="list-group-item">{project.title}</li>
        </Link>
      )
    })
  }

  render() {

    return (
      <div>
        <div className="title jumbotron">
          <h1>Projets</h1>
        </div>
        <ul className="list listgroup">
          {this.renderProjects()}
        </ul>
      </div>
    )
  }
}

export default Projects;
