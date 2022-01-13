# Routes

Available
___
- `GET` `/api/products`: gets all InventoryItems in the database.
- `GET` `/api/products/productId`: gets a specific InventoryItem in the database.

Upcoming
___
- `GET` `/api/users`: gets all Users in the database.
- `GET` `/api/users/:userId`: gets data for a specific User in the database.
- `POST` or `PUT` `/api/users/:userId/cart/:productId`: creates or updates a user's (:userId)
ShoppingItem for a given InventoryItem ID (:productId). Used for managing a user's
shopping cart.
- `GET` `/api/users/:userId/cart`: gets all `ShoppingItem`s with `status:'cart'`
for a given `User`. Used to display items in a specific user's cart.
- `PUT` `/api/user/:userId/cart/:productId/increment`: increases the quantity of a
ShoppingItem by 1. Used for "+ quantity" button.
- `PUT` `/api/user/:userId/cart/:productId/decrement`: decreases teh quantity of a
ShoppingItem by 1. Used for "= quantity" button.
- `DELETE` `/api/user/:userid/cart/:productId`: destroy's a User's ShoppingItem.
Used for removing an item from a user's cart.
- `POST` `/api/products`: add a new InventoryItem (admin functionality).
- `PUT` `/api/products/:productId`: update the details of an existing InventoryItem.
- `DELETE` `/api/products/:productId`: deletes a specific inventoryItem.
