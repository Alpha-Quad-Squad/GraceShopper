const router = require("express").Router();
const {
    models: { InventoryItem, ShoppingItem, Purchase, User },
} = require("../db");
const { requireToken, isAdmin } = require("../api/gatekeeping");
module.exports = router;

router.get("/", async (req, res, next) => {
    try {
      const allorders = await Purchase.findAll({
        include: InventoryItem,
      })
      res.json(allorders);
    } catch (err) {
      next(err);
    }
  });