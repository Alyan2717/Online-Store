<template>
    <div>
        <h2>Your Cart</h2>
        <div v-if="items.length === 0" class="card">
            Cart is empty
        </div>
        <div v-else class="card">
            <div v-for="item in items" :key="item._id" class="cart-item">
                <div>
                    <strong>{{ item.title }}</strong>
                    <div class="qty">Qty: {{ item.qty }}</div>
                </div>

                <div class="right">
                    <span class="price">${{ item.price * item.qty }}</span>
                    <button class="btn danger small" @click="remove(item._id)">
                        Remove
                    </button>
                </div>
            </div>
            <hr />
            <h3>Total: ${{ total }}</h3>

            <button class="btn" @click="checkout">Checkout</button>
        </div>
    </div>
</template>
<style scoped>
.cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #e5e7eb;
}

.cart-item:last-child {
    border-bottom: none;
}

.qty {
    font-size: 14px;
    color: #6b7280;
}

.right {
    display: flex;
    align-items: center;
    gap: 10px;
}

.price {
    font-weight: 600;
}

.btn.small {
    padding: 4px 10px;
    font-size: 14px;
}
</style>


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
