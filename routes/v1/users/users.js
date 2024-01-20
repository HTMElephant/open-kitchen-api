const express = require("express");
const router = express.Router();

router.get("/:id/kitchens", async (req, res, next) => {
  try {
    const db = req.app.get("db");
    const { id } = req.params;

    const kitchens = await db.get_kitchens_by_id({ id });

    res.json(kitchens);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
