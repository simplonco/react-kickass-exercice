import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from './HomeComponent';
import { API } from './../../variables';


function fetchUsers(WrappedComponent) {
	return class extends Component {
		componentDidMount() {
			fetch(`${API}/users`)
				.then(data => data.json())
				.then(result => {
					console.log('result :', result);
					this.props.fetchUsersComplete(result);
				})
				.catch(err => this.props.fetchError(err));
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
		fetchUsersComplete: (result) => {
			dispatch({ type: 'INIT_USERS', result });
		},
		fetchError: (error) => {
			console.log('error :', error);
		}
	}
}

function mapStateToProps(state) {
	return {
		users: state.users
	}
}

const HomeContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(fetchUsers(Home));

export default HomeContainer;