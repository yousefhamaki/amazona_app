import express from "express";
// import {saveOrder, getOrder} from "./../app/controllers/OrderController.js"
import expressAsyncHandler from "express-async-handler";
import { isAuth } from "../utils.js";
import Order from "./../app/models/orderModel.js"

const Router = express.Router()


Router.post("/", isAuth, expressAsyncHandler(async (req, res)=>{
    console.log("insert...")

    if(req.body.orderItems.length === 0){
        res.status(400).send({message: 'Cart is empty'})
        res.end()
    }
    const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        // itemsPrice: req.body.itemsPrice,
        // shippingPrice: req.body.shippingPrice,
        // taxPrice: req.body.taxPrice,
        // totalPrice: req.body.totalPrice,
        user: req.user._id
    })

    const created = await order.save()
    res.status(200).send({message: "New Order created", order: created})
}))

Router.post("/:id", isAuth, expressAsyncHandler(async (req, res)=>{
    const order = await Order.findById(req.params.id)

    if(order){
        res.send(order)
    }else{
        res.status(404).send({message: "order not found"})
    }
}))

Router.put("/:id/pay", isAuth, expressAsyncHandler(async (req, res)=>{
    const order = await Order.findById(req.params.id)

    if(order){
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        }
        const updateOrder = await order.save()
        res.send({message: "Order Paid", order: updateOrder})
    }else{
        res.status(404).send({message: "order not found"})
    }
}))

export default Router