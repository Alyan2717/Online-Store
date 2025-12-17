<template>
    <div>
        <h1 style="margin-bottom:20px;">Products</h1>

        <!-- <div class="grid">
            <div v-for="product in products" :key="product._id" class="card">
                <h3>{{ product.title }}</h3>
                <p>${{ product.price }}</p>
                <button class="btn" @click="add(product)">Add to Cart</button>
            </div>
        </div> -->

        <!-- Search -->
        <input v-model="search" placeholder="Search products..." @keyup.enter="load" style="margin-bottom:15px;" />

        <!-- Grid -->
        <div class="grid">
            <div v-for="product in products" :key="product._id" class="card">
                <h3>{{ product.title }}</h3>
                <p>${{ product.price }}</p>
                <button class="btn" @click="add(product)">Add to Cart</button>
            </div>
        </div>

        <!-- Pagination -->
        <div class="pagination">
            <button class="btn secondary" :disabled="page === 1" @click="changePage(page - 1)">
                Prev
            </button>

            <span>Page {{ page }} of {{ totalPages }}</span>

            <button class="btn secondary" :disabled="page === totalPages" @click="changePage(page + 1)">
                Next
            </button>
        </div>
    </div>
</template>

<style scoped>
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 20px;
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    gap: 10px;
}
</style>


<script setup>
import { onMounted, ref } from 'vue';
import api from '../services/api';
import { useCartStore } from '../store/cart';

const products = ref([]);
const loading = ref(true);
const cart = useCartStore();
const page = ref(1);
const limit = 8;
const totalPages = ref(1);
const search = ref('');

async function load() {
    // const res = await api.get('/product');
    // products.value = res.data;
    // loading.value = false;

    const res = await api.get('/product', {
        params: {
            page: page.value,
            limit,
            q: search.value
        }
    });

    products.value = res.data.products;
    totalPages.value = res.data.totalPages;
}

function changePage(p) {
    page.value = p;
    load();
}

function add(product) {
    cart.addToCart(product);
}

onMounted(load);
</script>
