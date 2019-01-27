const set_modal_state = () => {
	return {
		show_modal: false,
		title: '',
		body: '',
	}
}

export const Modal = (state = set_modal_state(), action) => {
	let new_state = { ...state };

	switch (action.type) {

		case 'HIDE_MODAL':
			new_state = set_modal_state();
			break;

		case 'SET_MODAL':
			new_state.show_modal = true;
			new_state.title = action.payload && action.payload.title ? action.payload.title : '';
			new_state.body = action.payload && action.payload.body ? action.payload.body : '';
			break;

		default:
			new_state = state;
	}
	return new_state || state;
};