import React, { Component } from 'react';
import { API } from './../../variables';
import './Project.css';

export default class Project extends Component {
	constructor(props) {
		super(props);
		this.state = {
			project: null,
			users: null,
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
			description: this.state.project.description,
			creator: this.state.project.creator || "Unknown"
		});

		fetch(`${API}/users`)
			.then(data => data.json())
			.then(res => {
				this.setState({
					users: res
				});
			})
			.catch(err => console.log('error ', err));
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

	handleUpdateProject() {
		fetch(`${API}/project/${this.state.project._id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
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
		const { project } = this.state;

		return (
			project === null
				? <p className="text-center"><i className="fa fa-spin fa-spinner fa-2x" aria-hidden="true"></i></p>
				: <div className="container-center">
					<div className="sub-container user-info">
						<h3>Project's informations :</h3>
						<p>Title : <span className="blue-text">{project.title}</span></p>
						<p>Description : <span className="blue-text">{project.description}</span></p>
						<p>Creator : <span className="blue-text">{project._creator || "Unknown"}</span></p>

						<button onClick={() => this.handleUpdateProjectBtnClick()}>Update Project's informations</button>
						<button onClick={() => this.handleDeleteProject()}>Delete Project</button>
					</div>
				</div>
		)
	}

	handleUserSearch() {
		const { users, creator } = this.state;

		if (users === null) {
			return null;
		}
		const replace = creator.toLowerCase();
		const re = new RegExp(replace, "g");

		let searchUser = users.filter((user) => {
			return re.test(user.name.toLowerCase());
		});

		return (
			(this.state.creator === "" || this.state.creator === "Unknown")
				? null
				: (
					<ul id="user-suggestion">
						{searchUser.map((user, index) => {
							console.log(user);
							return <li key={index} onClick={() => this.setCreatorId(user._id)}>{user.name}</li>
						})}
					</ul>
				)
		)
	}

	setCreatorId(userId) {
		this.setState({
			creator: userId
		})
	}

	renderProjectUpdate() {
		const { title, description, creator } = this.state;

		return (
			<div>
				<div className="container-center">
					<div className="sub-container user-info">
						<h3>Update Project's informations :</h3>
						<p>
							<label htmlFor="">Title</label>
							<input type="text" name="title" value={title} onChange={this.handleFormChange} />
						</p>
						<p>
							<label htmlFor="">Description</label>
							<textarea type="text" name="description" value={description} onChange={this.handleFormChange} />
						</p>
						<p>
							<label htmlFor="">Creator</label>
							<input type="text" name="creator" value={creator} onChange={this.handleFormChange} />


							{this.handleUserSearch()}


						</p>

						<button onClick={() => this.handleUpdateProject()}>Update Project</button>
					</div>
				</div>
			</div>
		)
	}

	render() {
		const { update } = this.state;

		return (
			(!update)
				? this.renderProjectInfo()
				: this.renderProjectUpdate()
		)
	}
};
