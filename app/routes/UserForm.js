const express = require("express");

const { addUserForm } = require("../controllers/UserForm");

const router = express.Router();

router.post("/form", addUserForm);

module.exports = router;
