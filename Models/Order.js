import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    products: {
        type: [mongoose.Schema.Types.Mixed],
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    paymentStatus: {
        type: Boolean,
        required: true,
        default: false
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        // unique: true
    },
    zipCode: {
        type: String,
    },
    state: {
        type: String
    },
    district: {
        type: String
    }

}, { timestamps: true })


mongoose.models = {}
const Order = mongoose.model('Order', OrderSchema)
export default Order;