const productService = require('../service/productService');
const { validationResult } = require('express-validator');

async function createProduct(req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const data = req.body;

        // Handle uploaded images
        if (req.files) {
            data.images = req.files.map(f => `/uploads/${f.filename}`);
        }

        const product = await productService.createProduct(data);
        res.status(201).json({ message: 'Product created', product });
    } catch (err) {
        next(err);
    }
}

async function getProducts(req, res, next) {
    try {
        const products = await productService.getProducts(req.query);
        res.json(products);
    } catch (err) {
        next(err);
    }
}

async function getProduct(req, res, next) {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Not found' });

        res.json(product);
    } catch (err) {
        next(err);
    }
}

async function updateProduct(req, res, next) {
    try {
        const data = req.body;

        if (req.files) {
            data.images = req.files.map(f => `/uploads/${f.filename}`);
        }

        const updated = await productService.updateProduct(req.params.id, data);
        res.json(updated);
    } catch (err) {
        next(err);
    }
}

async function deleteProduct(req, res, next) {
    try {
        await productService.deleteProduct(req.params.id);
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
};
