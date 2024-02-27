import mongoose from "mongoose";


const ProductSchema = new mongoose.Schema({
    Product_name: {
        type: String,
        required: true,
        // unique: true
    }, 
    slug: {
        type: String,
        required: true,
        // unique: true
    },
    images: [
        {
            type: String,
            required: true
        }
    ],
    description: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },

}, { timestamps: true });

mongoose.models = {}
const Product = mongoose.model('Product', ProductSchema);
export default Product;