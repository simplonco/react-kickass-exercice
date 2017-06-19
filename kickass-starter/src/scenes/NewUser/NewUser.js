import React, { Component } from 'react';
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

	render() {

		return (
			<div>
				<UserForm action="create" />
			</div>
		)
	}
}

export default CreateUser;
