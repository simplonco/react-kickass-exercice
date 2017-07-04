import React from 'react'
import '../CSS/Project.css'

class ProjectPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      project: '',
      id: this.props.match.params.id
    }
  }

  componentDidMount() {
      fetch(`/api/projects/${this.state.id}`)
      .then( res => res.json())
      .then( (json) => {
        this.setState({project: json})
      })
  }

  renderProject = () => {
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
              {/*<img src={'http://www.game-experience.it/wp-content/uploads/2017/06/dragon-ball-fighter-z-299x150.jpg'} alt="#" />*/}
            </div>
            <div className="project-data">
                {this.renderProject()}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default ProjectPage;
