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

router.post('/', async (req, res, next) => {
  try {
    const newInventoryItem = await InventoryItem.create(
      {
        itemName: req.body.itemName,
        itemDescription: req.body.itemDescription,
        itemPrice: req.body.itemPrice,
        itemImageUrl: req.body.itemImageUrl
      }
    )

    // const testItem = await InventoryItem.create({
    //   itemName: "The Institute by Stephen King",
    //   itemDescription:
    //     "The Institute is a science fiction-horror thriller novel by American author Stephen King, published on September 10, 2019, by Scribner. The book follows twelve-year-old genius Luke Ellis.",
    //   itemPrice: 13.93,
    //   itemImageUrl:
    //     "https://images-na.ssl-images-amazon.com/images/I/81pA6-hv+2L.jpg",
    // })


    res.send(newInventoryItem)
  } catch (err) {
    next(err)
  }
})

router.delete('/:productId', async (req, res, next) => {
  try {
    const deletedInventoryItem = await InventoryItem.getItem(req.params.productId)
    await deletedInventoryItem.destroy();
    res.send(deletedInventoryItem)
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', async (req, res, next) => {
  try {
    const updatedInventoryItem =  await InventoryItem.getItem(req.params.productId)
    await updatedInventoryItem.update(req.body)
    res.send(updatedInventoryItem)
  }
  catch (error) {
    next(error)
  }
})
