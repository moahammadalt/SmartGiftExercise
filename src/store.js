import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/root';
import { persistStore, purgeStoredState } from 'redux-persist';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(rootReducer, {}, composeEnhancers());
let persistor = persistStore(store);

//persistor.purge();

export { store, persistor };