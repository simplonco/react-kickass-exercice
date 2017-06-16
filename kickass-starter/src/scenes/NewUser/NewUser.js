import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { API } from './../../variables';
import UserForm from './../../component/UserForm/UserForm';

class CreateUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			age: "",
			type: "",
			redirectToHome: false
		};
	}


	// handleFormChange = (e) => {
	// 	this.setState({
	// 		[e.target.name]: e.target.value
	// 	});
	// }

	// handleFormSubmit() {

	// 	fetch(`${API}/user`, {
	// 		method: 'POST',
	// 		headers: { 'Content-Type': 'application/json' },
	// 		body: JSON.stringify({
	// 			name: this.state.name,
	// 			age: this.state.age,
	// 			type: this.state.type
	// 		})
	// 	})
	// 		.then(res => {
	// 			return res.json();
	// 			// this.context.transitionTo('/');
	// 		})
	// 		.then(user => {
	// 			console.log('New user created');
	// 			this.setState({ redirectToHome: true });
	// 		})
	// 		.catch(err => {
	// 			console.log('error ', err);
	// 		});
	// }

	render() {
		// const { name, age, type, redirectToHome } = this.state;

		// if (redirectToHome) {
		// 	return (
		// 		<Redirect to="/" />
		// 	)
		// }

		return (
			<div>
				<UserForm action="create" />
			</div>
		)
	}
}

export default CreateUser;
