const express = require("express");
const login = require("./login");
const recipes = require("./recipes");

const router = express.Router();

router.use("/login", login);
router.use("/recipes", recipes);

module.exports = router;
