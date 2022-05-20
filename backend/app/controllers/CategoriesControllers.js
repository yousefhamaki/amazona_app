import expressAsyncHandler from "express-async-handler"
import Item from "./../models/CategoriesModel.js"
import shoes from "./../../shoes.js"


function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
  }


export const add = expressAsyncHandler(async (req, res, next)=>{
    // const items = Item.updateMany({}, JSON.stringify({$push:{countInStock: between(60, 350)}}))
      const items = await Item.insertMany(shoes)
    res.send(items)
})

export const category = expressAsyncHandler(async (req, res)=>{
    try{
        const product = await Item.findOne({_id: req.params.id})
        res.send(product)
    }catch(err){
        res.status(404).send({message: "Product not found"})
    }
})

export const Allcategories = expressAsyncHandler(async(req, res)=>{
    try{
        const products = await Item.find({}).limit(30)
        res.send(products)
    }catch(err){
        res.status(404).send({message: "Product not found"})
    }
    
})