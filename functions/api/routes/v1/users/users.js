const express = require("express");
const router = express.Router();
const authenticateToken = require("../../../middleware/authenticateToken");
const { includes } = require("lodash");

router.get("/:id/kitchens", authenticateToken, async (req, res, next) => {
  try {
    if (req.user.id != req.params.id) {
      return res.sendStatus(403);
    }
    const db = req.app.get("db");
    const { id } = req.params;

    const kitchens = await db.get_users_kitchens({ id });

    res.json(kitchens);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/recipes", async (req, res, next) => {
  try {
    const db = req.app.get("db");
    const { id } = req.params;

    const usersRecipes = await db.get_users_recipes({ id });
    console.log("Users Recipes", usersRecipes);
    res.json(usersRecipes);
  } catch (err) {
    next(err);
  }
});

router.post("/:userId/recipes/:recipeId/favorites", async (req, res, next) => {
  try {
    const db = req.app.get("db");

    const { userId, recipeId } = req.params;

    const existingFavorite = await db.favorited_recipes.findOne({
      recipe_id: recipeId,
      user_id: userId,
    });

    // This if statement is checking if the recipe is already favorited by you
    if (existingFavorite) {
      res.json(existingFavorite);
    } else {
      const newFavorite = await db.favorited_recipes.insert({
        user_id: userId,
        recipe_id: recipeId,
      });
      res.json(newFavorite);
    }
  } catch (err) {
    next(err);
  }
});
module.exports = router;
