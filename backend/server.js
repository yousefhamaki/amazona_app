import express from "express"
import mongoose from "mongoose"
import UserRouter from "./routers/UserRouter.js"
import OrderRouter from "./routers/OrderRouter.js"
import CategoriesRouter from "./routers/CategoriesRouter.js"
import dotenv from "dotenv"
import bodyParserErrorHandler from "express-body-parser-error-handler"


dotenv.config({path: "./.env"})
const port = process.env.PORT || 5000
const app = express()

app.use(express.json()) 
app.use(express.urlencoded())
// app.use(bodyParserErrorHandler())



mongoose.connect("mongodb://localhost:27017/amazon", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


//routes
app.use("/api/users", UserRouter)
app.use("/api/products", CategoriesRouter)
app.use("/api/orders", OrderRouter)

app.get("/api/config/paypal", (req, res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID || "AYA3U-wZMwcaZc9ISJr8p52RAlY5lCTkpCYhKGNgOym14SVIgFxXUJPrdNW1N13r7iZ9ngl6D35_yjR3")
})


app.use((err, req, res, next)=>{
    res.status(500).send({message: err.message})
})

app.listen(port, ()=> console.log(`server is listening at http://localhost:${port}`))