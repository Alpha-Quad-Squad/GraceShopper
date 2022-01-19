import axios from "axios";
import history from "../history";
import { fetchCart, goAddShoppingItem } from "./cart";
const TOKEN = "token";
const CART = "cart";
import { emptyCart } from "./cart";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const { data: auth } = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });

    const { id } = auth;
    //check if there are items in a guest cart that need to be added to the backend cart for this user
    const frontEndCart = JSON.parse(window.localStorage.getItem(CART));

    const { data: backEndCart } = await axios.get(`/api/cart/${id}`, {
      headers: {
        authorization: token,
      },
    });

    if (frontEndCart) {
      //go add the frontend cart to backEnd, and update the cart in redux store with the new information from the backend.
      await frontEndCart.forEach(async (frontEndProduct) => {
        //get qty of the item that is already in this user's back end cart
        let [productInBackEndCart] = backEndCart.filter(
          (backEndProduct) => backEndProduct.id === frontEndProduct.id
        );
        let backEndQty = 0;
        if (productInBackEndCart) {
          backEndQty = productInBackEndCart.qty;
        }
        let newQuantity = backEndQty + frontEndProduct.qty;
        await dispatch(goAddShoppingItem(frontEndProduct, id, newQuantity));
      });
    }

    //get backend cart for this user.
    dispatch(fetchCart(id));
    dispatch(setAuth(auth));
  }
};

export const authenticate =
  (username, password, method, email) => async (dispatch) => {
    try {
      const res = await axios.post(`/auth/${method}`, { username, password, email });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  window.localStorage.removeItem(CART);
  history.push("/login");
  return (dispatch) => {
    dispatch(emptyCart());
    dispatch(setAuth({}));
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
