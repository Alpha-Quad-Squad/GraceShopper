import React, {useEffect, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getUsers } from '../store/AllUsersReducer';

const AllUsers = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div>
      <h3>All Users</h3>
      <div>
        <table style={{width: '40%'}}>
          <thead>
            <tr>
              <th>User's Name</th>
              <th>Administrator?</th>
            </tr>
          </thead>
          <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{`${user.isAdmin}`}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
