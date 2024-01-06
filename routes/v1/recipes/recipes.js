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

router.get("/:id", async (req, res, next) => {
  try {
    const db = req.app.get("db");
    const { id } = req.params;

    const [recipe] = await db.get_recipe_by_id({id});
    if (!recipe) {
      throw new Error("no recipe found");
    }
    res.json(recipe);
  } catch (err) {
    next(err);
  }
  });

module.exports = router;