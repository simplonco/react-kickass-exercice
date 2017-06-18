import React from 'react';
import API from './../../variables.js';

class ProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: "",
      id: this.props.match.params.id
    }
  }

  componentDidMount() {
      fetch(`${API}/project/${this.state.id}`)
      .then( res => res.json())
      .then( (json) => {
        this.setState({project: json})
      })
  }

  render() {
    return(
      <div>
        <div className="title jumbotron">
          <h1>Page Projet</h1>
        </div>
        <div>
          <div className="list-content well">
            <div className="list-label">
              <div>Title: </div>
              <div>Description: </div>
            </div>
            <div className="list-data">
              <div>{this.state.project.title}</div>
              <div>{this.state.project.description}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProjectPage;
