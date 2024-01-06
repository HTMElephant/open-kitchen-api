const express = require("express");
const router = express.Router();

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