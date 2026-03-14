const dotevn = require("dotenv").config()
const express = require("express")
const ConnectToDatabase = require("./utilites/db.utility")
const router = require("./routes/userRoutes")
const productRouter = require("./routes/product.routes")
const cors = require("cors")
const app = express()
const cookie_parser = require("cookie-parser")
const orderRouter = require("./routes/order.router")
app.use(cors({
     origin: [
    "https://www.haq1.com",
    "https://haq1.com"
  ],
    // origin :   "http://localhost:3000",
    // credentials : true
}))
ConnectToDatabase(process.env.MONGODB_URL)
app.use(cookie_parser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/",router)
app.use("/",orderRouter)
app.use("/",productRouter)
app.listen(process.env.PORT,()=>{
    console.log(`server started running successfully on  http://localhost:${process.env.PORT}/ `)
})