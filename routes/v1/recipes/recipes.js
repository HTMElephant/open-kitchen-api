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

router.post("/", async (req, res, next) => {
  try {
    const db = req.app.get("db");

    const {
      title,
      user_id,
      ingredients,
      directions,
      description,
      image_url,
      is_private,
      category_id,
    } = req.body;

    const recipe = await db.recipes.insert({
      title,
      user_id,
      ingredients: {
        data: ingredients,
        rawType: true,
        toPostgres: (p) => {
          return db.pgp.as.format("$1::jsonb", [JSON.stringify(p.data)]);
        },
      },
      directions,
      description,
      image_url,
      is_private,
      category_id,
    });

    res.json({ recipe });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
