import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateItemQty,
  removeItem,
  emptyCart,
  goUpdateShoppingItemQty,
  goRemoveShoppingItem,
  goEmptyCart,
} from "../store/cart";
import SingleProductSnapshot from "./SingleProductSnapshot";
import { openModal } from "../store/modal";
import Modal from "./Modal";
import './cart.css'

const CART = "cart";

const Cart = (props) => {
  const dispatch = useDispatch();

  const open = () => {
    dispatch(openModal());
  };

  const currentCart = useSelector((state) => {
    return state.cart;
  });

  //this makes sure that the cart in local storage is updated whenever a change is made to it.  This is important since the reducer accesses local storage to get the initial state.  this allows a cart to persist for a non logged in user even when they refresh.
  useEffect(() => {
    window.localStorage.setItem(CART, JSON.stringify(currentCart));
  }, [currentCart]);

  //this is needed to check if the user is logged in, and to pass to thunks for editing carts
  const userId = useSelector((state) => {
    return state.auth.id;
  });

  // this function handles the pop-up modal.
  const modalHandler = () => {
    if (userId) {
      props.history.push("/checkout");
    } else {
      open();
    }
  };

  const increment = (item) => {
    if (userId) {
      //if user is logged in dispatch thunk to update db.
      dispatch(goUpdateShoppingItemQty(item, userId, item.qty + 1));
    } else {
      //if not loggedIn dispatch action to update the qty in store only.
      dispatch(updateItemQty(item, item.qty + 1));
    }
  };

  const decrement = (item) => {
    if (userId) {
      //if user is logged in dispatch thunk to update db.
      dispatch(goUpdateShoppingItemQty(item, userId, item.qty - 1));
    } else {
      //if not loggedIn dispatch action to update the qty in store only.
      dispatch(updateItemQty(item, item.qty - 1));
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
    window.localStorage.removeItem(CART);
  };

  const cartTotal = currentCart.reduce((passedIn, item) => {
    let lineTotal = item.itemPrice * item.qty;
    return passedIn + lineTotal;
  }, 0);

  // disabled is set to true because each ShoppingItem is initialized with a quantity >= 1.
  return (
    <>
      <Modal />
      {currentCart.map((item) => {
        let decrementDisabled = true;
        if(item.qty > 1){
          decrementDisabled = false;
        }
        else {
          decrementDisabled = true
        }
        return (
          <div key={item.id} className="cart-items-list">
            <SingleProductSnapshot itemData={item} />
            <div className="cart-items-right">
              <div className="cart-items-right-qty-price">
                <p>X {item.qty} = $ {item.qty * item.itemPrice}</p>
              </div>
              <div className="increment-decrement-btns">
                <button onClick={() => increment(item)}>+</button>
                <button onClick={() => decrement(item)} disabled={decrementDisabled}>-</button>
              </div>
              <button onClick={() => remove(item)} className="cart-remove-item-btn">remove item</button>
            </div>
          </div>
        );
      })}
      <div className="cart-bottom-divs">
        <div className="empty-cart-btn-div">
          <button onClick={() => empty()} className="empty-cart-btn">empty cart</button>
        </div>
        <div className="cart-bottom-total">Total = $ {cartTotal}</div>
        <div className="proceed-check-btn-div">
          <button onClick={() => modalHandler()}className="proceed-check-btn">Proceed to checkout</button>
        </div>
      </div>
    </>
  );
};

export default Cart;
