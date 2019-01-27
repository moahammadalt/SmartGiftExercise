export const Cached_apis = (state = {}, action) => {
	let new_state = {...state};

	switch (action.type) {

		case 'SET_CACHED_APIS':
			
			const now_time = (Math.floor(Date.now() / 1000));

			// check for expired cached apis to delete them and free the localstorage from those expired object
			for(let key in action.payload){
				if(action.payload[key].expire_at < now_time){
					delete action.payload[key];
				}
			}

			new_state = {...action.payload};
      break;
            
		default:
			new_state = state;
	}
	return new_state || state;
};