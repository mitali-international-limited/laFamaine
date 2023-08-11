const express = require("express");

const { signup, signin } = require("../controllers/User");
const {
  validateSignupRequest,
  validateSigninRequest,
  isRequestValidated,
} = require("../validators/auth.validators");

const router = express.Router();

router.post("/signup", validateSignupRequest, isRequestValidated, signup);
router.post("/signin", validateSigninRequest, isRequestValidated, signin);

module.exports = router;
