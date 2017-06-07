import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: null
		};
	}

	componentDidMount() {
		fetch('https://kickass-sdw-3a.herokuapp.com/api/users')
			.then(data => data.json())
			.then(res => {
				this.setState({
					users: res
				})
			})
			.catch(err => console.log('error ', err))
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

	render() {
		return (
			<div>
				{this.renderUsers()}
			</div>
		);
	}
}

export default Home;
