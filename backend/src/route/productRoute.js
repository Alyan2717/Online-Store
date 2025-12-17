const express = require('express');
const { body } = require('express-validator');
const upload = require('../middleware/upload');
const productController = require('../controller/productController');
const { verifyToken, requireAdmin } = require('../util/generateToken');

const router = express.Router();

// PUBLIC ROUTES
router.get('/', verifyToken, productController.getProducts);
router.get('/:id', verifyToken, productController.getProduct);

// ADMIN ROUTES
router.post('/',
    verifyToken, requireAdmin,
    upload.array('images', 5),
    body('title').notEmpty().withMessage('Title required'),
    body('price').isNumeric().withMessage('Price must be numeric'),
    productController.createProduct
);

router.put('/:id',
    verifyToken, requireAdmin,
    upload.array('images', 5),
    productController.updateProduct
);

router.delete('/:id',
    verifyToken, requireAdmin,
    productController.deleteProduct
);

module.exports = router;
