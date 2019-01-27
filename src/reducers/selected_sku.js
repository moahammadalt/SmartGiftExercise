export const Selected_sku = (state = {}, action) => {
	let new_state = {...state};

	switch (action.type) {

		case 'SET_SELECTED_SKU':
			new_state = {...action.payload};
            break;
            
		default:
			new_state = state;
	}
	return new_state || state;
};