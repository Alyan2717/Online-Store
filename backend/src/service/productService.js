const Product = require('../model/Product');
const slugify = require('slugify');
const fs = require('fs');
const path = require('path');

// Create product
async function createProduct(data) {
    data.slug = slugify(data.title, { lower: true, strict: true });

    const exists = await Product.findOne({ slug: data.slug });
    if (exists) {
        const err = new Error('Product with similar title already exists');
        err.status = 400;
        throw err;
    }

    const product = new Product(data);
    return product.save();
}

// Get products with filters and pagination
async function getProducts(query) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 8;
    const skip = (page - 1) * limit;

    const filter = {};
    if (query.q) filter.title = { $regex: query.q, $options: 'i' };
    if (query.category) filter.category = query.category;
    if (query.min) filter.price = { ...filter.price, $gte: Number(query.min) };
    if (query.max) filter.price = { ...filter.price, $lte: Number(query.max) };

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

    return {
        products,
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page
    };
}

// Get single product
async function getProductById(id) {
    return Product.findById(id);
}

// Update product
async function updateProduct(id, data) {
    if (data.title) {
        data.slug = slugify(data.title, { lower: true, strict: true });
    }

    return Product.findByIdAndUpdate(id, data, { new: true });
}

// Delete product
async function deleteProduct(id) {
    const product = await Product.findById(id);

    if (!product) {
        const err = new Error('Product not found');
        err.status = 404;
        throw err;
    }

    // Delete images from uploads folder
    if (product.images && product.images.length > 0) {
        product.images.forEach(imagePath => {
            const filePath = path.join(
                __dirname,
                '../../',
                imagePath.replace('/uploads/', 'uploads/')
            );

            fs.unlink(filePath, err => {
                if (err) console.error('Failed to delete image:', err.message);
            });
        });
    }

    // Delete product from DB
    await product.deleteOne();

    return true;
}

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};