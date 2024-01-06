const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { compareSync } = require("bcryptjs");
require('dotenv').config()


router.post("/", async (req, res, next) => {
  try {
    const db = req.app.get("db");

    const { email, password } = req.body;

    
    if (!email) {
      throw new Error("you should provide an email");
    }
    if (!password) {
      throw new Error("you should provide a password");
    }
    
    const [user] = await db.get_user_by_credentials({ email });
    
    if (!user) {
      throw new Error("no user found");
    }
    
    const passwordsMatch = compareSync(password, user.password)

    if(!passwordsMatch) {
      throw new Error("Password does not match")
    }

    const { TOKEN_SECRET } = process.env

    const token = jwt.sign({id: user.id, email, first_name: user.first_name, last_name: user.last_name, username: user.username }, TOKEN_SECRET, {expiresIn: "1 day"})

    res.json({user: {id: user.id, email, first_name: user.first_name, last_name: user.last_name, username: user.username }, token});
  } catch (err) {
    next(err);
  }
});

module.exports = router;
