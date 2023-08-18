const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const shortid = require("shortid");
const {
  addProduct,
  getAllProducts,
  getProductsByCategory,
} = require("../controllers/Product");
const { requireSignin } = require("../middleware");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const uploads = multer({ storage });

router.post(
  "/create",
  uploads.array("productPictures"),
  requireSignin,
  addProduct
);
router.get("/get/allproducts", getAllProducts);
router.get("/get/category/:categoryId", getProductsByCategory);
module.exports = router;
