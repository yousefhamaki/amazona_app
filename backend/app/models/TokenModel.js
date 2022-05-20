import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
    token: {required: true, type: String},
    userID: {required: true, type: String},
    isAdmin: {type: Boolean, required: true},
    valid: {type: Boolean, required: true},
},{timestamps: true})

const Token = mongoose.model("tokens", TokenSchema)

export default Token