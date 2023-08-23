const express = require("express");
const router = express.Router();

const { getCart, addToCart } = require("../controllers/Cart");
const { requireSignin } = require("../middleware");

router.post("/addtocart", requireSignin, addToCart);
router.get("/getfromcart", requireSignin, getCart);

module.exports = router;
