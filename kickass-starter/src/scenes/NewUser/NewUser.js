import React, { Component } from 'react';
import Form from './../../component/Form/Form';
import { Redirect } from 'react-router-dom';
import { API } from './../../variables';

class CreateUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			age: "",
			type: "",
			redirectToHome: false
		};

		this.handleFormChange = this.handleFormChange.bind(this);
		this.handleCreateFormSubmit = this.handleCreateFormSubmit.bind(this);
	}

	handleFormChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleCreateFormSubmit() {
		fetch(`${API}/user`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Origin': '*'
			},
			body: JSON.stringify({
				name: this.state.name,
				age: this.state.age,
				type: this.state.type
			})
		})
			.then(project => {
				console.log('New user created')
				this.setState({ redirectToHome: true });
			})
			.catch(err => {
				console.log('error ', err);
			});
	};

	render() {
		const { redirectToHome } = this.state;

		const formInputs = [
			{
				label: "Name",
				name: "name",
				type: "text",
				value: this.state.name,
				textarea: false,
			},
			{
				label: "Age",
				name: "age",
				type: "text",
				value: this.state.age,
			},
			{
				label: "Type",
				name: "type",
				type: "text",
				value: this.state.type,
			}
		]


		if (redirectToHome) {
			return (
				<Redirect to="/" />
			)
		}

		return (
			<div>
				<Form
					title="New user's informations :"
					buttonText="Create user"
					handleFormChange={this.handleFormChange}
					handleFormSubmit={this.handleCreateFormSubmit}
					inputs={formInputs}
				/>
			</div>
		)
	}
}

export default CreateUser;
