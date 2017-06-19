const initialState = [
	{ name: "Polo", age: 25, type: "Human" }
];

function users(state = initialState, action) {
	switch (action.type) {
		case 'INIT_USERS':
			return action.result;

		default:
			return state;
	}
}

export default users;