import axios from "axios";

const SET_CART = "SET_CART";

export const setCart = (item) => {
  return {
    type: SET_CART,
    item,
  };
};

const initialState = [];
/*  here is an example of what a cart array will look like when it isn't empty
//this may not be a very good format for our cart becuse it has so much nesting and when we try to copy it we will only make shallow copied of that
[
    {
        product:{
            id:,
            name:,
            etc...
        },
        qty:1
    },
    {
        product:{
            id:,
            name:,
            etc...
        },
        qty:2
    },
]
*/
//takes an item (a product object) and a cart (an array that )
// if the cart has the item it returns the index of that item in the cart +1 (this ensures a truthy result even if its at indix 0).
//if the cart doesn't have the itme it returns false .
const cartHasItem = (item, cart) => {
  for (i = 0; i < cart.length; i++) {
    if (cart[i].product.id === item.id) {
      return i + 1;
    }
  }
  return false;
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      const hasItem = cartHasItem(action.item, state);
      if (hasItem) {
        //if the cart already has an object with a product property===action.item then increment the qty of that object.
        const cartItemIdx = hasItem - 1;
        const newCartItem = { ...state[cartItemIdx] };
        newCartItem.qty++;
        //the new cart will be all the items in the cart that weren't modified (everything before and after the modified item, and then the new version of the itme which has been incrememented)
        return [
          ...state.slice(0, cartItemIdx),
          ...state.slice(cartItemIdx + 1),
          newCartItem,
        ];
      }
      //if the cart doesn't have an object with product property===action.item then add that item to the cart with a qty of 1.
      return [...state, { product: action.item, qty: 1 }];
    default:
      return state;
  }
};
