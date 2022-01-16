import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import singleProduct from "./singleProduct";
import cart from "./cart";
import inventoryItems from "./ManyProdReducer";
import { modalReducer } from "./modal"

const reducer = combineReducers({
  auth,
  singleProduct,
  cart,
  inventoryItems,
  modalReducer
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
