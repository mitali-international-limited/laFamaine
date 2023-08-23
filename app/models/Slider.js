const mongoose = require("mongoose");

const sliderImageSchema = new mongoose.Schema({
  mobile: { type: String }, // Mobile size image
  desktop: { type: String }, // Desktop size image
});

const schema = new mongoose.Schema({
  sliderImage: sliderImageSchema,
});

const Slider = mongoose.model("Slider", schema);
module.exports = Slider;
