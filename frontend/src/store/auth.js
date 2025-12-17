import { defineStore } from 'pinia';
import api from '../services/api';

// In store/auth.js
export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null,
        isLoading: false
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
        isAdmin: (state) => state.user?.role === 'admin'
    },

    actions: {
        async login(credentials) {
            const res = await api.post('/auth/login', credentials);

            this.token = res.data.token;
            localStorage.setItem('token', this.token);

            await this.fetchProfile();
        },

        async fetchProfile() {
            try {
                const res = await api.get('/auth/me');
                this.user = res.data;
            } catch (error) {
                // If token is invalid, clear it
                this.logout();
                throw error;
            }
        },

        logout() {
            this.token = null;
            this.user = null;
            localStorage.removeItem('token');
        }
    }
});