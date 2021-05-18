const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    product: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Product', ProductSchema);