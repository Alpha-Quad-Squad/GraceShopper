const router = require('express').Router()
const { models: { InventoryItem }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const inventoryItems = await InventoryItem.findAll()
    res.json(inventoryItems)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const inventoryItem = await InventoryItem.getItem(req.params.productId)
    res.json(inventoryItem)
  } catch (err) {
    next(err)
  }
})
