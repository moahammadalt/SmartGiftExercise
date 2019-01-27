import { Product } from './product';
import { Modal } from './modal';
import { Selected_sku } from './selected_sku';
import { Color_palette } from './color_palette';
import storage from 'redux-persist/es/storage';
import { persistCombineReducers } from 'redux-persist';
import { Cached_apis } from './cached_apis';

export default persistCombineReducers({ 
	key: 'root',
	storage,
	whitelist: ['Cached_apis'] 
}, {
	Product,
	Selected_sku,
	Modal,
	Color_palette,
	Cached_apis
});