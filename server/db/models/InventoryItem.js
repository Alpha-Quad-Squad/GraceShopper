const Sequelize = require('sequelize')
const db = require('../db')

const InventoryItem = db.define('inventoryItem', {
  itemName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  itemDescription: {
    type: Sequelize.TEXT,
  },
  itemPrice: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  itemImageUrl: {
    type: Sequelize.STRING,
    defaultValue: "https://thumbnail.imgbin.com/10/10/4/imgbin-super-mario-3d-world-super-mario-bros-super-mario-64-mario-bros-iGV3c2jxd4VxnTXY2PvDTMkS5_t.jpg"
  }
})

//Instance and Prototype Methods

//Get all items, to support All Items Component, instance method
InventoryItem.getItem = function (itemId) {
  return InventoryItem.findOne({
    where: {
      id: {
        [Sequelize.Op.eq]: itemId
      }
    }
  })
}

//Get Item By ID, to support Single Item Component, prototype method.

module.exports = InventoryItem
