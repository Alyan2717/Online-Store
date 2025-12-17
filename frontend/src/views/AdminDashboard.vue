<template>
    <div>
        <h2>Admin Dashboard</h2>

        <div v-for="group in ordersByUser" :key="group.user._id" class="card" style="margin-bottom:20px;">
            <h3>{{ group.user.name }} ({{ group.user.email }})</h3>

            <table width="100%" cellspacing="0">
                <thead>
                    <tr>
                        <th align="left">Order</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order in group.orders" :key="order._id">
                        <td>{{ order._id }}</td>
                        <td>{{ order.status }}</td>
                        <td>${{ order.totalAmount }}</td>
                        <td>
                            <button class="btn" @click="update(order._id, 'paid')">Paid</button>
                            <button class="btn danger" @click="update(order._id, 'cancelled')">Cancel</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<script setup>
import { onMounted, computed, ref } from 'vue';
import api from '../services/api';

const orders = ref([]);

// Fetch all orders
async function load() {
    const res = await api.get('/order');
    orders.value = res.data;
}

// Group orders by user
const ordersByUser = computed(() => {
    const map = {};

    for (const order of orders.value) {
        const user = order.userId;
        if (!user) continue;

        if (!map[user._id]) {
            map[user._id] = {
                user,
                orders: []
            };
        }

        map[user._id].orders.push(order);
    }

    return Object.values(map);
});

async function update(orderId, status) {
    await api.put(`/order/${orderId}/status`, { status });
    load();
}

onMounted(load);
</script>
