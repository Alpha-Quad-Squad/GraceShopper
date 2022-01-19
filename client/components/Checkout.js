import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart, goCreateUserOrder } from "../store/cart"
// css style import.
import './checkout.css'

const Checkout = () => {

    const [checked, setChecked] = useState(true);

    const userId = useSelector((state) => {
        return state.auth.id;
      });

    const dispatch = useDispatch();

    // checkbox function to show the shipping adress form fields.
    const handlechecked = () => {
        setChecked(!checked)
    }

    const resetCart = () => {
        if (userId) {
          //if user is logged in dispatch thunk to change status of purchase to be purchased db.
          // ******** a method to be added here later **********.
          dispatch(goCreateUserOrder(userId))
        } else {
          //if not loggedIn dispatch action to remove items in store only.
          dispatch(emptyCart());
        }
      };

    return (
        <div>
            <form className="checkout-form">
                <div className="Billing-Address-Payment-div">
                    <h2>Billing Address</h2>
                    <label htmlFor="full name">Full Name</label>
                    <input type='text' />
                    <label htmlFor="email">Email</label>
                    <input type='text' />
                    <label htmlFor="address">Address</label>
                    <input type='text' />
                    <label htmlFor="city">City</label>
                    <input type='text' />
                    <div className="state-zip-exp-cvv-div">
                        <div className="state-zip-div">
                            <label htmlFor="state">State</label>
                            <input type='text' />
                        </div>
                        <div className="state-zip-div">
                            <label htmlFor="zipcode">Zip</label>
                            <input type='text' />
                        </div>
                    </div>
                    <div className="checkbox-div">
                        <label>
                            <input type="checkbox" checked={checked} name="same-address" onChange={handlechecked} /> Shipping address same as billing address.
                        </label>
                    </div>
                </div>
                <div className={!checked ? "Billing-Address-Payment-div" : 'hideDiv'}>
                    <h2>Shipping Address</h2>
                    <label htmlFor="full name">Full Name</label>
                    <input type='text' />
                    <label htmlFor="company name">Company Name (optional)</label>
                    <input type='text' />
                    <label htmlFor="address">Address</label>
                    <input type='text' />
                    <label htmlFor="city">City</label>
                    <input type='text' />
                    <div className="state-zip-exp-cvv-div">
                        <div className="state-zip-div">
                            <label htmlFor="state">State</label>
                            <input type='text' />
                        </div>
                        <div className="state-zip-div">
                            <label htmlFor="zipcode">Zip</label>
                            <input type='text' />
                        </div>
                    </div>
                </div>
                <div className="Billing-Address-Payment-div">
                    <h2>Payment</h2>
                    <label htmlFor="full name">Name on Card</label>
                    <input type='text' />
                    <label htmlFor="email">Credit card number</label>
                    <input type='text' />
                    <div className="state-zip-exp-cvv-div">
                        <div className="exp-cvv-div">
                            <label htmlFor="exp">Exp Mon/Year</label>
                            <input type='text' />
                        </div>
                        <div className="exp-cvv-div">
                            <label htmlFor="cvv">CVV</label>
                            <input type='text' />
                        </div>
                    </div>
                    <div className='submit-payment-cancel-btn-div'>
                        <Link to="/postCheckoutRedirect" className="submit-payment-button" style={{ textDecoration: 'none' }} onClick={()=> resetCart()}>Submit Payment</Link>
                        <Link to="/cart" className="cancel-checkout-button" style={{ textDecoration: 'none' }}>Cancel</Link>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default Checkout;
