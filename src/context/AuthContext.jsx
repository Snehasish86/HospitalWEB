import { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check for stored user on mount
    useEffect(() => {
        const storedUser = AuthService.getCurrentUser();
        if (storedUser) {
            setUser(storedUser);
        }
        setLoading(false);
    }, []);

    // Login function
    const login = async (identifier, password) => {
        try {
            const userData = await AuthService.login({ identifier, password });
            setUser(userData);
            return userData; // Return full user data (token, etc.)
        } catch (error) {
            console.error('Login failed:', error);
            throw error; // Rethrow for component to handle errors
        }
    };

    // Register function
    const register = async (fullName, phoneNumber, password) => {
        try {
            const userData = await AuthService.register({ fullName, phoneNumber, password });
            setUser(userData);
            return userData;
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };

    // Logout function
    const logout = () => {
        AuthService.logout();
        setUser(null);
    };

    const value = {
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
