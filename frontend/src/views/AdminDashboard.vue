<template>
    <div>
        <h2>Admin Dashboard</h2>

        <!-- Products -->
        <AdminProducts />

        <!-- Orders grouped by user -->
        <div v-for="group in ordersByUser" :key="group.user._id" class="card" style="margin-top: 24px;">
            <h3>User: {{ group.user.name }} ({{ group.user.email }})</h3>

            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th class="center">Status</th>
                        <th class="price">Total</th>
                        <th class="action">Action</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="order in group.orders" :key="order._id">
                        <td>{{ order._id }}</td>
                        <td class="center">{{ order.status }}</td>
                        <td class="price">${{ order.totalAmount }}</td>
                        <td class="action">
                            <button class="btn" @click="update(order._id, 'paid')">
                                Paid
                            </button>
                            <button class="btn danger" style="margin-left:6px;" @click="update(order._id, 'cancelled')">
                                Cancel
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>
<style scoped>
.admin-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 12px;
}

.admin-table th,
.admin-table td {
    padding: 12px;
    border-bottom: 1px solid #e5e7eb;
}

.admin-table th {
    text-align: left;
    font-weight: 600;
    color: #374151;
}

.admin-table td {
    color: #111827;
}

.admin-table .price {
    text-align: right;
    width: 120px;
}

.admin-table .action {
    text-align: center;
    width: 180px;
}

.admin-table .center {
    text-align: center;
    width: 120px;
}

.admin-table tbody tr:hover {
    background-color: #f9fafb;
}
</style>


<script setup>
import { onMounted, computed, ref } from 'vue';
import AdminProducts from '../views/AdminProducts.vue';
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
