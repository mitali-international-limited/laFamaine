const express = require("express");
const { addCategory, getCategory } = require("../controllers/Category");
const multer = require("multer");
const path = require("path");
const shortid = require("shortid");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post("/add/category", upload.single("categoryIcon"), addCategory);
router.get("/get/allcategories", getCategory);
module.exports = router;
