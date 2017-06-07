import React, { Component } from 'react';
import { API } from './../../variables';

class CreateUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			age: "",
			type: ""
		};
	}


	handleFormChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleFormSubmit() {

		fetch(`${API}/user`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: this.state.name,
				age: this.state.age,
				type: this.state.type
			})
		})
			.then(res => {
				return res.json();
				// this.context.transitionTo('/');
			})
			.then(user => {
				console.log('New user created');
			})
			.catch(err => {
				console.log('error ', err);
			});
	}

	render() {
		const { name, age, type } = this.state;
		return (
			<div>
				{/*<form method="POST" action={`${API}/user`}>*/}
				<p>
					<label htmlFor="name">User Name</label>
					<input type="text" name="name" onChange={this.handleFormChange} value={name} />
				</p>
				<p>
					<label htmlFor="age">User Age</label>
					<input type="text" name="age" onChange={this.handleFormChange} value={age} />
				</p>
				<p>
					<label htmlFor="type">User Type</label>
					<input type="text" name="type" onChange={this.handleFormChange} value={type} />
				</p>
				<button onClick={() => this.handleFormSubmit()} >Create new user</button>
				{/*</form>*/}
			</div>
		);
	}
}

export default CreateUser;
