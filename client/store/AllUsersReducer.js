import axios from "axios";

// Actions
const SET_USERS = 'SET_USERS';
const CREATE_USER = 'CREATE_USER';
const UPDATE_USER = 'UPDATE_USER';
const DELETE_USER = 'UPDATE_USER';

// Action Creators
export const setUsers = (users) => {

  return {
    type: SET_USERS,
    users
  };
};

export const createdUser = (user) => {
  return {
    type: CREATE_USER,
    user
  };
};

export const updatedUser = (user) => {
  return {
    type: UPDATE_USER,
    user
  };
};

export const deletedUser = (user) => {
  return {
    type: DELETE_USER,
    user
  };
};

//Thunks
export const getUsers = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token')
      if (token) {
        const { data } = await axios.get('/api/users', {
          headers: {
            authorization: token
          }
        })
        dispatch(setUsers(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const createUser = (user) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('ENTER ROUTE HERE', user);
      dispatch(createdUser(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateUser = (user) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`ENTER ROUTE HERE/${user.id}`, user);
      dispatch(updatedUser(data));
    } catch (error) {
      console.log(error)
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`ENTER ROUTE HERE/${id}`);
      dispatch(deletedUser(data));
    } catch (error) {
      console.log(error)
    }
  };
};

//Reducer
export default (state = [], action) => {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    case CREATE_USER:
      return [...state, action.user];
    case UPDATE_USER:
      const newState = state.map((user) => (
        user.id === action.user.id ? action.user : user
      ));
      return newState;
    case DELETE_USER:
      const deletedState = state.filter((user) => (
        user.id !== action.user.id
      ));
      return deletedState;
    default:
      return state;
  };
};
