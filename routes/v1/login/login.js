const express = require("express");
const router = express.Router();

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

    const [user] = await db.get_users_by_credentials({ email, password });

    if (!user) {
      throw new Error("no user by found");
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
