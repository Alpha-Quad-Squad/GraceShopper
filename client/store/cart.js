import axios from "axios";

const SET_CART = 'SET_CART';

export const setCart = (item) => {
    return {
        type: SET_CART,
        item
    }
}

const initialState = [];

const cartReducer = (state = initialState, action ) => {
    switch(action.type) {
        case SET_CART:
            if ( state[])
    }
}