const express = require("express");
const login = require("./login");
const recipes = require("./recipes");
const register = require("./register")

const router = express.Router();

router.use("/login", login);
router.use("/recipes", recipes);
router.use("/register", register);

module.exports = router;
