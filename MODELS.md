# Sequelize Models Readme

## Models

*User
*InventoryItem
*ShoppingItem
*Purchase

User
___

The `User` table is meant to represent all users, their possible permissions, and information about
them. This includes:
- `username`: string, unique, cannot be null.
- `password`: string.
- `isAdmin`: boolean, defaults to false.
- id: (Sequelize created)

InventoryItem
___
The `InventoryItem` table is meant to represent all unique items in the store, along with information about
the item. This includes:
- `itemName`: string, cannot be null.
- `itemDescription`: text.
- `itemPrice`: float, cannot be null.
- `itemImageUrl`: string, [default value](https://thumbnail.imgbin.com/10/10/4/imgbin-super-mario-3d-world-super-mario-bros-super-mario-64-mario-bros-iGV3c2jxd4VxnTXY2PvDTMkS5_t.jpg)
- id: (Sequelize created)

ShoppingItem
___
The `ShoppingItem` table represents items either in the process of being purchased (shopping cart) or
items that have been purchased in a past transaction. When a user adds an item to their cart, that
item's quantity can be modified until checkout (e.g. `status: 'cart'`), after which it becomes
permanent (e.g. `status: 'purchased'`). Once the `ShoppingItem` is purchased, it is associated with
a `Purchase`.
- `Item`: has one.
- `User`: has one.
- `quantity`: integer.
- `status`: 'cart' or 'purchased'.
- id: (Sequelize created)

Purchase
___
The `Purchase` table represents completed transactions. When a user completes a transaction, all
`ShoppingItems` with the `status: 'cart'` will be associated with a newly created `Purchase` instance.
The purpose of the `Purchase` table is to hold all order-level information while allowing the
`ShoppingItem` table to be extended/reused to handle both the Shopping Cart and Purcahsed items.
- `transactionTotal`
- `ShoppingItem`: has many.
- `User`: has one.
- id (Sequelize created)
