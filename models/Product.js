// productSchema

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {type: String, required: [true, "Product name required"], },
  description: {type: String, required: [true, "Product description required" ]},
  price: {type: Number, required: [ true, "Product price required" ],
  validate: {
    validator: (value) => value > 0,
    message: "Price must be greater than 0",
  },
  },//must be greater than zero?
  category: {type: String, required: true},
  inStock: { type: Boolean, default: true, },
  tags: [String], // an array of strings
  createdAt: {type: Date, default: Date.now, }, //default to current date and time}

});

// compile Scheme into a model named Product and export
const Product = mongoose.model("Product", productSchema);
module.exports = Product;