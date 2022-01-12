const Sequelize = require('sequelize')
const db = require('../db')

const Purchase = db.define('Purchase', {
  total: {
    type: Sequelize.FLOAT
  }
})

//Instance and Prototype Methods

//Get specific purchase and all assocaited items, to support a "purchase confirmation" page.

module.exports = Purchase
