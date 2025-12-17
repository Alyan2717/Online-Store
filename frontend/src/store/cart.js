import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: JSON.parse(localStorage.getItem('cart')) || []
    }),

    getters: {
        total: (state) =>
            state.items.reduce((sum, item) => sum + item.price * item.qty, 0)
    },

    actions: {
        addToCart(product) {
            const existing = this.items.find(i => i._id === product._id);

            if (existing) {
                existing.qty++;
            } else {
                this.items.push({
                    _id: product._id,
                    title: product.title,
                    price: product.price,
                    qty: 1
                });
            }

            this.save();
        },

        remove(id) {
            this.items = this.items.filter(i => i._id !== id);
            this.save();
        },

        clear() {
            this.items = [];
            this.save();
        },

        save() {
            localStorage.setItem('cart', JSON.stringify(this.items));
        }
    }
});
