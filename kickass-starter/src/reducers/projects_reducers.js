const initialState = [];

function projects(state = initialState, action) {
	switch (action.type) {
		case 'INIT_PROJECTS':
			return action.result;

		case 'DELETE_PROJECT':
			const newState = state.concat();
			newState.splice(action.index, 1);
			return newState;

		default:
			return state;
	}
}

export default projects;