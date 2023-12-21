const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const db = req.app.get("db");
    const { page, category_id } = req.query;

    let recipes;
    if (category_id) {
      recipes = await db.get_recipe_by_category({ category_id, page });
    } else {
      recipes = await db.get_public_recipes({ page });
    }

    res.json(recipes);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
