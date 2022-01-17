import axios from "axios";
import Cart from "../components/Cart";
//helpful ideas in this article: https://dev.to/aneeqakhan/building-shopping-cart-actions-and-reducers-with-redux-in5
//the only thing I don't like about their approach is that their "cart" includes ALL possible products (regardless of whether they're in the cart).  each product has a property "is selected"  i think that makes the cart needlessly large.  I think the cart array should only include items that are in the cart

const TOKEN = "token";
const CART = "cart";

//action types
const SET_CART = "SET_CART";
const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";
const UPDATE_ITEM_QTY = "UPDATE_ITEM_QTY";
const EMPTY_CART = "EMPTY_CART";

//this assumes the app will never try to add an item to the cart that is already in the cart.  there should be a check for that in the component before this result of this action creator is dispatched.

export const setCart = (cart) => {
  return {
    type: SET_CART,
    cart,
  };
};
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
export const updateItemQty = (item, qty) => {
  return {
    type: UPDATE_ITEM_QTY,
    item,
    qty,
  };
};

export const emptyCart = () => {
  return {
    type: EMPTY_CART,
  };
};

//if the component is not able to pass the item object to the action creator then we could use a thunk to get the item object from the database, but I don't think that will be needed.

//THUNK CREATORS
//need to create thunks to create shopping items for all the action creators.
//need a thunk for when someone logs in.  it iwll need to do the following
//convert any contents of a cart the user had assembled before logging in into shopping items.
//it will need to fetch any shoppingItems with cart status in the databse for that user.  They will need to be added to the cart array in the reducer.

export const fetchCart = (userId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data: cart } = await axios.get(`/api/cart/${userId}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(setCart(cart));
    } catch (error) {
      console.log("there was a problem fetching this user's cart", error);
    }
  };
};

export const goAddShoppingItem = (item, userId, quantity) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data: product } = await axios.post(`/api/cart/${userId}`, {
        headers: {
          authorization: token,
        },
        itemId: item.id,
        quantity: quantity,
      });

      dispatch(addItem(product));
    } catch (err) {
      console.log(err);
    }
  };
};

export const goUpdateShoppingItemQty = (item, userId, quantity) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data: product } = await axios.put(
        `/api/cart/${userId}/quantity-update`,
        {
          headers: {
            authorization: token,
          },
          itemId: item.id,
          quantity: quantity,
        }
      );
      dispatch(updateItemQty(product, product.qty));
    } catch (err) {
      console.log(err);
    }
  };
};

export const goRemoveShoppingItem = (item, userId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data: newCart } = await axios.put(
        `/api/cart/${userId}/remove-item`,
        {
          headers: {
            authorization: token,
          },
          itemId: item.id,
        }
      );

      dispatch(setCart(newCart));
    } catch (err) {
      console.log(err);
    }
  };
};

export const goEmptyCart = (userId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data: newCart } = await axios.delete(`/api/cart/${userId}`, {
        headers: {
          authorization: token,
        },
      });

      dispatch(emptyCart());
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = JSON.parse(window.localStorage.getItem(CART)) || [];
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
    case SET_CART:
      return action.cart;
    case ADD_ITEM:
      let newItem = { ...action.item }; //I'm taking care to make a copy of the item so we don't leave side effects on the action.item
      newItem.qty = 1;
      return [...state, newItem];
    case REMOVE_ITEM:
      return state.filter((item) => {
        return item.id !== action.item.id;
      });
    case UPDATE_ITEM_QTY:
      return state.map((item) => {
        let newItem = { ...item }; //make a copy of the item so we don't leave side effects on the old item in the previous state.

        if (item.id === action.item.id) {
          newItem.qty = action.qty;
        }
        return newItem;
      });
    case EMPTY_CART:
      return [];
    default:
      return state;
  }
};
