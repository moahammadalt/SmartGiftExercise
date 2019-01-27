export const Product = (state = {}, action) => {
	let new_state = {...state};

	switch (action.type) {

		case 'SET_SELECTED_PRODUCT':
			new_state = {...action.payload};
            break;
            
		default:
			new_state = state;
	}
	return new_state || state;
};