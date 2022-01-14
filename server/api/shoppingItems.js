const router = require("express").Router();
const {
  models: { InventoryItem, ShoppingItem, Purchase, User },
} = require("../db");
module.exports = router;

router.get("/cart/:userId", async (req, res, next) => {
  try {
    const id = req.params.userId;
    const [userPurchases] = await Purchase.findAll({
      where: {
        userId: id,
        status: "cart",
      },
      include: InventoryItem,
    });
    const userCart = userPurchases.inventoryItems;
    //the userCart is an array of inventoryItems which are in the cart.
    //inventoryItem.shoppingItem.quantity can be used to access the quantity of this item in the cart

    res.json(userCart);
  } catch (err) {
    next(err);
  }
});

//add an item to the shopping cart
router.post("/cart/:userId", async (req, res, next) => {
  try {
    //req.body will include the item id and the qty
    let { itemId, quantity } = req.body;
    const userId = req.params.userId;
    const inventoryItem = await InventoryItem.findByPk(itemId);

    //does this user already have a cart?
    let [userPurchase] = await Purchase.findAll({
      where: {
        userId: userId,
        status: "cart",
      },
      include: InventoryItem,
    });

    if (userPurchase) {
      //if the user has a cart check if it already has this inventoryItem in it.
      let existingCart = userPurchase.inventoryItems;
      let [itemInCart] = existingCart.filter((item) => item.id === itemId);
      console.log(itemInCart.inventoryItem);

      if (itemInCart) {
        //if the item is already in the cart, override the quantity of the associated shoppingItem with the new qty.
        let existingShoppingItem = itemInCart.shoppingItem;
        existingShoppingItem.update({
          quantity: quantity,
        });

        //update our variable so that it now has the new shoppingItem attached to it.
        [userPurchase] = await Purchase.findAll({
          where: {
            userId: userId,
            status: "cart",
          },
          include: InventoryItem,
        });
      } else {
        //if the item is not in the cart add it.
        await userPurchase.addInventoryItem(inventoryItem, {
          through: { quantity: quantity },
        });
      }
    } else {
      //if the user doesn't have a cart(i.e. a purchase with cart status), create one.
      userPurchase = await Purchase.create({
        userId: userId,
        status: "cart",
      });

      //add the inventory item to the new cart purchase in the database
      await userPurchase.addInventoryItem(inventoryItem, {
        through: { quantity: quantity },
      });
    }

    //update our variable so that it now has the new shoppingItem attached to it.
    [userPurchase] = await Purchase.findAll({
      where: {
        userId: userId,
        status: "cart",
      },
      include: InventoryItem,
    });

    //extract the updated cart from the userPurchase.
    let updatedCart = userPurchase.inventoryItems;

    //send the updated cart back to the front end.
    res.json(updatedCart);
  } catch (error) {
    next(error);
  }
});
