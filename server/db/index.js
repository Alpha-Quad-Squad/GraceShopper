//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const InventoryItem = require("./models/InventoryItem");
const ShoppingItem = require("./models/ShoppingItem");
const Purchase = require("./models/Purchase");

//associations could go here!
<<<<<<< HEAD
// User.hasMany(ShoppingItem);
// User.hasMany(Purchase)
// ShoppingItem.hasOne(User);
// ShoppingItem.hasOne(InventoryItem);
// Purchase.hasMany(ShoppingItem);
// Purchase.hasOne(User);
=======
User.hasMany(ShoppingItem);
User.hasMany(Purchase)
ShoppingItem.belongsTo(User);
ShoppingItem.hasOne(InventoryItem);
Purchase.hasMany(ShoppingItem);
Purchase.belongsTo(User);

>>>>>>> main

module.exports = {
  db,
  models: {
    User,
    InventoryItem,
    ShoppingItem,
  },
};
