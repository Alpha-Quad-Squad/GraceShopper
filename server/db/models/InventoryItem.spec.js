const { expect } = require("chai");
const seed = require("../../../script/seed");
const {
  db,
  models: { InventoryItem },
} = require("../index");

describe("InventoryItem model", () => {
  //seed some inventory Items before each test
  let inventoryItems;
  beforeEach(async () => {
    inventoryItems = (await seed()).inventoryItems;
  });

  //there are no instance methods on the inventoryItem model

  //classMethods
  describe("classMethods", () => {
    describe("getItem", () => {
      it("when provided an number it returns an inventory item with the itemId that matches that number", async () => {
        const queryId = 1;
        const testInventoryItem = await InventoryItem.getItem(queryId);
        expect(testInventoryItem.id).to.equal(queryId);
      });
    });
  });

  //can we test something about the fact that we should be able to have inventoryItems associated with Purchases through shoppingItems?
});
