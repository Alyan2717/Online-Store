const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    title: String,
    qty: Number,
    price: Number
});

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    items: [orderItemSchema],

    totalAmount: { type: Number, required: true },

    status: {
        type: String,
        enum: ['pending', 'paid', 'cancelled'],
        default: 'pending'
    },

    shippingAddress: { type: String, default: '' },

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
