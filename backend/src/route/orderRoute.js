const express = require('express');
const { body } = require('express-validator');
const orderController = require('../controller/orderController');
const { verifyToken, requireAdmin } = require('../util/generateToken');

const router = express.Router();

// USER: Create order
router.post('/',
    verifyToken,
    body('items').isArray({ min: 1 }).withMessage('Items are required'),
    orderController.createOrder
);

// USER: Get my orders
router.get('/my-orders',
    verifyToken,
    orderController.getMyOrders
);

// ADMIN: get all orders
router.get('/',
    verifyToken,
    requireAdmin,
    orderController.getAllOrders
);

router.put('/:id/status',
    verifyToken,
    requireAdmin,
    body('status').notEmpty(),
    orderController.updateOrderStatus
);

router.post('/stripe-session',
    verifyToken,
    orderController.createStripeSession
);

module.exports = router;
