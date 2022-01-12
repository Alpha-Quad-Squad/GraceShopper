import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementItem,
  removeItem,
  decrementItem,
  emptyCart,
} from "../store/cart";

const Cart = () => {
  const dispatch = useDispatch();

  const currentCart = useSelector((state) => {
    return state.cart;
  });

  const increment = (item) => {
    dispatch(incrementItem(item));
  };

  const decrement = (item) => {
    dispatch(decrementItem(item));
  };

  const remove = (item) => {
    dispatch(removeItem(item));
  };

  const empty = () => {
    dispatch(emptyCart());
  };

  const cartTotal = currentCart.reduce((passedIn, item) => {
    let lineTotal = item.itemPrice * item.qty;
    return passedIn + lineTotal;
  }, 0);

  return (
    <>
      {currentCart.map((item) => {
        return (
          <div key={item.id}>
            <div key={item.id}>
              <img src={item.itemImageUrl} />
              {item.itemName}$ {item.itemPrice}
            </div>
            <div>
              X {item.qty} = $ {item.qty * item.itemPrice}
            </div>
            <button onClick={() => increment(item)}>+</button>
            <button onClick={() => decrement(item)}>-</button>
            <button onClick={() => remove(item)}>remove item</button>
          </div>
        );
      })}
      <div>Total = $ {cartTotal}</div>
      <div>
        <button onClick={() => empty()}>empty cart</button>
      </div>
    </>
  );
};

export default Cart;
