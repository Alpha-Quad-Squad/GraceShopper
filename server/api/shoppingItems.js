const router = require("express").Router();
const {
  models: { InventoryItem, ShoppingItem, Purchase, User },
} = require("../db");
module.exports = router;

//get all the inventoryItems and their quantities that are shopping items in a purchase with cart status for a given user.
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

//add an item to the shopping cart (or if it's already in the cart update its qty)
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

      if (itemInCart) {
        //if the item is already in the cart, override the quantity of the associated shoppingItem with the new qty.
        let existingShoppingItem = itemInCart.shoppingItem;
        await existingShoppingItem.update({
          quantity: quantity,
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

//update the quantity of a particular item in a user's cart
router.put("/cart/:userId", async (req, res, next) => {
  try {
    let { itemId, quantity } = req.body;
    const userId = req.params.userId;
    //obtain the purchase.
    [userPurchase] = await Purchase.findAll({
      where: {
        userId: userId,
        status: "cart",
      },
      include: InventoryItem,
    });

    //identify the item in the purchase whose qty needs to be updated
    let cart = userPurchase.inventoryItems;
    let [inventoryItem] = cart.filter((item) => item.id === itemId);

    //update the qty
    let shoppingItem = inventoryItem.shoppingItem;
    await shoppingItem.update({
      quantity: quantity,
    });

    //update our variable so that it now has the updated shoppingItem attached to it.
    [userPurchase] = await Purchase.findAll({
      where: {
        userId: userId,
        status: "cart",
      },
      include: InventoryItem,
    });

    //send back the updated cart
    let updatedCart = userPurchase.inventoryItems;

    res.json(updatedCart);
  } catch (err) {
    next(err);
  }
});

//update a cart at the time of user log in to add everything that had been added to the cart on the frontend prior to log in to the databse cart

//remove an item from the cart
router.delete("/cart/:userId", async (req, res, next) => {
  try {
    let { itemId } = req.body;
    const userId = req.params.userId;

    //obtain the purchase.
    [userPurchase] = await Purchase.findAll({
      where: {
        userId: userId,
        status: "cart",
      },
      include: InventoryItem,
    });

    //identify the item in the purchase which needs to be removed from the cart
    let cart = userPurchase.inventoryItems;
    let [inventoryItem] = cart.filter((item) => item.id === itemId);

    //remove the associate shopping item
    let shoppingItem = inventoryItem.shoppingItem;
    await shoppingItem.destroy();

    //update our variable so that it now has the updated cart without the removed shopping item in it.
    [userPurchase] = await Purchase.findAll({
      where: {
        userId: userId,
        status: "cart",
      },
      include: InventoryItem,
    });

    //send back the updated cart
    let updatedCart = userPurchase.inventoryItems;

    res.json(updatedCart);
  } catch (error) {
    next(error);
  }
});

//empties an entire cart for a user
router.delete("/cart/:userId");
