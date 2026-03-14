const express = require("express")
const { AddProduct, login, auth, logout, signUp, authcustomer } = require("../controllers/auth.controller")
const {authmiddleware, customerAuthMiddleware} = require("../middlewares/auth.middleware")
const userrouter = express.Router()

userrouter.post("/login",login)
userrouter.get("/verify",authmiddleware,auth)
userrouter.get("/verify-customer",customerAuthMiddleware,authcustomer)
userrouter.get("/logout",authmiddleware,logout)
userrouter.post("/signUP",authmiddleware,signUp)
module.exports = userrouter