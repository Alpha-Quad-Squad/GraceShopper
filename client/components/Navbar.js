import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { useSelector, useDispatch } from "react-redux";
import "./navbar.css";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => {
    return !!state.auth.id;
  });

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(logout());
  };

  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const adminUserPortalLink = isAdmin && <Link to='/users' className='navbar-link'>Admin Portal</Link>

  return (
    <div>
      <nav>
        {isLoggedIn ? (
          <>
            {/* The navbar will show these links after you log in */}
            <Link to="/home" className="navbar-link home">
              Home
            </Link>
            {adminUserPortalLink}
            <a href="#" onClick={handleClick} className="navbar-link">
              Logout
            </a>
          </>
        ) : (
          <>
            {/* The navbar will show these links before you log in */}
            <Link to="/home" className="navbar-link home">
              Home
            </Link>
            <Link to="/login" className="navbar-link">
              Login
            </Link>
            <Link to="/signup" className="navbar-link">
              Sign Up
            </Link>
          </>
        )}
        <Link to="/cart" className="navbar-link">
          Cart
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
