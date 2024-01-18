const express = require("express");
const login = require("./login");
const recipes = require("./recipes");
const register = require("./register");
const categories = require("./categories");

const router = express.Router();

router.use("/login", login);
router.use("/recipes", recipes);
router.use("/register", register);
router.use("/categories", categories);

module.exports = router;
