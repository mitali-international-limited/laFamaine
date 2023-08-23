const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      min: 2,
      max: 40,
      lowercase: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

const form = new mongoose.model("Form", schema);

module.exports = form;
