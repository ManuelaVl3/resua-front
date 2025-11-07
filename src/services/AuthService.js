import axios from 'axios';

const API_BASE_URL = 'http://localhost:8083';

class AuthService {

    async registerUser(userData) {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/auth-ms/user`,
                userData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            throw error;
        }
    }

    async login(email, password) {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/auth-ms/login`,
                { email, password },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            if (response.data.success) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userId', response.data.userId);
                localStorage.setItem('userEmail', response.data.email);
                localStorage.setItem('userFullName', response.data.fullName);
            }
            
            return response.data;
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            throw error;
        }
    }

    async getUserById(userId) {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/auth-ms/user?id=${userId}`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error al obtener datos del usuario:', error);
            throw error;
        }
    }

    async updateUser(userId, userData) {
        try {
            const response = await axios.patch(
                `${API_BASE_URL}/auth-ms/user/${userId}`,
                userData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            throw error;
        }
    }

    logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userFullName');
        window.location.href = '/login';
    }

    isAuthenticated() {
        return localStorage.getItem('isLoggedIn') === 'true';
    }

    getCurrentUserId() {
        return localStorage.getItem('userId');
    }

    getCurrentUserEmail() {
        return localStorage.getItem('userEmail');
    }

    getCurrentUserFullName() {
        return localStorage.getItem('userFullName');
    }
}

export default AuthService;

