import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { API } from './../../variables';

class ProjectForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			description: "",
			creator: "",
			users: null,
			redirectToHome: false
		};
	}

	componentDidMount() {
		const { title, description, creator } = this.props;

		this.setState({
			title,
			description,
			creator
		});

		fetch(`${API}/users`)
			.then(data => data.json())
			.then(users => {
				this.setState({
					users
				});
			})
			.catch(err => console.log('error ', err));

	}

	handleFormChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	// display the list of users name suggestion according to the value of the input text creator and return user's id
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
							return (
								<li key={index}
									onClick={() => this.setCreatorId(user)}
								>{user.name}</li>
							)
						})}
					</ul>
				)
		)
	}

	setCreatorId(user) {
		this.setState({
			creator: user._id,
			creatorName: user.name
		})
	}


	handleCreateFormSubmit() {
		fetch(`${API}/project`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Origin': 'Access-Control-Allow-Origin'
			},
			body: JSON.stringify({
				title: this.state.title,
				description: this.state.description,
				creator: this.state.creator
			})
		})
			.then(project => {
				(this.props.action === "update")
					? console.log('Project updated')
					: console.log('New project created')

				this.setState({ redirectToHome: true });
			})
			.catch(err => {
				console.log('error ', err);
			});
	}

	handleUpdateFormSubmit() {
		fetch(`${API}/project/${this.props.projectId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Origin': 'Access-Control-Allow-Origin'
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


	render() {
		const { title, description, creator, redirectToHome } = this.state;
		const { action } = this.props;

		if (redirectToHome) {
			return (
				<Redirect to="/" />
			)
		}

		return (

			<div>
				<div className="container-center">
					<div className="sub-container user-info">
						<h3>{(action === "update") ? "Update" : "Create"} project's informations :</h3>
						<div>
							<label htmlFor="title">Title</label>
							<input type="text"
								name="title"
								value={title}
								onChange={this.handleFormChange} />
						</div>
						<div>
							<label htmlFor="description">Description</label>
							<textarea type="text"
								name="description"
								value={description}
								onChange={this.handleFormChange} />
						</div>
						<div>
							<label htmlFor="creator">Creator</label>
							<input type="text"
								name="creator"
								value={creator}
								onChange={this.handleFormChange} />

							{this.handleUserSearch()}
						</div>

						<button
							onClick={() => {
								(action === "update")
									? this.handleUpdateFormSubmit()
									: this.handleCreateFormSubmit()
							}}
						>
							{(action === "update") ? "Update" : "Create"} Project</button>
					</div>
				</div>
			</div>
		);
	}
}

ProjectForm.propTypes = {
	action: PropTypes.string.isRequired,
	title: PropTypes.string,
	description: PropTypes.string,
	creator: PropTypes.string,
	projectId: PropTypes.string,
}

ProjectForm.defaultProps = {
	title: "",
	description: "",
	creator: "",
	projectId: "",
}

export default ProjectForm;
