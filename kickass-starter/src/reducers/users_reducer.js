const initialState = [];

function users(state = initialState, action) {
	switch (action.type) {
		case 'INIT_USERS':
			return action.result;

		case 'DELETE_USER':
			const newState = state.concat();
			newState.splice(action.index, 1);
			return newState;

		default:
			return state;
	}
}

export default users;