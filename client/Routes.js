import React, { Component, Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import { me } from './store'
import SingleProduct from './components/SingleProduct'


const Routes = () => {
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(me())
  }, [])


  const isLoggedIn = useSelector((state) => {
    return !!state.auth.id
  })

  return (
    <div>
      {isLoggedIn ? (
        <Switch>
          <Route path="/home" component={Home} />
          {/* <Redirect to="/home" /> */}
        </Switch>
      ) : (
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      )}
      <Route exact path="/products/:productId" component={SingleProduct}/>
    </div>
  )
}


export default Routes