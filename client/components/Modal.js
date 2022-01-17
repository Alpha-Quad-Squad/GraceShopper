import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from '../store/modal'
import { Link } from "react-router-dom";
import './modal.css'

const Modal = () => {

    const dispatch = useDispatch();

    const modalState = useSelector((state) => {
        return state.modalReducer
    })

    const close = () => {
        dispatch(closeModal())
        
    }

    if (!modalState) return null;
    return (
        <>
            <div className="screen" onClick={() => close()}>
                <div className="child" onClick={(e) => e.stopPropagation()}>
                    <div className="checkout-popup">
                        <Link to='/login' onClick={() => close()} className="modal-link">
                            Login / Signup
                        </Link>
                        <Link to="/checkout" onClick={() => close()} className="modal-link">
                            Continue as guest
                        </Link>
                        <button onClick={() => close()} className="cancel-modal-button" style={{ textDecoration: 'none' }}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal;