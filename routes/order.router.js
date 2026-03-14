const express = require("express")
const { place_order, get_orders, get_my_orders } = require("../controllers/order.controller")
const { customerAuthMiddleware } = require("../middlewares/auth.middleware")
const orderRouter = express.Router()

    orderRouter.post("/place-order",customerAuthMiddleware,place_order)
    // for admin
    orderRouter.get("/get-orders",get_orders)
    // for customer
    orderRouter.get("/get-my-orders",customerAuthMiddleware,get_my_orders)

module.exports = orderRouter