import axios from "axios";

// Actions
const SET_INVENTORYITEMS = 'SET_INVENTORYITEMS';
const CREATE_INVENTORYITEM = 'CREATE_INVENTORYITEM';
const UPDATE_INVENTORYITEM = 'UPDATE_INVENTORYITEM';
const DELETE_INVENTORYITEM = 'UPDATE_INVENTORYITEM';

// Action Creators
export const setInventoryItems = (items) => {
  return {
    type: SET_INVENTORYITEMS,
    items
  };
};

export const createdInventoryItem = (item) => {
  return {
    type: CREATE_INVENTORYITEM,
    item
  };
};

export const updatedInventoryItem = (item) => {
  return {
    type: UPDATE_INVENTORYITEM,
    item
  };
};

export const deletedInventoryItem = (item) => {
  return {
    type: DELETE_INVENTORYITEM,
    item
  };
};

//Thunks
export const getInventoryItems = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/products');
      dispatch(setInventoryItems(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createInventoryItem = (item) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('ENTER ROUTE HERE', item);
      dispatch(createdInventoryItem(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateInventoryItem = (item) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`ENTER ROUTE HERE/${item.id}`, item);
      dispatch(updatedInventoryItem(data));
    } catch (error) {
      console.log(error)
    }
  };
};

export const deleteInventoryItem = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`ENTER ROUTE HERE/${id}`);
      dispatch(deletedInventoryItem(data));
    } catch (error) {
      console.log(error)
    }
  };
};

//Reducer
export default (state = {}, action) => {
  switch (action.type) {
    case SET_INVENTORYITEMS:
      return action.items;
    case CREATE_INVENTORYITEM:
      return [...state, action.item];
    case UPDATE_INVENTORYITEM:
      const newState = state.map((item) => (
        item.id === action.item.id ? action.item : item
      ));
      return newState;
    case DELETE_INVENTORYITEM:
      const deletedState = state.filter((item) => (
        item.id !== action.item.id
      ));
      return deletedState;
    default:
      return state;
  };
};
