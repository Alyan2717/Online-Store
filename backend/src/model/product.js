const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
    images: { type: [String], default: [] },
    stock: { type: Number, default: 0 },
    category: { type: String, default: 'General' },
    tags: { type: [String], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
