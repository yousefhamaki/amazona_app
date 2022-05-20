import User from "./../models/UserModel.js";
import expressAsyncHandler from "express-async-handler"
import bcrypt from "bcrypt"
import { generateToken } from "./../../utils.js";

export const signIn = expressAsyncHandler(async (req, res)=>{
    const user = await User.findOne({email: req.body.email})
    if(user){
        if(bcrypt.compareSync(req.body.password, user.password)){
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: await generateToken(user)
            })
        }
    }

    res.status(401).send({message: "Invalid email or password"})
})

export const Register = expressAsyncHandler(async (req, res)=>{
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
    const create = await user.save()

    res.send({
        _id: create._id,
        name: create.name,
        email: create.email,
        isAdmin: create.isAdmin,
        token: await generateToken(create)
    })
})

export const Seed = expressAsyncHandler(async (req, res, next)=>{
    await User.remove({})
    const create = await User.insertMany([
        {
            name: 'yousef',
            email: "yousefhamaki2@gmail.com",
            password: bcrypt.hashSync("1234", 8),
            isAdmin: true,
        },
        {
            name: 'yousef',
            email: "yousefhamaki3@gmail.com",
            password: bcrypt.hashSync("1234", 8),
            isAdmin: false,
        },
    ])
    
    res.send({create})
})