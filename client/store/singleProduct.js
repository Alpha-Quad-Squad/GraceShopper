import axios from "axios";

// ACTION TYPES
const SET_PRODUCT = "SET_PRODUCT";

// ACTION CREATORS
export const setProduct = (singleProduct) => {
  return {
    type: SET_PRODUCT,
    singleProduct,
  };
};

// THUNK CREATORS
export const fetchSingleProduct = (productId) => {
  return async (dispatch) => {
    try {
      const { data: singleProduct } = await axios.get(
        `/api/products/${productId}`
      );
      dispatch(setProduct(singleProduct));
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = {};

// REDUCER
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT:
      return action.singleProduct;
    default:
      return state;
  }
};
