import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { API } from './../../variables';
import './User.css';

export default class User extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
			update: false
		}
	}

	componentDidMount() {
		fetch(`${API}/user/${this.props.match.params.userId}`)
			.then(res => res.json())
			.then(user => {
				this.setState({
					user: user
				});
			})
			.catch(err => console.log('error ', err));
	}

	handleUpdateUserBtnClick() {
		this.setState({
			update: true,
			name: this.state.user.name,
			age: this.state.user.age,
			type: this.state.user.type
		});
	}

	handleFormChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleDeleteUser() {
		fetch(`${API}/user/${this.state.user._id}`, {
			method: 'DELETE'
		})
			.then(data => console.log('user deleted'))
			.catch(err => console.log('error ', err));
	}

	handleUpdateUser() {
		fetch(`${API}/user/${this.state.user._id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
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
			})
			.catch(err => {
				console.log('error ', err);
			});
	}

	renderUserInfo() {
		const { user } = this.state;
		return (
			user === null
				? <p className="text-center"><i className="fa fa-spin fa-spinner fa-2x" aria-hidden="true"></i></p>
				: <div className="container-center">
					<div className="sub-container user-info">
						<h3>User's informations :</h3>
						<p>Name : <span className="blue-text">{user.name}</span></p>
						<p>Age : <span className="blue-text">{user.age} years old</span></p>
						<p>Type : <span className="blue-text">{user.type}</span></p>

						<button onClick={() => this.handleUpdateUserBtnClick()}>Update User's informations</button>
						<button onClick={() => this.handleDeleteUser()}>Delete User</button>
					</div>
				</div>
		)
	}

	renderUserUpdate() {
		const { name, age, type, user } = this.state;
		return (
			<div>
				<div className="container-center">
					<div className="sub-container user-info">
						<h3>Update User's informations :</h3>
						<label htmlFor="">Name</label>
						<input type="text" name="name" value={name} onChange={this.handleFormChange} />

						<label htmlFor="">Age</label>
						<input type="text" name="age" value={age} onChange={this.handleFormChange} />

						<label htmlFor="">Type</label>
						<input type="text" name="type" value={type} onChange={this.handleFormChange} />

						<button onClick={() => this.handleUpdateUser()}>Update User</button>
					</div>
				</div>
			</div>
		)
	}

	render() {
		const { user, update } = this.state;

		return (
			update === false
				? this.renderUserInfo()
				: this.renderUserUpdate()
		)
	}
};
