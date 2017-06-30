import React, { Component } from 'react';
import { API } from './../../variables';
import { Link } from 'react-router-dom';
import Form from './../../component/Form/Form';
import './Project.css';

export default class Project extends Component {
	constructor(props) {
		super(props);
		this.state = {
			project: null,
			title: "",
			description: "",
			creator: "",
			update: false,
		}

		this.handleFormChange = this.handleFormChange.bind(this);
		this.handleUpdateFormSubmit = this.handleUpdateFormSubmit.bind(this);
	}

	componentDidMount() {
		fetch(`${API}/project/${this.props.match.params.projectId}`)
			.then(res => res.json())
			.then(project => this.setState({ project }))
			.catch(err => console.log('error ', err));
	}

	handleUpdateProjectBtnClick() {
		const { project } = this.state;
		this.setState({
			update: true,
			title: project.title,
			description: project.description,
			creator: project._creator,
		});
	}

	handleFormChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleDeleteProject() {
		fetch(`${API}/project/${this.state.project.project_id}`, {
			method: 'DELETE'
		})
			.then(data => {
				console.log('project deleted');
				this.setState({ redirectToHome: true });
			})
			.catch(err => console.log('error ', err));
	}

	handleUpdateFormSubmit() {
		fetch(`${API}/project/${this.props.projectId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title: this.state.title,
				description: this.state.description,
				creator: this.state.creator
			})
		})
			.then(res => {
				return res.json();
			})
			.then(user => {
				console.log('Project updated');
				window.location.reload();
			})
			.catch(err => {
				console.log('error ', err);
			});
	}



	renderProjectInfo() {
		const { project } = this.state;

		return (
			(project === null)
				? <p className="text-center"><i className="fa fa-spin fa-spinner fa-2x" aria-hidden="true"></i></p>
				: <div className="container-center">
					<div className="sub-container user-info">
						<h3>Project's informations :</h3>
						<p>Title : <span className="blue-text">{project.title}</span></p>
						<p>Description : <span className="blue-text">{project.description}</span></p>
						<p>Creator : <Link to={`/user/${project.user_id}`} className="blue-text">
							{project.name}
						</Link></p>

						<button className="gradient-btn color-1-gradient"
							onClick={() => this.handleUpdateProjectBtnClick()}
						>Update Project's informations</button>
						<button className="gradient-btn color-2-gradient"
							onClick={() => this.handleDeleteProject()}
						>Delete Project</button>
					</div>
				</div>
		)
	}

	render() {
		const { update, title, description, creator } = this.state;

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

		return (
			(!update)
				? this.renderProjectInfo()
				: <Form
					title="Update project's informations :"
					buttonText="Update project"
					handleFormChange={this.handleFormChange}
					handleFormSubmit={this.handleUpdateFormSubmit}
					inputs={formInputs}
				/>
		)
	}
};
