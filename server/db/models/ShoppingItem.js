const Sequelize = require('sequelize')
const db = require('../db')

const ShoppingItem = db.define('shoppingCartItem', {
  quantity: {
    type: Sequelize.INTEGER
  },
  status: {
    type: Sequelize.ENUM('cart', 'purchased')
  }
})

//Instance and Prototype Methods.

//Increment quantity, to support "increase quanitty by 1" button

//Decreemnt quantity, to support "reduce quantity by 1" button

//Set quantity, to support non-incremental changing of quantity.

//Create ShoppingItem, to support the "add to cart" button.

//Destroy ShoppingItem, to support the "remove from cart" button.

//Purchase item, changes status from 'cart' to 'purchased'. To support
//checkout feature.

module.exports = ShoppingItem
