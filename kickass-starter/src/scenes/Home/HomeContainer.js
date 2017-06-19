import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from './HomeComponent';
import { API } from './../../variables';


function fetchUsers(WrappedComponent) {
	return class extends Component {
		componentDidMount() {
			fetch(`${API}/users`)
				.then(data => data.json())
				.then(result => this.props.fetchUsersComplete(result))
				.catch(err => this.props.fetchError(err));

			fetch(`${API}/projects`)
				.then(data => data.json())
				.then(result => this.props.fetchProjectsComplete(result))
				.catch(err => console.log('error', err));
		}
		render() {
			return (
				<WrappedComponent {...this.props} />
			);
		}
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchUsersComplete: (result) => dispatch({ type: 'INIT_USERS', result }),
		deleteUser: (index) => dispatch({ type: 'DELETE_USER', index }),
		fetchProjectsComplete: (result) => dispatch({ type: 'INIT_PROJECTS', result }),
		deleteProject: (index) => dispatch({ type: 'DELETE_PROJECT', index }),
		fetchError: (error) => console.log('error :', error),
	}
}

function mapStateToProps(state) {
	return {
		users: state.users,
		projects: state.projects
	}
}

const HomeContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(fetchUsers(Home));

export default HomeContainer;