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
import Checkout from "./components/Checkout";
import PostCheckoutRedirect from "./components/PostCheckoutRedirect";
import AllUsers from "./components/AllUsers";
import Admin from "./components/Admin";
import OrdersHistory from "./components/OrdersHistory"

const Routes = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(me());
  }, []);

  const isLoggedIn = useSelector((state) => {
    return !!state.auth.id;
  });

  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const adminUserPortal = (
    <Switch>
      <Route path="/home" component={Home} />
      <Route exact path="/products" component={ManyProducts} />
      <Route exact path="/products/:productId" component={SingleProduct} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/checkout" component={Checkout} />
      <Route
        exact
        path="/postCheckoutRedirect"
        component={PostCheckoutRedirect}
      />
      <Route exact path="/users" component={AllUsers} />
      <Route exact path="/admin" component={Admin} />
      <Route exact path="/OrdersHistory" component={OrdersHistory} />
      <Redirect to="/home" />
    </Switch>
  );

  return (
    <div>
      {isLoggedIn ?
        isAdmin ? adminUserPortal :
      (
        <Switch>
          <Route path="/home" component={Home} />
          <Route exact path="/products" component={ManyProducts} />
          <Route exact path="/products/:productId" component={SingleProduct} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/checkout" component={Checkout} />
          <Route
            exact
            path="/postCheckoutRedirect"
            component={PostCheckoutRedirect}
          />
          <Redirect to="/home" />
        </Switch>
      ) : (
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/" exact component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route exact path="/products" component={ManyProducts} />
          <Route exact path="/products/:productId" component={SingleProduct} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/checkout" component={Checkout} />
          <Route
            exact
            path="/postCheckoutRedirect"
            component={PostCheckoutRedirect}
          />
          <Route exact path="/products" component={ManyProducts} />
        </Switch>
      )}
    </div>
  );
};

export default Routes;
