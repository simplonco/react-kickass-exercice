import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { API } from './../../variables';
import './User.css';

export default class User extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null
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

	handleDeleteUser() {
		console.log(this.state.user);
		fetch(`${API}/user/${this.state.user._id}`, {
			method: 'DELETE'
		})
			.then(data => console.log('user deleted'))
			.catch(err => console.log('error ', err));
	}

	render() {
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

						<button onClick={() => this.handleDeleteUser()}>Delete User {user.name}</button>
					</div>
				</div>
		)
	}
};
