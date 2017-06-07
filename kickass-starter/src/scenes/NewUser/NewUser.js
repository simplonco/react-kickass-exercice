import React, { Component } from 'react';


class CreateUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			age: null,
			type: ""
		};
	}


	handleFormChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	render() {
		const { name, age, type } = this.state;
		return (
			<div>
				<form action="https://kickass-sdw-3a.herokuapp.com/api/user" method="POST">
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
					<input type="submit" />
				</form>
			</div>
		);
	}
}

export default CreateUser;
