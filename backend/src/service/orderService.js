const Order = require('../model/order');
const Product = require('../model/Product');

// Create new order
async function createOrder(userId, items, shippingAddress) {
    let totalAmount = 0;

    // Build order items & calculate total
    const orderItems = [];
    for (const item of items) {
        const product = await Product.findById(item.productId);
        if (!product) {
            const err = new Error('Product not found: ' + item.productId);
            err.status = 400;
            throw err;
        }

        const price = product.price * item.qty;
        totalAmount += price;

        orderItems.push({
            productId: product._id,
            title: product.title,
            qty: item.qty,
            price: product.price
        });
    }

    const order = new Order({
        userId,
        items: orderItems,
        totalAmount,
        shippingAddress
    });

    return order.save();
}

// Get orders of current user
async function getUserOrders(userId) {
    return Order.find({ userId }).populate('items.productId');
}

// Admin: get all orders
async function getAllOrders() {
    return Order.find().populate('userId', 'name email').sort({ createdAt: -1 });
}

async function updateOrderStatus(orderId, status) {
    const validStatuses = ["pending", "paid", "cancelled", "delivered"];

    if (!validStatuses.includes(status)) {
        const err = new Error("Invalid status");
        err.status = 400;
        throw err;
    }

    return await Order.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
    );
}

module.exports = {
    createOrder,
    getUserOrders,
    getAllOrders,
    updateOrderStatus
};
