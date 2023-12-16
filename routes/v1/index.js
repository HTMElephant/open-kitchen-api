const express = require("express");
const login = require("./login");
const recipe = require("./recipe");

const router = express.Router();

router.use("/login", login);
router.use("/recipe", recipe);

module.exports = router;
