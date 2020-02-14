const mongoose = require('mongoose');
const Product = mongoose.model('Product', {
    product_name: {
        type: String
    },
    product_description: {
        type: String
    },
    product_price: {
        type: String
    },
    product_weight: {
        type: String
    },
    product_category: {
        type: String
    },
    product_brand: {
        type: String
    },
    product_image: {
        type: String
    }
})
module.exports = Product