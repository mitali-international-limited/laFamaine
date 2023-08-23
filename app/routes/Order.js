const express = require("express");
const router = express.Router();

const { checkout } = require("../controllers/Order");
const { requireSignin } = require("../middleware");

router.post("/checkout", requireSignin, checkout);

module.exports = router;
