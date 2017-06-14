import React, { Component } from 'react';
import { API } from './../../variables';
import List from './../../component/List/List';
import './Home.css';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: null,
			projects: null
		};
	}

	componentDidMount() {
		fetch(`${API}/users`)
			.then(data => data.json())
			.then(res => {
				this.setState({
					users: res
				});
			})
			.catch(err => console.log('error ', err));

		fetch(`${API}/projects`)
			.then(data => data.json())
			.then(res => {
				this.setState({
					projects: res
				});
			})
			.catch(err => console.log('error ', err));
	}


	render() {
		const { users, projects } = this.state;

		return (
			<div className="flex-row">
				<List
					datas={users}
					title="Users :"
					elementsType="user"
					propertyCalling="name"
				/>
				<List
					datas={projects}
					title="Projects :"
					elementsType="project"
					propertyCalling="title"
				/>
			</div>
		);
	}
}

