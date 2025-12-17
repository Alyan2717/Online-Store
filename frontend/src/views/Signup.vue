<template>
    <div class="auth-container">
        <div class="auth-card">
            <h2>Create Account</h2>

            <form @submit.prevent="submit">
                <input v-model="name" placeholder="Full Name" required />
                <input v-model="email" type="email" placeholder="Email" required />
                <input v-model="password" type="password" placeholder="Password" required />
                <button class="btn">Sign Up</button>
            </form>

            <p>
                Already have an account?
                <router-link to="/login">Login</router-link>
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../services/api';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();

async function submit() {
    try {
        await api.post('/auth/signup', {
            name: name.value,
            email: email.value,
            password: password.value
        });

        router.push('/login');
    } catch {
        alert('Signup failed');
    }
}
</script>
