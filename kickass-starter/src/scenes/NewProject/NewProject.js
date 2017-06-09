import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { API } from './../../variables';

class CreateProject extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			description: "",
			creator: "",
			redirectToHome: false
		};
	}


	handleFormChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleFormSubmit() {

		fetch(`${API}/project`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				title: this.state.title,
				description: this.state.description,
				_creator: this.state.creator
			})
		})
			.then(res => {
				return res.json();
				// this.context.transitionTo('/');
			})
			.then(user => {
				console.log('New project created');
				this.setState({ redirectToHome: true });
			})
			.catch(err => {
				console.log('error ', err);
			});
	}

	render() {
		const { title, description, creator, redirectToHome } = this.state;

		if (redirectToHome) {
			return (
				<Redirect to="/" />
			)
		}

		return (
			< div >
				<p>
					<label htmlFor="title">Project Title</label>
					<input type="text"
						name="title"
						onChange={this.handleFormChange}
						value={title} />
				</p>
				<p>
					<label htmlFor="description">Description</label>
					<textarea type="text"
						name="description"
						onChange={this.handleFormChange}
						value={description} />
				</p>
				<p>
					<label htmlFor="creator">Creator</label>
					<input type="text"
						name="creator"
						onChange={this.handleFormChange}
						value={creator} />
				</p>
				<button onClick={() => this.handleFormSubmit()} >Create new project</button>
			</div >
		);
	}
}

export default CreateProject;
