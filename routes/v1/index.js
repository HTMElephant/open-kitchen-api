const express = require("express");
const login = require("./login");

const router = express.Router();

router.use("/login", login);

module.exports = router;
