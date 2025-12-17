<template>
    <div class="card">
        <h3>Products</h3>
        <table class="admin-table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th class="price">Price</th>
                    <th class="action">Action</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="product in products" :key="product._id">
                    <td>{{ product.title }}</td>
                    <td class="price">${{ product.price }}</td>
                    <td class="action">
                        <button class="btn danger" @click="remove(product._id)">
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>
<style scoped>
.admin-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
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
    width: 140px;
}

.admin-table tbody tr:hover {
    background: #f9fafb;
}
</style>


<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';

const products = ref([]);

async function load() {
    const res = await api.get('/product');
    products.value = res.data.products || res.data;
}

async function remove(id) {
    if (!confirm('Delete product?')) return;
    await api.delete(`/product/${id}`);
    load();
}

onMounted(load);
</script>
