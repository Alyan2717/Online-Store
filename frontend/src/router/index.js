import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../store/auth';

import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import Products from '../views/Products.vue';
import AdminDashboard from '../views/AdminDashboard.vue';
import Cart from '../views/Cart.vue';

const routes = [
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    {
        path: '/',
        component: Products,
        beforeEnter: () => {
            const auth = useAuthStore();
            if (auth.isAdmin) return '/admin';
        }
    },
    { path: '/cart', component: Cart },

    {
        path: '/admin',
        component: AdminDashboard,
        meta: { requiresAuth: true, adminOnly: true }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// In router/index.js
router.beforeEach(async (to) => {
    const auth = useAuthStore();

    if (auth.token && !auth.user) {
        await auth.fetchProfile();
    }

    // Prevent logged-in users from visiting login/signup
    if ((to.path === '/login' || to.path === '/signup') && auth.isAuthenticated) {
        return auth.isAdmin ? '/admin' : '/';
    }

    if (to.meta.requiresAuth && !auth.isAuthenticated) {
        return '/login';
    }

    if (to.meta.adminOnly && !auth.isAdmin) {
        return '/';
    }
});

export default router;