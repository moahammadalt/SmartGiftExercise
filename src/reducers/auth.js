export const Auth_token = (state = '', action) => {
	let new_state;

	switch (action.type) {

		case 'SET_AUTHENTICATION_TOKEN':
			new_state = action.payload;
            break;
            
		default:
			new_state = state;
	}
	return new_state || state;
};