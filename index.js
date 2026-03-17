require("dotenv").config();
const express = require("express");
const ConnectToDatabase = require("./utilites/db.utility");
const router = require("./routes/userRoutes");
const productRouter = require("./routes/product.routes");
const orderRouter = require("./routes/order.router");
const cors = require("cors");
const cookie_parser = require("cookie-parser");

const app = express();

app.use(cors({
  origin: [
    "https://www.haq1.com",
    "https://haq1.com"
  ],
  credentials: true
}));

app.use(cookie_parser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);
app.use("/", orderRouter);
app.use("/", productRouter);

// Wrap server start in an async function
const startServer = async () => {
  try {
    await ConnectToDatabase(process.env.MONGODB_URL); // Wait for DB
    app.listen(process.env.PORT, () => {
      console.log(`Server started successfully on http://localhost:${process.env.PORT}/`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();