import React from 'react'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import {authenticate} from '../store';
// css style import.
import './auth.css'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  let linkToSignUp = <div></div>
    if (displayName === 'Login') {
      linkToSignUp = (
        <>
          <div className='create-new-account-auth-div'>
            <p>New to Grace shopper ?</p>
            <Link to="/Signup" className="create-new-account-auth-link"> Create an account</Link>
          </div>
        </>)
    }

  const emailSignupInput = displayName === 'Sign Up' && (
    <div>
      <label htmlFor="email">
        <small>Email</small>
      </label>
      <input name="email" type="email" />
    </div>
  );

  return (
    <div>
      <form onSubmit={handleSubmit} name={name} className="login-Form">
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        {emailSignupInput}
        <div className='login-cancel-btn-div'>
          <button type="submit" className="submit-button">{displayName}</button>
          <Link to="/home" className="cancel-button" style={{ textDecoration: 'none' }}>Cancel</Link>
        </div>
        {error && error.response && <div className='Incorrect-user-pwd'> {error.response.data} </div>}
      </form>
      <div className='createAccount'>
          {linkToSignUp}
        </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const username = evt.target.username.value
      const password = evt.target.password.value
      const email = evt.target.email ? evt.target.email.value : '';
      dispatch(authenticate(username, password, formName, email))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
