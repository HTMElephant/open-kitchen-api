const express = require("express");
const router = express.Router();
const _ = require("lodash");

router.get("/:id/recipes", async (req, res, next) => {
  try {
    const db = req.app.get("db");
    const { id } = req.params;
    const recipes = await db.get_all_recipes_by_kitchen_id({ id });
    res.json({ recipes });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const db = req.app.get("db");

    const { name, kitchenUsers } = req.body;

    const kitchen = await db.kitchen.insert({
      name,
    });

    const userEmails = kitchenUsers.map((user) => {
      return user.email;
    });

    const matchedUsers = await db.get_users_by_emails([userEmails]);

    // iterate over the DB user records to match them with the new kitchen's user records
    matchedUsers.forEach((matchedUser) => {
      const result = kitchenUsers.findIndex((kitchenUser) => {
        return kitchenUser.email === matchedUser.email;
      });
      if (result >= 0) {
        kitchenUsers[result].id = matchedUser.id;
      }
    });

    await db.kitchen_users.insert(
      kitchenUsers.map((kitchenUser) => ({
        kitchen_id: kitchen.id,
        role: kitchenUser.role,
        user_id: kitchenUser.id,
      }))
    );
    res.json({ kitchen });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const db = req.app.get("db");
    const { id } = req.params;

    const filteredBody = _.omit(req.body, ["id", "created_at", "updated_at", "deleted_at"]);

    const currentKitchen = await db.kitchen.update({id}, filteredBody);

    res.json({ currentKitchen })
  } catch (err) {
    next(err)
  }
})

module.exports = router;
