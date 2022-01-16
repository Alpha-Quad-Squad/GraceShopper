import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementItem,
  removeItem,
  decrementItem,
  emptyCart,
  goIncrementShoppingItem,
  goDecrementShoppingItem,
  goRemoveShoppingItem,
} from "../store/cart";
import SingleProductSnapshot from "./SingleProductSnapshot";
import { openModal } from "../store/modal";
import Modal from "./Modal";

const Cart = (props) => {
  const dispatch = useDispatch();

  const open = () => {
    dispatch(openModal())
  }

  const currentCart = useSelector((state) => {
    return state.cart;
  });

  //this is needed to check if the user is logged in, and to pass to thunks for editing carts
  const userId = useSelector((state) => {
    return state.auth.id;
  });

  // this function handles the pop-up modal.
  const modalHandler = () =>  {
    if (userId) {
     props.history.push('/checkout')
    } else {
      open();
    }
  }

  const increment = (item) => {
    if (userId) {
      //if user is logged in dispatch thunk to update db.
      dispatch(goIncrementShoppingItem(item, userId));
    } else {
      //if not loggedIn dispatch action to update the qty in store only.
      dispatch(incrementItem(item));
    }
  };

  const decrement = (item) => {
    if (userId) {
      //if user is logged in dispatch thunk to update db.
      dispatch(goDecrementShoppingItem(item, userId));
    } else {
      //if not loggedIn dispatch action to update the qty in store only.
      dispatch(decrementItem(item));
    }
  };

  const remove = (item) => {
    if (userId) {
      //if user is logged in dispatch thunk remove shoppingItem in db.
      dispatch(goRemoveShoppingItem(item, userId));
    } else {
      //if not loggedIn dispatch action to remove item in store only.
      dispatch(removeItem(item));
    }
  };

  const empty = () => {
    if (userId) {
      //if user is logged in dispatch thunk remove cart shoppingItems for this user in db. (route hasn't been written for this.  it is not a tier 1 req)
      dispatch(goEmptyCart(userId));
    } else {
      //if not loggedIn dispatch action to remove item in store only.
      dispatch(emptyCart());
    }
  };

  const cartTotal = currentCart.reduce((passedIn, item) => {
    let lineTotal = item.itemPrice * item.qty;
    return passedIn + lineTotal;
  }, 0);

  return (
    <>
    <Modal />
      {currentCart.map((item) => {
        return (
          <div key={item.id}>
            <SingleProductSnapshot itemData={item} />

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
      <div>
        <button onClick={() => modalHandler()}>Proceed to checkout</button>
      </div>
    </>
  );
};

export default Cart;
