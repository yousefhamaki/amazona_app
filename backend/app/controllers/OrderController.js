import expressAsyncHandler from "express-async-handler";

export const saveOrder = expressAsyncHandler(async (req, res)=>{
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
})


export const getOrder = expressAsyncHandler(async (req, res)=>{
    const order = await Order.findById(req.params.id)

    if(order){
        res.send(order)
    }else{
        res.status(404).send({message: "order not found"})
    }
})