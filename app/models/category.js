const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  categoryName: {
    type: String,
    trim: true,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    required: true,
  },
  categoryIcon: {
    type: String,
  },
  parentId: {
    type: String,
  },
  categoryType: {
    type: String,
  },
});

const category = new mongoose.model("Category", schema);
module.exports = category;
