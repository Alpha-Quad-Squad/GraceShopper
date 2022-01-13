import React, { Component, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import SingleProduct from "./components/SingleProduct";
import Cart from "./components/Cart";
import ManyProducts from "./components/ManyProducts";
import AllUsers from "./components/AllUsers";

const Routes = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(me());
  }, []);

  const isLoggedIn = useSelector((state) => {
    return !!state.auth.id;
  });


  const isAdmin = useSelector((state) => state.auth.isAdmin);
  console.log(isAdmin);
  const adminUserPortal = isAdmin && <Route exact path='/users' component={AllUsers} />
  return (
    <div>
      {isLoggedIn ? (
        <Switch>
          <Route path="/home" component={Home} />
          <Route exact path="/products/:productId" component={SingleProduct} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/products" component={ManyProducts} />
          {adminUserPortal}
          <Redirect to="/home" />
        </Switch>
      ) : (
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route exact path="/products/:productId" component={SingleProduct} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/products" component={ManyProducts} />
        </Switch>
      )}
    </div>
  );
};

export default Routes;
