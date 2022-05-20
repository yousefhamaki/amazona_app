import mongoose from "mongoose";


const CategoriesSchema = new mongoose.Schema({
    title: {required: true, type: String},
    brand: {required: false, type: String},
    asin: {required: true, type: String, unique: true},
    product_details: {required: false, type: String},
    breadcrumbs: {required: false, type: String},
    images_list: {required: false, type: Object},
    price: {required: false, default: "135", type: String},
    countInStock: {required: true, type: Number, default: 50},
    featured: {required: false, type: Object},
})

const Item = mongoose.model("categories", CategoriesSchema)

export default Item