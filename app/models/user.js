const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const schema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      min: 2,
      max: 40,
      lowercase: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
schema.methods = {
  authenticate: async function (password) {
    return await bcrypt.compare(password, this.hash_password);
  },
};

const user = new mongoose.model("User", schema);

module.exports = user;
