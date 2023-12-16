const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const db = req.app.get("db");
    const recipes = await db.get_public_recipes();

    res.json(recipes);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
