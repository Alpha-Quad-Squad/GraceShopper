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
    type: Sequelize.INTEGER,
    allowNull: false
  },
  itemImageUrl: {
    type: Sequelize.STRING,
    defaultValue: "https://thumbnail.imgbin.com/10/10/4/imgbin-super-mario-3d-world-super-mario-bros-super-mario-64-mario-bros-iGV3c2jxd4VxnTXY2PvDTMkS5_t.jpg"
  }
})

//Instance and Prototype Methods

// supports the /api/products/ URL
InventoryItem.getItem = function (itemId) {
  return InventoryItem.findOne({
    where: {
      id: {
        [Sequelize.Op.eq]: itemId
      }
    }
  })
}

module.exports = InventoryItem
