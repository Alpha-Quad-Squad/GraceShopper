const router = require('express').Router()
const { requireToken, isAdmin } = require('../api/gatekeeping')
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

router.post('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const { itemName ,itemDescription, itemPrice, itemImageUrl } = req.body
    const newInventoryItem = await InventoryItem.create(
      { itemName, itemDescription, itemPrice, itemImageUrl }
    )

    res.send(newInventoryItem)
  } catch (err) {
    next(err)
  }
})

router.delete('/:productId',  requireToken, isAdmin, async (req, res, next) => {
  try {
    const { productId } = req.params
    const deletedInventoryItem = await InventoryItem.getItem(productId)
    await deletedInventoryItem.destroy();
    res.send(deletedInventoryItem)
  } catch (err) {
    next(err)
  }
})

router.put('/:productId',  requireToken, isAdmin, async (req, res, next) => {
  try {
    const { productId } = req.params
    const updatedInventoryItem =  await InventoryItem.getItem(productId)
    await updatedInventoryItem.update(req.body)
    res.send(updatedInventoryItem)
  }
  catch (error) {
    next(error)
  }
})
