const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { hashSync } = require("bcryptjs");
require('dotenv').config()

router.post('/', async (req, res, next) => {

    const db = req.app.get("db");

    const { email, password, first_name, last_name, username } = req.body;

    const hashedPassword = hashSync(password, 10)

    const user = await db.users.insert({email, password: hashedPassword, first_name, last_name, username})

    const { TOKEN_SECRET } = process.env

    const token = jwt.sign({id: user.id, email, first_name, last_name, username}, TOKEN_SECRET, {expiresIn: "1 day"})

    res.json({user: {id: user.id, email, first_name: user.first_name, last_name: user.last_name, username: user.username }, token})

})

module.exports = router