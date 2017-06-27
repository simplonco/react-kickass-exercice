import React, { Component } from 'react';
import { API } from './../../variables';
import Form from './../../component/Form/Form';
import './Project.css';

export default class Project extends Component {
	constructor(props) {
		super(props);
		this.state = {
			project: null,
			user: null,
			title: "",
			description: "",
			creator: "",
			update: false,
		}

		this.handleFormChange = this.handleFormChange.bind(this);
		this.handleUpdateFormSubmit = this.handleUpdateFormSubmit.bind(this);
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

	handleUpdateFormSubmit() {
		fetch(`${API}/project/${this.props.projectId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title: this.state.title,
				description: this.state.description,
				creator: this.state.creator
			})
		})
			.then(res => {
				return res.json();
			})
			.then(user => {
				console.log('Project updated');
				window.location.reload();
			})
			.catch(err => {
				console.log('error ', err);
			});
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

						<button className="gradient-btn color-1-gradient"
							onClick={() => this.handleUpdateProjectBtnClick()}
						>Update Project's informations</button>
						<button className="gradient-btn color-2-gradient"
							onClick={() => this.handleDeleteProject()}
						>Delete Project</button>
					</div>
				</div>
		)
	}

	render() {
		const { update, project, title, description, creator } = this.state;

		const formInputs = [
			{
				label: "Title",
				name: "title",
				type: "text",
				value: title,
			},
			{
				label: "Description",
				name: "description",
				type: "text",
				value: description,
				textarea: true,
			},
			{
				label: "Creator",
				name: "creator",
				type: "text",
				value: creator,
			}
		]

		return (
			(!update)
				? this.renderProjectInfo()
				: <Form
					title="Update project's informations :"
					buttonText="Update project"
					handleFormChange={this.handleFormChange}
					handleFormSubmit={this.handleUpdateFormSubmit}
					inputs={formInputs}
				/>
		)
	}
};
