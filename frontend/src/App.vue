<template>
  <nav>
    <router-link to="/">Products</router-link>
    <router-link to="/cart">Cart</router-link>

    <template v-if="!auth.isAuthenticated">
      <router-link to="/login">Login</router-link>
      <router-link to="/signup">Signup</router-link>
    </template>

    <template v-else>
      <router-link v-if="auth.isAdmin" to="/admin">Admin</router-link>
      <button @click="logout">Logout</button>
    </template>
  </nav>

  <div class="container">
    <router-view />
  </div>
</template>

<script setup>
import { useAuthStore } from './store/auth';
import { useRouter } from 'vue-router';
import { useCartStore } from './store/cart';

const cart = useCartStore();
const auth = useAuthStore();
const router = useRouter();

function logout() {
  auth.logout();
  cart.clear();
  router.push('/login');
}
</script>
