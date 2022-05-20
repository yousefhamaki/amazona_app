import express from "express";


//controllers
import {
        add, 
        category, 
        Allcategories
        } from "../app/controllers/CategoriesControllers.js"

const Router = express.Router()

Router.get('/add', add)

Router.get("/:id", category)

Router.get("/", Allcategories)


export default Router