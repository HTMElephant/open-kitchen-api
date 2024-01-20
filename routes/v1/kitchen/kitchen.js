const express = require("express");
const router = express.Router();

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

module.exports = router;