import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: null,
			projects: null
		};
	}

	componentDidMount() {
		fetch('https://kickass-sdw-3a.herokuapp.com/api/users')
			.then(data => data.json())
			.then(res => {
				this.setState({
					users: res
				});
			})
			.catch(err => console.log('error ', err));

		fetch('https://kickass-sdw-3a.herokuapp.com/api/projects')
			.then(data => data.json())
			.then(res => {
				this.setState({
					projects: res
				});
			})
			.catch(err => console.log('error ', err));
	}


	renderUsers() {
		const { users } = this.state;

		return (
			users === null
				? <p>Datas are loading</p>
				: users.map(user => {
					return (
						<li>
							<a className="home-user" href={`/user/${user.name}`}>{user.name}</a>
						</li>
					)
				})
		)
	}

	renderProjects() {
		const { projects } = this.state;

		return (
			projects === null
				? <p>Datas are loading</p>
				: projects.map(project => {
					return (
						<li>
							<a className="home-user" href={`/project/${project.title}`}>{project.title}</a>
						</li>
					)
				})
		)
	}

	render() {
		return (
			<div className="flex-row">
				<div>
					<p>Users : </p>
					<ul>
						{this.renderUsers()}
					</ul>
				</div>
				<div>
					<p>Projects :</p>
					<ul>
						{this.renderProjects()}
					</ul>
				</div>
			</div>
		);
	}
}

export default Home;
