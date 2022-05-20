import express from "express";


import { Register, signIn, Seed } from "../app/controllers/UserController.js";

const UserRouter = express.Router()

UserRouter.get("/seed", Seed)

// UserRouter.
UserRouter.post("/signin", signIn)

UserRouter.post("/register", Register)

export default UserRouter