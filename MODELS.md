# Database Readme

## Tables

*Users
*Items
*ShoppingCartLineItems
*Transactions

Users
___

The `Users` table is meant to represent all users, their possible permissions, and information about
them. This includes:
- Username
- Password
- isAdmin
- userId (Sequelize created)

Items
___
The `Items` table is meant to represent all unique items in the store, along with information about
the item. This includes:
- Item name
- Item description
- Item price
- Item image
- itemId (Sequelize created)

ShoppingCartLineItems
___
The `ShoppingCartLineItems` table represents the "saved shopping cart" items for all users. This table
is only used by logged-in users. Each line item in the table a unique pair of item and user, along
with the quantity associated with that pair. An example row in this table includes:
- itemID
- userId
- quantity
- lineId (Sequelize created)

Transactions
___
The `Transactions` table represents completed transactions for the app. When a user completes a
transaction, the contents of their shopping cart (either as a logged in user or not) will be converted
to a transaction and all items will be removed from the cart. If the user is logged in, this means
all rows in the `ShoppingCartLineItems` table with that user's `userId` will be deleted. A row in this
table includes:
- transactionTotal
- userId
- transactionId (Sequelize created)

TransactionLineItem
___
The `TransactionsLineItems` table supports the `Transactions` table where each line item in this table
represents a single item and quantity as part of a higher-level Transaction. A row in this table includes:
- transactionId (Sequelize created)
- itemId
- itemQuantity
