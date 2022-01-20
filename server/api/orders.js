const router = require("express").Router();
const {
    models: { InventoryItem, ShoppingItem, Purchase, User },
} = require("../db");
const { requireToken, isAdmin } = require("../api/gatekeeping");
module.exports = router;

// const makeFrontEndCart = (userPurchase) => {
//     if (userPurchase.inventoryItems) {
//       return userPurchase.inventoryItems.map((inventoryItem) => {
//         return {
//           id: inventoryItem.id,
//           itemName: inventoryItem.itemName,
//           itemDescription: inventoryItem.itemDescription,
//           itemPrice: inventoryItem.itemPrice,
//           itemImageUrl: inventoryItem.itemImageUrl,
//           qty: inventoryItem.shoppingItem.quantity,
//         };
//       });
//     } else {
//       return [];
//     }
//   };

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
