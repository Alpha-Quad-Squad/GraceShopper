import axios from "axios";
import history from "../history";
import { fetchCart, goAddShoppingItem } from "./cart";
const TOKEN = "token";
const CART = "cart";

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
    if (frontEndCart.length) {
      //go add the frontend cart to backEnd
      frontEndCart.forEach((product) => {
        dispatch(goAddShoppingItem(product, id, product.qty));
      });
    }

    //get backend cart for this user.
    dispatch(fetchCart(id));
    return dispatch(setAuth(auth));
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

  history.push("/login");
  return {
    type: SET_AUTH,
    auth: {},
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
