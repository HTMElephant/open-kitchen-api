const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const db = req.app.get("db");
    const categories = await db.get_categories();

    res.json(categories);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
