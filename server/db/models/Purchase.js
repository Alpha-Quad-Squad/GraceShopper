const Sequelize = require("sequelize");
const db = require("../db");

const Purchase = db.define("purchase", {
  // total: {
  //   type: Sequelize.FLOAT
  // }
  status: {
    type: Sequelize.ENUM("cart", "purchased"),
  },
});

//Instance and Prototype Methods

//Get specific purchase and all assocaited items, to support a "purchase confirmation" page.

module.exports = Purchase;
