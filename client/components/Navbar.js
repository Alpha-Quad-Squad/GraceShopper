import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import { useSelector, useDispatch } from 'react-redux';

const Navbar = () => {

  const isLoggedIn = useSelector((state) => {
    return !!state.auth.id
  })

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(logout())
  }

  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const adminUserPortalLink = isAdmin && <Link to='/users'>Admin Portal</Link>

  return (
    <div>
      <h1>FS-App-Template</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            {adminUserPortalLink}
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
        <Link to='/cart' >cart</Link>
      </nav>
      <hr />
    </div>
  )
}

export default Navbar;
