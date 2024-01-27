const express = require("express");
const router = express.Router();
const authenticateToken = require("../../../middleware/authenticateToken");

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

module.exports = router;
