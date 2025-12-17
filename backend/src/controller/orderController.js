const orderService = require('../service/orderService');
const { validationResult } = require('express-validator');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


// User creates order
async function createOrder(req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { items, shippingAddress } = req.body;

        const order = await orderService.createOrder(
            req.user.id,
            items,
            shippingAddress
        );

        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (err) {
        next(err);
    }
}

async function updateOrderStatus(req, res, next) {
    try {
        const { status } = req.body;

        const order = await orderService.updateOrderStatus(
            req.params.id,
            status
        );

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({
            message: "Status updated",
            order
        });
    } catch (err) {
        next(err);
    }
}

// Get user orders
async function getMyOrders(req, res, next) {
    try {
        const orders = await orderService.getUserOrders(req.user.id);
        res.json(orders);
    } catch (err) {
        next(err);
    }
}

// Admin: get all orders
async function getAllOrders(req, res, next) {
    try {
        const orders = await orderService.getAllOrders();
        res.json(orders);
    } catch (err) {
        next(err);
    }
}

async function createStripeSession(req, res, next) {
    try {
        const { items, orderId } = req.body;

        const line_items = items.map(item => ({
            price_data: {
                currency: "usd",
                unit_amount: item.price * 100,
                product_data: {
                    name: item.title
                }
            },
            quantity: item.qty
        }));

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items,
            success_url: `${"http://localhost:3000"}/payment-success?orderId=${orderId}`,
            cancel_url: `${"http://localhost:3000"}/payment-cancel`,
        });

        res.json({ url: session.url });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus,
    createStripeSession
};
