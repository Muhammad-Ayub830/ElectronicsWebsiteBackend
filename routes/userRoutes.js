const express = require("express")
const { AddProduct, login, auth, logout } = require("../controllers/auth.controller")
const authmiddleware = require("../middlewares/auth.middleware")
const userrouter = express.Router()

userrouter.post("/login",login)
userrouter.get("/verify",authmiddleware,auth)
userrouter.get("/logout",authmiddleware,logout)
module.exports = userrouter