const router = require("express").Router();
const {
  models: { InventoryItem, ShoppingItem, Purchase, User },
} = require("../db");
module.exports = router;

//this function takes a backend inventoryItem (with an associated shopping item), and turns it into a front end cart item (where the qty value is a property directly on the item object rather than nested in the shopping item product in the cart)
/*  backend cart:
[
    {   id:
        name:
        shoppingItem:{
            qty:
    }}

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

const makeFrontEndCartItem = (inventoryItem) => {
  return {
    id: inventoryItem.id,
    itemName: inventoryItem.itemName,
    itemDescription: inventoryItem.itemDescription,
    itemPrice: inventoryItem.itemPrice,
    itemImageUrl: inventoryItem.itemImageUrl,
    qty: inventoryItem.shoppingItem.quantity,
  };
};

const makeFrontEndCart = (backEndCart) => {
  return backEndCart.map((cartItem) => {
    return makeFrontEndCartItem(cartItem);
  });
};

//get all the inventoryItems and their quantities that are shopping items in a purchase with cart status for a given user.
router.get("/:userId", async (req, res, next) => {
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

    //use this information to reformat the cart to be like the cart on the front end.
    let frontEndCart = makeFrontEndCart(userCart);

    res.json(frontEndCart);
  } catch (err) {
    next(err);
  }
});

//add an item to the shopping cart (or if it's already in the cart update its qty)
router.post("/:userId", async (req, res, next) => {
  try {
    //req.body will include the item id and the qty
    let { itemId, quantity } = req.body;
    const userId = req.params.userId;
    let inventoryItem = await InventoryItem.findByPk(itemId);

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

    //update our variables so that
    //the cart now has the updated shoppingItem attached to it.
    // the inventory item has the updated qty from the database.
    [userPurchase] = await Purchase.findAll({
      where: {
        userId: userId,
        status: "cart",
      },
      include: InventoryItem,
    });
    [inventoryItem] = userPurchase.inventoryItems.filter(
      (item) => item.id === itemId
    );

    //reformat the inventoryItem to match a frontend cartItem
    let updatedCartItem = makeFrontEndCartItem(inventoryItem);

    //send back the updated cart item
    res.json(updatedCartItem);
  } catch (error) {
    next(error);
  }
});

//update the quantity of a particular item in a user's cart
router.put("/:userId/quantity-update", async (req, res, next) => {
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

    //update our variables so that
    //the cart now has the updated shoppingItem attached to it.
    // the inventory item has the updated qty from the database.
    [userPurchase] = await Purchase.findAll({
      where: {
        userId: userId,
        status: "cart",
      },
      include: InventoryItem,
    });

    [inventoryItem] = userPurchase.inventoryItems.filter(
      (item) => item.id === itemId
    );

    //reformat the inventoryItem to match a frontend cartItem
    let updatedCartItem = makeFrontEndCartItem(inventoryItem);

    //send back the updated cart item
    res.json(updatedCartItem);
  } catch (err) {
    next(err);
  }
});

//update a cart at the time of user log in to add everything that had been added to the cart on the frontend prior to log in to the databse cart

//update the cart by removing an item.
router.put("/:userId/remove-item", async (req, res, next) => {
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
    //console.log("inventoryItem to be deleted", inventoryItem);
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
    let updatedCart = makeFrontEndCart(userPurchase.inventoryItems);

    res.json(updatedCart);
  } catch (error) {
    next(error);
  }
});

//empties an entire cart for a user
router.delete("/:userId", async (req, res, next) => {
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
