const Slider = require("../models/Slider");

exports.uploadSliderImage = async (req, res) => {
  console.log("req.file.buffer.toString", req.file);
  try {
    if (req.file) {
      const { original, mobile, desktop } = req.file.buffer.toString("base64");

      const sliderImage = {
        original: `data:${req.file.mimetype};base64,${original}`,
        mobile: `data:${req.file.mimetype};base64,${mobile}`,
        desktop: `data:${req.file.mimetype};base64,${desktop}`,
      };

      const newSlider = new Slider({ sliderImage });
      await newSlider.save();
      res.status(201).json({ message: "Image uploaded successfully" });
    } else {
      res.status(400).json({ message: "Buffer" });
    }
  } catch (error) {
    res.status(400).json({ error: "Image upload failed" });
  }
};
