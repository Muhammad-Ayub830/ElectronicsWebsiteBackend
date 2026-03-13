const express = require("express")
const { place_order, get_orders } = require("../controllers/order.controller")
const orderRouter = express.Router()

    orderRouter.post("/place-order",place_order)
    orderRouter.get("/get-orders",get_orders)

module.exports = orderRouter