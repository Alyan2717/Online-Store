import axios from 'axios';
import { useAuthStore } from '../store/auth';
import router from '../router';

const api = axios.create({
    baseURL: 'http://localhost:3000/api'
    // baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
});

// Attach token automatically
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        delete config.headers.Authorization;
    }
    return config;
});

// RESPONSE interceptor (handle 401 globally)
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            const auth = useAuthStore();

            auth.logout();
            router.push('/login');
        }

        return Promise.reject(error);
    }
);

export default api;
