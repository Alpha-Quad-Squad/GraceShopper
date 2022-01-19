const router = require("express").Router();
const {
  models: { InventoryItem, ShoppingItem, Purchase, User },
} = require("../db");
const { requireToken, isAdmin } = require("../api/gatekeeping");
module.exports = router;

//this function takes a backend userPurchase that contains inventoryItems, and returns  a front end cart, i.e. an array of items where the qty is a property directly on the item object rather than nested in the shopping item product in the cart.
/*  backend userPurchase:
[
    inventoryItems: [{   id:
        name:
        shoppingItem:{
            qty:
    }}]

]
frontend cart:
[
    {
        id:,
        name:,
        etc...,
        qty:1
    },
*/

const makeFrontEndCart = (userPurchase) => {
  if (userPurchase.inventoryItems) {
    return userPurchase.inventoryItems.map((inventoryItem) => {
      return {
        id: inventoryItem.id,
        itemName: inventoryItem.itemName,
        itemDescription: inventoryItem.itemDescription,
        itemPrice: inventoryItem.itemPrice,
        itemImageUrl: inventoryItem.itemImageUrl,
        qty: inventoryItem.shoppingItem.quantity,
      };
    });
  } else {
    return [];
  }
};

//get all the inventoryItems and their quantities that are shopping items in a purchase with cart status for a given user.
router.get("/:userId", async (req, res, next) => {
  try {
    const id = req.params.userId;
    const [userPurchase] = await Purchase.findOrCreate({
      where: {
        userId: id,
        status: "cart",
      },
      include: InventoryItem,
    });

    // reformat the purchase to be like a frontend cart.
    let frontEndCart = makeFrontEndCart(userPurchase);
    //then send it to the front end.
    res.json(frontEndCart);
  } catch (err) {
    next(err);
  }
});

//add an item to the shopping cart (or if it's already in the cart update its qty)
router.put("/:userId/add-item", requireToken, async (req, res, next) => {
  try {
    //req.body will include the item id and the qty
    let { itemId, quantity } = req.body;
    const userId = req.params.userId;

    let inventoryItem = await InventoryItem.findByPk(itemId);

    //obtain the user's cart purchase (It is assumed that userPurchase is defined because this route should not be called if the user doesn't already have a cart)
    let [userPurchase] = await Purchase.findAll({
      where: {
        userId: userId,
        status: "cart",
      },
      include: InventoryItem,
    });

    //determine whether the item to be added is already in the cart
    let [itemInCart] = userPurchase.inventoryItems.filter(
      (item) => item.id === itemId
    );

    //if the item is already in the cart override the quantity of the associated shoppingItem with the new qty.
    if (itemInCart) {
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

    //update the user purchase variable so that it has the updated shoppingItem attached to it.
    [userPurchase] = await Purchase.findAll({
      where: {
        userId: userId,
        status: "cart",
      },
      include: InventoryItem,
    });

    //reformat the purchase to be a frontend Cart.
    const updatedFrontEndCart = makeFrontEndCart(userPurchase);

    //send the updated cart to the front end
    res.json(updatedFrontEndCart);
  } catch (error) {
    next(error);
  }
});

//update the quantity of a particular item in a user's cart
router.put("/:userId/quantity-update", requireToken, async (req, res, next) => {
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

    //update variable so that the userPurchase now has the updated shoppingItem attached to it.
    [userPurchase] = await Purchase.findAll({
      where: {
        userId: userId,
        status: "cart",
      },
      include: InventoryItem,
    });

    //reformat the purchase to be a frontend Cart.
    const updatedFrontEndCart = makeFrontEndCart(userPurchase);

    //send back the updated cart
    res.json(updatedFrontEndCart);
  } catch (err) {
    next(err);
  }
});

//update the cart by removing an item.
router.put("/:userId/remove-item", requireToken, async (req, res, next) => {
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

    //send back the updated cart once it has been reformatted to match the front end.
    let updatedCart = makeFrontEndCart(userPurchase);

    res.json(updatedCart);
  } catch (error) {
    next(error);
  }
});

//empties an entire cart for a user
router.delete("/:userId", requireToken, async (req, res, next) => {
  try {
    const userId = req.params.userId;
    //obtain the purchase.
    [userPurchase] = await Purchase.findAll({
      where: {
        userId: userId,
        status: "cart",
      },
      include: InventoryItem,
    });
    await userPurchase.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

//converts a user's order from cart to purchased.
router.put("/makePurchase/:userId/", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    //grab the purchase
    [userPurchase] = await Purchase.findAll({
      where: {
        userId: userId,
        status: "cart",
      }
    });
    await userPurchase.update({status: "purchased"});
    res.status(200).send(userPurchase)
  } catch (error) {
    next(error);
  }
});
