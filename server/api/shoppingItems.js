const router = require('express').Router()
const { models: { InventoryItem, ShoppingItem, Purchase }} = require('../db')
module.exports = router

router.get('/cart/:userId', async(req,res,next) => {
    try {
        console.log(req.params.userId)
        const id = req.params.userId
        const userCart = await Purchase.findAll({
            where: {
                userId: id,
                status: "cart"
            },
        });
        res.json(userCart)
    } catch(err) {
        next(err)
    }
})
