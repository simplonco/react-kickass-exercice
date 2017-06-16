import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { API } from './../../variables';

class UserForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			age: "",
			type: "",
			redirectToHome: false
		};
	}

	componentDidMount() {
		const { name, age, type } = this.props;

		this.setState({
			name,
			age,
			type
		});
	}

	handleFormChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}


	handleCreateFormSubmit() {
		fetch(`${API}/user`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Origin': 'Access-Control-Allow-Origin'
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
	}

	handleUpdateFormSubmit() {
		fetch(`${API}/user/${this.props.userId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Origin': 'Access-Control-Allow-Origin'
			},
			body: JSON.stringify({
				name: this.state.name,
				age: this.state.age,
				type: this.state.type
			})
		})
			.then(res => {
				return res.json();
			})
			.then(user => {
				console.log('User updated');
				window.location.reload();
			})
			.catch(err => {
				console.log('error ', err);
			});
	}


	render() {
		const { name, age, type, redirectToHome } = this.state;
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
						<h3>
							{(action === "update") ? "Update" : "Create"} user's informations :
							</h3>
						<div>
							<label htmlFor="">Name</label>
							<input type="text"
								name="name"
								value={name}
								onChange={this.handleFormChange} />
						</div>

						<div>
							<label htmlFor="">Age</label>
							<input type="text"
								name="age"
								value={age}
								onChange={this.handleFormChange} />
						</div>

						<div>
							<label htmlFor="">Type</label>
							<input type="text"
								name="type"
								value={type}
								onChange={this.handleFormChange} />
						</div>

						<button
							onClick={() => {
								(action === "update")
									? this.handleUpdateFormSubmit()
									: this.handleCreateFormSubmit()
							}}
						>
							{(action === "update") ? "Update User" : "Create User"}
						</button>
					</div>
				</div>
			</div>
		);
	}
}

UserForm.propTypes = {
	action: PropTypes.string.isRequired,
	name: PropTypes.string,
	age: PropTypes.number,
	type: PropTypes.string,
	userId: PropTypes.string
}

UserForm.defaultProps = {
	name: "",
	age: "",
	type: "",
	userId: ""
}

export default UserForm;
