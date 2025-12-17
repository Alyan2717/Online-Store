<template>
    <div>
        <h2>Your Cart</h2>

        <div v-if="items.length === 0" class="card">
            Cart is empty
        </div>

        <div v-else class="card">
            <div v-for="item in items" :key="item._id"
                style="display:flex; justify-content:space-between; margin-bottom:10px;">
                <span>{{ item.title }} (x{{ item.qty }})</span>
                <span>${{ item.price * item.qty }}</span>
            </div>

            <hr />

            <h3>Total: ${{ total }}</h3>

            <button class="btn" @click="checkout">Checkout</button>
        </div>
    </div>
</template>


<script setup>
import { computed } from 'vue';
import { useCartStore } from '../store/cart';
import api from '../services/api';
import { useRouter } from 'vue-router';

const cart = useCartStore();
const router = useRouter();

const items = computed(() => cart.items);
const total = computed(() => cart.total);

function remove(id) {
    cart.remove(id);
}

async function checkout() {
    try {
        // Create order
        const orderRes = await api.post('/order', {
            items: cart.items.map(i => ({
                productId: i._id,
                qty: i.qty
            })),
            shippingAddress: 'Online Order'
        });

        const order = orderRes.data.order;

        // Create Stripe session
        const stripeRes = await api.post('/order/stripe-session', {
            orderId: order._id,
            items: cart.items.map(i => ({
                title: i.title,
                price: i.price,
                qty: i.qty
            }))
        });

        window.location.href = stripeRes.data.url;

    } catch (err) {
        alert('Checkout failed');
    }
}
</script>
