import React, { Component } from 'react';
import { API } from './../../variables';
import ProjectForm from './../../component/ProjectForm/ProjectForm';
import './Project.css';

export default class Project extends Component {
	constructor(props) {
		super(props);
		this.state = {
			project: null,
			user: null,
			update: false
		}
	}

	componentDidMount() {
		fetch(`${API}/project/${this.props.match.params.projectId}`)
			.then(res => res.json())
			.then(project => {
				fetch(`${API}/user/${project._creator}`)
					.then(data => data.json())
					.then(user => {
						this.setState({
							project: project
						});
						this.setState({
							user: user
						});
					})
					.catch(err => console.log('error', err));
			})
			.catch(err => console.log('error ', err));

	}

	handleUpdateProjectBtnClick() {
		this.setState({
			update: true,
			title: this.state.project.title,
			description: this.state.project.description,
			creator: this.state.project.creator || "Unknown"
		});
	}

	handleFormChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleDeleteProject() {
		fetch(`${API}/project/${this.state.project._id}`, {
			method: 'DELETE'
		})
			.then(data => {
				console.log('project deleted');
				this.setState({ redirectToHome: true });
			})
			.catch(err => console.log('error ', err));


	}

	renderProjectInfo() {
		const { project, user } = this.state;

		return (
			(project === null)
				? <p className="text-center"><i className="fa fa-spin fa-spinner fa-2x" aria-hidden="true"></i></p>
				: <div className="container-center">
					<div className="sub-container user-info">
						<h3>Project's informations :</h3>
						<p>Title : <span className="blue-text">{project.title}</span></p>
						<p>Description : <span className="blue-text">{project.description}</span></p>
						<p>Creator : <span className="blue-text">
							{(user !== null) ? user.name : "Unknown"}
						</span></p>

						<button onClick={() => this.handleUpdateProjectBtnClick()}>Update Project's informations</button>
						<button onClick={() => this.handleDeleteProject()}>Delete Project</button>
					</div>
				</div>
		)
	}

	render() {
		const { update, project } = this.state;

		return (
			(!update)
				? this.renderProjectInfo()
				: <ProjectForm action="update"
					title={project.title}
					description={project.description}
					creator={project._creator}
					projectId={project._id} />
		)
	}
};
