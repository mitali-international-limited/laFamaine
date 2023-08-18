const mongoose = require("mongoose");
const Product = require("./product"); // Make sure to import the common Product schema

const hairProductSchema = new mongoose.Schema(
  {
    color: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const hairProduct = Product.discriminator("products", hairProductSchema);

module.exports = { hairProduct };
