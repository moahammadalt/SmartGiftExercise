import axios from 'axios';
import Alert from 'react-s-alert';

//creates hash based object from an array depending on a key
export const create_hash = (arr, key) => {
	var Hash = function () {
		this.data = {};
		if (arr && Array.isArray(arr)) {
			for(let o in arr){
				this.data[o[key]] = o;
			}
			this.size = arr.length;
		}
		else {
			this.size = 0;
		}
	};
	Hash.prototype.keys = function () {
		return Object.keys(this.data);
	}
	Hash.prototype.values = function () {
		return Object.values(this.data);
	}

	return new Hash();
};


// value checker for falsy customized values (false || null || undefined || '' || {})
export const check_value = (value, key) => {

	value = key ? key.split(".").reduce((o, x) => (typeof o == "undefined" || o === null) ? o : o[x], value) : value;
	return (value === undefined || value === null || (!value && value !== 0 && value !== '0') || value === '' || /^\s*$/.test(value) || (typeof value === 'object' && is_obj_empty(value))) ? false : true;
};

export const get_caching_time = () => 3600;

export const set_authorization_token = token => {

	if (token) {
		axios.defaults.headers.common['authtoken'] = token;
	}
	else {
		delete axios.defaults.headers.common['authtoken'];
	}
};

export const is_obj_empty = obj => {

	if (obj == null || obj.length === 0 || typeof obj !== "object") return true;
	if (obj.length > 0 || obj instanceof Date) return false;
	for (var key in obj) {
		if (hasOwnProperty.call(obj, key)) return false;
	}
	
	return true;
};

export const get_host_url = () => {
	return `${(window.location.hostname === 'localhost' || window.location.hostname === 'smartgift-exercise.herokuapp.com') ? 'https://api-dev.smartgiftit.com' : `https://production_host.com`}`;
};

export const api = {

	post: (api, params, success, fail) => {
		axios.post(`${get_host_url()}${api}`, params).then(data => {

			if(success){
				success(data && data.data && data.data.data ? data.data.data : data && data.data ? data.data : data);
			}
		}).catch(err => fail ? fail(err) : Handler_error(err));
	},

	get: (api, success, fail) => {
		axios.get(`${get_host_url()}${api}`).then(data => {

			if(success){
				success(data && data.data && data.data.data ? data.data.data : data && data.data ? data.data : data);
			}
		}).catch(err => fail ? fail(err) : Handler_error(err));
	},
};

export const Handler_error = err => {

	let status = err.response !== undefined && err.response.status ? `[${err.response.status}]` : '';
	if (err.response) {
		return Alert.error(`Server error ${status} , please contact the admin`);
	}
	else if (err.request) {
		return Alert.error(`Server call could not be completed ${status}`);
	}
	else if (err.status === false) {
		return Alert.warning('<i class="fas fa-times-circle"></i>  ' + err.state, { timeout: 5000 });
	}
	else {

		return Alert.error(`${err}`);
	}
};