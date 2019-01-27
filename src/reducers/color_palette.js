const set_color_palette = () => {
	return {
    header_color: '#ffffff',
		background_color: '#f8f8f8',
	}
}

export const Color_palette = (state = set_color_palette(), action) => {
	let new_state = {...state};

	switch (action.type) {
		case 'SET_HEADER_COLOR':
			new_state.header_color = action.payload;
			break;

		case 'SET_BACKGROUND_COLOR':
			new_state.background_color = action.payload;
			break;

		default:
			new_state = state;
	}
	return new_state || state;
};