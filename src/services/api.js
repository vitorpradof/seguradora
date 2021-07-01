import axios from 'axios';

const api = axios.create({
	// baseURL: 'http://157.245.222.84:8080/seguradora'
	baseURL: 'http://localhost:5124/api/'
});

export default api;
