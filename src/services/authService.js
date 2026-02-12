import api from './api';

const AuthService = {
    // Register a new user
    register: async ({ fullName, phoneNumber, password }) => {
        try {
            const response = await api.post('/auth/register', {
                fullName,
                phoneNumber,
                password,
            });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token); // Store token
                localStorage.setItem('user', JSON.stringify(response.data)); // Store user details (optional)
            }
            return response.data;
        } catch (error) {
            // Extract error message from backend response
            const errorMessage = error.response?.data?.error || error.response?.data?.message || 'Registration failed. Please try again.';
            throw new Error(errorMessage);
        }
    },

    // Login an existing user
    login: async ({ identifier, password }) => {
        try {
            const response = await api.post('/auth/login', {
                identifier,
                password,
            });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token); // Store token
                localStorage.setItem('user', JSON.stringify(response.data)); // Store user details (optional)
            }
            return response.data;
        } catch (error) {
            // Extract error message from backend response
            const errorMessage = error.response?.data?.error || error.response?.data?.message || 'Login failed. Please try again.';
            throw new Error(errorMessage);
        }
    },

    // Logout user
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    // Get current user from storage
    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem('user'));
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    }
};

export default AuthService;
