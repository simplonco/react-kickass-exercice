import React, { Component } from 'react';
import Form from './../../component/Form/Form';
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

		this.handleFormChange = this.handleFormChange.bind(this);
		this.handleCreateFormSubmit = this.handleCreateFormSubmit.bind(this);
	}

	handleFormChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}


	handleCreateFormSubmit() {
		fetch(`${API}/project`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Origin': '*',
			},
			body: JSON.stringify({
				title: this.state.title,
				description: this.state.description,
				creator: this.state.creator
			})
		})
			.then(project => {
				console.log('New project created')
				this.setState({ redirectToHome: true });
			})
			.catch(err => {
				console.log('error ', err);
			});
	}


	render() {
		const { redirectToHome, title, description, creator } = this.state;

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

		if (redirectToHome) {
			return (
				<Redirect to="/" />
			)
		}

		return (
			<Form
				title="New Project's informations :"
				buttonText="Create project"
				handleFormChange={this.handleFormChange}
				handleFormSubmit={this.handleCreateFormSubmit}
				inputs={formInputs}
			/>
		)
	}
}

export default CreateProject;
