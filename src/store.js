import { createStore, compose } from 'redux';
import rootReducer from './reducers/root';
import { persistStore } from 'redux-persist';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(rootReducer, {}, composeEnhancers());
let persistor = persistStore(store);

/*// check if the presisit store expiration date is unvalid, clear all the presist store variables (for caching api calls for 1 hour)
if(Number(JSON.parse(window.localStorage.getItem('persist:root')).Reducers_expire) < (Math.floor(Date.now() / 1000))){
	persistor.purge();
}*/

export { store, persistor };