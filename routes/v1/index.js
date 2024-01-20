const express = require("express");
const login = require("./login");
const recipes = require("./recipes");
const register = require("./register");
const categories = require("./categories");
const kitchen = require("./kitchen")

const router = express.Router();

router.use("/login", login);
router.use("/recipes", recipes);
router.use("/register", register);
router.use("/categories", categories);
router.use("/kitchen", kitchen)

module.exports = router;
