import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";
import {
  addItem,
  updateItemQty,
  goAddShoppingItem,
  goUpdateShoppingItemQty,
} from "../store/cart";
import "./singleProduct.css";

const CART = "cart";

const SingleProduct = (props) => {
  const dispatch = useDispatch();
  const productId = props.match.params.productId;

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, []);

  const product = useSelector((state) => {
    return state.singleProduct;
  });

  const cart = useSelector((state) => {
    return state.cart;
  });

  //establish whether this item is in the cart and if it is, how many
  let quantity = 0;
  //if there is something in the cart, check if the cart includes this item.
  if (cart.length) {
    const [cartProduct] = cart.filter((item) => product.id === item.id);
    //if this item is in the cart, note its quantity
    if (cartProduct) {
      quantity = cartProduct.qty;
    }
  }

  //this is needed to check if the user is logged in, and to pass to thunks for editing carts
  const userId = useSelector((state) => {
    return state.auth.id;
  });

  const addToCart = () => {
    //check if the item is in the cart already
    let inCart = !!quantity;

    if (inCart) {
      //if it in the cart, increment its qty in the store / db.
      if (userId) {
        //if user is logged in dispatch thunk to update db.
        dispatch(goUpdateShoppingItemQty(product, userId, quantity + 1));
      } else {
        //if not loggedIn dispatch action to update the qty in store only.
        dispatch(updateItemQty(product, quantity + 1));
      }
    } else {
      //if item is not in the cart, add it to the cart in the store / db (with qty 1)
      if (userId) {
        //if user is logged in dispatch thunk to update db to add it with qty1.
        dispatch(goAddShoppingItem(product, userId, quantity + 1));
      } else {
        //if not loggedIn dispatch action to update the store only.
        dispatch(addItem(product));
      }
    }
  };

  //this makes sure that the cart in local storage is updated whenever a change is made to it.  This is important since the reducer accesses local storage to get the initial state.  this allows a cart to persist for a non logged in user even when they refresh.
  useEffect(() => {
    window.localStorage.setItem(CART, JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <div id="singleProductContainer">
        <h1 className="singleProductTitle">{product.itemName}</h1>
        <div className="singleProductImageAndDescription">
          <img className="singleProductImage" src={product.itemImageUrl} />
          <div className="singleProductDetails">
            <p className="singleProductDescription">
              {product.itemDescription}
            </p>
            <p className="singleProductPrice">${product.itemPrice}</p>
            <button className="addButton" onClick={addToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
