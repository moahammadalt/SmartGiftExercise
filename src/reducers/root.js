import { Auth_token } from './auth';
import { Product } from './product';
import { Modal } from './modal';
import { Selected_sku } from './selected_sku';
import storage from 'redux-persist/es/storage'
import { persistCombineReducers } from 'redux-persist'

export default persistCombineReducers({ 
	key: 'root',
	storage,
	whitelist: ['Auth_token'] 
}, {
	Auth_token,
	Product,
	Selected_sku,
	Modal
});