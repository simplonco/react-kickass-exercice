import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { API } from './../../variables';
import './User.css';
import Form from './../../component/Form/Form';
import List from './../../component/List/List';

export default class User extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: null,
			userProjects: [],
			update: false,
			redirectToHome: false,
			name: "",
			age: undefined,
			type: "",
		}

		this.handleUpdateFormSubmit = this.handleUpdateFormSubmit.bind(this);
		this.handleFormChange = this.handleFormChange.bind(this);
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

		fetch(`${API}/user/${this.props.match.params.userId}/projects`)
			.then(res => res.json())
			.then(userProjects => {
				this.setState({
					userProjects
				})
			})
	}


	handleDeleteUser() {
		fetch(`${API}/user/${this.state.user._id}`, {
			method: 'DELETE'
		})
			.then(data => {
				console.log('user deleted');
				this.setState({ redirectToHome: true });
			})
			.catch(err => console.log('error ', err));
	}

	handleUpdateUserBtnClick() {
		this.setState({
			update: true,
			name: this.state.user.name,
			age: this.state.user.age,
			type: this.state.user.type,
		});
	}

	handleFormChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleUpdateFormSubmit() {
		fetch(`${API}/user/${this.state.user._id}`, {
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

	renderUserInfo() {
		const { user, redirectToHome, userProjects } = this.state;

		if (redirectToHome) {
			return (
				<Redirect to="/" />
			)
		}

		return (
			user === null
				? <p className="text-center"><i className="fa fa-spin fa-spinner fa-2x" aria-hidden="true"></i></p>
				: <div className="container-center">
					<div className="sub-container user-info">
						<h3>User's informations :</h3>
						<p>Name : <span className="blue-text">{user.name}</span></p>
						<p>Age : <span className="blue-text">{user.age} years old</span></p>
						<p>Type : <span className="blue-text">{user.type}</span></p>

						{
							(userProjects.length > 0)
								? < List
									datas={userProjects}
									title={`${user.name}'s projects :`}
									elementsType="project"
									propertyCalling="title"

								/>
								: <p className="italic-text">No project for the moment</p>
						}

						<button className="gradient-btn color-1-gradient"
							onClick={() => this.handleUpdateUserBtnClick()}
						>Update User's informations</button>
						<button className="gradient-btn color-2-gradient"
							onClick={() => this.handleDeleteUser()}
						>
							<span>Delete User</span></button>
					</div>
				</div>
		)
	}

	renderUserUpdate() {
		const { name, age, type } = this.state;
		const formInputs = [
			{
				label: "Name",
				name: "name",
				type: "text",
				value: name,
			},
			{
				label: "Age",
				name: "age",
				type: "text",
				value: age,
			},
			{
				label: "Type",
				name: "type",
				type: "text",
				value: type,
			},
		];

		return (
			<Form
				title="Update user's informations :"
				buttonText="Update user"
				handleFormChange={this.handleFormChange}
				handleFormSubmit={this.handleUpdateFormSubmit}
				inputs={formInputs} />
		)
	}

	render() {
		const { update } = this.state;

		return (
			<div className="User">
				{
					(!update)
						? this.renderUserInfo()
						: this.renderUserUpdate()
				}
			</div>
		)
	}
};
