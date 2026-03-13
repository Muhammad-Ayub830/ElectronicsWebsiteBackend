const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({

  orderNumber: {
    type: String,
    required: true,
    unique: true
  },

  customerName: {
    type: String,
    required: true,
    trim: true
  },
  customerEmail: {
    type: String,
    required: true,
    trim: true
  },

  phone: {
    type: String,
    required: true
  },

  address: {
    type: String,
    required: true,
    trim: true
  },

  city: {
    type: String,
    required: true
  },

  paymentMethod: {
    type: String,
    required: true,
    enum: ["COD", "JAZZCASH", "EASYPAISA", "BANK_TRANSFER"]
  },

  paymentStatus: {
    type: String,
    default: "PENDING",
    enum: ["PENDING", "PAID"]
  },

  orderStatus: {
    type: String,
    default: "PENDING",
    enum: ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"]
  },

  items: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },

      name: String,

      price: Number,

      quantity: Number,

      url: String
    }
  ],

  totalPrice: {
    type: Number,
    required: true
  },

  deliveryFee: {
    type: Number,
    default: 0
  }

}, { timestamps: true })


const Order = mongoose.model("Order", orderSchema)

module.exports = Order