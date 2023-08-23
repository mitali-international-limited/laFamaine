const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const shortid = require("shortid");

const { uploadSliderImage } = require("../controllers/Slider");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const uploads = multer({ storage });
router.post("/slider", uploads.single("sliderImage"), uploadSliderImage);

module.exports = router;
