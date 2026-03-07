const express = require("express")
const { addProduct, getProducts, deleteProduct } = require("../controllers/product.controller")
const upload = require("../utilites/multer.utility")
const router = express.Router()

router.post("/add-product",upload.array("images"),addProduct)
router.get("/get-products",getProducts)
router.delete("/delete-product/:id",deleteProduct)
module.exports = router