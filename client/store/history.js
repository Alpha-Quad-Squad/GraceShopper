import axios from "axios";
const TOKEN = "token";

const SET_HISTORY = 'SET_HISTORY';

export const setHistory = (orders) => {
    return {
        type: SET_HISTORY,
        orders
    }
}

export const getOrdersHistory = () => {
    return async (dispatch) => {
        try {
            const token = window.localStorage.getItem(TOKEN);
            const { data: orders } = await axios.get(`/api/orders`, {
                headers: {
                    authorization: token,
                },
            });
            // console.log(orders)
            dispatch(setHistory(orders))
        } catch (err) {
            console.log(err)
        }
    }
}

const initialState = [];

export function ordersReducer (state = initialState, action) {
    switch (action.type) {
        case SET_HISTORY:
            return action.orders;
        default:
            return state
    }
}