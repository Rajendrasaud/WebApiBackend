const mongoose = require('mongoose');
const Cart = mongoose.model('Cart', {
    user_id: {
        type: String
    },
    product_name: {
        type: String
    },
    product_image: {
        type: String
    },
    product_price: {
        type: String
    },
    product_brand: {
        type: String
    }
})
module.exports = Cart