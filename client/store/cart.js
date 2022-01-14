import axios from "axios";
import Cart from "../components/Cart";
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

//THUNK CREATORS
//need to create thunks to create shopping items for all the action creators.
//need a thunk for when someone logs in.  it iwll need to do the following
//convert any contents of a cart the user had assembled before logging in into shopping items.
//it will need to fetch any shoppingItems with cart status in the databse for that user.  They will need to be added to the cart array in the reducer.

export const goAddShoppingItem = (item, userId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data: product } = await axios.post(
        `/api/users/${userId}/cart/${item.id}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      //at the moment we haven't dispateched the product returned from the database because
      //we already have the item object from the component.
      //this axios call is made to the shoppingItem table rather than the product/InventoryItem table.  Therefore it could be tedious on the backend to make use of a join to get an item/product object from the db that we already have access to on the front end.
      dispatch(addItem(item));
    } catch (err) {
      console.log(err);
    }
  };
};

export const goIncrementShoppingItem = (item, userId) => {
  return async (dispatch) => {
    try {
      const { data: product } = await axios.put(
        `/api/user/${userId}/cart/${item.id}/increment`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(incrementItem(item));
    } catch (err) {
      console.log(err);
    }
  };
};

export const goDecrementShoppingItem = (item, userId) => {
  return async (dispatch) => {
    try {
      const { data: product } = await axios.put(
        `/api/user/${userId}/cart/${item.id}/decrement`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(decrementItem(item));
    } catch (err) {
      console.log(err);
    }
  };
};

export const goRemoveShoppingItem = (item, userId) => {
  return async (dispatch) => {
    try {
      const { data: product } = await axios.delete(
        `/api/user/${userId}/cart/${item.id}`,
        {
          headers: {
            authorization: token,
          },
        }
      );

      dispatch(removeItem(item));
    } catch (err) {
      console.log(err);
    }
  };
};

export const goEmptyCart = (userId) => {
  return async (dispatch) => {
    try {
      //we do not yet have a route for emptying the cart.  Its not even a tier 1 requirement.
      //we could make this thunk to loop over each object in the cart and make a delete axios call for each of those items.   That seems suboptimal though.
      // const { data: product } = await axios.delete(
      //   `/api/user/${userId}/cart/${item.id}`,
      //   {
      //     headers: {
      //       authorization: token,
      //     },
      //   }
      // );

      dispatch(emptyCart());
    } catch (err) {
      console.log(err);
    }
  };
};

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
