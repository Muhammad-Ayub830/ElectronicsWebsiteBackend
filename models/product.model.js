const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  price: {
    type: Number,
    required: true,
    min: 0
  },

  description: {
    type: String
  },

  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },

  category: {
    type: String,
    required: true
  },

  subCategory : {
    required : true,
    type : String
  },


  isNewArrival: {
    type: Boolean,
    default: false
  },

  isFeatured: {
    type: Boolean,
    default: false
  },

  isBestDeal: {
    type: Boolean,
    default: false
  },

  images: {
    type: [String],
    default: []
  },

  tags: {
    type: [String],
    default: []
  }

}, { timestamps: true })

const Product = mongoose.model("Product", productSchema)

module.exports = Product;
