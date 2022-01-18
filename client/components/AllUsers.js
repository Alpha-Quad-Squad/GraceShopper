import React, {useEffect, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getUsers } from '../store/AllUsersReducer';
import './allUsers.css';

const AllUsers = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleSetAdminButton = () => {
    alert('User is now an Admin.');
  };

  const handleDeleteButton = () => {
    alert('User has been deleted.');
  };

  return (
    <div className='pageContainer'>
      <h3>All Users</h3>
      <div className='tableContainer'>
        <table style={{width: '100%'}}>
          <thead>
            <tr>
              <th>User's Name</th>
              <th>Administrator?</th>
              <th>Toggle Admin</th>
              <th>Delete User</th>
            </tr>
          </thead>
          <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{`${user.isAdmin}`}</td>
              <td style={{border: '0px', boxShadow: '0px 0px 0px', borderRadius: '0px'}}><button onClick={handleSetAdminButton}>Set Admin</button></td>
              <td style={{border: '0px', boxShadow: '0px 0px 0px', borderRadius: '0px'}}><button onClick={handleDeleteButton}>Delete</button></td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
