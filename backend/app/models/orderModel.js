import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderItems: [
        {
            name: {type: String, required: true},
            qty: {type: Number, required: true},
            image: {type: Object, required: true},
            price: {type: String, required: true},
            id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "categories"},
        }
    ],
    shippingAddress: {
        fullname: {required: true, type: String},
        address: {required: true, type: String},
        city: {required: true, type: String},
        phone: {required: true, type: Number},
        postalCode: {required: true, type: String},
        country: {required: true, type: String},
    },
    paymentMethod: {required: true, type: String},
    paymentResult: {
        id: String,
        status: String,
        update_time: String,
        email_address: String, 
    },
    // itemsPrice: {required: true, type: Number},
    // ShippingPrice: {required: true, type: Number},
    // taxPrice: {required: true, type: Number},
    // totalItems: {required: true, type: Number},
    // totalPrice: {required: true, type: Number},
    user: {required: true, type: mongoose.Schema.Types.ObjectId, ref: "users"},

    isPaid: {type: Boolean, default: false},
    paidAt: {type: Date},
    isDelivered: {type: Boolean, default: false},
    deliveredAt: {type: Date}
}, {timestamps: true})


const Order = mongoose.model("orders", orderSchema)

export default Order
