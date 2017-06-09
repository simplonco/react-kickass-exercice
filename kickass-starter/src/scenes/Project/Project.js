import React, { Component } from 'react';
import { API } from './../../variables';
import './Project.css';

export default class Project extends Component {
	constructor(props) {
		super(props);
		this.state = {
			project: null,
			update: false
		}
	}

	componentDidMount() {
		fetch(`${API}/project/${this.props.match.params.projectId}`)
			.then(res => res.json())
			.then(project => {
				this.setState({
					project: project
				});
			})
			.catch(err => console.log('error ', err));
	}

	handleUpdateProjectBtnClick() {
		this.setState({
			update: true,
			title: this.state.project.title,
			description: this.state.project.description
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
			.then(data => console.log('project deleted'))
			.catch(err => console.log('error ', err));
	}

	handleUpdateProject() {
		fetch(`${API}/project/${this.state.project._id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				title: this.state.title,
				description: this.state.description,
				author: this.state.author
			})
		})
			.then(res => {
				return res.json();
			})
			.then(user => {
				console.log('Project updated');
			})
			.catch(err => {
				console.log('error ', err);
			});
	}

	renderProjectInfo() {
		const { project } = this.state;
		return (
			project === null
				? <p className="text-center"><i className="fa fa-spin fa-spinner fa-2x" aria-hidden="true"></i></p>
				: <div className="container-center">
					<div className="sub-container user-info">
						<h3>Project's informations :</h3>
						<p>Title : <span className="blue-text">{project.title}</span></p>
						<p>Description : <span className="blue-text">{project.description}</span></p>
						{/*<p>Author : <span className="blue-text">{project.creator}</span></p>*/}

						<button onClick={() => this.handleUpdateProjectBtnClick()}>Update Project's informations</button>
						<button onClick={() => this.handleDeleteProject()}>Delete Project</button>
					</div>
				</div>
		)
	}

	renderUserUpdate() {
		const { title, description, author, project } = this.state;
		return (
			<div>
				<div className="container-center">
					<div className="sub-container user-info">
						<h3>Update Project's informations :</h3>
						<label htmlFor="">Title</label>
						<input type="text" name="title" value={title} onChange={this.handleFormChange} />

						<label htmlFor="">Description</label>
						<textarea type="text" name="description" value={description} onChange={this.handleFormChange} />

						<button onClick={() => this.handleUpdateProject()}>Update Project</button>
					</div>
				</div>
			</div>
		)
	}

	render() {
		const { user, update } = this.state;

		return (
			update === false
				? this.renderProjectInfo()
				: this.renderUserUpdate()
		)
	}
};
