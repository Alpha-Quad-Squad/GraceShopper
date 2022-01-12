import axios from "axios";
//helpful ideas in this article: https://dev.to/aneeqakhan/building-shopping-cart-actions-and-reducers-with-redux-in5
//the only thing I don't like about their approach is that their "cart" includes ALL possible products (regardless of whether they're in the cart).  each product has a property "is selected"  i think that makes the cart needlessly large.  I think the cart array should only include items that are in the cart

//action types
const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";
const INCREMENT_ITEM = "INCREMENT_ITEM";
const DECREMENT_ITEM = "DECREMENT_ITEM";
const EMPTY_CART = "EMPTY_CART";

//this assumes the app will never try to add an item to the cart that is already in the cart.  there should be a check for that in the component before this result of this action creator is dispatched.
export const addItem = (item) => {
  return {
    type: ADD_ITEM,
    item,
  };
};
export const removeItem = (item) => {
  return {
    type: REMOVE_ITEM,
    item,
  };
};
export const incrementItem = (item) => {
  return {
    type: INCREMENT_ITEM,
    item,
  };
};

export const decrementItem = (item) => {
  return {
    type: DECREMENT_ITEM,
    item,
  };
};

export const emptyCart = () => {
  return {
    type: EMPTY_CART,
  };
};

//if the component is not able to pass the item object to the action creator then we could use a thunk to get the item object from the database, but I don't think that will be needed.

const initialState = [];
/*
here is an example of what a cart array will look like when it isn't empty.
it only includes products that have been added to the cart.
[
    {
        id:,
        name:,
        etc...,
        qty:1
    },
    {
        id:,
        name:,
        etc...,
        qty:2
    }
]
*/

//reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      let newItem = { ...action.item }; //I'm taking care to make a copy of the item so we don't leave side effects on the action.item
      newItem.qty = 1;
      return [...state, newItem];
    case REMOVE_ITEM:
      return state.filter((item) => {
        return item.id !== action.item.id;
      });
    case INCREMENT_ITEM:
      return state.map((item) => {
        let newItem = { ...item }; //make a copy of the item so we don't leave side effects on the old item in the previous state.
        console.log("action.type.item", action.item);
        console.log("item", item);
        if (item.id === action.item.id) {
          newItem.qty++;
        }
        return newItem;
      });
    case DECREMENT_ITEM:
      let newState = state.map((item) => {
        let newItem = { ...item };

        if (item.id === action.item.id) {
          newItem.qty--;
        }
        return newItem;
      });
      //if the qty of any item is now zero it should be filtered out of the cart
      return newState.filter((item) => {
        return item.qty;
      });
    case EMPTY_CART:
      return [];
    default:
      return state;
  }
};
