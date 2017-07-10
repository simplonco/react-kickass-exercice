import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Button from "../components/Button"
import '../CSS/Project.css'

class ProjectPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      project: '',
      id: this.props.match.params.id,
      redirect: false
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.renderProject =this.renderProject.bind(this)
  }

  componentDidMount() {
    fetch(`/api/projects/${this.state.id}`)
      .then( res => res.json())
      .then( (json) => {this.setState({project: json})
    })
  }

  handleDelete() {
    if (window.confirm('Êtes-vous sur de vouloir supprimer ce projet?')) {
      fetch(`/api/projects/${this.state.id}`, {method: 'DELETE'})
      .then( res => {
        console.log('project deleted!')
        this.setState({redirect: true})
      })
      .catch(err => console.log('err', err))
    }
  }

  handleLike = () => {
    fetch(`/api/projects/${this.state.id}/likes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
  }

  renderProject() {
    if ((this.state.project !== undefined) && (this.state.project[0] !== undefined)) {
      return (
        <div>
          <p>Title: {this.state.project[0].title}</p>
          <p>Description: {this.state.project[0].description}</p>
        </div>
      )
    }
  }

  render() {
    return(
      <section>
        <h1 className="main-title">Page Projet</h1>
        <div className="profile-container">
          <div className="project-content">
            <div className="project-img">
            </div>
            <div className="project-data">
                {this.renderProject()}
            </div>
            <div>
              <Button onClick={this.handleLike} value="Like" />
              <Button value="Supp" backgroundColor="#f44336" onClick={this.handleDelete} />
            </div>
          </div>
        </div>

        {this.state.redirect &&(
          <Redirect to='/projects' />
        )}
        
      </section>
    )
  }
}

export default ProjectPage;
