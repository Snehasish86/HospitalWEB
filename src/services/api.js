import axios from 'axios';

// Create an Axios instance with base URL
const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Backend base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to add JWT token to every request if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Add Authorization header
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
