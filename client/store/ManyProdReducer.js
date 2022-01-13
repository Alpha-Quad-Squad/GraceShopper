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

const initialState = [
  {
  id: 1,
  itemImageUrl: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg',
  itemName: 'How To Become Awesome by Mars DeMartian',
  itemPrice: 14.99
  },
  {
  id: 2,
  itemImageUrl: 'https://m.media-amazon.com/images/I/41gr3r3FSWL.jpg',
  itemName: 'How To Become Awesome by Mars DeMartian',
  itemPrice: 29.99
  },
  {
  id: 3,
  itemImageUrl: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/contemporary-fiction-night-time-book-cover-design-template-1be47835c3058eb42211574e0c4ed8bf_screen.jpg?ts=1637012564',
  itemName: 'How To Become Awesome by Mars DeMartian',
  itemPrice: 9.99
  },
  {
  id: 4,
  itemImageUrl: 'https://images-platform.99static.com//6ELqOlDZNAkWKAlKTT3XjDPSZ_c=/fit-in/590x590/projects-files/83/8342/834261/bc96e38c-765d-4031-a33f-b03eb49bca14.jpg',
  itemName: 'How To Become Awesome by Mars DeMartian',
  itemPrice: 24.99
  },
  {
  id: 5,
  itemImageUrl: 'https://www.theyoungfolks.com/wp-content/uploads/2017/08/six-of-crows.jpg',
  itemName: 'How To Become Awesome by Mars DeMartian',
  itemPrice: 49.99
  },
  {
  id: 6,
  itemImageUrl: 'https://microlancer.lancerassets.com/v2/services/9d/759cf0433411e695bffb04eef0d615/large__original_Spirit_s-Voice-Gothic-Book-Cover.jpg',
  itemName: 'How To Become Awesome by Mars DeMartian',
  itemPrice: 18.99
  },
  {
  id: 7,
  itemImageUrl: 'https://www.adobe.com/express/create/cover/media_19e51036164ee5d6d263b7cd50578765583ffc3f2.jpeg?width=400&format=jpeg&optimize=medium',
  itemName: 'How To Become Awesome by Mars DeMartian',
  itemPrice: 89.99
  },
  {
  id: 8,
  itemImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUiPGYANIq5JLuOUHEEQbK4pPRG2wKgLrhDNHnbMF6v7os1Rg5QT5INmOt7GSG211-iB8&usqp=CAU',
  itemName: 'How To Become Awesome by Mars DeMartian',
  itemPrice: 44.99
  },
  {
  id: 9,
  itemImageUrl: 'https://m.media-amazon.com/images/I/513J3iCksDL.jpg',
  itemName: 'How To Become Awesome by Mars DeMartian',
  itemPrice: 4.99
  },
  {
  id: 10,
  itemImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmD1v3g2gACOW7k3Q7XemLnYnOwD6ePlis7_kpVXqXLAB_nQ2KwEWKit5Dwn29zEHfj9g&usqp=CAU',
  itemName: 'How To Become Awesome by Mars DeMartian',
  itemPrice: 62.99
  },

];

//Reducer
export default (state = initialState, action) => {
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
      return newState;
    default:
      return state;
  };
};
