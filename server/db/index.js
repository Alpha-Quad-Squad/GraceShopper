//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const InventoryItem = require("./models/InventoryItem");
const ShoppingItem = require("./models/ShoppingItem");
const Purchase = require("./models/Purchase");

//associations could go here!
InventoryItem.belongsToMany(Purchase, {
  through: ShoppingItem,
  foreignKey: "inventoryItemId",
});
Purchase.belongsToMany(InventoryItem, {
  through: ShoppingItem,
  foreignKey: "purchaseId",
});
User.hasMany(Purchase);
Purchase.belongsTo(User);
//User.hasMany(ShoppingItem);
//ShoppingItem.belongsTo(User);
//ShoppingItem.hasOne(InventoryItem);
//Purchase.hasMany(ShoppingItem);

module.exports = {
  db,
  models: {
    User,
    InventoryItem,
    ShoppingItem,
    Purchase,
  },
};
