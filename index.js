const dotevn = require("dotenv").config()
const express = require("express")
const ConnectToDatabase = require("./utilites/db.utility")
const router = require("./routes/userRoutes")
const productRouter = require("./routes/product.routes")
const cors = require("cors")
const app = express()
ConnectToDatabase(process.env.MONGODB_URL)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/",router)
app.use(cors())
app.use("/",productRouter)
app.listen(process.env.PORT,()=>{
    console.log(`server started running successfully on port http://localhost:${process.env.PORT}/ `)
})